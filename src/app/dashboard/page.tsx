'use client';
import { useState } from "react";
import KorgKonnector from "./KorgKonnector";

const MyPage = () => {
  // Declare state using useState
  const [count, setCount] = useState(0);

  // Event handler to update the state
  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>My Page</h1>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
      <KorgKonnector/>
    </div>
  );
};

export default MyPage;
