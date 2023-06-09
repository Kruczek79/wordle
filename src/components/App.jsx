import { useState, useEffect } from "react";
import Wordle from "../components/Wordle";
function App() {
	const [solution, setSolution] = useState(null);

	useEffect(() => {
		setTimeout(async () => {
			const response = await fetch("https://kruczek79.github.io/wordle-api/db.json");
			const data = await response.json();
			const randomSolu = await data[Math.floor(Math.random() * data.length)];
			setSolution(randomSolu.word);
		}, 1000);
	}, [setSolution]);

	return (
		<div className="App">
			<h1>Wordle</h1>
			{solution && <Wordle solution={solution} />}
		</div>
	);
}

export default App;
