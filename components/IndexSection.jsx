import { useContext, useEffect, useState } from 'react';
import { LoggedInTeacherContext } from '../context/LoggedInTeacherContext';
import { useRouter } from 'next/router';
import { SignIn } from './Signin';

import { Box, Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function IndexSection() {
    const { loggedInTeacherData } = useContext(LoggedInTeacherContext);

    const ViewStudentProfileComponent = () => {
        const router = useRouter();
        const allClasses = loggedInTeacherData?.classes;
        const [selectedClass, setSelectedClass] = useState(null);

        const [allStudentsLoaded, setAllStudentsLoaded] = useState(false);
        const [allStudents, setAllStudents] = useState([]);
        const handleClassSelect = async event => {
            setAllStudentsLoaded(false);
            const dataOfSelectedClass = event.target.value;
            setSelectedClass(dataOfSelectedClass);

            let arrayOfStudentData = [];
            const arrayOfStudentIDs = dataOfSelectedClass.students;
            for(const studentID of arrayOfStudentIDs) {
                const studentReference = doc(db, `students/${studentID}`);
                const studentSnapshot = await getDoc(studentReference);
                const studentData = studentSnapshot.data();
                arrayOfStudentData.push({ ...studentData, studentID });
            }
            setAllStudents(arrayOfStudentData);
            setAllStudentsLoaded(true);
        }

        const [selectedStudent, setSelectedStudent] = useState("");
        const handleStudentSelect = event => {
            const dataOfSelectedStudent = event.target.value;
            console.log(dataOfSelectedStudent);
            setSelectedStudent(dataOfSelectedStudent);
        }

        return(
            <Grid container direction="column" alignItems="flex-start" justifyContent="center" rowGap="1rem" padding="1rem" height="80vh">
                <Box sx={{ width: "100%" }}>
                    <InputLabel>Select Class</InputLabel>
                    <Select
                    onChange={handleClassSelect}
                    onOpen={() => setAllStudentsLoaded(false)}
                    onClose={() => {
                        if(allStudents)
                            setAllStudentsLoaded(true);
                    }}
                    variant="filled"
                    sx={{ width: "100%" }}
                    >{
                        allClasses.map(currentClass => <MenuItem key={currentClass.classID} value={currentClass}>{currentClass.name}</MenuItem>)
                    }</Select>
                </Box>

                <Box sx={{ width: "100%" }}>
                    <InputLabel>Select Student</InputLabel>
                    <Select
                    disabled={!allStudentsLoaded}
                    value={selectedStudent}
                    onChange={handleStudentSelect}
                    variant="filled"
                    sx={{ width: "100%" }}
                    >{
                        allStudents.map(studentData => <MenuItem key={studentData.studentID} value={studentData}>{studentData.firstName}</MenuItem>)
                    }</Select>
                </Box>

                <Grid container direction="row" alignItems="center" justifyContent="space-between">
                    <Button variant="text" onClick={() => setIndexSectionStatus("default")}>
                        Cancel
                        <CancelOutlinedIcon sx={{ marginLeft: "0.5rem" }} />
                    </Button>
                    <Button disabled={!(selectedClass && selectedStudent)} variant="contained" onClick={() => {
                        router.push(`/${selectedStudent.studentID}`);
                    }}>
                        See Record
                        <ArrowCircleRightOutlinedIcon sx={{ marginLeft: "0.5rem", flexGrow: "1" }} />
                    </Button>
                </Grid>
            </Grid>
        );
    }
    
    const GreetingAndActionComponent = () => {
        const router = useRouter();
        var greetingName = "";
        const firstName = loggedInTeacherData?.firstName;
        const lastName = loggedInTeacherData?.lastName;
        const preferredName = loggedInTeacherData?.preferredName;
        if(preferredName)
            greetingName = preferredName
        else
            greetingName = firstName + " " + lastName;

        return(
            <Grid container direction="row" alignItems="center" justifyContent="center" rowGap="1rem" padding="1rem">
                <Grid container direction="row" alignItems="center" justifyContent="flex-start">
                    <Typography component="div" variant='overline' fontSize="large">Hello, {greetingName}</Typography>
                    <Typography component="div" variant='caption' fontSize="small">What would you like to do today?</Typography>
                </Grid>
                <Button fullWidth variant='outlined' onClick={() => setIndexSectionStatus(<ViewStudentProfileComponent />)}>View Student Profile</Button>
                <Button fullWidth variant='contained' onClick={() => router.push("/logNewBehavior")}>Log New Behavior</Button>
            </Grid>
        );
    }

    const [indexSectionStatus, setIndexSectionStatus] = useState("default");

    return(
        <>{loggedInTeacherData ? 
            <>{indexSectionStatus === "default" ? <GreetingAndActionComponent /> : <ViewStudentProfileComponent />}</> : 
            <SignIn />
        }</>
    );
}