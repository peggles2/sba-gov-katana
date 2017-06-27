import React from 'react';
import styles from './hero.scss';
import Callout from '../../molecules/callout/callout.jsx'

class Hero extends React.Component {

	render(){
		return(
			<div className={ styles.heroContainer}>
	  		<img className={ styles.heroDesktopImage } src="http://content.sbagov.fearlesstesters.com/sites/default/files/2017-06/Loans_Hero%20%281%29.jpg"/>
	  		<div className={ styles.callout }>
					<Callout title={ this.props.title } message={ this.props.message } buttons={this.props.buttons}/>
	  		</div>
  		</div>
		);
	}
}

export default Hero;
