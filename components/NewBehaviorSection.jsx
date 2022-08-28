import { useContext, useEffect, useReducer, useState } from "react";
import { LoggedInTeacherContext } from "../context/LoggedInTeacherContext";
import { useRouter } from "next/router";

import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { db } from "../firebase";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { StepZeroComponent } from "./StepZeroComponent";
import { StepOneComponent } from "./StepOneComponent";
import { StepTwoComponent } from "./tepTwoComponent";

export const StepZeroActions = {
	SET_SELECTED_CLASS_DATA: "setSelectedClassData",
	SET_SELECTED_STUDENT_DATA: "setSelectedStudentData",
};

export const StepOneActions = {
	SET_SELECTED_BEHAVIOR_TYPE: "setSelectedBehaviorType",
	SET_SELECTED_BEHAVIOR_NAME: "setSelectedBehaviorName",
};

export const StepTwoActions = {
	SET_SELECTED_INTERVENTION_NAME: "setSelectedInterventionName",
	SET_SELECTED_INTERVENTION_TIER: "setSelectedInterventionTier",
	SET_SUCCESS_OF_INTERVENTION: "setSuccessOfIntervention",
};

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

	const stepZeroReducer = (previousStepZeroData, action) => {
		switch (action.type) {
			case StepZeroActions.SET_SELECTED_CLASS_DATA:
				return {
					...previousStepZeroData,
					selectedClass: action.payload.dataOfSelectedClass,
				};
			case StepZeroActions.SET_SELECTED_STUDENT_DATA:
				return {
					...previousStepZeroData,
					selectedStudent: action.payload.dataOfSelectedStudent,
				};
		}
	};
	const [stepZeroData, stepZeroDispatch] = useReducer(stepZeroReducer, {
		selectedClass: {},
		selectedStudent: {},
	});

	const stepOneReducer = (previousStepOneData, action) => {
		switch (action.type) {
			case StepOneActions.SET_SELECTED_BEHAVIOR_TYPE:
				return {
					...previousStepOneData,
					selectedBehaviorType: action.payload.typeOfBehavior,
				};
			case StepOneActions.SET_SELECTED_BEHAVIOR_NAME:
				return {
					...previousStepOneData,
					selectedBehaviorName: action.payload.nameOfBehavior,
				};
		}
	};
	const [stepOneData, stepOneDispatch] = useReducer(stepOneReducer, {
		selectedBehaviorType: "",
		selectedBehaviorName: "",
	});

	const stepTwoReducer = (previousStepTwoData, action) => {
		switch (action.type) {
			case StepTwoActions.SET_SELECTED_INTERVENTION_NAME:
				return {
					...previousStepTwoData,
					selectedInterventionName: action.payload.nameOfIntervention,
				};
			case StepTwoActions.SET_SELECTED_INTERVENTION_TIER:
				return {
					...previousStepTwoData,
					tierOfSelectedIntervention:
						action.payload.tierOfSelectedIntervention,
				};
			case StepTwoActions.SET_SUCCESS_OF_INTERVENTION:
				return {
					...previousStepTwoData,
					wasInterventionSuccess:
						action.payload.wasInterventionSuccessful,
				};
		}
	};
	const [stepTwoData, stepTwoDispatch] = useReducer(stepTwoReducer, {
		selectedInterventionTier: 1,
		selectedInterventionName: "",
		wasInterventionSuccess: true,
	});

	const [disabled, setDisabled] = useState(true);
	useEffect(() => {
		if (currentStep === 0) {
			if (stepZeroData.selectedClass && stepZeroData.selectedStudent)
				setDisabled(false);
			else setDisabled(true);
		} else if (currentStep === 1) {
			if (
				stepOneData.selectedBehaviorType &&
				stepOneData.selectedBehaviorName
			)
				setDisabled(false);
			else setDisabled(true);
		}
		if (currentStep === 2) {
			setDisabled(!stepTwoData.wasInterventionSuccess);
		}
	}, [currentStep, stepZeroData, stepOneData, stepTwoData]);

	const [loading, setLoading] = useState(false);
	const logBehaviorHandler = () => {
		setLoading(true);
		const classID = stepZeroData.selectedClass.classID;
		const teacherID = loggedInTeacherData.teacherID;
		const studentID = stepZeroData.selectedStudent.studentID;
		const behaviorData = {
			classID,
			teacherID,
			studentID,
			behaviorType: stepOneData.selectedBehaviorType,
			behaviorName: stepOneData.selectedBehaviorName,
			interventionTier: stepTwoData.selectedInterventionTier,
			interventionName: stepTwoData.selectedInterventionName,
			interventionSuccess: stepTwoData.wasInterventionSuccess,
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
		<StepZeroComponent
			key="StepZeroComponent"
			stepZeroData={stepZeroData}
			stepZeroDispatch={stepZeroDispatch}
		/>,
		<StepOneComponent
			key="StepOneComponent"
			stepOneData={stepOneData}
			stepOneDispatch={stepOneDispatch}
		/>,
		<StepTwoComponent
			key="StepTwoComponent"
			stepTwoData={stepTwoData}
			stepTwoDispatch={stepTwoDispatch}
		/>,
		<LoggingSuccessComponent key="LoggingSuccessComponent" />,
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
