import { useEffect, useState } from "react";
import axios from "axios"

const Words = (initialRound) => {
    const [words, setWords] = useState([]);

    const fetchWords = (letters) => {
        // const options = {
        //     method: "GET",
        //     url: 'https://wordsapiv1.p.rapidapi.com/words/',
        //     params: {random: 'true'},
        //     headers: {
        //         'X-RapidAPI-Key': '32b02794cbmsh72da06d86753b95p1dab23jsnd1ca9c7aceae',
        //         'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        //     }
        // };

        // axios.request(options)
        // .then(res => console.log(res.data))

        return;
    }
    fetchWords()

    const starterTemplate = () => {
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
        // let rand = Math.floor(Math.random() * 4)

        // switch (rand){
        //     case 1:
        //         return alpha;
        //     case 2:
        //         return  beta;
        //     case 3:
        //         return  gamma;
        //     case 4:
        //         return delta;
        //     default:
        //         return  delta;
        // }

        return delta;
    }

    if(initialRound){
        return starterTemplate();
    }else{
        return starterTemplate(); 
    }
}

export default Words;