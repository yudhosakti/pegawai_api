const decisionModel = require('../models/decision')
const adminModel = require('../models/admin')

const globalFunc = require('./global_function')

const getAllDecisionByIdUser = async(req,response) => {
    const idUser = req.query.id_user
    try {
        const [data] = await decisionModel.getAllDecisionByIdUser(idUser)
        
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            let dataFix = []
            
            for (let index = 0; index < data.length; index++) {
                dataFix.push({
                    "id_decision" : data[index].id_decision,
                    "id_user" : data[index].id_user,
                    "title" : data[index].title,
                    "last_chat" : data[index].last_chat,
                    "create_at" : globalFunc.getDateTimeNow(data[index].create_at)
                })
                
            }

            response.json({
                data: dataFix
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
            let dataFix = []
            
            for (let index = 0; index < data.length; index++) {
                dataFix.push({
                    "id_chat" : data[index].id_dchat,
                    "id_decision" : data[index].id_decision,
                    "message" : data[index].message,
                    "sender" : data[index].sender,
                    "send_at" : globalFunc.getDateTimeNow(data[index].send_at)
                })
                
            }

            response.json({
                data: dataFix
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