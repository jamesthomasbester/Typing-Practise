import React, { useState, useEffect, useRef} from "react";
import Key from "../../builders/key";
import keyIndex from "../../util/KeyIndex";
import Scoreboard from "../builders/scoreboard";
import useTimer from "../../util/useTimer";
import useWords from "../../util/useWords";
import userManagement from "../../util/userManagement";
import { useMutation } from "@apollo/client";
import { ADD_CHAR } from "../../util/mutation";
import Auth from "../../util/auth";

const Body = () => {
    const {timer, isActive, startTimer, resetTimer, pauseTimer} = useTimer(0);
    const [wpm, setWpm] = useState(0);
    const [wordCounts, setWordCounts] = useState(0);
    const [currentPos, setCurrentPos] = useState(0);
    const [score, setScore] = useState(0);
    const [start, setStart] = useState(false);
    const [key, setKey] = useState([])
    const [char, setChar] = useState({profile: 'james', character: '', latency: 0, correct: 0, incorrect: 0})
    const [ addCharacterData ] = useMutation(ADD_CHAR)
    var wordCount = 0
    var letter = 0;
    var index = 0;
    var n = 0;
    var i = 1;
    var correctCount = 0;
    var correctWordCount = 0;
    var list = useWords();

    
    const keyDown = (e) => {
        addCharacterData({
            variables: {character: 'a', latency: 10, correct: 2, incorrect: 1}
        })
        
        console.log(index)
        letter = list.map(item => item.split(""));
        let letterLength = list.join('');
        if(e.key === letter[wordCount][index]){
            document.getElementById(i).setAttribute("class", "active")
            correctCount += 1;
            i++;
            setKey([...key, e.key])
        }else if(e.key !== letter[wordCount][index]){
            document.getElementById(i).setAttribute("class", "wrong")
            i++;
        }
        setCurrentPos((i / (letterLength.length + 1)) * 100)
        index++;
        if(index >= letter[wordCount].length){
            wordCount++;
            setWordCounts(wordCount);
            index = 0
        }
        if(correctCount === letter[wordCount].length){
            correctWordCount++;
        }

        if(wordCount >= (letter.length)-1){
            pauseTimer()
            userManagement({
                correct: {
                    a: {
                        latency: 10,
                        correct: 5,
                        incorrect: 1
                    }
                }
            })
        }
        

    //    console.log(Object.entries(keyIndex).find(key => key[0] == e.key)[1])
    }

    useEffect(() => {
        window.addEventListener("keydown", keyDown)

        
    }, [])

    useEffect(() => {
        setWpm(wordCounts * 60 / timer);
        console.log(key)
    },[timer])
    





    return (
        <div className="body-container">
            <Scoreboard time={timer} wpm={wpm} score={score} currentPos={currentPos}/>
            <div className="body-main-container">
                <div className="top-container">
                    { start ? (list.map((item, index) => {
                     return( 
                      <div id="test">
                          {
                              item.split('').map((x, y) => {
                                  n ++;
                                  return(
                                      <Key character={x} index={n}></Key>
                                  )
                              })
                          }
                          <Key index={n} character={'_'}></Key>
                      </div>
                     )
                  })) : (
                    <button onClick={() => {
                        setStart(true); 
                        startTimer()
                    }}>Start</button>
                  )}
                </div>
            </div>
        </div>
    )
}

export default Body;