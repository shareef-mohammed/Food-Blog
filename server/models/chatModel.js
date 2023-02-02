const mongoose = require('mongoose')

const ChartSchema = new mongoose.Schema ({
    members: {
        type: Array,
    },
}, { timestamps: true })

module.exports = mongoose.model("Chat", ChartSchema)
