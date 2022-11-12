import { createElement, useRef, useEffect, useCallback, useMemo } from 'react'

interface Props {
  accessibility?: boolean
  debounce?: number
  ellipsis?: string
  is?: string
  lines?: number
  text: string
}

const DEFAULT_ELLIPSIS = '…'
const DEFAULT_TEXT = '.'

const debounceFn = (func: () => void, timeoutMs: number): () => void => {
  let timeout: NodeJS.Timeout | undefined

  const later = (): void => {
    timeout = undefined
    func()
  }

  return () => {
    const callNow = timeout == null
    clearTimeout(timeout)
    timeout = setTimeout(later, timeoutMs)
    if (callNow) func()
  }
}


const NanoClamp = ({
  accessibility = true,
  debounce = 300,
  ellipsis = DEFAULT_ELLIPSIS,
  is = 'div',
  lines = 3,
  text,
  ...props
}: Props): JSX.Element | null => {
  const elementRef = useRef<HTMLElement>(null)
  const textRef = useRef<string>(DEFAULT_TEXT)

  const clampProps = {
    ref: elementRef,
    ...(accessibility ? { title: text } : {}),
    ...props
  }

  const hasText = useMemo(() => typeof text === 'string' && text.length > 0, [text])

  const clampLines = useCallback(() => {
    if (!hasText) return

    const updateTextRefs = (newText: string): void => {
      textRef.current = newText

      if (elementRef.current != null) {
        elementRef.current.innerText = newText
      }
    }

    updateTextRefs(DEFAULT_TEXT)

    const lineHeight = (elementRef.current?.clientHeight ?? 0) + 1
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

      if ((elementRef.current?.clientHeight ?? 0) <= maxHeight) {
        start = middle + 1
      } else {
        end = middle - 1
      }
    }

    const textPlusEllipsis = text.slice(0, Math.max(middle - ellipsisLength, 0)).trim() + ellipsis

    updateTextRefs(textPlusEllipsis)
  }, [ellipsis, hasText, lines, text])

  useEffect(() => {
    clampLines()

    const clampLinesDebounced = debounceFn(clampLines, debounce)
    window.addEventListener('resize', clampLinesDebounced)

    return () => window.removeEventListener('resize', clampLinesDebounced)
  }, [clampLines, debounce])

  return hasText ? createElement(is, clampProps, textRef.current) : null
}

export default NanoClamp
