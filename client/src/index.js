import React, { useState } from "react";
import { render } from "react-dom";

function App() {
    const [state, setState] = useState("hello");
    return <button onClick={() => setState("我被点击了")}>{state}</button>;
}

render(<App />, document.getElementById("root"));