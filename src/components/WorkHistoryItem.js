import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { AnimatedLink } from './AnimatedLink'

// TODO: compose component
// TOOO: get testimonial from CMS

export function WorkHistoryItem({ item: { frontmatter, ...item } }) {
  const [expanded, setExpanded] = useState(false)
  const detailRef = useRef()
  const avatar = getImage(frontmatter.testimonialAvatar)

  useEffect(() => {
    detailRef.current.style.maxHeight = expanded
      ? `${detailRef.current.scrollHeight}px`
      : 0
  }, [expanded])

  return (
    <Item
      role="button"
      onClick={() => setExpanded((expanded) => !expanded)}
      expanded={expanded}
    >
      <div>
        <h2>{frontmatter.company}</h2>
        <h3>{frontmatter.role}</h3>
      </div>
      <span>{frontmatter.dates}</span>

      <ItemDetail ref={detailRef}>
        <Content paddBottom={frontmatter.linkToDetails}>
          <p>{frontmatter.excerpt || item.excerpt}</p>

          <ul>
            {frontmatter.acheivements.map((a) => (
              <li key={a.slice(0, 10).replace(' ', '-')}>{a}</li>
            ))}
          </ul>

          {frontmatter.testimonial && (
            <Quote paddBottom={frontmatter.linkToDetails}>
              <blockquote>&ldquo; {frontmatter.testimonial}&rdquo;</blockquote>
              <figcaption>
                {avatar && (
                  <Avatar>
                    <GatsbyImage
                      image={avatar}
                      alt={frontmatter.testimonialAuthor}
                    />
                  </Avatar>
                )}
                {frontmatter.testimonialAuthor}
              </figcaption>
            </Quote>
          )}

          <Links>
            {frontmatter.linkToDetails && (
              <AnimatedLink to={item.fields.slug}>
                &gt; View case study
              </AnimatedLink>
            )}
            {frontmatter.externalUrl && (
              <AnimatedLink target="__blank" href={frontmatter.externalUrl}>
                &gt; {frontmatter.company}
              </AnimatedLink>
            )}
          </Links>
        </Content>
      </ItemDetail>
    </Item>
  )
}

// TODO: Theme
// TODO: What titles etc can be pulle dout in to sensible defaults in global styles
const Item = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.faint};
  padding-bottom: 31px;
  margin-bottom: 25px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  line-height: 1;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding-bottom: 25px;

    & > div:first-of-type {
      width: 100%;
    }
  }

  // see what animation values can live in theme
  &:before {
    content: '^';
    position: absolute;
    top: -8px;
    left: -25px;
    font-size: 22px;
    opacity: 0;
    transform: rotate(90deg) translateY(10px);
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 0.65s;

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      right: 0;
      left: auto;
      opacity: 1;
      transform: rotate(180deg) translateY(0);
      color: ${({ theme }) => theme.colors.slate};
    }
  }

  &:hover:before {
    opacity: 1;
    transform: rotate(180deg) translateY(0);
  }

  ${({ expanded }) =>
    expanded &&
    `
    &:before {
      opacity: 1;
      transform: rotate(-0deg) translateY(0) !important;
    }
  `}

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    opacity: 0;
    width: 0;
    height: 1px;
    background: #1d1335;
    z-index: 2;
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 2s;

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      display: none;
    }
  }

  &:hover:after {
    width: 100%;
    opacity: 1;
  }

  &:last-of-type {
    margin-bottom: 39px;
  }

  // TODO: This can probably go to global
  h2 {
    font-size: ${({ theme }) => theme.fonts.sizes.xl};
    letter-spacing: 0.01em;
    margin-bottom: 12px;
    // TODO: Use leading-trim when it becomes available
  }

  // TODO: This too
  h3 {
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    color: ${({ theme }) => theme.colors.slate};
    font-family: ${({ theme }) => theme.fonts.families.sansLight};
    letter-spacing: 0.03em;

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      font-size: ${({ theme }) => theme.fonts.sizes.s};
    }
  }

  span {
    font-size: ${({ theme }) => theme.fonts.sizes.xxs};
    font-family: ${({ theme }) => theme.fonts.families.mono};
    color: ${({ theme }) => theme.colors.slate};
    text-transform: uppercase;
    line-height: 3.2rem;

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      line-height: 1;
      margin-top: 20px;
      display: block;
      letter-spacing: 0.03em;
      text-transform: none;
    }
  }
`

const ItemDetail = styled.div`
  max-height: 0;
  transition: max-height 0.5s ease-out;
  overflow: hidden;
  width: 100%;
`

const Content = styled.div`
  padding-top: 32px;
  padding-bottom: ${({ paddBottom }) => (paddBottom ? '32px' : '0')};
  // TODO: is this going to be the standard P styling?
  // if so move to global
  p {
    color: ${({ theme }) => theme.colors.slate};
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    line-height: 2.4rem;
    max-width: 663px;
    font-family: ${({ theme }) => theme.fonts.families.sansLight};
    letter-spacing: 0.03em;
    padding-bottom: 33px;

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      font-size: ${({ theme }) => theme.fonts.sizes.s};
    }
  }

  ul {
    padding-bottom: 33px;
  }

  li {
    position: relative;
    padding: 0 0 13px 17px;
    color: ${({ theme }) => theme.colors.dark};
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    font-family: ${({ theme }) => theme.fonts.families.sans};
    line-height: 2.5rem;
    max-width: 600px;

    &:before {
      content: '~';
      position: absolute;
      left: 0;
    }

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      font-size: ${({ theme }) => theme.fonts.sizes.s};
    }
  }
`

const Quote = styled.figure`
  blockquote {
    border-left: 2px solid ${({ theme }) => theme.colors.dark};
    padding: 10px 25px;
    color: ${({ theme }) => theme.colors.dark};
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    line-height: 2.4rem;
    max-width: 600px;
    font-family: ${({ theme }) => theme.fonts.families.sansLight};
    margin-bottom: 20px;

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      font-size: ${({ theme }) => theme.fonts.sizes.s};
    }
  }

  figcaption {
    display: flex;
    align-items: center;
    margin-left: 27px;
    font-family: ${({ theme }) => theme.fonts.families.mono};
    font-size: ${({ theme }) => theme.fonts.sizes.s};
    margin-bottom: ${({ paddBottom }) => (paddBottom ? '50px' : '25px')};

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      font-size: ${({ theme }) => theme.fonts.sizes.xxs};
    }
  }
`

const Avatar = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
  margin-right: 16px;

  img {
    width: 40px;
  }
`

// TODO: compose and reuse
const Links = styled.div`
  div {
    margin-bottom: 22px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`
