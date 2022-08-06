import { useState, useRef } from "react";

const useTimer = (state = 0) => {
    const [timer, setTimer] = useState(state);
    const [isActive, setIsActive] = useState(false);
    const counterRef = useRef(null);

    const startTimer = () => {
        setIsActive(true);
        counterRef.current = setInterval(() => {
            setTimer(timer => timer + 1)
        }, 100)
    }

    const resetTimer = () => {
        clearInterval(counterRef.current)
        setIsActive(false)
        setTimer(0)
    }

    const pauseTimer = () => {
        setIsActive(false)
        clearInterval(counterRef.current);
    }

    return { timer, isActive, startTimer, resetTimer, pauseTimer}
}

export default useTimer;