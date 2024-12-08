const dbConnection = require('../config/koneksi')

const getAllAdmin = ()=> {
    const query = `SELECT * FROM tbl_user WHERE status = 'Aktif' `
    return dbConnection.execute(query)
}

const loginAdmin =(email,password)=> {
    const query = `SELECT * FROM tbl_user WHERE tbl_user.email = '${email}' AND tbl_user.password = SHA1('${password}') AND status = 'Aktif' LIMIT 1`
    return dbConnection.execute(query)
}

const loginAdminImage =(email)=> {
    const query = `SELECT * FROM tbl_user WHERE tbl_user.email = '${email}' AND status = 'Aktif' LIMIT 1`
    return dbConnection.execute(query)
}

const addAdmin = (email,username,password)=> {
    const query =  `INSERT INTO tbl_user(email,username,password) VALUES ('${email}','${username}',SHA1('${password}'))`
    return dbConnection.execute(query)
}

const updateAdmin = (id_user,avatar,username,email) => {
    if (avatar == '') {
        const query = `UPDATE tbl_user SET username='${username}',email='${email}' WHERE id_user = ${id_user}`
        return dbConnection.execute(query)
    } else {
        const query = `UPDATE tbl_user SET username='${username}',email='${email}',avatar='${avatar}' WHERE id_user = ${id_user}`
    return dbConnection.execute(query)
    }
    
}


const updateUser = (id_user,avatar,username,email,role) => {
    if (avatar == '') {
        const query = `UPDATE tbl_user SET username='${username}',email='${email}',role='${role}' WHERE id_user = ${id_user}`
        return dbConnection.execute(query)
    } else {
        const query = `UPDATE tbl_user SET username='${username}',email='${email}',avatar='${avatar}', role='${role}' WHERE id_user = ${id_user}`
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
    const query = `SELECT * FROM tbl_user WHERE Status = 'Aktif' ORDER BY login_at DESC LIMIT 5`
    return dbConnection.execute(query)
}

const getLogUser = (role,id) => {
    if (role == 'Admin') {
        const query = `SELECT * FROM tbl_log INNER JOIN tbl_user ON tbl_user.id_user=tbl_log.id_user ORDER BY tbl_log.create_at DESC`
        return dbConnection.execute(query)
    } else {
        const query = `SELECT * FROM tbl_log INNER JOIN tbl_user ON tbl_user.id_user=tbl_log.id_user WHERE tbl_log.id_user = ${id} ORDER BY tbl_log.create_at DESC`
        return dbConnection.execute(query)
    }
}

const addUser = (username,email,password,avatar,role)=> {
    if (avatar == '') {
        const query = `INSERT INTO tbl_user(username,email,password,avatar,role) VALUES ('${username}','${email}',SHA1('${password}'),NULL,'${role}')`
        return dbConnection.execute(query)
    } else {
        const query = `INSERT INTO tbl_user(username,email,password,avatar,role) VALUES ('${username}','${email}',SHA1('${password}'),'${avatar}','${role}')`
        return dbConnection.execute(query)
    }
    
}


module.exports = {
    getAllAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    getSingleAdmin,
    updateLoginTime,
    getRecentUser,
    addUser,
    updateUser,
    loginAdminImage,
    getLogUser
}