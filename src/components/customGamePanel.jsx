import React, { useState } from "react";


export default function CustomGamePanel({onSettingsChanged, minGridSize=10, maxGridSize=30})
{

    const [bombCount, setBombCount] = useState(5);
    const [gridSize, setGridSize] = useState(10);

    let minBombRange = Math.floor((gridSize * gridSize) * 0.1)
    let maxBombRange = Math.floor((gridSize * gridSize) * 0.3);

    function onGridSlideChange(e)
    {
        setGridSize(e.target.value);
        let fixedBombCount = bombCount;
        if(bombCount > (Math.floor((e.target.value * e.target.value) * 0.3)))
        {
            fixedBombCount = Math.floor((e.target.value * e.target.value) * 0.3);
            setBombCount(fixedBombCount);
        }

        if(bombCount < (Math.floor((e.target.value * e.target.value) * 0.1)))
        {
            fixedBombCount = Math.floor((e.target.value * e.target.value) * 0.1);
            setBombCount(fixedBombCount);
        }

        onSettingsChanged({"bombCount": fixedBombCount, "gridSize": gridSize});
    }

    function onBombSliderChange(e)
    {
        setBombCount(e.target.value);
        onSettingsChanged({"bombCount": e.target.value, "gridSize": gridSize});
    }

    return(
        <div id="CustomGameSection">
            <div>
                <h3>Grid Size: {gridSize}</h3>
                <input className="MenuSlider" type="range" min={minGridSize} max={maxGridSize} defaultValue={gridSize} onChange={onGridSlideChange} />
            </div>
            <div>
                <h3>Bomb Count: {bombCount}</h3>
                <input className="MenuSlider" type="range" min={minBombRange} max={maxBombRange} defaultValue={bombCount} onChange={onBombSliderChange} />
            </div>
         </div>
    );
}