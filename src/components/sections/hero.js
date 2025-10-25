import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils/index';
import { usePrefersReducedMotion } from '@hooks/index';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .greeting-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin: 0 0 30px 4px;
    gap: 600px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 15px;
      margin: 0 0 20px 2px;
    }
  }

  .bismillah {
    color: var(--slate);
    font-family: 'Traditional Arabic', 'Scheherazade', serif;
    font-size: clamp(30px, 1.5vw, 18px);
    font-weight: 400;
    letter-spacing: 1px;
    opacity: 0.6;
    text-align: right;
    margin-right: 20px;
    flex-shrink: 0;
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: clamp(12px, 3vw, 16px);
      margin-right: 0;
    }
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h2 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  h3 {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  const one = (
    <div className="greeting-container">
      <h1 style={{ transitionDelay: '100ms' }}>Hi, my name is</h1>
      <span className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
    </div>
  );

  const two = <h2 className="big-heading">Dwi Septa Satria Agung.</h2>;
  const three = <h3 className="big-heading">I build back-end solutions for the web.</h3>;
  const four = (
    <p>
      I'm a Business Information Systems student specializing in back-end development and system
      analysis. As an experienced freelancer, I build and optimize efficient, high-impact web
      applications that solve real-world business problems.
    </p>
  );
  const five = (
    <a href="#contact" className="email-link">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
