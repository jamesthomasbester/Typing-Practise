import React, { useEffect, useState } from "react";
import Key from "../../builders/key";

const Body = () => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        console.log('updated')
    },[index])
    const list = [
        'golf',
        'good',
        'government',
        'governor',
        'grab',
        'grade',
        'gradually',
        'graduate',
        'grain',
        'grand',
        'grandfather',
        'grandmother',
        'grant',
        'grass',
        'grave',
        'gray',
        'great',
        'greatest',
        'green',
        'grocery']
    var i = 1;
    var n = 0;
    window.addEventListener('keydown', (e) => {
        if(e.key === document.getElementById(i).textContent){
            document.getElementById(i).setAttribute("class", "active")
        }else{
            document.getElementById(i).setAttribute("class", "wrong")
        }
        i++
        //setIndex(i)
    })

    return (
        <div className="body-container">
            <div className="body-main-container">
                <div className="top-container">
                    {list.map((item, index) => {
                       return item.split('').map((x, y) => {
                        n ++;
                        return(
                            <Key character={x} index={n}></Key>
                        )})

                    })}
                </div>
                <div className="bottom-container">
                    
                </div>
            </div>
        </div>
    )
}

export default Body;