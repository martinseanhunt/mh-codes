import styled from 'styled-components'

export const AnimatedButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.families.mono};
  font-weight: 700;
  position: relative;
  transition: all cubic-bezier(0.19, 1, 0.22, 1) 1s;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;

  &:before {
    content: '>';
    position: absolute;
    opacity: 0;
    left: 0;
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 1s;
  }

  &:hover:before {
    opacity: 1;
  }

  &:hover {
    padding-left: 8px;
  }
`
