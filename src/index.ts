import { createElement, useCallback, useLayoutEffect, useMemo, useRef } from 'react'

interface Props extends React.HTMLAttributes<HTMLElement> {
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
  let timeout: ReturnType<typeof setTimeout> | undefined

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
}: Props): React.ReactElement | null => {
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
        elementRef.current.textContent = newText
      }
    }

    const elementHeight = (): number => elementRef.current?.clientHeight ?? 0

    updateTextRefs(DEFAULT_TEXT)

    const lineHeight = elementHeight() + 1
    const maxHeight = lineHeight * lines + 1

    updateTextRefs(text)
    if (elementHeight() <= maxHeight) {
      return
    }

    let start = 0
    let middle = 0
    let end = text.length

    while (start <= end) {
      middle = Math.floor((start + end) / 2)

      const slicedText = text.slice(0, middle).trim() + ellipsis
      updateTextRefs(slicedText)

      if (elementHeight() <= maxHeight) {
        start = middle + 1
      } else {
        end = middle - 1
      }
    }

    const textPlusEllipsis = text.slice(0, middle - 1).trim() + ellipsis

    updateTextRefs(textPlusEllipsis)
  }, [ellipsis, hasText, lines, text])

  useLayoutEffect(() => {
    clampLines()

    if (elementRef.current == null) return

    const observer = new ResizeObserver(debounceFn(clampLines, debounce))
    observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [clampLines, debounce])

  return hasText ? createElement(is, clampProps, textRef.current) : null
}

export default NanoClamp
