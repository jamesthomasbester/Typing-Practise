const mongoose  = require("mongoose")
const User = require('../module/user');

const DataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    data: {
        q: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        w: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        e: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        r: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        t: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        y: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        u: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        i: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        o: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        p: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        a: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        s: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        d: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        f: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        g: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        h: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        j: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        k: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        l: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        z: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        x: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        c: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        v: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        b: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        n: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
        m: {
            score: Number,
            latency: Number,
            incorrect: Number,
            correct: Number,
        },
    }
})

module.exports = mongoose.model("Data", DataSchema)