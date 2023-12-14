import React from "react";
import Tile from "./tile.jsx";
import "./field.css";
import { useState } from "react";

export default function Field({onGameStateChange, gridSize, bombCount})
{
    const [gameFieldValues, setGameFieldValues] = React.useState(null);

    function onTileClicked(isBomb, bombProximity)
    {
        //Check for game over condition
        if(isBomb)
        {
            let values = [...gameFieldValues];
            for(let i =0; i < gameFieldValues.length; i++)
            {
                values[i].isRevealed = true;
                setGameFieldValues(values);
            }
        }

        //TODO Implement flood fill for contiguous empty tiles
        if(bombProximity == 0)
        {

        }

        //Check for victory condition if all tiles that are not bombs have been tested win condition is present.
        
    }

    function GenerateGameFieldValues()
    {
        let tileValues = [gridSize * gridSize];

        for(let i =0; i < gridSize * gridSize; i++)
        {
            tileValues[i] = {value: 0, isRevealed: false};
        }

        //Generate random bomb placments
        for(let bombs =0; bombs < bombCount;)
        {
            let x = Math.floor(Math.random() * gridSize);
            let y = Math.floor(Math.random() * gridSize);
            let index = y * gridSize + x;
            if(tileValues[index] != -1)
            {
                tileValues[index].value = -1;
                bombs++;
            }
        }

        //Walk the Game Field and determine tile to bomb proximity values
        for(let y=0; y < gridSize; y++)
        {
            for(let x=0; x < gridSize; x++)
            {
                let index = y * gridSize + x;
                if(tileValues[index].value != -1)
                {
                    let tileValue = 0;
                    let utilIndex= 0;
                    //Check surrounding tiles
                    if(x-1 >= 0 && y-1 >= 0) //Top Left
                    {
                        utilIndex = (y-1) * gridSize + (x-1);
                        if(tileValues[utilIndex].value == -1)
                        {
                            tileValue++;
                        }
                    }

                    if(y-1 >= 0) //Top middle
                    {
                        utilIndex = (y-1) * gridSize + x;
                        if(tileValues[utilIndex].value == -1)
                        {
                            tileValue++;
                        }
                    }

                    if(x+1 < gridSize && y-1 >= 0) //Top Right
                    {
                        utilIndex = (y-1) * gridSize + (x+1);
                        if(tileValues[utilIndex].value == -1)
                        {
                            tileValue++;
                        }
                    }

                    if(x-1 >= 0) //Left
                    {
                        utilIndex = y * gridSize + (x-1);
                        if(tileValues[utilIndex].value == -1)
                        {
                            tileValue++;
                        }
                    }

                    if(x+1 < gridSize) //Right
                    {
                        utilIndex = y * gridSize + (x+1);
                        if(tileValues[utilIndex].value == -1)
                        {
                            tileValue++;
                        }
                    }

                    if(x-1 >= 0 && y+1 < gridSize) //Bottom Left
                    {
                        utilIndex = (y+1) * gridSize + (x-1);
                        if(tileValues[utilIndex].value == -1)
                        {
                            tileValue++;
                        }
                    }

                    if(y+1 < gridSize) //Bottom
                    {
                        utilIndex = (y+1) * gridSize + x;
                        if(tileValues[utilIndex].value == -1)
                        {
                            tileValue++;
                        }
                    }

                    if(x+1 < gridSize && y+1 < gridSize) //Bottom Right
                    {
                        utilIndex = (y+1) * gridSize + (x+1);
                        if(tileValues[utilIndex].value == -1)
                        {
                            tileValue++;
                        }
                    }

                    tileValues[index].value = tileValue;
                }
            }

            setGameFieldValues(tileValues);
        }
    }

    if(gameFieldValues === null)
    {
       GenerateGameFieldValues();
    }
    else
    {
        //Generate Game Tiles
        const rows = [];
        for(let y=0; y < gridSize; y++)    
        {
            const gameTiles = [];
            for(let x =0; x < gridSize; x++)
            {
                let index = y * gridSize + x;
                let isBombTile = false;
                if(gameFieldValues[index].value == -1)
                {
                    isBombTile = true;
                }

                gameTiles.push(<Tile isBomb={isBombTile} isRevealed={gameFieldValues[index].isRevealed} key={index} bombProximity={gameFieldValues[index].value} onTileClicked={onTileClicked}/>);
            }

            let rowKey = "row" + y;
            rows.push(<div className="FieldRow" key={rowKey}>{gameTiles}</div>);
        }


        return (
            <div className="GameField">
                {rows}
            </div>
        )
    }

}