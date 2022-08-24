import Behavior from "./Behavior";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import Behaviors from "./Behaviors";

export function StudentProfile({ studentData }) {
	const behaviors = studentData.behaviors;
	return (
		<Grid
			container
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			sx={{ width: "100%" }}
			gap="1rem"
			padding="1rem"
			paddingTop={0}
		>
			<Paper elevation={24} sx={{ width: "100%" }}>
				<Grid
					item
					container
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					sx={{ width: "100%" }}
					gap="1rem"
					padding="1rem"
				>
					<Grid
						item
						container
						flexDirection="row"
						alignItems="center"
						justifyContent="flex-start"
					>
						<Typography
							variant="caption"
							sx={{ marginRight: "0.5rem", lineHeight: "1rem" }}
							fontSize="large"
						>
							First Name:
						</Typography>
						<Typography
							variant="overline"
							fontSize="large"
							sx={{ lineHeight: "1rem" }}
						>
							{studentData.firstName}
						</Typography>
					</Grid>
					<Grid
						item
						container
						flexDirection="row"
						alignItems="center"
						justifyContent="flex-start"
					>
						<Typography
							variant="caption"
							sx={{ marginRight: "0.5rem", lineHeight: "1rem" }}
							fontSize="large"
						>
							Last Name:
						</Typography>
						<Typography
							variant="overline"
							fontSize="large"
							sx={{ lineHeight: "1rem" }}
						>
							{studentData.lastName}
						</Typography>
					</Grid>
					<Grid
						item
						container
						flexDirection="row"
						alignItems="center"
						justifyContent="flex-start"
					>
						<Typography
							variant="caption"
							sx={{ marginRight: "0.5rem", lineHeight: "1rem" }}
							fontSize="large"
						>
							Total Number of Behaviors:
						</Typography>
						<Typography
							variant="overline"
							fontSize="large"
							sx={{ lineHeight: "1rem" }}
						>
							{behaviors.length}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
			<Divider sx={{ width: "100%" }}>
				<Typography variant="overline">All Behaviors</Typography>
			</Divider>
			<Behaviors behaviors={behaviors} />
		</Grid>
	);
}
