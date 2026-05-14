import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

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
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 3;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);
    transition: var(--transition);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
    }

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      border-radius: 4px;
      position: relative;

      &:hover {
        color: var(--green);
        transform: translateY(-3px);
        background-color: var(--light-navy);
      }

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
        transition: var(--transition);
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }

      &:hover {
        animation: none;
        transform: translateY(-3px);
        box-shadow: 0 10px 20px -10px var(--green-tint);
      }
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    &:hover {
      transform: translateY(-10px);

      @media (max-width: 768px) {
        transform: none;
      }
    }

    a {
      width: 100%;
      max-width: 280px;
      background-color: transparent;
      border-radius: var(--border-radius);
      overflow: hidden;
      display: block;
      box-shadow: 0 10px 30px -15px var(--navy-shadow);

      @media (max-width: 768px) {
        max-width: 100%;
        box-shadow: none;
      }
    }

    .img {
      border-radius: var(--border-radius);
      transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
                extension
                publicURL
              }
              tech
              github
              external
              cta
              documentation
              documentationML
              documentationCV
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Function to get custom image size based on project title
  const getImageSize = title => {
    const smallProjects = ['Marketplace Jawara', 'Talent Hub', 'Pintara Kids'];

    if (title === 'Internify') {
      return '800px';
    } else if (title === 'Sibeta') {
      return '600px';
    } else if (smallProjects.includes(title)) {
      return '280px';
    }
    return '280px'; // default size
  };

  // Function to get wrapper style for smaller box
  const getWrapperStyle = title => {
    // Internify - even (kiri), box di kiri, gambar di kanan
    if (title === 'Internify') {
      return {
        maxWidth: '420px',
        marginRight: '180px',
      };
    }
    // Sibeta - odd (kanan), box di kanan, gambar di kiri
    if (title === 'Sibeta') {
      return {
        maxWidth: '350px',
        marginLeft: '180px',
      };
    }
    return {};
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const {
              external,
              title,
              tech,
              github,
              cover,
              cta,
              documentation,
              documentationML,
              documentationCV,
            } = frontmatter;
            const image = getImage(cover);
            const isGif = cover?.extension === 'gif';
            const projectUrl = external || github;
            const isOdd = i % 2 !== 0;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div style={getWrapperStyle(title, isOdd)}>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      {projectUrl ? <a href={projectUrl}>{title}</a> : <span>{title}</span>}
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {cta && projectUrl && (
                        <a href={projectUrl} aria-label="Project Link" className="cta">
                          {cta}
                        </a>
                      )}
                      {github && (
                        <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {documentation && (
                        <a
                          href={documentation}
                          aria-label="Documentation Link"
                          target="_blank"
                          rel="noreferrer"
                          title="Documentation">
                          <Icon name="Folder" />
                        </a>
                      )}
                      {documentationML && (
                        <a
                          href={documentationML}
                          aria-label="ML Documentation"
                          target="_blank"
                          rel="noreferrer"
                          title="Machine Learning Documentation">
                          <Icon name="Folder" />
                        </a>
                      )}
                      {documentationCV && (
                        <a
                          href={documentationCV}
                          aria-label="CV Documentation"
                          target="_blank"
                          rel="noreferrer"
                          title="Computer Vision Documentation">
                          <Icon name="Folder" />
                        </a>
                      )}
                      {external && !cta && (
                        <a
                          href={external}
                          aria-label="External Link"
                          className="external"
                          target="_blank"
                          rel="noreferrer">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  {projectUrl ? (
                    <a href={projectUrl} style={{ maxWidth: getImageSize(title) }}>
                      {isGif ? (
                        <img src={cover.publicURL} alt={title} className="img" />
                      ) : (
                        <GatsbyImage image={image} alt={title} className="img" />
                      )}
                    </a>
                  ) : isGif ? (
                    <div style={{ maxWidth: getImageSize(title) }}>
                      <img src={cover.publicURL} alt={title} className="img" />
                    </div>
                  ) : (
                    <div style={{ maxWidth: getImageSize(title) }}>
                      <GatsbyImage image={image} alt={title} className="img" />
                    </div>
                  )}
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
