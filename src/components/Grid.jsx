import Row from "./Row";
export default function Grid({ turn, currentGuess, guesses }) {
	return (
		<div>
			{guesses.map((g, i) => {
				if (turn === i) {
					return <Row key={i} currentGuess={currentGuess} />;
				}
				return <Row key={i} guess={g} />;
			})}
		</div>
	);
}
