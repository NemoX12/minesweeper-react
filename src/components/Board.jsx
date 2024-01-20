import { useState, useEffect } from "react";
import { createBoard, reveal } from "../utils/imports";
import { Cell, Status } from "../components/imports";
import "../styles/top-bar.css";
import "../styles/board.css";

const LEVELS = {
  beginner: {
    x: 9,
    y: 9,
    b: 10,
  },
  intermediate: {
    x: 12,
    y: 12,
    b: 20,
  },
  expert: {
    x: 14,
    y: 24,
    b: 70,
  },
};

const Board = () => {
  const [board, setBoard] = useState([]);
  // nMC - Non mine count
  const [nMC, setNMC] = useState();
  const [mineLocations, setMineLocations] = useState([]);
  const [gameOver, setGameOver] = useState({ over: false, win: false });
  const [level, setLevel] = useState(null || "beginner");
  const [click, setClick] = useState({ l: false, r: 0 });

  useEffect(() => {
    if (nMC === 0) {
      setGameOver((prev) => ({
        ...prev,
        win: true,
      }));
    }
  }, [nMC]);

  function newBoard() {
    const selectedLevel = LEVELS[level];
    const { x, y, b } = selectedLevel;

    // n -> newBoard
    const n = createBoard(x, y, b);
    setNMC(x * y - b);
    setBoard(n.board);
    setMineLocations(n.mineLocation);
    setGameOver((prev) => ({
      ...prev,
      over: false,
      win: false,
    }));
  }

  const updateFlag = (e, x, y) => {
    e.preventDefault();
    let n = JSON.parse(JSON.stringify(board));
    if (n[x][y].flagged === true) {
      n[x][y].flagged = false;
    } else {
      if (n[x][y].revealed === true) {
        return;
      } else if (n[x][y].revealed === true && n[x][y].flagged === false) {
        return;
      } else if (gameOver.win === true || gameOver.over === true) {
        return;
      } else {
        n[x][y].flagged = true;
      }
    }
    setBoard(n);
  };

  const revealCell = (x, y) => {
    if (board[x][y].revealed) {
      return;
    }
    let n = JSON.parse(JSON.stringify(board));
    if (n[x][y].value === "X") {
      if (gameOver.over === true || gameOver.win === true) {
        return;
      }

      for (let i = 0; i < mineLocations.length; i++) {
        n[mineLocations[i][0]][[mineLocations[i][1]]].revealed = true;
      }

      setGameOver((prev) => ({
        ...prev,
        over: true,
      }));

      setBoard(n);
    } else {
      if (gameOver.over === true || gameOver.win === true) {
        return;
      }

      let { arr: nRevealedBoard, newNonMinesCount } = reveal(n, x, y, nMC);
      setNMC(newNonMinesCount);
      setBoard(nRevealedBoard);
    }
  };

  const handleClick = () => {
    setClick((prev) => ({
      ...prev,
      l: true,
    }));

    setTimeout(() => {
      setClick((prev) => ({
        ...prev,
        l: false,
      }));
    }, 500);
  };

  if (!board) {
    return <div>Your Board is being created...</div>;
  }
  return (
    <div className="board">
      <div className="top_bar-container">
        <select
          onChange={(e) => {
            setLevel(e.target.value);
          }}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
        <Status data={gameOver} click={click} />
        <button className="button" onClick={() => newBoard()}>
          {gameOver.over === true ? "Reset" : "New Game"}
        </button>
      </div>

      <div className="board-container">
        {board.map((row, i) => {
          return (
            <div className="board-container_row" key={i}>
              {row.map((block, j) => {
                return (
                  <Cell
                    data={block}
                    updateFlag={updateFlag}
                    revealCell={revealCell}
                    handleClick={handleClick}
                    // bombs={LEVELS[level].b}
                    key={j}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
