import { useContext, useState } from "react";
import { LoggedInTeacherContext } from "../context/LoggedInTeacherContext";
import { StepZeroActions } from "./NewBehaviorSection";

import { Box, InputLabel, MenuItem, Select } from "@mui/material";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export function StepZeroComponent({ stepZeroData, stepZeroDispatch }) {
	const { loggedInTeacherData } = useContext(LoggedInTeacherContext);
	const allClasses = loggedInTeacherData?.classes;

	const { selectedClass, selectedStudent } = stepZeroData;
	const [allStudentsLoaded, setAllStudentsLoaded] = useState(false);
	const [allStudents, setAllStudents] = useState([]);
	const handleClassSelect = async event => {
		setAllStudentsLoaded(false);
		const nameOfSelectedClass = event.target.value;
		const dataOfSelectedClass = allClasses.filter(
			classData => classData.name === nameOfSelectedClass
		)[0];
		stepZeroDispatch({
			type: StepZeroActions.SET_SELECTED_CLASS_DATA,
			payload: { dataOfSelectedClass },
		});

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
	const handleStudentSelect = event => {
		const dataOfSelectedStudent = event.target.value;
		stepZeroDispatch({
			type: StepZeroActions.SET_SELECTED_STUDENT_DATA,
			payload: { dataOfSelectedStudent },
		});
	};

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<InputLabel>Select Class</InputLabel>
				<Select
					onChange={handleClassSelect}
					onOpen={() => setAllStudentsLoaded(false)}
					onClose={() => {
						if (allStudents) setAllStudentsLoaded(true);
					}}
					value={selectedClass.name?.valueOf() || ""}
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
}
