import React from "react";
import Tile from "./tile.jsx";
import "./field.css";
import { useState } from "react";

export default function Field({onGameStateChange, gridSize, bombCount})
{
    const [gameFieldValues, setGameFieldValues] = React.useState(GenerateGameFieldValues);

    function onTileClicked(isBomb, bombProximity, x,y)
    {
        //Check for game over condition
        if(isBomb)
        {
            let values = [...gameFieldValues];
            for(let i =0; i < gameFieldValues.length; i++)
            {
                values[i].isRevealed = true;
            }

            setGameFieldValues(values);
        }

        //TODO Implement flood fill for contiguous empty tiles
        if(bombProximity == 0)
        {
            let values = [...gameFieldValues];
            emptyTileFill(x,y,values);
            setGameFieldValues(values);
        }

        //Check for victory condition if all tiles that are not bombs have been tested win condition is present.
        
    }

    function emptyTileFill(x,y,values)
    {
        //Bounds checks
        if(x < 0 || x >= gridSize) return;
        if(y < 0 || y >= gridSize) return;

        let index = y * gridSize + x;

        if(values[index].isRevealed == true) return;

        if(values[index].value != 0)
        {
            values[index].isRevealed = true;
            return;
        }
        else
        {
            values[index].isRevealed = true;
        }

        emptyTileFill(x-1, y-1, values);
        emptyTileFill(x, y-1, values);
        emptyTileFill(x+1, y-1, values);

        emptyTileFill(x-1, y, values);
        emptyTileFill(x+1, y, values);

        emptyTileFill(x-1, y+1, values);
        emptyTileFill(x, y+1, values);
        emptyTileFill(x+1, y+1, values);

    }

    function isBombTile(x,y, tileValues)
    {
        //Bounds checks
        if(x < 0 || x >= gridSize) return false;
        if(y < 0 || y >= gridSize) return false;

        let index = y * gridSize + x;
        if(tileValues[index].value == -1)
        {
            return true;
        }

        return false;
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

                    //Check surrounding tiles
                    if(isBombTile(x-1,y-1, tileValues)) tileValue++; //Top Left
                    if(isBombTile(x,y-1, tileValues)) tileValue++; //Top 
                    if(isBombTile(x+1,y-1, tileValues)) tileValue++; //Top right
                    if(isBombTile(x-1,y, tileValues)) tileValue++; //Left
                    if(isBombTile(x+1,y, tileValues)) tileValue++; //Right
                    if(isBombTile(x-1,y+1, tileValues)) tileValue++; //Bottom Left
                    if(isBombTile(x,y+1, tileValues)) tileValue++; //Bottom
                    if(isBombTile(x+1,y+1, tileValues)) tileValue++; //Bottom Right

                    tileValues[index].value = tileValue;
                }
            }
        }
        return tileValues;
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
            if(gameFieldValues[index].value == -1)
            {
                isBombTile = true;
            }

            gameTiles.push(<Tile isBomb={isBombTile} isRevealed={gameFieldValues[index].isRevealed} key={index} x={x} y={y} bombProximity={gameFieldValues[index].value} onTileClicked={onTileClicked}/>);
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