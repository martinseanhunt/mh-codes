import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

import { Header } from './Header'
import { Section } from './Section'
import { LinkStyles } from '../AnimatedLink'
import { AnimatedButton } from '../AnimatedButton'

// TODO: hook up sing up form
// TODO: compose component
// TODO: Animate wave on click

export function Footer() {
  const emojiRef = useRef()

  useEffect(() => {
    let windowHeight
    let timeOuts = []
    let animating = false
    const setWindowHeight = () => (windowHeight = window.innerHeight)

    function checkPosition() {
      const { current: el } = emojiRef
      const triggerPoint = el.getBoundingClientRect().bottom + 50

      if (
        triggerPoint - windowHeight <= 0 &&
        !el.classList.contains('wave') &&
        !animating
      ) {
        animating = true
        timeOuts.push(setTimeout(() => el.classList.add('wave'), 1000))
        timeOuts.push(
          setTimeout(() => {
            el.classList.remove('wave')
            animating = false
          }, 5500)
        )
      }
    }

    window.addEventListener('scroll', checkPosition)
    window.addEventListener('resize', setWindowHeight)

    setWindowHeight()
    checkPosition()

    return () => {
      window.removeEventListener('scroll', checkPosition)
      window.removeEventListener('resize', setWindowHeight)

      for (let t of timeOuts) window.clearTimeout(t)
    }
  }, [])

  return (
    <FooterContainer>
      <FooterSection sectionMargin="0" title="Keep Track & Say Hello">
        <ContactDetails>
          <ul>
            <li>
              <ContactLinks>
                <a href="https://github.com/martinseanhunt">
                  <span>&gt;</span> github.com/martinseanhunt
                </a>
                <a href="mailto:martin@mh.codes">
                  <span>&gt;</span> martin@mh.codes
                </a>
              </ContactLinks>
            </li>
          </ul>
          <Emoji ref={emojiRef}>
            <span role="img" aria-label="waving emoji">
              👋
            </span>
          </Emoji>
        </ContactDetails>
      </FooterSection>

      <FooterSection title="Sign Up to The Mailing List">
        <SignUpForm onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email address" required={true} />
          <SubmitButton type="submit">
            <span>&gt;</span> Sign Up
          </SubmitButton>
        </SignUpForm>
      </FooterSection>

      <Header footer />
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.terminalBlack};
  color: ${({ theme }) => theme.colors.white};
  padding-bottom: 51px;

  h3 {
    color: ${({ theme }) => theme.colors.slateLight};
  }
`

const FooterSection = styled(Section)`
  padding-top: 85px;
  margin: ${({ sectionMargin }) => sectionMargin || '0 0 120px 0'};

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding-top: 65px;
    margin: ${({ sectionMargin }) => sectionMargin || '0 0 65px 0'};
  }
`

const ContactDetails = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`

const wave = keyframes`
  0% { transform: rotate( 0.0deg) }
  10% { transform: rotate(14.0deg) }  
  20% { transform: rotate(-8.0deg) }
  30% { transform: rotate(14.0deg) }
  40% { transform: rotate(-4.0deg) }
  50% { transform: rotate(10.0deg) }
  60% { transform: rotate( 0.0deg) }  
  100% { transform: rotate( 0.0deg) }
`

const Emoji = styled.div`
  width: 70px;
  height: 70px;
  border: 1px solid ${({ theme }) => theme.colors.opaqueWhite};
  border-radius: 70px;
  line-height: 0;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -10px;

  span {
    position: relative;
    top: -2px;
    left: -1px;
  }

  &.wave span {
    transform-origin: 21px 7px;
    animation: ${wave} 2s 2;
  }

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    position: absolute;
    top: -90px;
    right: 0;
  }
`

const ContactLinks = styled(LinkStyles)`
  a {
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.families.sansLight};
    font-weight: 300;
    text-transform: lowercase;
    line-height: 3.3rem;
    font-size: ${({ theme }) => theme.fonts.sizes.xl};

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      font-size: ${({ theme }) => theme.fonts.sizes.l};
    }
  }
  span:last-of-type {
    margin-right: 9px;
  }
`

const SignUpForm = styled.form`
  display: flex;
  align-items: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slateLight};
  padding-bottom: 12px;
  position: relative;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding-bottom: 6px;
    margin-bottom: 35px;
  }

  input {
    color: ${({ theme }) => theme.colors.white};
    background: none;
    outline: none;
    font-family: ${({ theme }) => theme.fonts.families.sansLight};
    font-size: ${({ theme }) => theme.fonts.sizes.l};
    border: none;
    padding-bottom: 5px;
    flex: 1;
    flex-shrink: 1;

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      font-size: ${({ theme }) => theme.fonts.sizes.m};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.slateLight};
    }
  }
`

const SubmitButton = styled(AnimatedButton)`
  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    font-size: ${({ theme }) => theme.fonts.sizes.xxs};
    position: absolute;
    left: 0;
    bottom: -35px;
  }
`
