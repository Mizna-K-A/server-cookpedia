const testimonials = require('../models/testimonyModel')

// add testimonials
exports.addTestimonyController = async (req,res)=>{
    console.log("Inside addTestimonyController");
    const {name,email,message} = req.body
    try {
        const newMessage = new testimonials({
            name,email,message
        })
        await newMessage.save()
        res.status(200).json(newMessage)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all testimony
exports.getAlltestimonyController = async(req,res)=>{
    console.log("Inside getAlltestimonyController");
    try {
        const allTestimony = await testimonials.find()
        res.status(200).json(allTestimony)
    } catch (err) {
        res.status(401).json(err)
    }
}

// status update
exports.updateStatusTestimonyController = async(req,res)=>{
    console.log("Inside updateStatusTestimonyController");
    const {id} = req.params
    const status = req.query.status
    try {
        const existingTestimony = await testimonials.findById({_id:id})
        existingTestimony.status = status
        await existingTestimony.save()
        res.status(200).json(existingTestimony)
    } catch (err) {
        res.status(401).json(err)
    }
}