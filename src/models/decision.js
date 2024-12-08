const dbConnection = require('../config/koneksi')

const addChatDecision = (id_admin,title) => {
    const query = `CALL decision_add(${id_admin},'${title}')`
    return dbConnection.execute(query)
}

const updateDecisionTitle = (title,id_decision) => {
    const query = `UPDATE tbl_decision SET title='${title}' WHERE id_decision = ${id_decision}`
    return dbConnection.execute(query)
}

const  deleteDecision = (id_decision)=> {
    const query = `DELETE FROM tbl_decision WHERE id_decision =${id_decision}`
    return dbConnection.execute(query)

}

const getAllDecisionByIdUser = (id_user) => {
    const query = `SELECT * FROM tbl_decision WHERE id_user = ${id_user}`
    return dbConnection.execute(query)
} 

const addChatDecisionChat = (id_decision,sender,message) => {
    const query = `INSERT INTO tbl_decision_chat(id_decision,message,sender,send_at) VALUES (${id_decision},'${message}','${sender}',NOW())`
    return dbConnection.execute(query)
}

const getAllChatByIdDecision = (id_decision) => {
    const query = `SELECT * FROM tbl_decision_chat WHERE id_decision = ${id_decision}`
    return dbConnection.execute(query)
}
const addChatWithResponse = (id_decision,message,sender) => {
    const query = 'CALL chat_dss(?, ?, ?)';
    return dbConnection.execute(query,[id_decision, sender, `${message}`])
}



module.exports = {
    addChatDecision,
    updateDecisionTitle,
    deleteDecision,
    getAllDecisionByIdUser,
    addChatDecisionChat,
    getAllChatByIdDecision,
    addChatWithResponse
}