"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { cn, genRandomRange } from "@/lib/utils";

interface NumberProps {
	value: string;
	index: number;
	getHeight: () => number;
	className?: string;
	total: number;
	delay?: number;
}

function NumberLabel(props: NumberProps) {
	const { value, index, total, delay, className, getHeight } = props;

	const numberRef = useRef<HTMLDivElement>(null);
	const motionValue = useMotionValue(0);
	const stiffness = 150 - index * 2;
	const springValue = useSpring(motionValue, { stiffness, damping: 15 });

	const isRaw = String(+value) !== value;

	useEffect(() => {
		if (isRaw || !numberRef.current) return;

		const update = () => {
			const height = getHeight();
			springValue.set(-height * +value);
			// Add a delay to prevent the spring from firing too early.
		};

		if (!delay) {
			update();
			return;
		}

		const timer = setTimeout(
			update,
			(total - index) * Math.floor(Math.random() * delay),
		);

		return () => clearTimeout(timer);
	}, [value, isRaw, springValue, getHeight, index, total, delay]);

	if (isRaw) return <span>{value}</span>;

	return (
		<motion.div ref={numberRef} style={{ translateY: springValue }}>
			{Array.from({ length: 10 }, () => genRandomRange(0, 500)).map((val, i) => (
				<motion.div className={className} key={val}>
					{i}
				</motion.div>
			))}
		</motion.div>
	);
}

interface TickerProps {
	value: string;
	className?: string;
	numberClassName?: string;
	delay?: number;
}

export function Ticker(props: TickerProps) {
	const { value, delay, className, numberClassName } = props;
	const parts = String(value).trim().split("");
	const divRef = useRef<HTMLDivElement>(null);
	const getHeight = useCallback(
		() => divRef.current?.getBoundingClientRect().height ?? 0,
		[],
	);

	return (
		<div
			className={cn(
				"relative overflow-hidden whitespace-pre tabular-nums text-foreground",
				className,
			)}
		>
			<div className="absolute inset-0 flex min-w-fit">
				{parts.map((part, index) => (
					<NumberLabel
						key={part}
						value={part}
						delay={delay}
						index={index}
						getHeight={getHeight}
						total={parts.length}
						className={numberClassName}
					/>
				))}
			</div>
			<div ref={divRef} className="invisible min-w-fit">
				{value}
			</div>
		</div>
	);
}
