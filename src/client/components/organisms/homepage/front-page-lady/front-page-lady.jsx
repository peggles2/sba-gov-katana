import React from 'react';
import styles from './front-page-lady.scss';
import LargeInversePrimaryButton from '../../../atoms/large-inverse-primary-button/large-inverse-primary-button.jsx'
import Triangle from '../../../../../../public/assets/images/homepage/primary-landing/desktop-corner-graphic.png';
import MobileTriangle from '../../../../../../public/assets/images/homepage/primary-landing/mobile-corner-graphic.png';

class FrontPageLady extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <img alt="banner image of small business owner" className={styles.hero} src={"assets/images/homepage/primarylanding-hero.jpg"}/>
        <img alt="banner image of small business owner" className={styles.mobileHero} src={"assets/images/homepage/primarylanding-mobile-hero.png"}/>
        <div className={styles.box}>
          <div className={styles.title}>
            Start and grow your business.</div>
          <div className={styles.text}>
            Whether you're already up and running or just getting started, we can help. Come take a look how.</div>
          <LargeInversePrimaryButton text="LET'S GO" href="./starting-managing-business"/>
          <img alt="" src={Triangle} className={styles.triangle}/>
          <img alt="" src={MobileTriangle} className={styles.mobileTriangle}/>
        </div>
      </div>
    )
  }
}

export default FrontPageLady;