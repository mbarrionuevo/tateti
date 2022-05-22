import { useEffect, useState } from "react";

import MetaTags from "react-meta-tags";

import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState("X");
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

      if (newState[index]) {
        return newState;
      }

      newState[index] = player;
      setPlayer("X" === player ? "O" : "X");
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
      if (value === "X") {
        player1.push(index);
      } else if (value === "O") {
        player2.push(index);
      }
    });

    combinations.forEach((combi) => {
      if (
        player1.includes(combi[0]) &&
        player1.includes(combi[1]) &&
        player1.includes(combi[2])
      ) {
        setWinner("X");
      } else if (
        player2.includes(combi[0]) &&
        player2.includes(combi[1]) &&
        player2.includes(combi[2])
      ) {
        setWinner("O");
      }
    });

    if (!winner) {
      setTie(board.every((value) => value !== null));
    }
  };

  return (
    <>
      <MetaTags>
        <title>Meta Tags — Preview, Edit and Generate</title>
        <meta name="title" content="Meta Tags — Preview, Edit and Generate" />
        <meta
          name="description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta
          property="og:title"
          content="Meta Tags — Preview, Edit and Generate"
        />
        <meta
          property="og:description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />
        <meta
          property="og:image"
          content={`${window.location.href}assets/ping-og-large.png`}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta
          property="twitter:title"
          content="Meta Tags — Preview, Edit and Generate"
        />
        <meta
          property="twitter:description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />
        <meta
          property="twitter:image"
          content={`${window.location.href}assets/ping-og-large.png`}
        />
      </MetaTags>
      <div className="container">
        <div className="board">
          {board.map((item, index) => {
            return (
              <div
                key={index}
                className="row"
                onClick={() => handleOnClick(index)}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div style={{ height: "60px", textAlign: "center" }}>
          {winner && <h1>Won: {winner}</h1>}
          {tie && !winner && <h1>Tie</h1>}
          {(tie || winner) && (
            <button onClick={handleOnReset}>Play again</button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
