import React from "react";

function DataFormat() {

  const refreshDateHandler = () => {
  };

  const refreshDurationHandler = () => {
  };

  return (
    <div className="dataFormat">
      <h1>数据格式转化</h1>
      https://developer.mozilla.org/en-US/docs/Web/API/File_API

      <div>
        <button onClick={refreshDateHandler}>refresh expired date</button>
      </div>

      <br/>

      <div>
        <button onClick={refreshDurationHandler}>refresh expired date</button>
      </div>
    </div>
  );
}

export default DataFormat;
