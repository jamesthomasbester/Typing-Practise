import React, { useState, useEffect, useRef} from "react";
import Key from "../../builders/key";
import axios from "axios";
import keyIndex from "../../util/KeyIndex";
import Scoreboard from "../builders/scoreboard";
import useTimer from "../../util/useTimer";
import Words from "../../util/useWords";
import userManagement from "../../util/userManagement";
import { useMutation } from "@apollo/client";
import { ADD_CHAR } from "../../util/mutation";
import Auth from "../../util/auth";

const Body = () => {
    const {timer, isActive, startTimer, resetTimer, pauseTimer} = useTimer(0);
    const [words, setWords] = useState(['']);
    const [wpm, setWpm] = useState(0);
    const [wordCounts, setWordCounts] = useState(0);
    const [currentPos, setCurrentPos] = useState(0);
    const [list, setList] = useState([]);
    const [score, setScore] = useState(0);
    const [start, setStart] = useState(false);
    const [key, setKey] = useState([])
    var char = [{character: 'a', latency: 5, correct: 3, count: 5}, {character: 'a', latency: 15, correct: 4, count: 10}, {character: 'b', latency: 5, correct: 3, count: 5}]
    var time = 0;
    var wordCount = 0
    var letter = 0;
    var index = 0;
    var n = 0;
    var i = 1;
    var correctCount = 0;
    var correctWordCount = 0;
    var test;


    useEffect(() => {

        const fetchData = async  () => {
            const options = {
                method: "GET",
                url: 'https://wordsapiv1.p.rapidapi.com/getMultipleRandom',
                params: {count: '20', includes: 'a'},
                headers: {
                    'X-RapidAPI-Key': '32b02794cbmsh72da06d86753b95p1dab23jsnd1ca9c7aceae',
                    'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
                }
            };
            const json = await axios.request(options)
            setWords(json.data)
        }
        fetchData()
        .catch(console.error)
        console.log(words)
    }, [])

    const startGame = () => {
        setInterval(() => {

        }, 100)
    }

    const handleKeyDown = (e) => {
        console.log(e.key)
    }
    

    // const delay = () => { setInterval(() => {
    //     time +=1;
    // }, 100)}
    

    
    // const keyDown = (e) => {
    //     delay()
    //     console.log(e.key)
    //     letter = test.map(item => item.split(""));
    //     let letterLength = list.join('');
    //     if(e.key === letter[wordCount][index]){
    //         document.getElementById(i).setAttribute("class", "active")
    //         correctCount += 1;
    //         char.push({character: e.key, latency: time, correct: correctCount, count: correctCount})
    //         i++;
    //         time = 0;
    //         setKey([...key, e.key])
    //     }else if(e.key !== letter[wordCount][index]){
    //         document.getElementById(i).setAttribute("class", "wrong")
    //         i++;
    //     }
    //     setCurrentPos((i / (letterLength.length + 1)) * 100)
    //     index++;
    //     if(index >= letter[wordCount].length){
    //         wordCount++;
    //         setWordCounts(wordCount);
    //         index = 0
    //     }
    //     if(correctCount === letter[wordCount].length){
    //         correctWordCount++;
    //     }

    //     if(wordCount >= (letter.length)-1){
    //         pauseTimer()
    //         userManagement({
    //             char
    //         })
    //     }
        

    // //    console.log(Object.entries(keyIndex).find(key => key[0] == e.key)[1])
    // }

    // const startGame = async (options) => {
    //     if(options){
    //         const options = {
    //             method: "GET",
    //             url: 'https://wordsapiv1.p.rapidapi.com/getMultipleRandom',
    //             params: {count: '20', includes: 'a'},
    //             headers: {
    //                 'X-RapidAPI-Key': '32b02794cbmsh72da06d86753b95p1dab23jsnd1ca9c7aceae',
    //                 'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    //             }
    //         };
    //         await axios.request(options)
    //     .then(res => { 
    //         let data = res.data;
    //         setList(data)
    //         test = data;   
    //     })
    //     }else{

    //     }
        
    //     await setStart(true);
    // }



    // useEffect(() => {

    // }, [])


    // useEffect(() => {
    //     setWpm(wordCounts * 60 / timer);
    // },[timer])
    





    return (
        <div className="body-container">
            <Scoreboard time={timer} wpm={wpm} score={score} currentPos={currentPos}/>
            <div className="body-main-container">
                
                <div className="top-container" >
                <input onKeyDown={handleKeyDown}/>
                    { start ? (words.map((item, index) => {
                     return( 
                      <div id="test" >
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
                  })) 

                  : (
                    <button className="start-button" onClick={() => {
                        setStart(true)
                        startTimer()
                        
                    }}>Start</button>
                  )}
                </div>
            </div>
        </div>
    )
}

export default Body;