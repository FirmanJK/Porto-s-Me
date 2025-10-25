import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks/index';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }

  p {
    margin: 0 0 15px 0;
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }

  .styled-pic {
    position: relative;
    max-width: 300px;

    @media (max-width: 768px) {
      margin: 50px auto 0;
      width: 70%;
    }

    .wrapper {
      ${({ theme }) => theme.mixins.boxShadow};
      display: block;
      position: relative;
      width: 100%;
      border-radius: var(--border-radius);
      background-color: var(--green);

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:after {
          top: 15px;
          left: 15px;
        }

        .img {
          filter: none;
          mix-blend-mode: normal;
        }
      }

      .img {
        position: relative;
        border-radius: var(--border-radius);
        mix-blend-mode: multiply;
        filter: grayscale(100%) contrast(1);
        transition: var(--transition);
      }

      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius);
        transition: var(--transition);
      }

      &:before {
        top: 0;
        left: 0;
        background-color: var(--navy);
        mix-blend-mode: screen;
      }

      &:after {
        border: 2px solid var(--green);
        top: 20px;
        left: 20px;
        z-index: -1;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  const skills = [
    'Laravel',
    'PHP',
    'React',
    'JavaScript',
    'Python',
    'MySQL (SQL)',
    'Git',
    'Bootstrap',
    'Google Cloud API',
    'Figma',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <div>
          <p>
            Hello! My name is Septa, and I specialize in building robust back-end systems for web
            applications. My interest in technology started with a passion for solving business
            process problems, which led me to focus on back-end development and system analysis at
            the State Polytechnic of Malang.
          </p>
          <p>
            Today, I leverage my experience as a freelancer to translate complex business needs into
            efficient, scalable, and secure technical solutions. I am driven by the challenge of
            optimizing systems and delivering technology that provides a clear return on investment,
            such as improving data efficiency by 70% for over 45,000 users in one of my projects.
          </p>
          <p>Here are a few of the core technologies I work with:</p>
          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>

        <div className="styled-pic">
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </div>
      </div>
    </StyledAboutSection>
  );
};

export default About;
