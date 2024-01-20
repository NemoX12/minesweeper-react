import { Bomb, Flag } from "../assets/imports";
import "../styles/cell.css";

const Cell = ({ data, updateFlag, revealCell, handleClick }) => {
  return (
    <div
      className={`cell ${data.revealed === true && `revealed`}`}
      style={{ background: `${data.revealed === true && `#fffff`}` }}
      onClick={() => {
        revealCell(data.x, data.y);
        handleClick();
      }}
      onContextMenu={(e) => {
        updateFlag(e, data.x, data.y);
      }}
    >
      {data.revealed && data.value !== "X" ? data.value : ""}
      {data.revealed && data.value === "X" && (
        <img src={Bomb} alt="X" className="bomb" />
      )}
      {data.flagged === true && data.revealed === false ? (
        <img className="flag" src={Flag} alt="flag" />
      ) : (
        ""
      )}
    </div>
  );
};

export default Cell;
