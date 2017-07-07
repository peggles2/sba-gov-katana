import React from 'react';
import styles from './hero.scss';
import Callout from '../../molecules/callout/callout.jsx'

class Hero extends React.Component {

  imgStyles() {
    return {"background": "url("+this.props.imageUrl+") no-repeat center center", "backgroundSize": "cover", "width": "100%", "height": "100%"}
  }

  render() {
    return (
      <div className={styles.heroContainer}>

        <div className={styles.heroMobileImageContainer}>
          <div title={this.props.alt} style={this.imgStyles()}></div>
        </div>
        <img className={styles.heroDesktopImage} src={this.props.imageUrl} alt={this.props.alt}/>
        <div className={styles.callout}>
          <Callout title={this.props.title} message={this.props.message} buttons={this.props.buttons}/>
        </div>
      </div>
    );
  }
}

Hero.defaultProps = {
    imageUrl: React.PropTypes.string
}

export default Hero;
