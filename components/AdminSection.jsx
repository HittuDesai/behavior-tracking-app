import { Button, ButtonGroup, Grid } from "@mui/material";
import { useState } from "react";
import { AdminFormComponent } from "./AdminFormComponent";

export function AdminSection() {
	const [form, setForm] = useState("default");
	return (
		<Grid
			width="100%"
			height="80vh"
			padding="1rem"
			rowGap="1rem"
			container
			direction="column"
			alignItems="center"
		>
			<ButtonGroup
				variant="contained"
				sx={{ width: "100%", gap: "1rem" }}
				orientation="vertical"
			>
				{form === "default" ? (
					<>
						<Button onClick={() => setForm("student")}>
							Add Student
						</Button>
						<Button onClick={() => setForm("teacher")}>
							Add Teacher
						</Button>
						<Button onClick={() => setForm("class")}>
							Add Class
						</Button>
					</>
				) : (
					<Button fullWidth onClick={() => setForm("default")}>
						Cancel
					</Button>
				)}
			</ButtonGroup>
			{form === "default" ? (
				<Grid
					width="100%"
					container
					direction="column"
					alignItems="center"
					justifyContent="flex-start"
					flex={1}
				>
					Please click on a button to view the form
				</Grid>
			) : (
				<AdminFormComponent formType={form} />
			)}
		</Grid>
	);
}
