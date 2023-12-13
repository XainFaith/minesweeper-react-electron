import React, { useState } from "react";

export default function Tile({onTileClicked, tileId})
{
    const [revealed, setRevealed] = useState(false);
    const classes = "Tile" + (revealed ? "" : " Revealed");

    function tlieClickHandler()
    {
        if(revealed)
        {
            return;
        }

        setRevealed(true);
        onTileClicked(tileId);
    }

    return <div className={classes} onClick={tlieClickHandler}/>;
}