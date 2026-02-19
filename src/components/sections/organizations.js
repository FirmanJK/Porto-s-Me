import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

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
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 15px;
    }
  }

  .org-logo {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--lightest-navy);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 30px -15px var(--navy-shadow);
    }

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
    }

    img {
      object-fit: contain;
      padding: 10px;
    }

    @media (max-width: 600px) {
      width: 60px;
      height: 60px;
    }
  }

  .org-info {
    flex: 1;
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
      transition: var(--transition);
      background-color: var(--lightest-navy);

      .gatsby-image-wrapper {
        width: 100%;
        height: 100%;
      }

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--navy);
        opacity: 0;
        transition: var(--transition);
      }

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px -15px var(--navy-shadow);

        &:after {
          opacity: 0.3;
        }
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
              logo {
                childImageSharp {
                  gatsbyImageData(width: 80, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              gallery {
                childImageSharp {
                  gatsbyImageData(width: 300, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
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
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

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
              const { title, url, company, range, logo, gallery } = frontmatter;
              const logoImage = logo ? getImage(logo) : null;
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
                      {logoImage && (
                        <div className="org-logo">
                          <GatsbyImage image={logoImage} alt={`${company} logo`} />
                        </div>
                      )}
                      <div className="org-info">
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
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: html }} />

                    {galleryImages.length > 0 && (
                      <div className="org-gallery">
                        <h4>📸 Gallery & Documentation</h4>
                        <div className="gallery-grid">
                          {galleryImages.map((image, idx) => (
                            <div key={idx} className="gallery-item">
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
    </StyledOrganizationsSection>
  );
};

export default Organizations;
