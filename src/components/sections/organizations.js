import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import Lightbox from '@components/lightbox';

const StyledOrganizationsSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
    color: var(--green);
    transform: translateX(3px);

    @media (max-width: 600px) {
      transform: translateY(-3px);
    }
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  .org-header {
    margin-bottom: 20px;
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 15px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .org-gallery {
    margin-top: 25px;

    h4 {
      color: var(--light-slate);
      font-size: var(--fz-md);
      margin-bottom: 15px;
      font-weight: 500;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 15px;

      @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
    }

    .gallery-item {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      aspect-ratio: 1;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      background-color: var(--lightest-navy);

      .gatsby-image-wrapper {
        width: 100%;
        height: 100%;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      &:after {
        content: '\\1F50D';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        background-color: rgba(100, 255, 218, 0.95);
        border-radius: 50%;
        color: var(--navy);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 2;
        pointer-events: none;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(100, 255, 218, 0.2) 0%,
          rgba(87, 203, 255, 0.2) 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
      }

      &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px -15px rgba(100, 255, 218, 0.3);

        .gatsby-image-wrapper {
          transform: scale(1.1);
        }

        &:after {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        &:before {
          opacity: 1;
        }
      }

      &:active {
        transform: translateY(-4px) scale(0.98);
      }

      img {
        object-fit: cover;
      }
    }
  }
`;

const Organizations = () => {
  const data = useStaticQuery(graphql`
    query {
      organizations: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/organizations/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
              gallery {
                childImageSharp {
                  gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const organizationsData = data.organizations.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const openLightbox = (images, index, title) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledOrganizationsSection id="organizations" ref={revealContainer}>
      <h2 className="numbered-heading">Organizations I've Joined</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Organization tabs" onKeyDown={e => onKeyDown(e)}>
          {organizationsData &&
            organizationsData.map(({ node }, i) => {
              const { company } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {organizationsData &&
            organizationsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range, gallery } = frontmatter;
              const galleryImages = gallery
                ? gallery.map(img => getImage(img)).filter(Boolean)
                : [];

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <div className="org-header">
                      <h3>
                        <span>{title}</span>
                        <span className="company">
                          &nbsp;@&nbsp;
                          {url ? (
                            <a href={url} className="inline-link">
                              {company}
                            </a>
                          ) : (
                            <span>{company}</span>
                          )}
                        </span>
                      </h3>

                      <p className="range">{range}</p>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: html }} />

                    {galleryImages.length > 0 && (
                      <div className="org-gallery">
                        <h4>📸 Gallery & Documentation</h4>
                        <div className="gallery-grid">
                          {galleryImages.map((image, idx) => (
                            <div
                              key={idx}
                              className="gallery-item"
                              role="button"
                              tabIndex={0}
                              onClick={() =>
                                openLightbox(galleryImages, idx, `${company} - ${title}`)
                              }
                              onKeyPress={e =>
                                e.key === 'Enter' &&
                                openLightbox(galleryImages, idx, `${company} - ${title}`)
                              }>
                              <GatsbyImage image={image} alt={`${company} activity ${idx + 1}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        title={lightboxTitle}
      />
    </StyledOrganizationsSection>
  );
};

export default Organizations;
