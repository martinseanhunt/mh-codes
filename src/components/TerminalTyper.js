import React, { useEffect, useState, useCallback } from 'react'
import { navigate } from 'gatsby'

import { Terminal } from './Terminal'

let timeOuts = []

const randRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export function TerminalTyper(props) {
  const [terminalLines, setTerminalLines] = useState([])
  const [clearTerminalLine, setClearTerminalLine] = useState([])
  const [showBio, setShowBio] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  // TODO: return a promise instead of using callbacks
  const addChars = useCallback(function (
    lines,
    passedOptions = {},
    lineIndex = 0,
    charIndex = 0,
    init = true
  ) {
    let options = {
      lineSetter: setTerminalLines,
      callback: null,
      initialDelay: null,
      ...passedOptions,
    }

    if (lineIndex === lines.length) {
      setIsAnimating(false)
      if (options.callback) options.callback()
      return
    }

    if (['bio', 'fullBio', 'input'].includes(lines[lineIndex])) {
      switch (lines[lineIndex]) {
        case 'bio':
          setShowBio(true)
          break
        case 'fullBio':
          setShowFullBio(true)
          break
        default:
          setShowInput(true)
      }
      return addChars(lines, options, lineIndex + 1)
    }

    const [path, command] = lines[lineIndex]

    options.lineSetter((lines) => {
      const line = lines[lineIndex]

      if (!line)
        return [...lines.filter((_, index) => index !== lineIndex), [path, '']]

      return [
        ...lines.filter((_, index) => index !== lineIndex),
        [line[0], line[1] + command.charAt(charIndex)],
      ]
    })

    let nextCharIndex = charIndex
    let nextLineIndex = lineIndex
    let nextTimeout = randRange(50, 100)
    let nextInit = false

    if (init) {
      nextTimeout = options.initialDelay || randRange(1000, 2000)
    } else if (charIndex === command.length - 1) {
      nextCharIndex = 0
      nextLineIndex++
      nextInit = true
      nextTimeout = randRange(300, 500)
    } else {
      nextCharIndex++
    }

    timeOuts.push(
      setTimeout(
        () => addChars(lines, options, nextLineIndex, nextCharIndex, nextInit),
        nextTimeout
      )
    )
  },
  [])

  useEffect(() => {
    const lines = [
      ['~', 'cd mh-codes'],
      ['~/mh-codes', 'cat bio.md'],
      'bio',
      'input',
    ]

    setIsAnimating(true)
    setShowInput(false)
    setShowBio(false)
    setShowFullBio(false)
    setTerminalLines([])
    setClearTerminalLine([])
    addChars(lines)

    return () => {
      for (let t of timeOuts) window.clearTimeout(t)
    }
  }, [addChars])

  const onClickBio = (e) => {
    e.preventDefault()
    if (showFullBio || e.target.tagName !== 'A' || isAnimating) return false

    const lines = [['~/mh-codes', 'clear']]
    const lines2 = [['~/mh-codes', 'cat full-bio.md'], 'fullBio', 'input']

    setIsAnimating(true)

    const callback = () => {
      setIsAnimating(true)
      setShowInput(false)
      setShowBio(false)
      setTerminalLines([])
      addChars(lines2, {
        callback: () => setClearTerminalLine([]),
        initialDelay: 1000,
      })
    }

    addChars(lines, {
      lineSetter: setClearTerminalLine,
      callback,
      initialDelay: 50,
    })
  }

  const onClickFullBio = (e) => {
    e.preventDefault()
    if (e.target.tagName !== 'A' || isAnimating) return false
    navigate(e.target.pathname)
  }

  return (
    <Terminal
      terminalLines={terminalLines}
      clearTerminalLine={clearTerminalLine}
      showBio={showBio}
      showFullBio={showFullBio}
      showInput={showInput}
      onClickBio={onClickBio}
      onClickFullBio={onClickFullBio}
      {...props}
    />
  )
}
