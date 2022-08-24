import { useContext, useEffect, useState } from "react";
import { LoggedInTeacherContext } from "../context/LoggedInTeacherContext";
import { useRouter } from "next/router";

import {
	Box,
	Button,
	CircularProgress,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { db } from "../firebase";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDoc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";

export function NewBehaviorSection() {
	const { loggedInTeacherData } = useContext(LoggedInTeacherContext);
	const router = useRouter();
	useEffect(() => {
		if (!loggedInTeacherData) {
			router.push("/");
			return;
		}
	}, []);

	const [currentStep, setCurrentStep] = useState(0);

	const allClasses = loggedInTeacherData?.classes;
	const [selectedClass, setSelectedClass] = useState(null);
	const [selectedClassName, setSelectedClassName] = useState("");

	const [allStudentsLoaded, setAllStudentsLoaded] = useState(false);
	const [allStudents, setAllStudents] = useState([]);
	const handleClassSelect = async event => {
		setAllStudentsLoaded(false);
		const nameOfSelectedClass = event.target.value;
		setSelectedClassName(nameOfSelectedClass);
		const dataOfSelectedClass = allClasses.filter(
			classData => classData.name === nameOfSelectedClass
		)[0];
		setSelectedClass(dataOfSelectedClass);

		let arrayOfStudentData = [];
		const arrayOfStudentIDs = dataOfSelectedClass.students;
		for (const studentID of arrayOfStudentIDs) {
			const studentReference = doc(db, `students/${studentID}`);
			const studentSnapshot = await getDoc(studentReference);
			const studentData = studentSnapshot.data();
			arrayOfStudentData.push({ ...studentData, studentID });
		}
		setAllStudents(arrayOfStudentData);
		setAllStudentsLoaded(true);
	};

	const [selectedStudent, setSelectedStudent] = useState("");
	const handleStudentSelect = event => {
		const dataOfSelectedStudent = event.target.value;
		setSelectedStudent(dataOfSelectedStudent);
	};

	const StepZeroComponent = () => (
		<>
			<Box sx={{ width: "100%" }}>
				<InputLabel>Select Class</InputLabel>
				<Select
					onChange={handleClassSelect}
					onOpen={() => setAllStudentsLoaded(false)}
					onClose={() => {
						if (allStudents) setAllStudentsLoaded(true);
					}}
					value={selectedClassName.valueOf()}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{allClasses?.map(currentClass => (
						<MenuItem
							key={currentClass.classID}
							value={currentClass.name}
						>
							{currentClass.name}
						</MenuItem>
					))}
				</Select>
			</Box>

			<Box sx={{ width: "100%" }}>
				<InputLabel>Select Student</InputLabel>
				<Select
					disabled={!allStudentsLoaded}
					value={selectedStudent}
					onChange={handleStudentSelect}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{allStudents.map(studentData => (
						<MenuItem
							key={studentData.studentID}
							value={studentData}
						>
							{studentData.firstName}
						</MenuItem>
					))}
				</Select>
			</Box>
		</>
	);

	const allBehaviors = {
		Academic: [
			"Out of Seat",
			"Appearing to do nothing",
			"Working on unrelated material",
			"Looking around the room",
			"Earbuds In",
			"Inappropriate Phone Use",
			"Head Down",
			"Sleeping",
			"Unprepared for Class (Chromebook not charged)",
		],
		Emotional: [
			"Withdrawn",
			"Socially Isolated",
			"Impulsive Behavior",
			"Crying",
			"Pulling Hair",
			"Consistent Fidgeting",
		],
		Social: [
			"Talking Out",
			"Talking Back to Staff",
			"Negative Comments",
			"Using Profanity",
			"Name Calling",
			"Yelling/Raising Voice",
			"Verbal Threats",
			"Inappropriate Symbolism",
			"Talking to Peers",
			"Cooperation with Others",
		],
	};
	const [selectedBehaviorType, setSelectedBehaviorType] = useState("");
	const [selectedBehavior, setSelectedBehavior] = useState("");

	const handleBehaviorTypeSelect = event => {
		setSelectedBehaviorType(event.target.value);
	};

	const handleBehaviorNameSelect = event => {
		setSelectedBehavior(event.target.value);
	};

	const StepOneComponent = () => (
		<>
			<Box sx={{ width: "100%" }}>
				<InputLabel>Select Behavior Type</InputLabel>
				<Select
					value={selectedBehaviorType}
					onChange={handleBehaviorTypeSelect}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{Object.keys(allBehaviors).map(behaviorsType => (
						<MenuItem key={behaviorsType} value={behaviorsType}>
							{behaviorsType}
						</MenuItem>
					))}
				</Select>
			</Box>

			<Box sx={{ width: "100%" }}>
				<InputLabel>Select Behavior</InputLabel>
				<Select
					disabled={selectedBehaviorType === ""}
					value={selectedBehavior}
					onChange={handleBehaviorNameSelect}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{allBehaviors[selectedBehaviorType]?.map(behaviorsName => (
						<MenuItem key={behaviorsName} value={behaviorsName}>
							{behaviorsName}
						</MenuItem>
					))}
				</Select>
			</Box>
		</>
	);

	const allInterventions = {
		1: [
			"Verbal Prompt/Redirection",
			"Nonverbal Prompt",
			"Directive Statement",
			"Refer to Student by Name",
			"Student-Teacher Conference",
			"Time and Space",
			"Request Student Break",
			"Offer Choices",
			"Phone Collected",
			"Change Environment",
		],
		2: [
			"Time Away from Class",
			"Behavior Reflection Sheet",
			"Dean Referral",
			"Parent Meeting",
			"Special Education",
			"Administration",
			"Parent Contact",
		],
		3: ["In-School Suspension", "Out-of-School Suspension"],
	};
	const [selectedIntervention, setSelectedIntervention] = useState("");
	const [interventionResult, setInterventionResult] = useState(true);

	const handleInterventionSelect = event => {
		setSelectedIntervention(event.target.value);
	};

	const handleInterventionResult = event => {
		setInterventionResult(event.target.value === "Yes" ? true : false);
	};

	const StepTwoComponent = () => (
		<>
			<Box sx={{ width: "100%" }}>
				<InputLabel>Select Intervention Made</InputLabel>
				<Select
					value={selectedIntervention}
					onChange={handleInterventionSelect}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{Object.values(allInterventions)
						.flat()
						.map(intervention => (
							<MenuItem key={intervention} value={intervention}>
								{intervention}
							</MenuItem>
						))}
				</Select>
			</Box>

			<InputLabel>Was Intervention Successful?</InputLabel>
			<Select
				disabled={selectedIntervention === ""}
				value={interventionResult ? "Yes" : "No"}
				onChange={handleInterventionResult}
				variant="filled"
				sx={{ width: "100%" }}
			>
				<MenuItem key="Yes" value="Yes">
					Yes
				</MenuItem>
				<MenuItem key="No" value="No">
					No
				</MenuItem>
			</Select>
		</>
	);

	const [disabled, setDisabled] = useState(true);
	useEffect(() => {
		if (currentStep === 0) {
			if (selectedClass && selectedStudent) setDisabled(false);
			else setDisabled(true);
		} else if (currentStep === 1) {
			if (selectedBehaviorType && selectedBehavior) setDisabled(false);
			else setDisabled(true);
		}
		if (currentStep === 2) {
			setDisabled(!selectedIntervention);
		}
	}, [
		currentStep,
		selectedClass,
		selectedStudent,
		selectedBehaviorType,
		selectedBehavior,
		selectedIntervention,
		interventionResult,
	]);

	const [loading, setLoading] = useState(false);
	const logBehaviorHandler = () => {
		setLoading(true);
		const classID = selectedClass.classID;
		const teacherID = loggedInTeacherData.teacherID;
		const studentID = selectedStudent.studentID;
		const behaviorData = {
			classID,
			teacherID,
			studentID,
			behaviorType: selectedBehaviorType,
			behaviorName: selectedBehavior,
			interventionName: selectedIntervention,
			interventionSuccess: interventionResult,
			time: serverTimestamp(),
		};
		const behaviorsCollection = collection(db, "behaviors");
		addDoc(behaviorsCollection, behaviorData)
			.then(behaviorSnapshot => {
				const behaviorID = behaviorSnapshot.id;
				const classDocRef = doc(db, `classes/${classID}`);
				updateDoc(classDocRef, {
					behaviors: arrayUnion(behaviorID),
				});
				const teacherDocRef = doc(db, `teachers/${teacherID}`);
				updateDoc(teacherDocRef, {
					behaviors: arrayUnion(behaviorID),
				});
				const studentDocRef = doc(db, `students/${studentID}`);
				updateDoc(studentDocRef, {
					behaviors: arrayUnion(behaviorID),
				});
			})
			.then(() => {
				setLoading(false);
			});
	};

	const LoggingSuccessComponent = () => {
		return (
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
				gap="1rem"
			>
				{loading ? (
					<>
						<CircularProgress />
						<Typography>Uploading the Behavior</Typography>
					</>
				) : (
					<>
						<CheckCircleIcon
							fontSize="large"
							sx={{ color: "green" }}
						/>
						<Typography>Behavior Uploaded Successfully</Typography>
						<Button
							fullWidth
							variant="text"
							onClick={() => router.push("/")}
						>
							Go Home
						</Button>
					</>
				)}
			</Grid>
		);
	};

	const arrayOfComponents = [
		<StepZeroComponent />,
		<StepOneComponent />,
		<StepTwoComponent />,
		<LoggingSuccessComponent />,
	];

	return (
		<Grid
			container
			direction="column"
			alignItems="flex-start"
			justifyContent="center"
			rowGap="1rem"
			padding="1rem"
			height="80vh"
		>
			{arrayOfComponents[currentStep]}
			{currentStep !== 3 && (
				<Grid
					container
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Button variant="text" onClick={() => router.push("/")}>
						Cancel
						<CancelOutlinedIcon sx={{ marginLeft: "0.5rem" }} />
					</Button>
					<Button
						disabled={disabled}
						variant="contained"
						onClick={() => {
							if (currentStep === 2) {
								logBehaviorHandler();
							}
							setCurrentStep(value => value + 1);
						}}
					>
						{currentStep === 2 ? "Log Behavior" : "Next"}
						<ArrowCircleRightOutlinedIcon
							sx={{ marginLeft: "0.5rem", flexGrow: "1" }}
						/>
					</Button>
				</Grid>
			)}
		</Grid>
	);
}
