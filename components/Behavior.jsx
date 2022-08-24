import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Behavior({ behavior }) {
	return (
		<Accordion sx={{ width: "100%" }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				{behavior.behaviorName}
			</AccordionSummary>
			<AccordionDetails>
				<Grid container flexDirection="column" gap="0.5rem">
					<Typography>
						Name: <strong>{behavior.behaviorName}</strong>
					</Typography>
					<Typography>
						Type: <strong>{behavior.behaviorType}</strong>
					</Typography>
					<Typography>
						Intervention:{" "}
						<strong>{behavior.interventionName}</strong>
					</Typography>
					<Typography>
						Behavior Stopped after Intervention:{" "}
						<strong>
							{behavior.interventionSuccess ? "Yes" : "No"}
						</strong>
					</Typography>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
}

export default Behavior;
