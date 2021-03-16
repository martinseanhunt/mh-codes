import React from 'react'
import styled from 'styled-components'

import BackgroundDot from '../../img/background-dot.svg'

// TODO: add // on every line for title on mobile!

export function Section({
  children,
  maxWidth,
  title,
  sectionMargin,
  sectionPadding,
  ...rest
}) {
  return (
    <Container
      sectionPadding={sectionPadding}
      sectionMargin={sectionMargin}
      {...rest}
    >
      <Inner maxWidth={maxWidth}>
        {title && (
          <>
            {typeof title === 'object' ? (
              <Title>
                {title.map((t) => (
                  <Line key={t.replace(' ', '')}>
                    <LineIntro>&#47;&#47; </LineIntro>
                    {t}
                    <br />
                  </Line>
                ))}
              </Title>
            ) : (
              <Title>
                <LineIntro>&#47;&#47; </LineIntro>
                {title}
              </Title>
            )}
          </>
        )}
        {children}
      </Inner>
    </Container>
  )
}

export const Container = styled.section`
  display: flex;
  justify-content: center;
  padding: ${({ theme, sectionPadding }) =>
    sectionPadding || theme.layout.sectionPadding};
  margin: ${({ theme, sectionMargin }) =>
    sectionMargin || theme.layout.sectionMargin};

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding-left: ${({ theme }) => theme.layout.mobileSectionPadding};
    padding-right: ${({ theme }) => theme.layout.mobileSectionPadding};
  }

  // TODO: Delete min height
  ${({ dottedBackground }) =>
    dottedBackground &&
    `
    background-image: url(${BackgroundDot});    
    background-position: 0 -6px;
    background-size: 15px 15px;
  `}
`

export const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme, maxWidth }) => maxWidth || theme.layout.maxWidth};
`

// TODO: Title component
const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.families.mono};
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  color: ${({ theme }) => theme.colors.slate};
  // TODO: Theme
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 37px;
  line-height: 1;
  position: relative;
  //24
  padding-left: 27px;

  span {
  }

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    line-height: 2.6rem;
    margin-bottom: 22px;
  }
`

const Line = styled.span`
  display: block;
`

const LineIntro = styled.span`
  position: absolute;
  left: 0;
  font-weight: bold;
`
