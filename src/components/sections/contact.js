import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks/index';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(100, 255, 218, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(100, 255, 218, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(100, 255, 218, 0);
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    animation: pulse 2s infinite;

    &:hover {
      animation: none;
      transform: translateY(-3px);
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>
      <h2 className="title">Get In Touch</h2>
      <p>
        I'm actively seeking internship opportunities and always open to new freelance projects and
        collaborations. Whether you need a full-stack developer for your next big project, want to
        discuss business automation solutions, or just want to say hello, my inbox is always open.
        Let's build something amazing together!
      </p>
      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>
    </StyledContactSection>
  );
};

export default Contact;
