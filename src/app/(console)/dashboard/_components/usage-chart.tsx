"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { dataPoints } from "@/lib/constants";

export function UsageOverview() {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={dataPoints}>
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `$${value}`}
				/>
				<Bar
					dataKey="total"
					fill="currentColor"
					radius={[4, 4, 0, 0]}
					className="fill-primary"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
