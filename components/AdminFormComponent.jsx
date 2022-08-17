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
	console.log(formType);
	const ClassForm = () => {
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

		const handleAddClass = () => {
			if (nameOfClass.trim() === "" || selectedStudentIDs.length === 0)
				return;
			const classesReference = collection(db, "classes");
			const classData = {
				name: nameOfClass,
				students: selectedStudentIDs,
			};
			addDoc(classesReference, classData).catch(error =>
				console.error(error)
			);
		};

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
					<InputLabel>Students of the Class</InputLabel>
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
					onClick={handleAddClass}
				>
					Add Class
				</Button>
			</Grid>
		);
	};

	const StudentForm = () => {
		const [firstName, setFirstName] = useState("");
		const [lastName, setLastName] = useState("");
		const handleAddStudent = () => {
			if (firstName.trim() === "" || lastName.trim() === "") return;
			const firstCharacterOfFirstName = firstName.charAt(0);
			const newFirstName = firstName
				.trim()
				.toLowerCase()
				.replace(
					firstCharacterOfFirstName,
					firstCharacterOfFirstName.toUpperCase()
				);
			const firstCharacterOfLastName = lastName.charAt(0);
			const newLastName = lastName
				.trim()
				.toLowerCase()
				.replace(
					firstCharacterOfLastName,
					firstCharacterOfLastName.toUpperCase()
				);
			const studentsReference = collection(db, "classes");
			const studentData = {
				firstName: newFirstName,
				lastName: newLastName,
			};
			addDoc(studentsReference, studentData).catch(error =>
				console.error(error)
			);
		};
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
					<InputLabel>First Name</InputLabel>
					<TextField
						fullWidth
						placeholder="Enter First Name"
						value={firstName}
						onChange={event => setFirstName(event.target.value)}
					/>
				</Box>
				<Box sx={{ width: "100%" }}>
					<InputLabel>Last Name</InputLabel>
					<TextField
						fullWidth
						placeholder="Enter Last Name"
						value={lastName}
						onChange={event => setLastName(event.target.value)}
					/>
				</Box>
				<Button
					fullWidth
					variant="contained"
					color="success"
					onClick={handleAddStudent}
				>
					Add Student
				</Button>
			</Grid>
		);
	};

	const TeacherForm = () => {
		const [firstName, setFirstName] = useState("");
		const [lastName, setLastName] = useState("");

		const handleAddTeacher = () => {
			if (firstName.trim() === "" || lastName.trim() === "") return;
			const firstCharacterOfFirstName = firstName.charAt(0);
			const newFirstName = firstName
				.trim()
				.toLowerCase()
				.replace(
					firstCharacterOfFirstName,
					firstCharacterOfFirstName.toUpperCase()
				);
			const firstCharacterOfLastName = lastName.charAt(0);
			const newLastName = lastName
				.trim()
				.toLowerCase()
				.replace(
					firstCharacterOfLastName,
					firstCharacterOfLastName.toUpperCase()
				);
			const teacherData = {
				firstName: newFirstName,
				lastName: newLastName,
			};
			// addDoc(studentsReference, studentData).catch(error =>
			// 	console.error(error)
			// );
		};
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
					<InputLabel>First Name</InputLabel>
					<TextField
						fullWidth
						placeholder="Enter First Name"
						value={firstName}
						onChange={event => setFirstName(event.target.value)}
					/>
				</Box>
				<Box sx={{ width: "100%" }}>
					<InputLabel>Last Name</InputLabel>
					<TextField
						fullWidth
						placeholder="Enter Last Name"
						value={lastName}
						onChange={event => setLastName(event.target.value)}
					/>
				</Box>
				<Button
					fullWidth
					variant="contained"
					color="success"
					onClick={handleAddTeacher}
				>
					Add Student
				</Button>
			</Grid>
		);
	};

	const ComponentToReturn = () => {
		if (formType === "class") return <ClassForm />;
		if (formType === "student") return <StudentForm />;
		if (formType === "teacher") return <TeacherForm />;
	};
	return <ComponentToReturn />;
}
