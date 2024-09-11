const dbConnection = require('../config/koneksi')

const addSertifikatPegawai = (id_pegawai,id_admin,nama_sertifikat,bukti_sertifikat)=> {
    if (bukti_sertifikat == '') {
        const query = `INSERT INTO tbl_sertifikat_pegawai(id_pegawai,id_admin, nama_sertifikat, bukti_sertifikat) 
   VALUES (${id_pegawai},${id_admin},'${nama_sertifikat}',${null})`
    return dbConnection.execute(query)
    }else{
        const query = `INSERT INTO tbl_sertifikat_pegawai(id_pegawai,id_admin, nama_sertifikat, bukti_sertifikat) 
        VALUES (${id_pegawai},${id_admin},'${nama_sertifikat}','${bukti_sertifikat}')`
         return dbConnection.execute(query)
    }
   
}

const updateSertifikatPegawai = (id_sertifikatPg, nama_sertifikat,bukti_sertifikat,id_admin) => {
    if (bukti_sertifikat == '') {
        const query = `UPDATE tbl_sertifikat_pegawai SET id_admin=${id_admin}, nama_sertifikat='${nama_sertifikat}',bukti_sertifikat=NULL WHERE id_sertifikat_pg = ${id_sertifikatPg}`
        return dbConnection.execute(query)
    } else {
        const query = `UPDATE tbl_sertifikat_pegawai SET id_admin=${id_admin}, nama_sertifikat='${nama_sertifikat}',bukti_sertifikat='${bukti_sertifikat}' WHERE id_sertifikat_pg = ${id_sertifikatPg}`
        return dbConnection.execute(query)
    }
}

const deleteSertifikatPegawai = (id_sertifikatPg) => {
    const query = `DELETE FROM tbl_sertifikat_pegawai WHERE id_sertifikat_pg =${id_sertifikatPg}`
    return dbConnection.execute(query)
}

const getSingleSertifikat = (id_sertifikatPg) => {
    const query = `SELECT * FROM tbl_sertifikat_pegawai WHERE id_sertifikat_pg = ${id_sertifikatPg}`
    return dbConnection.execute(query)
}
const  getAllSertifikatByIdPegawai = (id_pegawai) => {
    const query = `SELECT * FROM tbl_sertifikat_pegawai WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}

module.exports = {
    addSertifikatPegawai,
    updateSertifikatPegawai,
    deleteSertifikatPegawai,
    getSingleSertifikat,
    getAllSertifikatByIdPegawai
}

