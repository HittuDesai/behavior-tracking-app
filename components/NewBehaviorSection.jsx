import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { CheckBox } from '@mui/icons-material';

export function NewBehaviorSection() {
    const router = useRouter();
    const currentUserID = 1;
    const currentTeacherData = {
        firstName: "Hitarth",
        lastName: "Desai",
        preferredName: "HittuDesai",
        classes: ["ECE302", "ECE311", "ECE345", "JRE300", "APS360"],
    };

    const [currentStep, setCurrentStep] = useState(0);
    const stepsToLogNewBehavior = [
        "Student",
        "Behavior",
        "Intervention",
    ];

    const allClasses = currentTeacherData.classes;
    const [selectedClass, setSelectedClass] = useState("");
    const [allStudentsLoaded, setAllStudentsLoaded] = useState(false);
    const [allStudents, setAllStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");

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

    const handleStudentSelect = event => {
        setSelectedStudent(event.target.value);
    }

    const StepZeroComponent = () => (<>
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
            value={selectedStudent}
            onChange={handleStudentSelect}
            variant="filled"
            sx={{ width: "100%" }}
            >{
                allStudents.map(({ studentID, studentName }) => <MenuItem key={studentID} value={studentID}>{studentName}</MenuItem>)
            }</Select>
        </Box>
    </>);

    const allBehaviors = {
        "Academic": [
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
        "Emotional": [
            "Withdrawn",
            "Socially Isolated",
            "Impulsive Behavior",
            "Crying",
            "Pulling Hair",
            "Consistent Fidgeting",
        ],
        "Social": [
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
    }

    const handleBehaviorNameSelect = event => {
        setSelectedBehavior(event.target.value);
    }

    const StepOneComponent = () => (<>
        <Box sx={{ width: "100%" }}>
            <InputLabel>Select Behavior Type</InputLabel>
            <Select
            value={selectedBehaviorType}
            onChange={handleBehaviorTypeSelect}
            variant="filled"
            sx={{ width: "100%" }}
            >{
                Object.keys(allBehaviors).map(behaviorsType => <MenuItem key={behaviorsType} value={behaviorsType}>{behaviorsType}</MenuItem>)
            }</Select>
        </Box>

        <Box sx={{ width: "100%" }}>
            <InputLabel>Select Behavior</InputLabel>
            <Select
            disabled={selectedBehaviorType === ""}
            value={selectedBehavior}
            onChange={handleBehaviorNameSelect}
            variant="filled"
            sx={{ width: "100%" }}
            >{
                allBehaviors[selectedBehaviorType]?.map(behaviorsName => <MenuItem key={behaviorsName} value={behaviorsName}>{behaviorsName}</MenuItem>)
            }</Select>
        </Box>
    </>);

const allInterventions = {
    "1": [
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
    "2": [
        "Time Away from Class",
        "Behavior Reflection Sheet",
        "Dean Referral",
        "Parent Meeting",
        "Special Education",
        "Administration",
        "Parent Contact",
    ],
    "3": [
        "In-School Suspension",
        "Out-of-School Suspension",
    ],
};
const [selectedIntervention, setSelectedIntervention] = useState("");
const [interventionResult, setInterventionResult] = useState(true);

const handleInterventionSelect = event => {
    setSelectedIntervention(event.target.value);
}

const handleInterventionResult = (event) => {
    setInterventionResult(event.target.value === "Yes" ? true : false);
}

const StepTwoComponent = () => (<>
    <Box sx={{ width: "100%" }}>
        <InputLabel>Select Intervention Made</InputLabel>
        <Select
        value={selectedIntervention}
        onChange={handleInterventionSelect}
        variant="filled"
        sx={{ width: "100%" }}
        >{
            Object.values(allInterventions).flat().map(intervention => <MenuItem key={intervention} value={intervention}>{intervention}</MenuItem>)
        }</Select>
    </Box>

    <InputLabel>Was Intervention Successful?</InputLabel>
    <Select
    disabled={selectedIntervention === ""}
    value={interventionResult ? "Yes" : "No"}
    onChange={handleInterventionResult}
    variant="filled"
    sx={{ width: "100%" }}
    >
        <MenuItem key="Yes" value="Yes">Yes</MenuItem>
        <MenuItem key="No" value="No">No</MenuItem>
    </Select>
</>);

    const arrayOfComponents = [<StepZeroComponent />, <StepOneComponent />, <StepTwoComponent />];
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        if(currentStep === 0) {
            if(selectedClass && selectedStudent)
                setDisabled(false);
            else
                setDisabled(true);
        }
        else if(currentStep === 1) {
            if(selectedBehaviorType && selectedBehavior)
                setDisabled(false);
            else
                setDisabled(true);
        }
        if(currentStep === 2) {
            setDisabled(!selectedIntervention);
        }
    }, [currentStep, selectedClass, selectedStudent, selectedBehaviorType, selectedBehavior, selectedIntervention, interventionResult])

    return(
        <Grid container direction="column" alignItems="flex-start" justifyContent="center" rowGap="1rem" padding="1rem" height="80vh">
            {arrayOfComponents[currentStep]}
            <Grid container direction="row" alignItems="center" justifyContent="space-between">
                <Button variant="text" onClick={() => router.push("/")}>
                    Cancel
                    <CancelOutlinedIcon sx={{ marginLeft: "0.5rem" }} />
                </Button>
                <Button
                disabled={disabled}
                variant="contained"
                onClick={() => {
                    if(currentStep === 2) {
                        const dataObject = {selectedClass, selectedStudent, selectedBehaviorType, selectedBehavior, selectedIntervention, interventionResult};
                        console.log(dataObject)
                        return;
                    }
                    setCurrentStep(value => value+1);
                }}>
                    {currentStep === 2 ? "Log Behavior" : "Next"}
                    <ArrowCircleRightOutlinedIcon sx={{ marginLeft: "0.5rem", flexGrow: "1" }} />
                </Button>
            </Grid>
        </Grid>
    );
}