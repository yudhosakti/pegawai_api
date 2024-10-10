const dbConnection = require('../config/koneksi')

const addDiklatPegawai = (id_pegawai,diklat,id_user,foto) => {
    if (foto == '') {
        const query = `INSERT INTO tbl_diklat_pegawai(id_pegawai,id_user,diklat,foto) 
    VALUES (${id_pegawai},${id_user},'${diklat},NULL)`
    return dbConnection.execute(query)
    }else{
        const query = `INSERT INTO tbl_diklat_pegawai(id_pegawai,id_user,diklat,foto) 
        VALUES (${id_pegawai},${id_user},'${diklat}','${foto}')`
        return dbConnection.execute(query)
    }
   
}

const getSingleDiklatPegawai = (id_sifat) => {
    const query = `SELECT * FROM tbl_diklat_pegawai WHERE id_diklat = ${id_sifat}`
    return dbConnection.execute(query)
}

const getAlldiklatByIdPegawai = (id_pegawai) => {
    const query =`SELECT * FROM tbl_diklat_pegawai WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}


const getAlldiklat = () => {
    const query =`SELECT * FROM tbl_diklat_pegawai`
    return dbConnection.execute(query)
}

const updateDiklatPegawai = (id_diklat,diklat,id_user,foto) => {
    if (foto == '') {
    const query = `UPDATE tbl_diklat_pegawai SET id_user= ${id_user}, diklat='${diklat}' WHERE id_diklat = ${id_diklat}`
    return dbConnection.execute(query)
    }else{
    const query = `UPDATE tbl_diklat_pegawai SET id_user= ${id_user}, diklat='${diklat}', foto = '${foto}' WHERE id_diklat = ${id_diklat}`
    return dbConnection.execute(query)
    }
    
}

const deleteDiklatPegawai = (id_diklat) => {
    const query = `DELETE FROM tbl_diklat_pegawai WHERE id_diklat = ${id_diklat}`
    return dbConnection.execute(query)
}

module.exports = {
    addDiklatPegawai,
    getSingleDiklatPegawai,
    getAlldiklatByIdPegawai,
    updateDiklatPegawai,
    deleteDiklatPegawai,
    getAlldiklat
}