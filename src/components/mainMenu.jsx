import React, { useRef, useState } from "react";
import CustomGamePanel from "./customGamePanel.jsx";
import "./menu.css";

export default function MainMenu({onNewGame})
{
    const [showCustomSettings, setShowCustomSettings] = useState(false);
    const [gridType, setGridType] = useState("small");
    const customSettings = useRef({"bombCount":10,"gridSize":10});
    

    let minGS = 10;
    let maxGS = 30;

    function onCustomSettingsChange({bombCount, gridSize})
    {
        customSettings.current.bombCount = bombCount;
        customSettings.current.gridSize = gridSize;
    }
   
    function onCreateGame()
    {
        onNewGame(customSettings.current);
    }

    function onGridTypeSelect(e)
    {
        switch(e.target.value)
        {
            case "custom":
                setShowCustomSettings(true);
                setGridType("custom");
                return;

            case "small":
                setGridType(e.target.value);
                customSettings.current.gridSize = 5;
                customSettings.current.bombCount = 5;
                return;

            case "med":
                setGridType(e.target.value);
                customSettings.current.gridSize = 10;
                customSettings.current.bombCount = 20;
                return;
            
            case "large":
                setGridType(e.target.value);
                customSettings.current.gridSize = 20;
                customSettings.current.bombCount = 60;
                return;

            case "xlarge":
                setGridType(e.target.value);
                customSettings.current.gridSize = 30;
                customSettings.current.bombCount = 270;
                return;
        }

        setShowCustomSettings(false);
    }

    function CustomGameSection()
    {
        if(showCustomSettings)
        {
            return (<CustomGamePanel minGridSize={minGS} maxGridSize={maxGS} onSettingsChanged={onCustomSettingsChange} /> );
        }

        return;
    }

    return(
        <div className="MainMenu">
            <div className="MainMenuContainer">
                <h1>Minesweeper</h1>
                <h3>Presets:</h3>
                <div className="MenuSection">

                        <label>5X5: 
                            <input type="radio" value="small" checked={gridType === "small"} onChange={onGridTypeSelect}/>
                        </label>


                        <label>10X10:
                            <input type="radio" value="med" checked={gridType === "med"} onChange={onGridTypeSelect}/>
                        </label>


                        <label>20X20:
                            <input type="radio" value="large" checked={gridType === "large"} onChange={onGridTypeSelect}/>
                        </label>

                        <label>30X30:
                            <input type="radio" value="xlarge" checked={gridType === "xlarge"} onChange={onGridTypeSelect}/>
                        </label>

                        <label>Custom:
                            <input type="radio" value="custom" checked={gridType === "custom"} onChange={onGridTypeSelect}/>
                        </label>

                </div>
                <CustomGameSection />
                <button className="MenuButton" onClick={onCreateGame}>Start Game</button>
            </div>
        </div>
    )
}