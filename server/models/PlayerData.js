const mongoose  = require("mongoose")
const Profile = require('./profile');

const DataSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    data: {
        letter: {
            character: "q",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "w",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "e",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "r",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "t",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "y",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "u",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "i",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "o",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "p",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "a",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "s",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "d",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "f",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "g",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "h",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "j",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "k",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "l",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "z",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "x",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "c",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "v",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "b",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "n",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
        letter: {
            character: "m",
            field: {
                count: Number,
                latency: Number,
                incorrect: Number,
                correct: Number,
            }
        },
    }
})

module.exports = mongoose.model("Data", DataSchema)