const dbConnection = require('../config/koneksi')

const addSertifikatPegawai = (id_pegawai,id_user,sertifikat,foto)=> {
    if (foto == '') {
        const query = `INSERT INTO tbl_sertifikat_pegawai(id_pegawai,id_user, sertifikat, foto) 
   VALUES (${id_pegawai},${id_user},'${sertifikat}',${null})`
    return dbConnection.execute(query)
    }else{
        const query = `INSERT INTO tbl_sertifikat_pegawai(id_pegawai,id_user, sertifikat, foto) 
        VALUES (${id_pegawai},${id_user},'${sertifikat}','${foto}')`
         return dbConnection.execute(query)
    }
   
}

const updateSertifikatPegawai = (id_sertifikatPg, sertifikat,foto,id_user) => {
    if (foto == '') {
        const query = `UPDATE tbl_sertifikat_pegawai SET id_user=${id_user}, sertifikat='${sertifikat}' WHERE id_sertifikat = ${id_sertifikatPg}`
        return dbConnection.execute(query)
    } else {
        const query = `UPDATE tbl_sertifikat_pegawai SET id_user=${id_user}, sertifikat='${sertifikat}',foto='${foto}' WHERE id_sertifikat = ${id_sertifikatPg}`
        return dbConnection.execute(query)
    }
}

const deleteSertifikatPegawai = (id_sertifikatPg) => {
    const query = `DELETE FROM tbl_sertifikat_pegawai WHERE id_sertifikat =${id_sertifikatPg}`
    return dbConnection.execute(query)
}

const getSingleSertifikat = (id_sertifikatPg) => {
    const query = `SELECT * FROM tbl_sertifikat_pegawai WHERE id_sertifikat = ${id_sertifikatPg}`
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

