import { createElement, useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

const DEFAULT_ELLIPSIS = '…'
const DEFAULT_TEXT = '.'

const debounceFn = (func, timeoutMs) => {
  let timeout
  const later = () => {
    timeout = null
    func()
  }

  return () => {
    const callNow = !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, timeoutMs)
    if (callNow) func()
  }
}

const NanoClamp = ({ accessibility, debounce, ellipsis, is, lines, text, ...props }) => {
  const elementRef = useRef()
  const textRef = useRef(DEFAULT_TEXT)

  const clampProps = {
    ref: elementRef,
    ...(accessibility ? { title: text } : {}),
    ...props
  }

  const clampLines = useCallback(() => {
    if (!text) return

    const updateTextRefs = newText => {
      textRef.current = newText
      elementRef.current.innerText = newText
    }

    updateTextRefs(DEFAULT_TEXT)

    const lineHeight = elementRef.current.clientHeight + 1
    const maxHeight = lineHeight * lines + 1

    const ellipsisLength = ellipsis === DEFAULT_ELLIPSIS ? 5 : ellipsis.length * 1.2

    let start = 0
    let middle = 0
    let end = text.length

    while (start <= end) {
      middle = Math.floor((start + end) / 2)

      const slicedText = text.slice(0, middle)
      updateTextRefs(slicedText)

      if (middle === text.length) {
        return
      }

      if (elementRef.current.clientHeight <= maxHeight) {
        start = middle + 1
      } else {
        end = middle - 1
      }
    }

    const textPlusEllipsis = text.slice(0, Math.max(middle - ellipsisLength, 0)).trim() + ellipsis

    updateTextRefs(textPlusEllipsis)
  }, [ellipsis, lines, text])

  useEffect(() => {
    clampLines()

    const clampLinesDebounced = debounceFn(clampLines, debounce)
    window.addEventListener('resize', clampLinesDebounced)

    return () => window.removeEventListener('resize', clampLinesDebounced)
  }, [clampLines, debounce])

  return text ? createElement(is, clampProps, textRef.current) : null
}

NanoClamp.defaultProps = {
  accessibility: true,
  is: 'div',
  lines: 3,
  ellipsis: DEFAULT_ELLIPSIS,
  debounce: 300
}

NanoClamp.propTypes = {
  accessibility: PropTypes.bool,
  is: PropTypes.string,
  lines: PropTypes.number,
  debounce: PropTypes.number,
  text: PropTypes.string.isRequired,
  ellipsis: PropTypes.string
}

export default NanoClamp
