import { useState } from "react";

function useWordle(solution) {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState("");
	const [guesses, setGuesses] = useState([...Array(6)]); //guess as object
	const [history, setHistory] = useState([]); //guess as string
	const [isCorrect, setIsCorrect] = useState(false);
	const [usedKeys, setUsedKeys] = useState({});
	const formatGuess = () => {
		//split solution into array
		let solutionArray = [...solution];

		//split guess into array
		let formatedGuess = [...currentGuess].map((l) => {
			return { key: l, color: "grey" };
		});

		//find green
		formatedGuess.forEach((l, i) => {
			if (solutionArray[i] === l.key) {
				formatedGuess[i].color = "green";
				solutionArray[i] == null;
			}
		});

		//find yellow
		formatedGuess.forEach((l, i) => {
			if (solutionArray.includes(l.key) && l.color !== "green") {
				formatedGuess[i].color = "yellow";
				solutionArray[solutionArray.indexOf(l.key)] = null;
			}
		});
		return formatedGuess;
	};
	const addNewGuess = (formatedGuess) => {
		if (currentGuess === solution) {
			setIsCorrect(true);
		}
		setGuesses((prev) => {
			//takes prevous values and add formatedGuess
			let newGuesses = [...prev];
			newGuesses[turn] = formatedGuess;
			return newGuesses;
		});
		setHistory((prev) => {
			return [...prev, currentGuess];
		});
		setTurn((prev) => {
			return prev + 1;
		});

		setUsedKeys((prev) => {
			let newKeys = { ...prev };
			formatedGuess.forEach((l) => {
				const currentColor = newKeys[l.key];
				if (l.color === "green") {
					newKeys[l.key] = "green";
					return;
				}
				if (l.color === "yellow" && currentColor !== "green") {
					newKeys[l.key] = "yellow";
				}
				if (
					l.color === "grey" &&
					currentColor !== "green" &&
					currentColor !== "yellow"
				) {
					newKeys[l.key] = "grey";
					return;
				}
			});
			return newKeys;
		});
		setCurrentGuess("");
	};
	const handleKeyUp = ({ key }) => {
		//if key is one letter
		if (/^[A-Za-z]$/.test(key)) {
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => prev + key);
			}
		}
		//if key is backspace
		if (key === "Backspace") {
			setCurrentGuess((prev) => {
				return prev.slice(0, -1);
			});
		}
		if (key === "Enter") {
			//add word if turns < 5
			if (turn > 5) {
				console.log("You used all guesses");
				return;
			}
			//if history has current guess not allow duplicate words
			if (history.includes(currentGuess)) {
				console.log("You already tried that word");
				return;
			}
			if (currentGuess.length !== 5) {
				console.log("Word must be 5 chars word");
				return;
			}
			const formated = formatGuess();
			addNewGuess(formated);
		}
	};

	return { turn, currentGuess, guesses, isCorrect, handleKeyUp, usedKeys };
}
export default useWordle;
