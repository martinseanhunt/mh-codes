import React from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { AnimatedLink } from './AnimatedLink'

export function ProjectItem({ project: { frontmatter, ...project } }) {
  const logo = getImage(frontmatter.logo)

  return (
    <Item>
      <article>
        <h2>{frontmatter.title}</h2>
        {frontmatter.tags.length && (
          <ul>
            {frontmatter.tags.map((t, i) => (
              <li key={t}>
                {t}
                {i < frontmatter.tags.length - 1 && ', '}
              </li>
            ))}
          </ul>
        )}

        <p>{frontmatter.excerpt}</p>

        <Links>
          {frontmatter.linkToDetails && (
            <AnimatedLink to={project.fields.slug}>
              &gt; case study
            </AnimatedLink>
          )}
          {frontmatter.github && (
            <AnimatedLink
              href={frontmatter.github}
              target="_blank"
              rel="noreferrer"
            >
              &gt; source code on github
            </AnimatedLink>
          )}
          {frontmatter.liveUrl && (
            <AnimatedLink
              href={frontmatter.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              &gt; Live demo
            </AnimatedLink>
          )}
        </Links>
      </article>

      {logo && (
        <Image>
          <GatsbyImage image={logo} alt="technology logo" />
        </Image>
      )}
    </Item>
  )
}

// TODO: Theme
// TODO: What titles etc can be pulle dout in to sensible defaults in global styles
const Item = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.faint};
  padding-bottom: 54px;
  margin-bottom: 54px;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  position: relative;
  display: flex;
  justify-content: space-between;

  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }

  article {
    max-width: 777px;
  }

  // TODO: This can probably go to global
  h2 {
    font-size: ${({ theme }) => theme.fonts.sizes.xl};
    letter-spacing: 0.01em;
    margin-bottom: 12px;
  }

  p {
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    font-family: ${({ theme }) => theme.fonts.families.sansLight};
    color: ${({ theme }) => theme.colors.slate};
    letter-spacing: 0.03em;
    line-height: 2.4rem;
    margin-bottom: 33px;

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      font-size: ${({ theme }) => theme.fonts.sizes.s};
    }
  }

  ul {
    margin-bottom: 22px;
  }

  li {
    font-size: ${({ theme }) => theme.fonts.sizes.xxs};
    font-family: ${({ theme }) => theme.fonts.families.mono};
    color: ${({ theme }) => theme.colors.slate};
    text-transform: uppercase;
    line-height: 3.2rem;
    display: inline-block;
    margin-right: 5px;
  }
`

const Links = styled.div`
  div {
    margin-bottom: 22px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const Image = styled.div`
  width: 72px;
  height: 72px;
  border: 1px solid ${({ theme }) => theme.colors.faint};
  border-radius: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10px;
  right: 0;

  img {
    width: 35px;
  }

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    display: none;
  }
`
