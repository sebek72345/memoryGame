import React, { useState } from "react";

export default function NewGame({ play }) {
  const [visible, setVisible] = useState(true);
  return (
    <div className="menu-item">
      <button
        className="btn btn-play"
        style={{ visibility: visible ? "visible" : "hidden" }}
        onClick={() => {
          setVisible(!visible);
          play();
        }}
      >
        PLAY
      </button>
    </div>
  );
}
