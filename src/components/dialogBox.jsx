import React from "react";
import "./menu.css";
import "./dialogBox.css";

export default function DialogBox({Message, Title, onOk, onTryAgain})
{
    return(
        <div className="Overlay">
            <div className="DialogBox">
                <h1>{Title}</h1>
                <p>{Message}</p>
                <div>
                    <button className="MenuButton" onClick={onOk}>Continue</button>
                </div>
            </div>
        </div>
    );
}