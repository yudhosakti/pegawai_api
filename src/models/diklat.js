const dbConnection = require('../config/koneksi')

const addDiklatPegawai = (id_pegawai,diklat,id_admin) => {
    const query = `INSERT INTO tbl_diklat(id_pegawai,id_admin,nama_diklat) 
    VALUES (${id_pegawai},${id_admin},'${diklat}')`
    return dbConnection.execute(query)
}

const getSingleDiklatPegawai = (id_sifat) => {
    const query = `SELECT * FROM tbl_diklat WHERE id_diklat = ${id_sifat}`
    return dbConnection.execute(query)
}

const getAlldiklatByIdPegawai = (id_pegawai) => {
    const query =`SELECT * FROM tbl_diklat WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}

const updateDiklatPegawai = (id_diklat,diklat,id_admin) => {
    const query = `UPDATE tbl_diklat SET id_admin= ${id_admin}, nama_diklat='${diklat}' WHERE id_diklat = ${id_diklat}`
    return dbConnection.execute(query)
}

const deleteDiklatPegawai = (id_diklat) => {
    const query = `DELETE FROM tbl_diklat WHERE id_diklat = ${id_diklat}`
    return dbConnection.execute(query)
}

module.exports = {
    addDiklatPegawai,
    getSingleDiklatPegawai,
    getAlldiklatByIdPegawai,
    updateDiklatPegawai,
    deleteDiklatPegawai
}