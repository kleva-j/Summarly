import { ContactUs } from "@/layout/contact";
import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { Hero } from "@/layout/hero";
import { FAQ } from "@/layout/faq";

export default function Home() {
	return (
		<div>
			<Header />
			<Hero />
			<FAQ />
			<ContactUs />
			<Footer />
		</div>
	);
}
