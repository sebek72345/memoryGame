import React, { useState } from "react";
import moment from "moment";
export default function NewGame({ play, time }) {
  const [visible, setVisible] = useState(true);

  return (
    <div className="menu-item">
      <button
        className="btn btn-play"
        style={{ visibility: visible ? "visible" : "hidden" }}
        onClick={() => {
          setVisible(!visible);
          play();
          let timeStart = moment().format("h:mm:ss");
          time(timeStart);
        }}
      >
        PLAY
      </button>
    </div>
  );
}
