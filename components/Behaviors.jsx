import { useState } from "react";
import Behavior from "./Behavior";

function Behaviors({ behaviors }) {
	const [behaviorsToBeShown, setBehaviorsToBeShown] = useState(behaviors);
	return (
		<>
			{behaviorsToBeShown.map(behavior => (
				<Behavior key={behavior.behaviorID} behavior={behavior} />
			))}
		</>
	);
}

export default Behaviors;
