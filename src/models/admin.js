const dbConnection = require('../config/koneksi')

const getAllAdmin = ()=> {
    const query = `SELECT * FROM tbl_user `
    return dbConnection.execute(query)
}

const loginAdmin =(email,password)=> {
    const query = `SELECT * FROM tbl_user WHERE tbl_user.email = '${email}' AND tbl_user.password = SHA1('${password}') LIMIT 1`
    return dbConnection.execute(query)
}

const addAdmin = (email,username,password)=> {
    const query =  `INSERT INTO tbl_user(email,username,password) VALUES ('${email}','${username}',SHA1('${password}'))`
    return dbConnection.execute(query)
}

const updateAdmin = (id_user,avatar,username) => {
    if (avatar == '') {
        const query = `UPDATE tbl_user SET username='${username}' WHERE id_user = ${id_user}`
        return dbConnection.execute(query)
    } else {
        const query = `UPDATE tbl_user SET username='${username}',avatar='${avatar}' WHERE id_user = ${id_user}`
    return dbConnection.execute(query)
    }
    
}

const deleteAdmin = (id_user,status) => {
    const query = `UPDATE tbl_user SET status='${status}' WHERE id_user = ${id_user}`
    return dbConnection.execute(query)
}

const getSingleAdmin = (id_user) => {
    const query = `SELECT * FROM tbl_user WHERE id_user = ${id_user}`
    return dbConnection.execute(query)
}
const updateLoginTime = (id_user)=> {
    const query = `UPDATE tbl_user SET login_at = NOW() WHERE id_user = ${id_user};`
    return dbConnection.execute(query)
}

const getRecentUser = () => {
    const query = `SELECT * FROM tbl_user ORDER BY login_at DESC LIMIT 5`
    return dbConnection.execute(query)
}


module.exports = {
    getAllAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    getSingleAdmin,
    updateLoginTime,
    getRecentUser
}