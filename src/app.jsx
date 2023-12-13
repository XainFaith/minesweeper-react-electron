import React from "react";
import Field from "./components/field.jsx";

export default function App()
{
    return <div id="GameContainer">
        <Field gridSize={5} bombCount={5}/>
    </div>;
}