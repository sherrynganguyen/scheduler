import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) {
    if (replace === false) {
      
      setMode(mode);
      setHistory(history => [...history, mode]); //set history to track previous state
      return;
    } else {
      setMode(mode);
    }
  }
  function back() {
    if (history.length > 1) {
      history.pop();  //to cut the current state from history state
      setMode(history[history.length - 1]);
      return;
    }
    return;
  }
  return { mode, transition, back };
}
