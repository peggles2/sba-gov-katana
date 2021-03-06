import React from 'react'
import PropTypes from 'prop-types'

import styles from './section-link.scss'
import { Link } from 'atoms'

class SectionLink extends React.Component {
  render() {
    const highlightLink = this.props.showUnderline ? ' ' + styles.highlightLink : ''
    const triangleColor = this.props.enableTriangleMarker ? ' ' + styles.triangleTheme : ''
    return (
      <span
        id={this.props.id + '-container'}
        role="menuitem"
        className={styles.link + highlightLink}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      >
        <Link
          id={this.props.id}
          className={styles.sectionLink + highlightLink}
          onClick={this.props.onClick}
          onKeyDown={this.props.onKeyDown}
          to={this.props.url}
        >
          {this.props.text}
        </Link>
        <div
          className={
            styles.triangle +
            triangleColor +
            (this.props.shouldForceTriangleMarkerVisibility ? ' ' + styles.visible : '')
          }
        />
        {this.props.children}
      </span>
    )
  }
}

SectionLink.defaultProps = {
  enableTriangleMarker: false,
  shouldForceTriangleMarkerVisibility: false
}

SectionLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  enableTriangleMarker: PropTypes.bool,
  shouldForceTriangleMarkerVisibility: PropTypes.bool,
  showUnderline: PropTypes.bool,
  onKeyDown: PropTypes.func
}

export default SectionLink
