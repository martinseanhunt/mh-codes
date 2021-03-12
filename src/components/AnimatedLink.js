import { Link } from 'gatsby'
import styled from 'styled-components'

export const AnimatedLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.families.mono};
  font-weight: 700;
  position: relative;
  transition: all cubic-bezier(0.19, 1, 0.22, 1) 1s;
  display: flex;
  align-items: center;

  &:before {
    content: '>';
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 1s;
  }

  &:hover:before {
    opacity: 1;
  }

  &:hover {
    padding-left: 8px;
  }
`
