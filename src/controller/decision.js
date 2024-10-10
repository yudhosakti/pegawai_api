const decisionModel = require('../models/decision')
const adminModel = require('../models/admin')

const getAllDecisionByIdUser = async(req,response) => {
    const idUser = req.query.id_user
    try {
        const [data] = await decisionModel.getAllDecisionByIdUser(idUser)
        
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            response.json({
                data: data
            })
        }
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const getAllChatByIdDecision = async(req,response) => {
    const idDecision = req.query.id_decision
    try {

        const [data] = await decisionModel.getAllChatByIdDecision(idDecision)

        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            response.json({
                data: data
            })
        }
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const addChatDecision = async(req,response) => {
    const dataInsert = req.body
    try {
        const [data] = await adminModel.getSingleAdmin(dataInsert.id_admin)
        if (data[0].role != 'Admin') {
           response.status(500).json({
               message: "Role Bukan Admin Tidak Bisa Menggunakan Fitur Ini"
           }) 
        } else {
            await decisionModel.addChatDecision(dataInsert.id_admin,dataInsert.title).then((value) => {
                const [data] = value
                console.log(data[0][0].id_pegawai
                )
                response.json({
                    id: data[0][0].id_decision,
                    message: "Data Insert Success"
                })

            })
        }
        
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const addChatDecisionChat = async(req,response) => {
    const dataInsert = req.body
    try {

        await decisionModel.addChatDecisionChat(dataInsert.id_decision,dataInsert.sender,dataInsert.message).then((result) => {
            response.json({
                message: "Chat Added"
            })
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const updateDecisionTitle = async (req,response) => {
    const dataInsert = req.body
    try {
       
        await decisionModel.updateDecisionTitle(dataInsert.title,dataInsert.id_decision).then((result) => {
            response.json({
                message: "Data Update Success"
            })
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const deleteDecision = async(req,response) => {
    const idDecision = req.query.id_decision
    try {
        await decisionModel.deleteDecision(idDecision).then((result) => {
            response.json({
                message: "Data Delete Success"
            })
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

module.exports = {
    getAllChatByIdDecision,
    getAllDecisionByIdUser,
    addChatDecision,
    addChatDecisionChat,
    updateDecisionTitle,
    deleteDecision
}