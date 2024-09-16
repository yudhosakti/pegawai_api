const dbConnection = require('../config/koneksi')

const addPegawai = (id_admin,oldNip, newNip, namaPegawai, foto, jenisKelamin, tempatLahir, tglLahir, pangkat, golongan, pendidikan, jabatan,pengalaman_jabatan)=> {
   if (foto == '') {
    const query = `CALL tambahPegawai(${id_admin},${oldNip},${newNip},'${namaPegawai}',${null},'${jenisKelamin}','${tempatLahir}','${tglLahir}','${pangkat}','${golongan}','${pendidikan}','${jabatan}','${pengalaman_jabatan}')`
    return dbConnection.execute(query)
   } else {
    const query = `CALL tambahPegawai(${id_admin},${oldNip},${newNip},'${namaPegawai}','${foto}','${jenisKelamin}','${tempatLahir}','${tglLahir}','${pangkat}','${golongan}','${pendidikan}','${jabatan}','${pengalaman_jabatan}')`
    return dbConnection.execute(query)
   }
}

const updatePegawai = (id_pegawai,oldNip,newNip,namaPegawai,foto,jenisKelamin,tempatLahir,tanggalLahir,pangkat,golongan,pendidikan,jabatan,id_admin,pengalaman_jabatan)=> {
    if (foto == '') {
        const query = `UPDATE tbl_pegawai SET id_admin = ${id_admin},  old_nip=${oldNip},new_nip=${newNip},nama_pegawai='${namaPegawai}',jenis_kelamin='${jenisKelamin}',tempat_lahir='${tempatLahir}',tanggal_lahir='${tanggalLahir}',pangkat='${pangkat}',golongan='${golongan}',pendidikan='${pendidikan}',jabatan='${jabatan}',pengalaman_jabatan = '${pengalaman_jabatan}' WHERE id_pegawai = ${id_pegawai}`
        return dbConnection.execute(query)
    } else {
        const query = `UPDATE tbl_pegawai SET id_admin = ${id_admin}, old_nip=${oldNip},new_nip=${newNip},nama_pegawai='${namaPegawai}',foto='${foto}',jenis_kelamin='${jenisKelamin}',tempat_lahir='${tempatLahir}',tanggal_lahir='${tanggalLahir}',pangkat='${pangkat}',golongan='${golongan}',pendidikan='${pendidikan}',jabatan='${jabatan}',pengalaman_jabatan = '${pengalaman_jabatan}' WHERE id_pegawai = ${id_pegawai}`
        return dbConnection.execute(query)
    }
}

const deletePegawai = (id_pegawai) => {
    const query = `DELETE FROM tbl_pegawai WHERE id_pegawai = ${id_pegawai}`
    return dbConnection.execute(query)
}

const getSinglePegawai =(id_pegawai) => {
    const query = `SELECT * FROM tbl_pegawai WHERE id_pegawai = ${id_pegawai} LIMIT 1`
    return dbConnection.execute(query)
}

const getAllPegawai = () => {
    const query = `SELECT * FROM tbl_pegawai`
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
    searchPegawai

}