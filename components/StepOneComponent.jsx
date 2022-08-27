import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { StepOneActions } from "./NewBehaviorSection";

export function StepOneComponent({ stepOneData, stepOneDispatch }) {
	const { selectedBehaviorType, selectedBehaviorName } = stepOneData;
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

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<InputLabel>Select Behavior Type</InputLabel>
				<Select
					value={selectedBehaviorType}
					onChange={event =>
						stepOneDispatch({
							type: StepOneActions.SET_SELECTED_BEHAVIOR_TYPE,
							payload: {
								typeOfBehavior: event.target.value,
							},
						})
					}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{Object.keys(allBehaviors).map(behaviorType => (
						<MenuItem key={behaviorType} value={behaviorType}>
							{behaviorType}
						</MenuItem>
					))}
					<MenuItem key="Other" value="Other">
						Other (Enter Description Below)
					</MenuItem>
				</Select>
			</Box>
			{selectedBehaviorType === "Other" ? (
				<Box sx={{ width: "100%" }}>
					<InputLabel>Specify Behavior Description</InputLabel>
					<TextField
						disabled={selectedBehaviorType === ""}
						value={selectedBehaviorName}
						onChange={event =>
							stepOneDispatch({
								type: StepOneActions.SET_SELECTED_BEHAVIOR_NAME,
								payload: {
									nameOfBehavior: event.target.value,
								},
							})
						}
						variant="filled"
						sx={{ width: "100%" }}
					/>
				</Box>
			) : (
				<Box sx={{ width: "100%" }}>
					<InputLabel>Select Behavior</InputLabel>
					<Select
						disabled={selectedBehaviorType === ""}
						value={selectedBehaviorName}
						onChange={event =>
							stepOneDispatch({
								type: StepOneActions.SET_SELECTED_BEHAVIOR_NAME,
								payload: {
									nameOfBehavior: event.target.value,
								},
							})
						}
						variant="filled"
						sx={{ width: "100%" }}
					>
						{allBehaviors[selectedBehaviorType]?.map(
							behaviorsName => (
								<MenuItem
									key={behaviorsName}
									value={behaviorsName}
								>
									{behaviorsName}
								</MenuItem>
							)
						)}
					</Select>
				</Box>
			)}
		</>
	);
}
