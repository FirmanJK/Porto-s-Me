import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const StyledLightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(2, 12, 27, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const LightboxHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10001;
  background: linear-gradient(180deg, rgba(2, 12, 27, 0.9) 0%, transparent 100%);

  h2 {
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    margin: 0;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: var(--fz-lg);
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--lightest-slate);
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  border-radius: 4px;

  svg {
    width: 30px;
    height: 30px;

    @media (max-width: 768px) {
      width: 24px;
      height: 24px;
    }
  }

  &:hover {
    color: var(--green);
    background-color: var(--light-navy);
    transform: scale(1.1);
  }
`;

const MainImage = styled.div`
  max-width: 90vw;
  max-height: 70vh;
  position: relative;
  animation: zoomIn 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .gatsby-image-wrapper {
    border-radius: 8px;
    box-shadow: 0 20px 60px -10px var(--navy-shadow);
    max-height: 70vh;
  }

  img {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    max-height: 60vh;

    .gatsby-image-wrapper {
      max-height: 60vh;
    }

    img {
      max-height: 60vh;
    }
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.direction === 'prev' ? 'left: -60px' : 'right: -60px')};
  background-color: var(--light-navy);
  border: 2px solid var(--lightest-navy);
  color: var(--lightest-slate);
  cursor: pointer;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition);
  z-index: 10002;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: var(--green);
    border-color: var(--green);
    color: var(--navy);
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    &:hover {
      background-color: var(--light-navy);
      border-color: var(--lightest-navy);
      color: var(--lightest-slate);
      transform: translateY(-50%);
    }
  }

  @media (max-width: 1024px) {
    ${props => (props.direction === 'prev' ? 'left: 10px' : 'right: 10px')};
    padding: 12px;
  }

  @media (max-width: 768px) {
    ${props => (props.direction === 'prev' ? 'left: 5px' : 'right: 5px')};
    padding: 10px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ThumbnailGrid = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 900px;
  padding: 0 60px;

  @media (max-width: 768px) {
    padding: 0 10px;
    gap: 8px;
    margin-top: 20px;
  }
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid ${props => (props.isActive ? 'var(--green)' : 'transparent')};
  opacity: ${props => (props.isActive ? 1 : 0.6)};
  transition: var(--transition);
  flex-shrink: 0;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 1;
    border-color: var(--green);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const Counter = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  background-color: var(--light-navy);
  padding: 8px 16px;
  border-radius: 20px;
  z-index: 10001;

  @media (max-width: 768px) {
    bottom: 10px;
    font-size: var(--fz-xs);
    padding: 6px 12px;
  }
`;

const SwipeIndicator = styled.div`
  position: absolute;
  top: 50%;
  ${props => (props.direction === 'left' ? 'left: 20px' : 'right: 20px')};
  transform: translateY(-50%);
  color: var(--green);
  font-size: var(--fz-xs);
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.2s;
  pointer-events: none;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Lightbox = ({ images, initialIndex = 0, isOpen, onClose, title = 'Gallery' }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, images.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (!isOpen) {
        return;
      }

      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'ArrowRight') {
        goToNext();
      }
      if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, onClose, goToNext, goToPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onTouchStart = e => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = e => {
    setTouchEnd(e.targetTouches[0].clientX);

    if (touchStart && e.targetTouches[0].clientX) {
      const distance = touchStart - e.targetTouches[0].clientX;
      if (Math.abs(distance) > 10) {
        setSwipeDirection(distance > 0 ? 'left' : 'right');
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    setSwipeDirection(null);
  };

  if (!isOpen || images.length === 0) {
    return null;
  }

  return (
    <StyledLightbox isOpen={isOpen} onClick={onClose}>
      <LightboxHeader>
        <h2>📸 {title}</h2>
        <CloseButton onClick={onClose} aria-label="Close lightbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </CloseButton>
      </LightboxHeader>

      <MainImage
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        <GatsbyImage image={images[currentIndex]} alt={`${title} ${currentIndex + 1}`} />

        <NavigationButton
          direction="prev"
          onClick={e => {
            e.stopPropagation();
            goToPrev();
          }}
          disabled={currentIndex === 0}
          aria-label="Previous image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </NavigationButton>

        <NavigationButton
          direction="next"
          onClick={e => {
            e.stopPropagation();
            goToNext();
          }}
          disabled={currentIndex === images.length - 1}
          aria-label="Next image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </NavigationButton>

        <SwipeIndicator direction="left" show={swipeDirection === 'left'}>
          Swipe →
        </SwipeIndicator>
        <SwipeIndicator direction="right" show={swipeDirection === 'right'}>
          ← Swipe
        </SwipeIndicator>
      </MainImage>

      <ThumbnailGrid onClick={e => e.stopPropagation()}>
        {images.map((image, idx) => (
          <Thumbnail key={idx} isActive={idx === currentIndex} onClick={() => setCurrentIndex(idx)}>
            <GatsbyImage image={image} alt={`Thumbnail ${idx + 1}`} />
          </Thumbnail>
        ))}
      </ThumbnailGrid>

      <Counter onClick={e => e.stopPropagation()}>
        {currentIndex + 1} / {images.length}
      </Counter>
    </StyledLightbox>
  );
};

Lightbox.propTypes = {
  images: PropTypes.array.isRequired,
  initialIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Lightbox;
