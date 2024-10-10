const dbConnection = require('../config/koneksi')

const addPegawai = (id_user,oldNip, newNip, namaPegawai, foto, jenisKelamin, tempatLahir, tglLahir, golongan, pendidikan, jabatan,pengalaman_jabatan,is_valid)=> {
   if (foto == '') {
    const query = `CALL tambah_pegawai(${id_user},${oldNip},${newNip},'${namaPegawai}',${null},'${jenisKelamin}','${tempatLahir}','${tglLahir}','${golongan}','${pendidikan}','${jabatan}','${pengalaman_jabatan}',${is_valid})`
    return dbConnection.execute(query)
   } else {
    const query = `CALL tambah_pegawai(${id_user},${oldNip},${newNip},'${namaPegawai}','${foto}','${jenisKelamin}','${tempatLahir}','${tglLahir}','${golongan}','${pendidikan}','${jabatan}','${pengalaman_jabatan}',${is_valid})`
    return dbConnection.execute(query)
   }
}

const updatePegawai = (id_pegawai,oldNip,newNip,namaPegawai,foto,jenisKelamin,tempatLahir,tanggalLahir,golongan,pendidikan,jabatan,id_user,pengalaman_jabatan)=> {
    if (foto == '') {
        const query = `UPDATE tbl_pegawai SET id_user = ${id_user},  old_nip=${oldNip},new_nip=${newNip},nama_pegawai='${namaPegawai}',jenis_kelamin='${jenisKelamin}',tempat_lahir='${tempatLahir}',tanggal_lahir='${tanggalLahir}',golongan='${golongan}',pendidikan='${pendidikan}',jabatan='${jabatan}',pengalaman_jabatan = '${pengalaman_jabatan}' WHERE id_pegawai = ${id_pegawai}`
        return dbConnection.execute(query)
    } else {
        const query = `UPDATE tbl_pegawai SET id_user = ${id_user}, old_nip=${oldNip},new_nip=${newNip},nama_pegawai='${namaPegawai}',foto='${foto}',jenis_kelamin='${jenisKelamin}',tempat_lahir='${tempatLahir}',tanggal_lahir='${tanggalLahir}',golongan='${golongan}',pendidikan='${pendidikan}',jabatan='${jabatan}',pengalaman_jabatan = '${pengalaman_jabatan}' WHERE id_pegawai = ${id_pegawai}`
        return dbConnection.execute(query)
    }
}

const validityPegawai = (id_pegawai,valid) => {
    const query = `UPDATE tbl_pegawai SET is_valid=${valid} WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}

const deletePegawai = (id_pegawai) => {
    const query = `DELETE FROM tbl_pegawai WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}

const getSinglePegawai =(id_pegawai) => {
    const query = `SELECT * FROM tbl_pegawai WHERE id_pegawai = ${id_pegawai} LIMIT 1`
    return dbConnection.execute(query)
}

const updateProfilePegawai = (id_pegawai,image) => {
    const query = `UPDATE tbl_pegawai SET foto='${image}' WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}

const getAllPegawai = () => {
    const query = `SELECT * FROM tbl_pegawai WHERE is_valid = 1`
    return dbConnection.execute(query)
}

const getAllValidatePegawai = () => {
    const query = `SELECT * FROM tbl_pegawai INNER JOIN tbl_user ON tbl_pegawai.id_user = tbl_user.id_user WHERE is_valid = 0`
    return dbConnection.execute(query)
}

const getRecentPegawai = () => {
    const query = `SELECT * FROM tbl_pegawai WHERE is_valid = 1 ORDER BY id_pegawai DESC LIMIT 5`
    return dbConnection.execute(query)
}

const searchPegawai = (nama_pegawai)=> {
   const query = `SELECT * FROM tbl_pegawai WHERE nama_pegawai LIKE '%${nama_pegawai}%'`
   return dbConnection.execute(query)
}





module.exports = {
    addPegawai,
    updatePegawai,
    deletePegawai,
    getSinglePegawai,
    getAllPegawai,
    searchPegawai,
    updateProfilePegawai,
    validityPegawai,
    getRecentPegawai,
    getAllValidatePegawai

}