import React from 'react';
import styles from "./Counter.module.scss";

const Counter = ({handleCountDecrementClick, handleCountIncrementClick, count}) => {
	return (
		<div className={styles.cardCounter}>
			<span onClick={handleCountDecrementClick} className={styles.decrement}>-</span>
			<span className={styles.count}>{count}</span>
			<span onClick={handleCountIncrementClick} className={styles.increment}>+</span>
		</div>
	);
};

export default Counter;