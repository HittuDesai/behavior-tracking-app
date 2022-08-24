import { useState } from "react";
import Behavior from "./Behavior";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Grid, Typography } from "@mui/material";

function Behaviors({ behaviors }) {
	console.log(behaviors);
	const [behaviorsToBeShown, setBehaviorsToBeShown] = useState(behaviors);
	return (
		<>
			{Object.keys(behaviors).length === 0 ? (
				<Grid
					container
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					gap="1rem"
				>
					<SearchOffIcon fontSize="large" />
					<Typography>No Behaviors Found</Typography>
				</Grid>
			) : (
				<>
					{behaviorsToBeShown.map(behavior => (
						<Behavior
							key={behavior.behaviorID}
							behavior={behavior}
						/>
					))}
				</>
			)}
		</>
	);
}

export default Behaviors;
