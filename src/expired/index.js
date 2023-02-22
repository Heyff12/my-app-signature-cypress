import React, { useState } from "react";

function Expired() {
  const [expired, setExpired] = useState(false);

  const refreshDateHandler = () => {
    setExpired(false);
    const expiredAt = 'Wed Feb 22 2023 08:34:07 GMT+0000 (Greenwich Mean Time)';// 时间点是固定的， local时间是可以调整的
    const expiredDuration = new Date(expiredAt).valueOf() - new Date().valueOf(); // 通过与local时间相减得到的结果是不准确的；  比如：会直接过期
    console.log('--------------expiredDuration--------------------------', expiredDuration)
    setTimeout(() => {
      setExpired(true);
    }, expiredDuration);
  };

  const refreshDurationHandler = () => {
    setExpired(false);
    const expiredAt = 3 * 1000;
    setTimeout(() => {
      setExpired(true);
    }, expiredAt);
  };

  return (
    <div className="expired">
      <h1>{expired ? "Be expired 😭" : "Be unexpired 😁"}</h1>

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

export default Expired;
