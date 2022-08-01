
const DataSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    data: {
        character: {
            type: String,
        },
        latency: {
            type: Decimal,
        },
        correct: {
            type: Integer,
        },
        incorrect: {
            type: Integer
        }
    }
})

const Data = model("Data", DataSchema)
module.exports = Data;