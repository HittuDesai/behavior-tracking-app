import { useContext, useEffect, useState } from "react";
import { LoggedInTeacherContext } from "../context/LoggedInTeacherContext";
import { useRouter } from "next/router";
import { SignIn } from "./Signin";

import {
	Autocomplete,
	Box,
	Button,
	CircularProgress,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export function IndexSection() {
	const { loggedInTeacherData } = useContext(LoggedInTeacherContext);

	const ViewStudentProfileComponent = () => {
		const router = useRouter();

		const [allStudentsLoaded, setAllStudentsLoaded] = useState(false);
		const [allStudents, setAllStudents] = useState([]);
		useEffect(() => {
			const studentsCollection = collection(db, "students");
			getDocs(studentsCollection)
				.then(allStudentsSnapshot => {
					const arrayOfStudentDocRefs = allStudentsSnapshot.docs;
					let tempStudentDataArray = [];
					arrayOfStudentDocRefs.forEach(studentDoc => {
						const studentID = studentDoc.id;
						const studentData = studentDoc.data();
						tempStudentDataArray.push({
							...studentData,
							studentID,
						});
					});
					setAllStudents(tempStudentDataArray);
					setAllStudentsLoaded(true);
				})
				.catch(error => console.log(error));
		}, []);

		const [selectedStudentData, setSelectedStudentData] = useState(null);
		const handleStudentSelect = (event, newValue) => {
			setSelectedStudentData(newValue);
		};

		return (
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
				rowGap="1rem"
				padding="1rem"
				height="80vh"
			>
				{allStudentsLoaded ? (
					<Box sx={{ width: "100%" }}>
						<InputLabel>Select Student</InputLabel>
						<Autocomplete
							options={allStudents}
							getOptionLabel={option =>
								option.firstName + " " + option.lastName
							}
							renderInput={params => <TextField {...params} />}
							onChange={handleStudentSelect}
						/>
					</Box>
				) : (
					<>
						<CircularProgress />
						<Typography>Fetching all Student Data</Typography>
					</>
				)}
				<Grid
					container
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Button
						fullWidth={!allStudentsLoaded}
						variant={allStudentsLoaded ? "text" : "contained"}
						onClick={() => setIndexSectionStatus("default")}
					>
						Cancel
						<CancelOutlinedIcon sx={{ marginLeft: "0.5rem" }} />
					</Button>
					{allStudentsLoaded && (
						<Button
							disabled={!selectedStudentData}
							variant="contained"
							onClick={() => {
								router.push(
									`/${selectedStudentData.studentID}`
								);
							}}
						>
							See Record
							<ArrowCircleRightOutlinedIcon
								sx={{ marginLeft: "0.5rem", flexGrow: "1" }}
							/>
						</Button>
					)}
				</Grid>
			</Grid>
		);
	};

	const GreetingAndActionComponent = () => {
		const router = useRouter();
		var greetingName = "";
		const firstName = loggedInTeacherData?.firstName;
		const lastName = loggedInTeacherData?.lastName;
		const preferredName = loggedInTeacherData?.preferredName;
		if (preferredName) greetingName = preferredName;
		else greetingName = firstName + " " + lastName;

		return (
			<Grid
				container
				direction="row"
				alignItems="center"
				justifyContent="center"
				rowGap="1rem"
				padding="1rem"
			>
				<Grid
					container
					direction="row"
					alignItems="center"
					justifyContent="flex-start"
				>
					<Typography
						component="div"
						variant="overline"
						fontSize="large"
					>
						Hello, {greetingName}
					</Typography>
					<Typography
						component="div"
						variant="caption"
						fontSize="small"
					>
						What would you like to do today?
					</Typography>
				</Grid>
				<Button
					fullWidth
					variant="outlined"
					onClick={() =>
						setIndexSectionStatus(<ViewStudentProfileComponent />)
					}
				>
					View Student Profile
				</Button>
				<Button
					fullWidth
					variant="contained"
					onClick={() => router.push("/logNewBehavior")}
				>
					Log New Behavior
				</Button>
			</Grid>
		);
	};

	const [indexSectionStatus, setIndexSectionStatus] = useState("default");

	return (
		<>
			{loggedInTeacherData ? (
				<>
					{indexSectionStatus === "default" ? (
						<GreetingAndActionComponent />
					) : (
						<ViewStudentProfileComponent />
					)}
				</>
			) : (
				<SignIn />
			)}
		</>
	);
}
