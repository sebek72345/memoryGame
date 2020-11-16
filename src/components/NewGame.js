import React, { useState } from "react";

export default function NewGame({ start }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="menu-item">
      <button
        className="btn btn-play"
        style={{ visibility: visible ? "visible" : "hidden" }}
        onClick={() => {
          setVisible(!visible);
          start();
        }}
      >
        PLAY
      </button>
    </div>
  );
}
