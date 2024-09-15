const dbConnection = require('../config/koneksi')

const getAllAdmin = ()=> {
    const query = `SELECT * FROM tbl_admin `
    return dbConnection.execute(query)
}

const loginAdmin =(email,password)=> {
    const query = `SELECT * FROM tbl_admin WHERE tbl_admin.email = '${email}' AND tbl_admin.password = SHA1('${password}') LIMIT 1`
    return dbConnection.execute(query)
}

const addAdmin = (email,username,password)=> {
    const query =  `INSERT INTO tbl_admin(email,username,password) VALUES ('${email}','${username}',SHA1('${password}'))`
    return dbConnection.execute(query)
}

const updateAdmin = (id_admin,avatar,username) => {
    if (avatar == '') {
        const query = `UPDATE tbl_admin SET username='${username}' WHERE id_admin = ${id_admin}`
        return dbConnection.execute(query)
    } else {
        const query = `UPDATE tbl_admin SET username='${username}',avatar='${avatar}' WHERE id_admin = ${id_admin}`
    return dbConnection.execute(query)
    }
    
}

const deleteAdmin = (id_admin) => {
    const query = `DELETE FROM tbl_admin WHERE id_admin = ${id_admin}`
    return dbConnection.execute(query)
}

const getSingleAdmin = (id_admin) => {
    const query = `SELECT * FROM tbl_admin WHERE id_admin = ${id_admin}`
    return dbConnection.execute(query)
}
const updateLoginTime = (id_admin)=> {
    const query = `UPDATE tbl_admin SET last_login= NOW() WHERE id_admin = ${id_admin};`
    return dbConnection.execute(query)
}


module.exports = {
    getAllAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    getSingleAdmin,
    updateLoginTime
}