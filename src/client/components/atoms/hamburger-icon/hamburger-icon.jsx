import React from 'react'
import styles from './hamburger-icon.scss'

class HamburgerIcon extends React.Component {
  getOpen() {
    return (
      <div className={styles.menuIconContainer}>
        <svg viewBox="0 0 31 30" className={styles.menuIconClose}>
          <path
            className={styles.closeIcon}
            strokeWidth={3}
            fill="transparent"
            d="M 10,10 L 30,30 M 30,10 L 10,30"
          />
        </svg>
      </div>
    )
  }

  getClosed() {
    return (
      <div className={styles.menuIconContainer}>
        <svg className={styles.menuIconHamburger} width="15px" height="13px" viewBox="0 0 15 13">
          <title>hamburger icon</title>
          <desc>Created with Sketch.</desc>
          <defs />
          <g id="Homepage" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <g
              className={styles.hamburgerIcon}
              id="alert-mobile"
              transform="translate(-337.000000, -128.000000)"
            >
              <g id="Rectangle-14-+-whitepaper-Copy-11" transform="translate(274.000000, 116.000000)">
                <path
                  d="M78,22.4318182 C78,22.0962358 77.7167969,21.8181818 77.375,21.8181818 L63.625,21.8181818 C63.2832031,21.8181818 63,22.0962358 63,22.4318182 L63,23.6590909 C63,23.9946733 63.2832031,24.2727273 63.625,24.2727273 L77.375,24.2727273 C77.7167969,24.2727273 78,23.9946733 78,23.6590909 L78,22.4318182 Z M78,17.5227273 C78,17.1871449 77.7167969,16.9090909 77.375,16.9090909 L63.625,16.9090909 C63.2832031,16.9090909 63,17.1871449 63,17.5227273 L63,18.75 C63,19.0855824 63.2832031,19.3636364 63.625,19.3636364 L77.375,19.3636364 C77.7167969,19.3636364 78,19.0855824 78,18.75 L78,17.5227273 Z M78,12.6136364 C78,12.278054 77.7167969,12 77.375,12 L63.625,12 C63.2832031,12 63,12.278054 63,12.6136364 L63,13.8409091 C63,14.1764915 63.2832031,14.4545455 63.625,14.4545455 L77.375,14.4545455 C77.7167969,14.4545455 78,14.1764915 78,13.8409091 L78,12.6136364 Z"
                  id="hamburger-icon"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    )
  }

  getText(open) {
    return <div className={open ? styles.textOpen : styles.textClosed}>{open ? 'Close' : 'Menu'}</div>
  }

  render() {
    return (
      <div>
        {this.getText(this.props.isOpen)}
        {this.props.isOpen ? this.getOpen() : this.getClosed()}
      </div>
    )
  }
}

export default HamburgerIcon
