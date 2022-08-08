import {
	Box,
	Button,
	Chip,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export function AdminFormComponent({ formType }) {
	const StudentForm = () => {
		const [allStudents, setAllStudents] = useState([]);
		useEffect(() => {
			const studentsCollection = collection(db, "students");
			getDocs(studentsCollection).then(snapshot => {
				const allStudentsArray = [];
				const allStudentsDocs = snapshot.docs;
				for (const studentDoc of allStudentsDocs) {
					allStudentsArray.push({
						...studentDoc.data(),
						studentID: studentDoc.id,
					});
				}
				setAllStudents(allStudentsArray);
			});
		}, []);

		const [nameOfClass, setNameOfClass] = useState("");
		const [selectedStudentNames, setSelectedStudentNames] = useState([]);
		const handleChange = event => {
			const studentName = event.target.getAttribute("data-value");
			const isStudentAlreadyAdded =
				selectedStudentNames.includes(studentName);
			if (isStudentAlreadyAdded) {
				const arrayOfSelectedStudentNames = [...selectedStudentNames];
				arrayOfSelectedStudentNames.splice(
					selectedStudentNames.indexOf(studentName),
					1
				);
				setSelectedStudentNames(arrayOfSelectedStudentNames);
			} else {
				setSelectedStudentNames(oldValue => [...oldValue, studentName]);
			}
		};

		const [selectedStudentIDs, setSelectedStudentIDs] = useState([]);
		useEffect(() => {
			if (selectedStudentNames.length === 0) return;
			let arrayOfStudentIDs = [];
			for (const studentName of selectedStudentNames) {
				const studentData = allStudents.find(
					student => student.firstName === studentName
				);
				arrayOfStudentIDs.push(studentData.studentID);
			}
			setSelectedStudentIDs(arrayOfStudentIDs);
		}, [selectedStudentNames]);

		return (
			<Grid
				width="100%"
				height="90%"
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
				rowGap="1rem"
			>
				<Box sx={{ width: "100%" }}>
					<InputLabel>Name of Class</InputLabel>
					<TextField
						fullWidth
						placeholder="Enter Name of Class"
						value={nameOfClass}
						onChange={event => setNameOfClass(event.target.value)}
					/>
				</Box>
				<Box sx={{ width: "100%" }}>
					<InputLabel>Name of Class</InputLabel>
					<Select
						multiple
						value={selectedStudentNames}
						renderValue={() => (
							<Box>
								{selectedStudentNames.map(value => (
									<Chip key={value} label={value} />
								))}
							</Box>
						)}
						// onChange={handleChange}
						variant="filled"
						sx={{ width: "100%" }}
					>
						{allStudents.map(student => {
							return (
								<MenuItem
									key={student.studentID}
									value={student.firstName}
									onClick={handleChange}
								>
									{student.firstName}
								</MenuItem>
							);
						})}
					</Select>
				</Box>
				<Button
					fullWidth
					variant="contained"
					color="success"
					onClick={() => {
						if (
							nameOfClass === "" ||
							selectedStudentIDs.length === 0
						)
							return;
						const classesReference = collection(db, "classes");
						addDoc(classesReference, {
							name: nameOfClass,
							students: selectedStudentIDs,
						});
					}}
				>
					Add Class
				</Button>
			</Grid>
		);
	};
	const ClassForm = () => (
		<Grid
			width="100%"
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
		>
			Please click on a button to view the form
		</Grid>
	);

	return <StudentForm />;
}
