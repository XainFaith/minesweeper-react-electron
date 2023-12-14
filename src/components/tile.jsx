import React, { useState } from "react";
import "./tile.css";

export default function Tile({onTileClicked, isBomb, isRevealed, bombProximity, x,y})
{
    const [revealed, setRevealed] = useState(isRevealed);
    const [flagged, setFlagged] = useState(false);

    const classes = "Tile" + ((revealed | isRevealed) ? (isBomb ? " Boom" : " Revealed") : "") + (flagged ? " Flagged" : "");

    function tlieClickHandler()
    {
        if(revealed)
        {
            return;
        }

        setRevealed(true);
        onTileClicked(isBomb, bombProximity, x,y);
    }

    function tileFlaggedClick()
    {
        setFlagged(!flagged);
    }

    if(bombProximity >= 0 && (revealed || isRevealed))
    {
        return <div className={classes} proximity={bombProximity} />;
    }
    
    return <div className={classes} onClick={tlieClickHandler} onContextMenu={tileFlaggedClick}/>;
}