import Head from "next/head";
import { NewBehaviorSection } from "../components/NewBehaviorSection";

export default function NewBehaviorPage() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
			</Head>
			<NewBehaviorSection />
		</>
	);
}
