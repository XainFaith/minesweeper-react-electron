import React, { useState } from "react";
import "./tile.css";

export default function Tile({onTileClicked, isBomb, isRevealed, bombProximity})
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
        onTileClicked(isBomb);
    }

    if(bombProximity >= 0 && (revealed || isRevealed))
    {
        return <div className={classes} proximity={bombProximity} />;
    }
    
    return <div className={classes} onClick={tlieClickHandler}/>;
}