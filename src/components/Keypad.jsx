import { useEffect, useState } from "react";

export default function Keypad({ usedKeys }) {
	const [letters, setLetters] = useState(null);
	useEffect(() => {
		setTimeout(async () => {
			const response = await fetch("http://localhost:8000/letters");
			const data = await response.json();
			setLetters(data);
		}, 1000);
	}, []);

	return (
		<div className="keypad">
			{letters &&
				letters.map((l) => {
					const color = usedKeys[l.key];
					return (
						<div key={l.key} className={color}>
							{l.key}
						</div>
					);
				})}
		</div>
	);
}
