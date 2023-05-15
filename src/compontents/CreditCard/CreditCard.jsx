import React, {useState} from 'react';
import styles from './CreditCard.module.scss'
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const CreditCard = ({ number, name , expiry, cvv, flipped }) => {
	// Приводим дату истечения срока действия к нужному формату
	const formattedExpiry = expiry.replace(/(\d{2})(\d{2})/, '$1/$2');
	
	return (
		<div className={cx(`${styles.card}`, {
			flipped: flipped,
		})}>
			<div className={styles.cardBackground}></div>
			<div className={styles.cardContent}>
				<div className={styles.cardFront}>
					<div className={styles.cardNumber}>{number}</div>
					<div className={styles.cardBottom}>
						<div className={styles.cardName}>
							<span>Card Holder</span>
							<span>{name ? name.toUpperCase() : 'FULL NAME'}</span>
						</div>
						<div className={styles.cardExpiry}>
							<span>Expires</span>
							<span>{formattedExpiry}</span>
						</div>
					</div>
				</div>
				<div className={styles.cardBack}>
					<div className={styles.cardStripe}></div>
					<div className={styles.cardCvv}>{cvv}</div>
				</div>
			</div>
		</div>
	);
};

export default CreditCard;