import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
function Wordle({ solution }) {
	const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } =
		useWordle(solution);
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		window.addEventListener("keyup", handleKeyUp);
		if (isCorrect) {
			setTimeout(() => {
				setShowModal(true);
			}, 2000);
			window.removeEventListener("keyup", handleKeyUp);
		}
		if (turn > 5) {
			window.removeEventListener("keyup", handleKeyUp);
			setTimeout(() => {
				setShowModal(true);
			}, 2000);
		}
		return () => {
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [handleKeyUp, isCorrect, turn]);

	return (
		<>
			{/* <div>Solution: {solution}</div>
			<div>CurrentGuess: {currentGuess}</div> */}
			<Grid turn={turn} currentGuess={currentGuess} guesses={guesses} />
			<Keypad usedKeys={usedKeys} />
			{showModal && (
				<Modal isCorrect={isCorrect} turn={turn} solution={solution} />
			)}
		</>
	);
}
export default Wordle;
