import React, { useState, useRef } from "react";
import Field from "./components/field.jsx";
import MainMenu from "./components/mainMenu.jsx";
import DialogBox from "./components/dialogBox.jsx";


export default function App()
{

    const [gameSettings, setGameSettings] = useState({"bombCount": 10, "gridSize": 10});
    const [gameFieldShown, setGameFieldShown] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const dialogMessage = useRef("");
    const dialogTitle = useRef("");

    function onGameStateChange(newState)
    {
        if(newState == "win")
        {
            dialogTitle.current = "You Won!";
            dialogMessage.current = "Congratulations!";
            setShowDialog(true);
        }
        else
        {
            dialogTitle.current = "Game Over!";
            dialogMessage.current = "Better Luck Next Time!";
            
            setShowDialog(true);
        }
    }

    function onCreateGame(settings)
    {
        //Ensure sane values
        if(settings.bombCount == 0 || settings.gridSize == 0)
        {
            return;
        }

        setGameSettings(settings);
        setGameFieldShown(true);
    }

    function onDialogOk()
    {
        setShowDialog(false);
        setGameFieldShown(false);
    }

    function GameDialogBox()
    {
        if(showDialog == true)
        {
            return(<DialogBox onOk={onDialogOk} Title={dialogTitle.current} Message={dialogMessage.current} />)
        }
    }

    if(gameFieldShown != false)
    {
        console.log("render");
        return(<div id="GameContainer"><GameDialogBox/><Field onGameStateChange={onGameStateChange} gridSize={gameSettings.gridSize} bombCount={gameSettings.bombCount} /> </div>);
    }
    else
    {
        return <div id="GameContainer">
        <MainMenu onNewGame={onCreateGame} />    
        </div>;
    }


}