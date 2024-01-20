import { useState, useEffect } from "react";
import { Dead, Shock, Smile, Win } from "../assets/imports";

const Status = ({ data, click }) => {
  const [status, setStatus] = useState();
  useEffect(() => {
    if (data.over === true) {
      setStatus(Dead);
    } else if (click.l === true) {
      setStatus(Shock);
    } else if (data.win === true) {
      setStatus(Win);
    } else {
      setStatus(Smile);
    }
  }, [data, click]);

  return <img src={status} alt="" className="top_bar-status" />;
};

export default Status;
