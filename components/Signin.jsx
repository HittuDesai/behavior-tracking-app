import React, { useContext, useState } from "react";
import { LoggedInTeacherContext } from "../context/LoggedInTeacherContext";
import { useRouter } from "next/router";
import { Button, Box, Grid, TextField, Typography } from "@mui/material";

import { auth } from "../firebase";
import {
	browserSessionPersistence,
	setPersistence,
	signInWithEmailAndPassword,
} from "firebase/auth";

export function SignIn() {
	const router = useRouter();
	const { updateTeacherData } = useContext(LoggedInTeacherContext);
	// const [signinUsername, setSigninUsername] = useState("");
	const [signinUsernameError, setSigninUsernameError] = useState("");
	// const [signinPassword, setSigninPassword] = useState("");
	const [signinPasswordError, setSigninPasswordError] = useState("");

	const [signinUsername, setSigninUsername] = useState("");
	const [signinPassword, setSigninPassword] = useState("");

	const handleSignIn = event => {
		event.preventDefault();
		if (signinUsername.length === 0) {
			setSigninUsernameError("Username cannot be empty");
			t;
			setSigninPasswordError("");
			return;
		}

		if (signinPassword.length === 0) {
			setSigninUsernameError("");
			setSigninPasswordError("Password cannot be empty");
			return;
		}

		const emailSuffix = "@behaviortrackingapp.com";
		const signinEmail = signinUsername + emailSuffix;

		setPersistence(auth, browserSessionPersistence).then(() =>
			signInWithEmailAndPassword(auth, signinEmail, signinPassword)
				.then(async userCredential => {
					// const loggedInTeacherID = userCredential.user.uid;
					// const loggedInTeacherReference = doc(`teachers/${loggedInTeacherID}`);
					// const loggedInTeacherSnapshot = await getDoc(loggedInTeacherReference);
					// const loggedInTeacherData = loggedInTeacherSnapshot.data();
					// updateTeacherData(loggedInTeacherData);
				})
				.catch(error => {
					const errorCode = error.code;
					if (errorCode === "auth/invalid-email") {
						setSigninUsernameError("This Email is Invalid");
						setSigninPasswordError("");
					} else if (errorCode === "auth/wrong-password") {
						setSigninUsernameError("");
						setSigninPasswordError("This Password is Wrong");
					} else {
						setSigninUsernameError("");
						setSigninPasswordError(
							"There is some error at this time. Please try again later."
						);
					}
				})
		);
	};

	return (
		<form>
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
				sx={{ width: "100%", height: "80vh" }}
			>
				<Box sx={{ width: "100%", padding: "0rem 1rem 1rem 1rem" }}>
					<TextField
						required
						fullWidth
						type="text"
						variant="filled"
						label="Username"
						placeholder="Your Username"
						onChange={event =>
							setSigninUsername(event.target.value)
						}
						autoComplete="none"
						value={signinUsername}
					/>
					{signinUsernameError !== "" && (
						<Typography
							size="xs"
							style={{ fontStyle: "italic" }}
							weight="bolder"
							color="red"
						>
							{signinUsernameError}
						</Typography>
					)}
				</Box>

				<Box sx={{ width: "100%", padding: "0rem 1rem 1rem 1rem" }}>
					<TextField
						required
						fullWidth
						variant="filled"
						label="Password"
						placeholder="Your Password"
						onChange={event =>
							setSigninPassword(event.target.value)
						}
						autoComplete="none"
						value={signinPassword}
					/>
					{signinPasswordError !== "" && (
						<Typography
							size="xs"
							style={{ fontStyle: "italic" }}
							weight="bolder"
							color="red"
						>
							{signinPasswordError}
						</Typography>
					)}
				</Box>

				<Box
					direction="row"
					position="center"
					style={{ width: "100%", padding: "0rem 1rem 0rem 1rem" }}
				>
					<Button
						variant="contained"
						onClick={event => handleSignIn(event)}
						style={{ width: "100%" }}
					>
						Sign In
					</Button>
				</Box>
			</Grid>
		</form>
	);
}
