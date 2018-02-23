import {createElement, Component} from 'react'
import PropTypes from 'prop-types'

class NanoClamp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      noClamp: false,
      text: '.'
    }

    this.element = null
    this.original = props.text
    this.lineHeight = 0
    this.start = 0
    this.middle = 0
    this.end = 0
    this.debounced = this.debounce(this.action)
  }

  componentDidMount () {
    window.addEventListener('resize', this.debounced)
    if (this.props.text) {
      this.lineHeight = this.element.clientHeight + 1
      this.clampLines()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.debounced)
  }

  debounce (func) {
    let timeout
    const later = () => {
      timeout = null
      func.apply(this)
    }

    return () => {
      const callNow = !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, this.props.debounce)
      if (callNow) func.apply(this)
    }
  }

  action () {
    this.setState({noClamp: false}, this.clampLines)
  }

  clampLines () {
    const {ellipsis, lines} = this.props
    const maxHeight = this.lineHeight * lines + 1

    this.start = 0
    this.middle = 0
    this.end = this.original.length

    while (this.start <= this.end) {
      this.middle = Math.floor((this.start + this.end) / 2)
      this.element.innerText = this.original.slice(0, this.middle)

      if (this.middle === this.original.length) {
        this.setState({text: this.original, noClamp: true})
        return
      }

      this.moveMarkers(maxHeight)
    }

    const text = this.original.slice(0, this.middle - 5).trim() + ellipsis

    this.setState({text}, () => {
      this.element.innerText = this.state.text
    })
  }

  moveMarkers (maxHeight) {
    if (this.element.clientHeight <= maxHeight) this.start = this.middle + 1
    else this.end = this.middle - 1
  }

  render () {
    const {text} = this.state
    const {is, text: propText, lines, debounce, ellipsis, ...props} = this.props
    const clampProps = {ref: node => (this.element = node), ...props}
    return propText ? createElement(is, clampProps, text) : null
  }
}

NanoClamp.defaultProps = {
  is: 'div',
  lines: 3,
  ellipsis: '…',
  debounce: 300
}

NanoClamp.propTypes = {
  is: PropTypes.string,
  lines: PropTypes.number,
  debounce: PropTypes.number,
  text: PropTypes.string.isRequired,
  ellipsis: PropTypes.string
}

export default NanoClamp
