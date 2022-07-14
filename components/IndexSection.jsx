import { useState } from 'react';
import { useRouter } from 'next/router';
import { SignIn } from './Signin';

import { Box, Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export function IndexSection() {
    const currentUserID = 1;
    const currentTeacherData = {
        firstName: "Hitarth",
        lastName: "Desai",
        preferredName: "HittuDesai",
        classes: ["ECE302", "ECE311", "ECE345", "JRE300", "APS360"],
    }

    const ViewStudentProfileComponent = () => {
        const router = useRouter();
        const allClasses = currentTeacherData.classes;
        const [selectedClass, setSelectedClass] = useState("");

        const [allStudentsLoaded, setAllStudentsLoaded] = useState(false);
        const [allStudents, setAllStudents] = useState([]);
        const handleClassSelect = event => {
            setAllStudentsLoaded(false);
            const nameOfSelectedClass = event.target.value;
            setSelectedClass(nameOfSelectedClass);
            /* Fetch Data from Firbase regarding names of all students in selected class */
            setAllStudents([
                {studentID: "1", studentName: "Jack Reacher"},
                {studentID: "2", studentName: "Ethan Hunt"},
                {studentID: "3", studentName: "Pete Mitchell"},
            ]);
            setAllStudentsLoaded(true);
        }

        const [selectedStudent, setSelectedStudent] = useState("");
        const handleStudentSelect = event => {
            setSelectedStudent(event.target.value);
        }

        return(
            <Grid container direction="column" alignItems="flex-start" justifyContent="center" rowGap="1rem" padding="1rem" height="80vh">
                <Box sx={{ width: "100%" }}>
                    <InputLabel>Select Class</InputLabel>
                    <Select
                    value={selectedClass}
                    onChange={handleClassSelect}
                    onOpen={() => setAllStudentsLoaded(false)}
                    onClose={() => {
                        if(allStudents)
                            setAllStudentsLoaded(true);
                    }}
                    variant="filled"
                    sx={{ width: "100%" }}
                    >{
                        allClasses.map(className => <MenuItem key={className} value={className}>{className}</MenuItem>)
                    }</Select>
                </Box>

                <Box sx={{ width: "100%" }}>
                    <InputLabel>Select Student</InputLabel>
                    <Select
                    disabled={!allStudentsLoaded}
                    // defaultOpen={allStudentsLoaded}
                    value={selectedStudent}
                    onChange={handleStudentSelect}
                    variant="filled"
                    sx={{ width: "100%" }}
                    >{
                        allStudents.map(studentData => <MenuItem key={studentData.studentID} value={studentData.studentID}>{studentData.studentName}</MenuItem>)
                    }</Select>
                </Box>

                <Grid container direction="row" alignItems="center" justifyContent="space-between">
                    <Button variant="text" onClick={() => setIndexSectionComponent(<GreetingAndActionComponent />)}>
                        Cancel
                        <CancelOutlinedIcon sx={{ marginLeft: "0.5rem" }} />
                    </Button>
                    <Button disabled={!(selectedClass && selectedStudent)} variant="contained" onClick={() => {
                        router.push(`/${selectedStudent}`);
                    }}>
                        See Record
                        <ArrowCircleRightOutlinedIcon sx={{ marginLeft: "0.5rem", flexGrow: "1" }} />
                    </Button>
                </Grid>
            </Grid>
        );
    }
    
    const LogNewBehaviorComponent = () => {

        return(<>BRUH 2</>);
    }

    const GreetingAndActionComponent = () => {
        var greetingName = "";
        const firstName = currentTeacherData.firstName;
        const lastName = currentTeacherData.lastName;
        const preferredName = currentTeacherData.preferredName;
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
                <Button fullWidth variant='outlined' onClick={() => setIndexSectionComponent(<ViewStudentProfileComponent />)}>View Student Profile</Button>
                <Button fullWidth variant='contained' onClick={() => setIndexSectionComponent(<LogNewBehaviorComponent />)}>Log New Behavior</Button>
            </Grid>
        );
    }
    const [indexSectionComponent, setIndexSectionComponent] = useState(<GreetingAndActionComponent />)

    return(
        <>{currentUserID ? <>{indexSectionComponent}</> : <SignIn />}</>
    );
}