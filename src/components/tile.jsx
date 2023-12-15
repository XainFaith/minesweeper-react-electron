import React, { useState } from "react";
import "./tile.css";

export default function Tile({onTileClicked, isBomb, isRevealed, bombProximity, x,y})
{
    const [flagged, setFlagged] = useState(false);

    const classes = "Tile" + (isRevealed ? (isBomb ? " Boom" : " Revealed") : "") + (flagged ? " Flagged" : "");

    function tlieClickHandler()
    {
        //Ignore click event if the tile has already been revealed
        if(isRevealed)
        {
            return;
        }

        onTileClicked(isBomb, bombProximity, x,y);
    }

    function tileFlaggedClick()
    {
        setFlagged(!flagged);
    }

    if(bombProximity >= 0 && isRevealed)
    {
        return <div className={classes} proximity={bombProximity} />;
    }
   
    return <div className={classes} onClick={tlieClickHandler} onAuxClick={tileFlaggedClick} onContextMenu={tileFlaggedClick}/>;
};