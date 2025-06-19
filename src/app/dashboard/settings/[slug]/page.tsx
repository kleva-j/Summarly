import dynamic from "next/dynamic";

const components = {
	appearance: dynamic(async () => (await import("./_appearance")).Appearance),
	advanced: dynamic(async () => (await import("./_advanced")).Advanced),
};

interface SettingsPageProps {
	params: Promise<{ slug: keyof typeof components }>;
}

export default async function SettingsPage({ params }: SettingsPageProps) {
	const { slug } = await params;

	const Component = components[slug];

	return (
		<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
			<Component />
		</div>
	);
}
