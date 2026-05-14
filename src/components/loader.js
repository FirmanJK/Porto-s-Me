import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 180px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};

    svg,
    img {
      display: block;
      width: 100%;
      height: auto;
      margin: 0 auto;
      user-select: none;
      background: transparent !important;
      mix-blend-mode: normal;
      filter: drop-shadow(0 0 20px rgba(100, 255, 218, 0.5));
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '.logo-wrapper svg',
        delay: 500,
        duration: 1200,
        easing: 'easeInOutQuart',
        opacity: [0, 1],
        scale: [0.8, 1],
        rotate: ['-180deg', '0deg'],
      })
      .add({
        targets: '.logo-wrapper svg',
        delay: 1500,
        duration: 0,
        easing: 'linear',
      })
      .add({
        targets: '.logo-wrapper svg',
        duration: 600,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.5,
        rotate: '180deg',
      })
      .add({
        targets: '.loader',
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <svg
          width="512"
          height="512"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M256 32L448 144V368L256 480L64 368V144L256 32Z"
            stroke="#64FFDA"
            strokeWidth="8"
            fill="none"
            strokeLinejoin="round"
          />
          <path
            d="M 160 180 L 160 332 M 160 180 L 240 180 M 160 250 L 220 250"
            stroke="#64FFDA"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 352 180 L 352 290 C 352 320 330 342 300 342 C 270 342 248 320 248 290"
            stroke="#64FFDA"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
