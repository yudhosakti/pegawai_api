const dbConnection = require('../config/koneksi')

const addKelebihanPegawai = (id_pegawai,kelebihan,id_admin) => {
    const query = `INSERT INTO tbl_kelebihan_pegawai(id_pegawai,id_admin,kelebihan) 
    VALUES (${id_pegawai},${id_admin},'${kelebihan}')`
    return dbConnection.execute(query)
}

const getSingleKelebihanPegawai = (id_sifat) => {
    const query = `SELECT * FROM tbl_kelebihan_pegawai WHERE id_kelebihan = ${id_sifat}`
    return dbConnection.execute(query)
}

const getAllKelebihanByIdPegawai = (id_pegawai) => {
    const query =`SELECT * FROM tbl_kelebihan_pegawai WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}

const updateKelebihanPegawai = (id_kelebihan,kelebihan,id_admin) => {
    const query = `UPDATE tbl_kelebihan_pegawai SET id_admin= ${id_admin}, kelebihan='${kelebihan}' WHERE id_kelebihan = ${id_kelebihan}`
    return dbConnection.execute(query)
}

const deleteKelebihanPegawai = (id_kelebihan) => {
    const query = `DELETE FROM tbl_kelebihan_pegawai WHERE id_kelebihan = ${id_kelebihan}`
    return dbConnection.execute(query)
}

const addKekuranganPegawai = (id_pegawai,kekurangan,id_admin) => {
    const query = `INSERT INTO tbl_kekurangan_pegawai(id_pegawai,id_admin,kekurangan) 
    VALUES (${id_pegawai},${id_admin},'${kekurangan}')`
    return dbConnection.execute(query)
}

const getSingleKekuranganPegawai = (id_sifat) => {
    const query = `SELECT * FROM tbl_kekurangan_pegawai WHERE id_kekurangan = ${id_sifat}`
    return dbConnection.execute(query)
}

const getAllKekuranganByIdPegawai = (id_pegawai) => {
    const query =`SELECT * FROM tbl_kekurangan_pegawai WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}

const updateKekuranganPegawai = (id_kekurangan,kekurangan,id_admin) => {
    const query = `UPDATE tbl_kekurangan_pegawai SET id_admin= ${id_admin}, kekurangan='${kekurangan}' WHERE id_kekurangan = ${id_kekurangan}`
    return dbConnection.execute(query)
}

const deleteKekuranganPegawai = (id_kekurangan) => {
    const query = `DELETE FROM tbl_kekurangan_pegawai WHERE id_kekurangan = ${id_kekurangan}`
    return dbConnection.execute(query)
}

module.exports = {
    addKelebihanPegawai,
    getSingleKelebihanPegawai,
    getAllKelebihanByIdPegawai,
    updateKelebihanPegawai,
    deleteKelebihanPegawai,
    addKekuranganPegawai,
    getAllKekuranganByIdPegawai,
    getSingleKekuranganPegawai,
    updateKekuranganPegawai,
    deleteKekuranganPegawai
}