const dbConnection = require('../config/koneksi')

const addSifatPegawai = (id_pegawai,sifat_pegawai,id_admin) => {
    const query = `INSERT INTO tbl_sifat_pegawai(id_pegawai,id_admin,sifat_pegawai) 
    VALUES (${id_pegawai},${id_admin},'${sifat_pegawai}')`
    return dbConnection.execute(query)
}

const getSingleSifatPegawai = (id_sifat) => {
    const query = `SELECT * FROM tbl_sifat_pegawai WHERE id_sifat_pegawai = ${id_sifat}`
    return dbConnection.execute(query)
}

const getAllSifatByIdPegawai = (id_pegawai) => {
    const query =`SELECT * FROM tbl_sifat_pegawai WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}

const updateSifatPegawai = (id_sifat_pegawai,sifat_pegawai,id_admin) => {
    const query = `UPDATE tbl_sifat_pegawai SET id_admin= ${id_admin}, sifat_pegawai='${sifat_pegawai}' WHERE id_sifat_pegawai = ${id_sifat_pegawai}`
    return dbConnection.execute(query)
}

const deleteSifatPegawai = (id_sifat_pegawai) => {
    const query = `DELETE FROM tbl_sifat_pegawai WHERE id_sifat_pegawai = ${id_sifat_pegawai}`
    return dbConnection.execute(query)
}

module.exports = {
    addSifatPegawai,
    getSingleSifatPegawai,
    getAllSifatByIdPegawai,
    updateSifatPegawai,
    deleteSifatPegawai
}