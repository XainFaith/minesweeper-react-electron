import React, { useEffect, useState } from "react";
import "./timeTracker.css";

export default function TimeTracker({isActive})
{
    const [time,SetTime] = useState(0);

    useEffect(()=>{
        let intervalId;
        if(isActive)
        {
            intervalId = setInterval(()=>{SetTime(time+1)},100);
        }
        return()=>clearInterval(intervalId);
    },[isActive, time]);

    let mins = Math.floor((time / 10) / 60);
    let seconds = ((time / 10) % 60).toFixed(1);

    if(seconds < 10){seconds = "0" + seconds;}
    let convertedTime =  mins + ":" + seconds;

    return(
        <div id="StopWatch">
            <p>Time: {convertedTime}</p>
        </div>
    );
}