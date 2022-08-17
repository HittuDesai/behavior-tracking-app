import Head from "next/head";
import { AdminSection } from "../components/AdminSection";

export default function IndexPage() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
			</Head>
			<AdminSection />
		</>
	);
}