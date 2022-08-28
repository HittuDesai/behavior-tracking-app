import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { StepTwoActions } from "./NewBehaviorSection";

export function StepTwoComponent({ stepTwoData, stepTwoDispatch }) {
	const { selectedInterventionName, wasInterventionSuccess } = stepTwoData;
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

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<InputLabel>Select Intervention Made</InputLabel>
				<Select
					value={selectedInterventionName}
					onChange={event => {
						const nameOfIntervention = event.target.value;
						stepTwoDispatch({
							type: StepTwoActions.SET_SELECTED_INTERVENTION_NAME,
							payload: { nameOfIntervention },
						});
						let tierOfSelectedIntervention = 1;
						for (const interventionTier in allInterventions) {
							if (
								allInterventions[interventionTier].includes(
									nameOfIntervention
								)
							) {
								tierOfSelectedIntervention = interventionTier;
								break;
							}
						}
						stepTwoDispatch({
							type: StepTwoActions.SET_SELECTED_INTERVENTION_TIER,
							payload: { nameOfIntervention },
						});
					}}
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
				disabled={selectedInterventionName === ""}
				value={wasInterventionSuccess ? "Yes" : "No"}
				onChange={event =>
					stepTwoDispatch({
						type: StepTwoActions.SET_SUCCESS_OF_INTERVENTION,
						payload: {
							wasInterventionSuccessful:
								event.target.value === "Yes" ? true : false,
						},
					})
				}
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
}
