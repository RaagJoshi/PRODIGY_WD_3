import { useState } from "react";

function Render({ matrix, pos }) {
  if (matrix[pos] == 1) {
    return <b>O</b>;
  } else if (matrix[pos] == 2) {
    return <b>X</b>;
  }
  return "";
}

function App() {
  const [turn, setTurn] = useState(1);
  const [matrix, setMatrix] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [win, setWin] = useState(0);
  const [game, setGame] = useState(false);

  function handleRestart() {
    setTurn(1);
    setMatrix([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setWin(0);
    setGame(false);
  }

  function handleFinish(M) {
    const m1 = [M[0], M[1], M[2]];
    const m2 = [M[3], M[4], M[5]];
    const m3 = [M[6], M[7], M[8]];
    const m4 = [M[0], M[3], M[6]];
    const m5 = [M[1], M[4], M[7]];
    const m6 = [M[2], M[5], M[8]];
    const m7 = [M[0], M[4], M[8]];
    const m8 = [M[2], M[4], M[6]];

    const array = [m1, m2, m3, m4, m5, m6, m7, m8];

    for (const i in array) {
      const same1 = array[i].every((item) => {
        return item == 1;
      });
      if (same1) {
        setWin(1);
        setGame(true);
        break;
      }
      const same2 = array[i].every((item) => {
        return item == 2;
      });
      if (same2) {
        setWin(2);
        setGame(true);
        break;
      }
    }

    const same3 = matrix.every((item) => {
      return item != 0;
    });
    if (same3) {
      setGame(true);
    }
  }

  function handlePlayer(pos: number) {
    let val;
    const newMatrix = [...matrix];
    if (newMatrix[pos] == 0) {
      if (turn == 1) {
        val = 1;
        setTurn(2);
      } else {
        val = 2;
        setTurn(1);
      }
      newMatrix[pos] = val;
      setMatrix(newMatrix);
    }
    handleFinish(newMatrix);
  }

  return (
    <body>
      <h6 className="grid-text">Player 1 : O</h6>
      <h6 className="grid-text">Player 2 : X</h6>
      <h6 className="grid-text">Current Turn : {turn}</h6>
      <div className="grid">
        <div className="grid-container">
          <button onClick={() => handlePlayer(0)} disabled={game}>
            <Render matrix={matrix} pos={0} />
          </button>
          <button onClick={() => handlePlayer(1)} disabled={game}>
            <Render matrix={matrix} pos={1} />
          </button>
          <button onClick={() => handlePlayer(2)} disabled={game}>
            <Render matrix={matrix} pos={2} />
          </button>
          <button onClick={() => handlePlayer(3)} disabled={game}>
            <Render matrix={matrix} pos={3} />
          </button>
          <button onClick={() => handlePlayer(4)} disabled={game}>
            <Render matrix={matrix} pos={4} />
          </button>
          <button onClick={() => handlePlayer(5)} disabled={game}>
            <Render matrix={matrix} pos={5} />
          </button>
          <button onClick={() => handlePlayer(6)} disabled={game}>
            <Render matrix={matrix} pos={6} />
          </button>
          <button onClick={() => handlePlayer(7)} disabled={game}>
            <Render matrix={matrix} pos={7} />
          </button>
          <button onClick={() => handlePlayer(8)} disabled={game}>
            <Render matrix={matrix} pos={8} />
          </button>
        </div>
      </div>
      <h6 className="grid-text">
        <button onClick={() => handleRestart()}>Restart the game</button>
      </h6>
      {game && win != 0 && <h6 className="grid-text">Player {win} wins!</h6>}
      {game && win == 0 && (
        <h6 className="grid-text">
          Game is Draw, Refresh the page to start again.
        </h6>
      )}
    </body>
  );
}

export default App;
