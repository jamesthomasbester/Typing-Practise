import React, { useState, useEffect, useRef} from "react";
import Key from "../../builders/key";
import axios from "axios";
import keyIndex from "../../util/KeyIndex";
import Scoreboard from "../builders/scoreboard";
import useTimer from "../../util/useTimer";

import Words from "../../util/useWords";
import userManagement from "../../util/userManagement";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CHAR } from "../../util/mutation";
import { QUERY_DATA } from "../../util/queries"
import {QUERY_SINGLE_PROFILE } from "../../util/queries";
import Auth from "../../util/auth";

const Body = () => {
    const {timer, isActive, startTimer, resetTimer, pauseTimer} = useTimer(0);
    const [focus, setFocus] = useState('v') ;
    const [accuracy, setAccuracy] = useState(0) ;
    const [words, setWords] = useState(['']);
    const [wpm, setWpm] = useState(0);
    const [index, setIndex] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [letterPos, setLetterPos] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [currentPos, setCurrentPos] = useState(0);
    const [pastData, setPastData] = useState([])
    const [start, setStart] = useState(false);
    const [end, setend] = useState(false);
    const [key, setKey] = useState([])
    const [storage, setStorage ] = useState([]);
    var n = 0;
    const [createdata] = useMutation(ADD_CHAR);
    const {loading, error, data} = useQuery(QUERY_SINGLE_PROFILE, { variables: { profileId: Auth.getProfile().data._id}});

    const onLaunch = async () => {
        if(loading === false){
            if(data.profile.data.length < 1){
                setFocus("Initializing round")
                setWords([
                    'the', 
                    'wizard', 
                    'quickly', 
                    'jinxed', 
                    'the', 
                    'gnomes', 
                    'before', 
                    'they', 
                    'vaporized',
                ])
            }else{
                const fetchData = async  () => {
                    await data.profile.data.forEach(item => {
                        let temp = Object.entries(keyIndex).find(key => key[0] === item.character)
                        temp[1].count = item.fields.count;
                        temp[1].latency = item.fields.latency;
                        temp[1].correct = item.fields.correct;
                        temp[1].incorrect = item.fields.incorrect;
                    })
                    console.log(keyIndex)
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
            }
        }
    }

    

    const onEnd = async () => {
        console.log(keyIndex)
        for(const[keys, values] of Object.entries(keyIndex)){
                    await createdata({variables: {
                        profileId: "62e255371dce35547678dd08",
                        data: { 
                            character: keys,
                            fields:{
                                correct: values.correct,
                                incorrect: values.incorrect,
                                count: values.count,
                                latency: values.latency
                            }
                        }
                    }})
                }
        }
    

    useEffect(() => {
        onLaunch();
    }, [loading])

    useEffect(() => {
    
    }, [])

    useEffect(() => {
        setAccuracy(100 - ((incorrect / index) * 100) )
        setWpm(wordCount / (timer / 1000) ) 
    })

    
    useEffect(() => {
        // const syncData = async() => {
        //     console.log('syncData')
        //     for(const[keys, values] of Object.entries(keyIndex)){
        //         await createdata({variables: {
        //             profileId: "62e255371dce35547678dd08",
        //             data: { 
        //                 character: keys,
        //                 fields:{
        //                     correct: values.correct,
        //                     incorrect: values.incorrect,
        //                     count: values.count,
        //                     latency: values.latency
        //                 }
        //             }
        //         }})
        //     }
        // }
        // syncData()
    }, [end])

    const evaluateKeys = (input) => {
        // console.log(info)
        
        let letters = words.map(word => word.split(""))
        let temp = Object.entries(keyIndex).find(key => key[0] === input)
        let correct;
        
        temp[1].count += 1;
        temp[1].latency += timer;
        if(input === letters[wordCount][letterPos]){
            temp[1].correct += 1;
            setIndex(index + 1)
            setLetterPos(letterPos + 1)
            correct = true
        }else{
            temp[1].incorrect += 1;
            setIndex(index + 1)
            setIncorrect(incorrect + 1)
            setLetterPos(letterPos + 1)
            correct = false
        }
        if(letterPos === letters[wordCount].length -1){
            setWordCount(wordCount + 1)
            setLetterPos(0)
            if(wordCount + 1 >= words.length){
                pauseTimer()
                onEnd()
            }
        }
        setStorage([...storage, temp])
        return correct
    }




    const handleKeyDown = (e) => {
        setCurrentPos(((key.length + 1) / words.join("").length) * 100)
        if(evaluateKeys(e.key)){
            document.getElementById(index + 1).setAttribute("class", "active")
        }else if(!evaluateKeys(e.key)){
            document.getElementById(index + 1).setAttribute("class", "wrong")
        }
        console.log(words.length)
        console.log(wordCount + 1)

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
            <Scoreboard focus={focus} wpm={wpm} accuracy={accuracy} currentPos={currentPos}/>
            <div className="body-main-container">
                
                <div className="top-container" onClick={() => {document.getElementById("invisible-textbox").focus() }}>
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
                  <input id="invisible-textbox" className="invisible-textbox" value={key} autoFocus onChange={(e) => {setKey(e.target.value)}} onKeyDown={handleKeyDown}/>
                </div>
            </div>
        </div>
    )
}

export default Body;