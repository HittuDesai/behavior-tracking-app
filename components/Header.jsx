import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { LoggedInTeacherContext } from "../context/LoggedInTeacherContext";

import {
	AppBar,
	Avatar,
	Box,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LogoutIcon from "@mui/icons-material/Logout";

import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export function Header() {
	const router = useRouter();
	const { loggedInTeacherData, updateTeacherData } = useContext(
		LoggedInTeacherContext
	);

	useEffect(() => {
		onAuthStateChanged(auth, async userCredential => {
			if (!userCredential) {
				updateTeacherData(null);
				return;
			}
			const loggedInTeacherID = userCredential.uid;
			const loggedInTeacherReference = doc(
				db,
				`teachers/${loggedInTeacherID}`
			);
			const loggedInTeacherSnapshot = await getDoc(
				loggedInTeacherReference
			);
			let loggedInTeacherData = loggedInTeacherSnapshot.data();
			const arrayOfClassIDs = loggedInTeacherData.classes;
			let arrayOfClassData = [];
			for (const classID of arrayOfClassIDs) {
				const classReference = doc(db, `classes/${classID}`);
				getDoc(classReference)
					.then(classSnapshot => {
						const classID = classSnapshot.id;
						const classData = classSnapshot.data();
						arrayOfClassData.push({ ...classData, classID });
					})
					.catch(error => console.log(error));
			}
			loggedInTeacherData.classes = arrayOfClassData;
			updateTeacherData(loggedInTeacherData);
		});
	}, []);

	const HeaderWithoutSession = () => (
		<AppBar position="static" sx={{ marginBottom: "1rem" }}>
			<Grid
				container
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				padding="1rem"
			>
				<PsychologyIcon fontSize="large" />
				<Typography variant="overline" fontSize="large">
					Behavior Tracking App
				</Typography>
			</Grid>
		</AppBar>
	);

	const handleSignOut = () => {
		signOut(auth).then(() => {
			router.push("/");
		});
		console.log("Signed Out");
	};

	const WithSessionRight = () => (
		<Box>
			<Grid
				container
				direction="row"
				alignItems="center"
				justifyContent="center"
			>
				<IconButton
					onClick={() => {
						// router.push(`/${currentUsername}/profile`);
						console.log("Redirecting You To Profile");
					}}
				>
					<Avatar />
				</IconButton>
				<IconButton onClick={handleSignOut}>
					<LogoutIcon fontSize="large" />
				</IconButton>
			</Grid>
		</Box>
	);

	const HeaderWithSession = () => (
		<AppBar position="static" sx={{ marginBottom: "1rem" }}>
			<Grid
				container
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				padding="1rem"
			>
				<PsychologyIcon fontSize="large" />
				<WithSessionRight />
			</Grid>
		</AppBar>
	);

	if (router.asPath.endsWith("admin")) return <HeaderWithoutSession />;

	return (
		<>
			{loggedInTeacherData ? (
				<HeaderWithSession />
			) : (
				<HeaderWithoutSession />
			)}
		</>
	);
}
