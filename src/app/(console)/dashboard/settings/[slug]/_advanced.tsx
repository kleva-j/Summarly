"use client";


import { CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/typography";
import { Languages } from "@/lib/constants";
import { useState } from "react";

import {
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectValue,
	SelectGroup,
	SelectItem,
	Select,
} from "@/components/ui/select";

export const Advanced = () => {
	const [value, setValue] = useState(Languages[0].value);

	return (
		<div>
			<div className="space-y-0.5">
				<CardTitle className="text-lg">Advanced</CardTitle>
				<CardDescription>Configure your account</CardDescription>
			</div>

			<Separator className="mt-2.5" />

			<div className="space-y-2 my-2 py-2">
				<div className="flex items-center gap-3">
					<div className="flex flex-col">
						<Text
							as="p"
							className="text-base font-medium tracking-tight text-zinc-700 dark:text-zinc-400"
						>
							Language
						</Text>
						<Text className="text-muted-foreground text-xs !m-0" as="span">
							Select your default language
						</Text>
					</div>

					<Select value={value} onValueChange={setValue}>
						<SelectTrigger className="w-[135px] mx-auto focus:ring-1 focus:ring-offset-1">
							<div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4 py-1 px-1">
								<SelectValue placeholder="Select Language" />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Languages</SelectLabel>
								{Languages.map((language) => (
									<SelectItem key={language.value} value={language.value}>
										<div className="flex items-center gap-2">
											{language.label}
										</div>
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};
