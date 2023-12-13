import React from "react";
import Tile from "./tile.jsx";
import "./field.css";

export default function Field({onGameStateChange, gridSize, bombCount})
{
    console.log("Constructing game field");

    const gameFieldValues = [gridSize * gridSize];

    //Generate random bomb placments
    for(let bombs =0; bombs < bombCount;)
    {
        let x = Math.floor(Math.random() * gridSize);
        let y = Math.floor(Math.random() * gridSize);
        let index = y * gridSize + x;
        if(gameFieldValues[index] != -1)
        {
            gameFieldValues[index] = -1;
            bombs++;
        }
    }

    //Walk the Game Field and determine tile to bomb proximity values
    for(let y=0; y < gridSize; y++)
    {
        for(let x=0; x < gridSize; x++)
        {
            let index = y * gridSize + x;
            if(gameFieldValues[index] != -1)
            {
                let tileValue = 0;
                let utilIndex= 0;
                //Check surrounding tiles
                if(x-1 >= 0 && y-1 >= 0) //Top Left
                {
                    utilIndex = (y-1) * gridSize + (x-1);
                    if(gameFieldValues[utilIndex] == -1)
                    {
                        tileValue++;
                    }
                }

                if(y-1 >= 0) //Top middle
                {
                    utilIndex = (y-1) * gridSize + x;
                    if(gameFieldValues[utilIndex] == -1)
                    {
                        tileValue++;
                    }
                }

                if(x+1 < gridSize && y-1 >= 0) //Top Right
                {
                    utilIndex = (y-1) * gridSize + (x+1);
                    if(gameFieldValues[utilIndex] == -1)
                    {
                        tileValue++;
                    }
                }

                if(x-1 >= 0) //Left
                {
                    utilIndex = y * gridSize + (x-1);
                    if(gameFieldValues[utilIndex] == -1)
                    {
                        tileValue++;
                    }
                }

                if(x+1 < gridSize) //Right
                {
                    utilIndex = y * gridSize + (x+1);
                    if(gameFieldValues[utilIndex] == -1)
                    {
                        tileValue++;
                    }
                }

                if(x-1 >= 0 && y+1 < gridSize) //Bottom Left
                {
                    utilIndex = (y+1) * gridSize + (x-1);
                    if(gameFieldValues[utilIndex] == -1)
                    {
                        tileValue++;
                    }
                }

                if(y+1 < gridSize) //Bottom
                {
                    utilIndex = (y+1) * gridSize + x;
                    if(gameFieldValues[utilIndex] == -1)
                    {
                        tileValue++;
                    }
                }

                if(x+1 < gridSize && y+1 < gridSize) //Bottom Right
                {
                    utilIndex = (y+1) * gridSize + (x+1);
                    if(gameFieldValues[utilIndex] == -1)
                    {
                        tileValue++;
                    }
                }

                gameFieldValues[index] = tileValue;
            }
        }
    }

    //Generate Game Tiles
    const rows = [];
    for(let y=0; y < gridSize; y++)    
    {
        const gameTiles = [];
        for(let x =0; x < gridSize; x++)
        {
            let index = y * gridSize + x;
            let isBombTile = false;

            if(gameFieldValues[index] == -1)
            {
                isBombTile = true;
            }

            gameTiles.push(<Tile isBomb={isBombTile} isRevealed={false} key={index}/>);
        }

        let rowKey = "row" + y;
        rows.push(<div className="FieldRow" key={rowKey}>{gameTiles}</div>);
        console.log("adding row");
    }

    return (
        <div className="GameField">
            {rows}
        </div>
    )

}