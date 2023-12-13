import React, { useState } from "react";
import "./tile.css";

export default function Tile({onTileClicked, isBomb, isRevealed})
{
    const [revealed, setRevealed] = useState(isRevealed);
    const classes = "Tile" + ((revealed | isRevealed) ? (isBomb ? " Boom" : " Revealed") : "");

    function tlieClickHandler()
    {
        if(revealed)
        {
            return;
        }

        setRevealed(true);
        onTileClicked(key, isBomb);
    }

    return <div className={classes} onClick={tlieClickHandler}/>;
}