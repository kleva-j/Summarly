import { ContactUs } from "@/layout/contact";
import { Features } from "@/layout/features";
import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { Hero } from "@/layout/hero";
import { FAQ } from "@/layout/faq";

export default function Home() {
	return (
		<div>
			<Header />
			<Hero />
			<Features />
			<FAQ />
			<ContactUs />
			<Footer />
		</div>
	);
}
