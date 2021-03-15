import React, { useState } from 'react'
import styled from 'styled-components'
import jsonp from 'jsonp'

import { AnimatedButton } from './AnimatedButton'
import { Section } from './layout/Section'

const formAction =
  'https://codes.us1.list-manage.com/subscribe/post-json?u=f62fea2f5a089aa95c9a9f043&amp;id=c3fe42be82'

export function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()

    setError(false)
    setSuccess(false)
    setLoading(true)

    jsonp(
      `${formAction}&EMAIL=${email}`,
      {
        param: 'c',
      },
      (e, data) => {
        if (e || data.result !== 'success') {
          setError(e || data.msg || 'oops, something went wrong')
        } else {
          setSuccess(true)
          setError(null)
        }
        setLoading(false)
      }
    )
  }

  return (
    <SignUpSection title="Sign Up to The Mailing List">
      <Form
        action={formAction}
        method="post"
        onSubmit={onFormSubmit}
        disabled={loading || success}
      >
        <input
          type="email"
          placeholder="Email address"
          required={true}
          vlaue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SubmitButton type="submit">
          {loading ? (
            'Loading...'
          ) : (
            <>
              <span>&gt;</span> Sign Up
            </>
          )}
        </SubmitButton>
      </Form>

      {error && <Error dangerouslySetInnerHTML={{ __html: error }} />}
      {success && <Success>Thank you! You have been added to the list</Success>}
    </SignUpSection>
  )
}

const SignUpSection = styled(Section)`
  padding-top: 108px;
  margin: ${({ sectionMargin }) => sectionMargin || '0 0 108px 0'};

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding-top: 65px;
    margin: ${({ sectionMargin }) => sectionMargin || '0 0 72px 0'};
  }
`

const Form = styled.form`
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
  outline: none;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    font-size: ${({ theme }) => theme.fonts.sizes.xxs};
    position: absolute;
    left: 0;
    bottom: -35px;
  }
`
const Success = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  padding-top: 10px;
  color: ${({ theme }) => theme.colors.terminalGreen};
  display: block;
`

const Error = styled(Success)`
  color: ${({ theme }) => theme.colors.terminalBlue};

  * {
    color: ${({ theme }) => theme.colors.terminalBlue};
  }
`
