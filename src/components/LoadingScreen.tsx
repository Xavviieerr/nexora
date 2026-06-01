"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	if (!isVisible) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.logo}>
					<div className={styles.dot} />
					<span className={styles.text}>Nexora</span>
				</div>
				<div className={styles.subtitle}>Visual Query Builder</div>
				<div className={styles.pulsing}>
					<div className={styles.pulse} />
					<div className={styles.pulse} />
					<div className={styles.pulse} />
				</div>
			</div>
		</div>
	);
}
