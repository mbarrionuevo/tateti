import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState(true);
  const [tie, setTie] = useState(false);

  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleOnClick = (index) => {
    if (winner) {
      return;
    }
    setBoard((state) => {
      const newState = [...state];
      newState[index] = player;
      setPlayer(!player);
      return newState;
    });
  };

  const handleOnReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  useEffect(() => {
    ValidatedWinner();
  }, [board]);

  const ValidatedWinner = () => {
    let player1 = [];
    let player2 = [];

    board.forEach((value, index) => {
      if (value) {
        player1 = [...player1, index];
      } else if (value === false) {
        player2 = [...player2, index];
      }
    });

    combinations.forEach((combi) => {
      if (combi.every((index) => player1.includes(index))) {
        return setWinner("X");
      }
      if (combi.every((index) => player2.includes(index))) {
        return setWinner("O");
      }
    });

    setTie(board.every((value) => value !== null));
  };

  return (
    <div className="container">
      <div className="board">
        {board.map((item, index) => {
          return (
            <div
              key={index}
              className="row"
              onClick={() => handleOnClick(index)}
            >
              {item === true && "X"}
              {item === false && "O"}
            </div>
          );
        })}
      </div>
      <div style={{ height: "60px", textAlign: "center" }}>
        {winner && <h1>Won: {winner}</h1>}
        {tie && <h1>Tie</h1>}
        {(tie || winner) && (
          <button onClick={handleOnReset}>Play again</button>
        )}
      </div>
    </div>
  );
}

export default App;
