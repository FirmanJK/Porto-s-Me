import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertificationsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin-top: 50px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const StyledMoreButton = styled.button`
  ${({ theme }) => theme.mixins.button};
  margin: 80px auto 0;
  display: block;
`;

const StyledCertification = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .cert-inner {
        transform: translateY(-7px);
      }
    }
  }

  .cert-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .cert-top {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-bottom: 20px;

    .cert-image {
      width: 100%;
      height: 150px;
      margin-bottom: 20px;
      border-radius: var(--border-radius);
      overflow: hidden;

      .img {
        border-radius: var(--border-radius);
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }

  .cert-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    line-height: 1.3;

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .cert-issuer {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
    margin-bottom: 15px;
  }

  .cert-description {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    line-height: 1.5;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .cert-tech-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;
      margin-right: 15px;
      margin-bottom: 5px;
      color: var(--slate);

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .cert-links {
    display: flex;
    align-items: center;
    margin-top: 10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 5px 7px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const Certifications = () => {
  const data = useStaticQuery(graphql`
    {
      certifications: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/certifications/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              external
              issuer
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const certifications = data.certifications.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealCertifications = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const GRID_LIMIT = 3;
  const firstThree = certifications.slice(0, GRID_LIMIT);
  const certificationsToShow = showMore ? certifications : firstThree;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealCertifications.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="certifications">
      <h2 className="numbered-heading" ref={revealTitle}>
        Certifications
      </h2>

      <StyledCertificationsGrid>
        {certificationsToShow &&
          certificationsToShow.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, cover, issuer } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledCertification key={i} ref={el => (revealCertifications.current[i] = el)}>
                <div className="cert-inner">
                  <div className="cert-top">
                    <div className="cert-image">
                      {image && <GatsbyImage image={image} alt={title} className="img" />}
                    </div>
                  </div>

                  <h3 className="cert-title">
                    <a href={external} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                  </h3>

                  {issuer && <div className="cert-issuer">{issuer}</div>}

                  <div className="cert-description" dangerouslySetInnerHTML={{ __html: html }} />

                  {tech && tech.length > 0 && (
                    <ul className="cert-tech-list">
                      {tech.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  )}

                  <div className="cert-links">
                    {external && (
                      <a
                        href={external}
                        aria-label="External Link"
                        target="_blank"
                        rel="noreferrer">
                        <Icon name="External" />
                      </a>
                    )}
                  </div>
                </div>
              </StyledCertification>
            );
          })}
      </StyledCertificationsGrid>

      <StyledMoreButton onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show Less' : 'Show More'}
      </StyledMoreButton>
    </section>
  );
};

export default Certifications;
