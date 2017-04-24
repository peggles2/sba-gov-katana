import React from 'react';
import styles from './large-inverse-primary-button.scss';

 const LargeInversePrimaryButton = (props) =>
	<div>
		<button className={ styles.LargeInversePrimaryButton } href="{ props.URL }">{ props.text }</button>
	</div>;

export default LargeInversePrimaryButton;
