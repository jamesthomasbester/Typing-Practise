import React, { useEffect, useState } from "react";
import Key from "../../builders/key";
import keyIndex from "../../util/KeyIndex";
import { useQuery } from "@apollo/client";
import { QUERY_PROFILES } from "../../util/queries";

const Body = () => {
    var timer = 0;
    var i = 1;
    var n = 0;
    var list;

    const profiles = useQuery(QUERY_PROFILES)

    setInterval(() =>{
        timer++;
    },1000)

    const keyDown = (e) => {
        if(e.key === document.getElementById(i).textContent){
            document.getElementById(i).setAttribute("class", "active")
            Object.entries(keyIndex).find(key => key[0] == e.key)[1].score += 10;
            Object.entries(keyIndex).find(key => key[0] == e.key)[1].correct += 1;
            i++
        }else if(e.keyCode === 32){
            return;
        }else{
            document.getElementById(i).setAttribute("class", "wrong")
            Object.entries(keyIndex).find(key => key[0] == e.key)[1].score -= 10;
            Object.entries(keyIndex).find(key => key[0] == e.key)[1].incorrect -= 10;
            i++
        }
        console.log(Object.entries(keyIndex).find(key => key[0] == e.key)[1])
    }

    useEffect(() => {
        document.addEventListener("keydown", keyDown)
    },[keyDown])

    const alpha = [
        'bobby', 
        'klun', 
        'awarded', 
        'jayme', 
        'sixth', 
        'place', 
        'for', 
        'her', 
        'very', 
        'high', 
        'quiz',
    ]

    const beta = [
        'The', 
        'wizard', 
        'quickly', 
        'jinxed', 
        'the', 
        'gnomes', 
        'before', 
        'they', 
        'vaporized',
    ]

    const gamma = [
        'zelda',
        'might', 
        'fix', 
        'the', 
        'job', 
        'growth',
        'plans', 
        'very', 
        'quickly', 
        'on', 
        'monday'
    ]

    const delta = [
        'zack',
        'gappow', 
        'saved',
        'the', 
        'job', 
        'requirement', 
        'list', 
        'for', 
        'the',  
        'six', 
        'boys',
    ]

    var rand = Math.floor(Math.random() * 4)

    switch (rand){
        case 1:
            list = alpha;
            break;
        case 2:
            list = beta;
            break;
        case 3:
            list = gamma;
            break;
        case 4:
            list = delta;
            break;
        default:
            list = delta;
            break;
    }

    const handleClick = async(e) =>{
        e.preventDefault();
        console.log(profiles.data.profiles);
    }

    return (
        <div className="body-container">
            <div className="body-main-container">
                <div className="top-container">
                    {list.map((item, index) => {
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
                    })}
                </div>
                <div className="bottom-container">
                    <button onClick={handleClick}>test</button>
                </div>
            </div>
        </div>
    )
}

export default Body;