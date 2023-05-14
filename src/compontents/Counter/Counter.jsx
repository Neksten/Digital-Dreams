import React from 'react';
import styles from "./Counter.module.scss";
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const Counter = ({handleCountDecrementClick, handleCountIncrementClick, count, hidenull}) => {
	return (
		<div className={styles.cardCounter}>
			<span onClick={handleCountDecrementClick} className={cx(`${styles.decrement}`, {
				hide: hidenull && count === 1,
			})}>-</span>
			<span className={styles.count}>{count}</span>
			<span onClick={handleCountIncrementClick} className={styles.increment}>+</span>
		</div>
	);
};

export default Counter;