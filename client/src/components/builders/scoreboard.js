import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


const Scoreboard = ({focus, wpm, accuracy, currentPos}) => {
    const [test, setTest] = useState(currentPos + "%")
    ChartJS.register(ArcElement, Tooltip, Legend);

    useEffect(() => {
      setTest(currentPos + "%")
    })

    const data = {
        labels: ['Words Per Minute'],
        datasets: [
          {
            data: [wpm, 200],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
    
    return (
        <div className="scoreboard-container">
            <div className="top-score-container">
                <div className="time-container">
                    <h2>Current focus: {focus}</h2> 
                </div>
                <div className="wpm-container">
                    <Doughnut className="test" data={data} />
                    <p>{wpm}</p>
                </div>
                <div className="score-container">
                    <h2 class="accuracy">Accuracy: {accuracy}%</h2>
                </div>
            </div>
            <div className="progress-container">
                <div className="bar">
                    <div className="bar-current" style={{width: test}}>
                        {test} 
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Scoreboard;