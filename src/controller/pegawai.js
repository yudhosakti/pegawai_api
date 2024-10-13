const pegawaiModel = require('../models/pegawai')
const fs = require('fs')
const globalFunc = require('../controller/global_function')
const sifatModel = require('../models/sifat')
const sertifikatModel = require('../models/sertifikat')
const diklatModel = require('../models/diklat')
const hostNetwork = require('../config/host')
const userModel = require('../models/admin')

const addPegawai = async(req,response) => {
    const dataInsert = req.body
    let image = ''
    let is_valid = 0
    if (req.file) {
        image = req.file.path.replace(/\\/g, '/'); 
    }
    try {

        const [data] = await userModel.getSingleAdmin(dataInsert.id_user)
        if (data.length == 0) {
            response.status(404).json({
                messsage: "User Not Found"
            })
        } else {
            if (data[0].role == 'Admin') {
                is_valid = 1
            }

            await pegawaiModel.addPegawai(dataInsert.id_user,dataInsert.oldNip,dataInsert.newNip,dataInsert.nama,image,dataInsert.jenisKelamin,dataInsert.tempatLahir,dataInsert.tanggalLahir,dataInsert.golongan,dataInsert.pendidikan,dataInsert.jabatan,dataInsert.pengalamanJabatan,is_valid).then((result) => {
                const [data] = result
                console.log(data[0][0].id_pegawai
                )
                response.json({
                    id: data[0][0].id_pegawai,
                    messsage: "Data Insert Success"
                })
            })
        }
        
       
        
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}

const getAllPegawai = async(req,response) =>{
    try {
        const [data] = await pegawaiModel.getAllPegawai()
        let dataFinal = []
        for (let index = 0; index < data.length; index++) {
            var jenis_kelamin = ''
            var foto = ''
            if (data[index].jenis_kelamin == 'L') {
                jenis_kelamin = "Laki-Laki"
            } else {
                jenis_kelamin = "Perempuan"
            }
            if (data[index].foto != null) {
                foto = hostNetwork.host+data[index].foto
            }
            dataFinal.push({
                "id_pegawai" : data[index].id_pegawai,
                "old_nip" : data[index].old_nip,
                "new_nip" : data[index].new_nip,
                "nama_pegawai" : data[index].nama_pegawai,
                "foto" : foto, 
                "jenis_kelamin" : jenis_kelamin,
                "tempat_lahir" : data[index].tempat_lahir,
                "tanggal_lahir" : globalFunc.formatTanggal(data[index].tanggal_lahir),
                "pangkat" : data[index].pangkat,
                "golongan" : data[index].golongan,
                "pendidikan" : data[index].pendidikan,
                "jabatan" : data[index].jabatan,
                "pengalaman_jabatan" : data[index].pengalaman_jabatan,
                "is_valid" : data[index].is_valid
            })
            
        }
        
        response.json({
            data: dataFinal
        })
        
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}


const getAllValidatePegawai = async(req,response) =>{
    try {
        const [data] = await pegawaiModel.getAllValidatePegawai()
        let dataFinal = []
        for (let index = 0; index < data.length; index++) {
            var jenis_kelamin = ''
            var foto = ''
            if (data[index].jenis_kelamin == 'L') {
                jenis_kelamin = "Laki-Laki"
            } else {
                jenis_kelamin = "Perempuan"
            }
            if (data[index].foto != null) {
                foto = hostNetwork.host+data[index].foto
            }
            dataFinal.push({
                "id_pegawai" : data[index].id_pegawai,
                "old_nip" : data[index].old_nip,
                "new_nip" : data[index].new_nip,
                "nama_pegawai" : data[index].nama_pegawai,
                "foto" : foto, 
                "jenis_kelamin" : jenis_kelamin,
                "tempat_lahir" : data[index].tempat_lahir,
                "tanggal_lahir" : globalFunc.formatTanggal(data[index].tanggal_lahir),
                "pangkat" : data[index].pangkat,
                "golongan" : data[index].golongan,
                "pendidikan" : data[index].pendidikan,
                "jabatan" : data[index].jabatan,
                "pengalaman_jabatan" : data[index].pengalaman_jabatan,
                "is_valid" : data[index].is_valid,
                "create_by" : data[index].username
            })
            
        }
        
        response.json({
            data: dataFinal
        })
        
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}

const getSinglePegawai = async(req,response) => {
    const id_pegawai = req.query.id_pegawai
    try {
        const [data] = await pegawaiModel.getSinglePegawai(id_pegawai)
        if (data.length == 0) {
            response.status(404).json({
                messsage: "User Not Found"
            })
        } else {
            response.json({
                data: data[0]
            })
        }
        
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}

const deletePegawai  = async(req,response) => {
    const id_pegawai = req.query.id_pegawai

    try {

        const [data] = await pegawaiModel.getSinglePegawai(id_pegawai)

        if (data.length == 0) {
            response.status(404).json({
                messsage: "User Not Found"
            })
        } else {
            if (data[0].foto != null) {
                globalFunc.hapusGambar(fs,data[0].foto)
            }
            await pegawaiModel.deletePegawai(id_pegawai).then((result) => {
                response.json({
                    messsage: "Delete User Success"
                })
            })
        }
        
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}

const updatePegawai = async(req,response) => {
    const dataInsert = req.body
    let image = ''
    if (req.file) {
        image = req.file.path.replace(/\\/g, '/')
    }
    try {
        const [data] = await pegawaiModel.getSinglePegawai(dataInsert.id_pegawai)

        if (data.length == 0) {
            if (image != '') {
                globalFunc.hapusGambar(fs,image)
            }
            response.status(404).json({
                messsage: "User Not Found"
            })
        } else {
            if (data[0].foto != null && image != '') {
                globalFunc.hapusGambar(fs,data[0].foto)
            }
            await pegawaiModel.updatePegawai(dataInsert.id_pegawai,
                dataInsert.oldNip,dataInsert.newNip,dataInsert.namaPegawai,
                image,dataInsert.jenisKelamin,dataInsert.tempatLahir,
                dataInsert.tanggalLahir,dataInsert.golongan,dataInsert.pendidikan,dataInsert.jabatan,dataInsert.id_user,dataInsert.pengalamanJabatan).then((result) => {
                response.json({
                    messsage: "Data Update Success"
                })
            })
        }
        
    } catch (error) {
        if (image  != '') {
            globalFunc.hapusGambar(fs,image)
        }
    }
}

const updateValidtyPegawai = async(req,response) => {
     const dataInsert = req.body
     let is_valid = 0
     try {

        const [data] = await userModel.getSingleAdmin(dataInsert.id_user)

        if (data.length == 0) {
            response.status(404).json({
                messsage: "User Not Found"
            })
        } else {
            if (data[0].role == 'Admin') {
                is_valid = 1
            }

            await pegawaiModel.validityPegawai(dataInsert.id_pegawai,is_valid).then((value) => {
                response.json({
                    messsage: "Update Success"
                })
            })
        }
        
     } catch (error) {
        response.status(500).json({
            messsage: error
        })
     }
}

const getDetailPegawaiFull = async(req,response) => {
    const idPegawai = req.query.id_pegawai
    try {
        const [dataFullPegawai] = await pegawaiModel.getSinglePegawai(idPegawai)
        const [kelebihanPegawai] = await sifatModel.getAllKelebihanByIdPegawai(idPegawai)
        const [kekuranganPegawai] = await sifatModel.getAllKekuranganByIdPegawai(idPegawai)
        const [diklatPegawai] = await diklatModel.getAlldiklatByIdPegawai(idPegawai)
        const [sertifikatPegawai] = await sertifikatModel.getAllSertifikatByIdPegawai(idPegawai)

        if (dataFullPegawai.length == 0) {
            response.status(404).json({
                messsage: "Data Not Found"
            })
        } else {
            var jenis_kelamin = ''
            var foto = ''
            if (dataFullPegawai[0].jenis_kelamin == 'L') {
                jenis_kelamin = "Laki-Laki"
            } else {
                jenis_kelamin = "Perempuan"
            }
            if (dataFullPegawai[0].foto != null) {
                foto = hostNetwork.host+dataFullPegawai[0].foto
            }
            response.json({
                data: {
                    "id_pegawai" : dataFullPegawai[0].id_pegawai,
                    "old_nip" : dataFullPegawai[0].old_nip,
                    "new_nip" : dataFullPegawai[0].new_nip,
                    "nama_pegawai" : dataFullPegawai[0].nama_pegawai,
                    "foto" : foto, 
                    "jenis_kelamin" : jenis_kelamin,
                    "tempat_lahir" : dataFullPegawai[0].tempat_lahir,
                    "tanggal_lahir" : globalFunc.formatTanggal(dataFullPegawai[0].tanggal_lahir),
                    "golongan" : dataFullPegawai[0].golongan,
                    "pendidikan" : dataFullPegawai[0].pendidikan,
                    "jabatan" : dataFullPegawai[0].jabatan,
                    "pengalaman_jabatan" : dataFullPegawai[0].pengalaman_jabatan,
                    "is_valid" : dataFullPegawai[0].is_valid,
                    "kelebihan" : kelebihanPegawai,
                    "kekurangan" : kekuranganPegawai,
                    "diklat" : diklatPegawai,
                    "sertifikat" : sertifikatPegawai
                }
            })
        }
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}

const getSearchPegawaiByName = async(req,response) => {
    const namaPegawai = req.query.nama
    try {
        const [data] = await pegawaiModel.searchPegawai(namaPegawai)
        let dataFinal = []

        if (data.length == 0) {
            response.status(404).json({
                messsage: "Data Not Found"
            })
        } else {
            for (let index = 0; index < data.length; index++) {
                var jenis_kelamin = ''
                var foto = ''
                if (data[index].jenis_kelamin == 'L') {
                    jenis_kelamin = "Laki-Laki"
                } else {
                    jenis_kelamin = "Perempuan"
                }
                if (data[index].foto != null) {
                    foto = hostNetwork.host+data[0].foto
                }
                dataFinal.push({
                    "id_pegawai" : data[index].id_pegawai,
                    "old_nip" : data[index].old_nip,
                    "new_nip" : data[index].new_nip,
                    "nama_pegawai" : data[index].nama_pegawai,
                    "foto" : foto, 
                    "jenis_kelamin" : jenis_kelamin,
                    "tempat_lahir" : data[index].tempat_lahir,
                    "tanggal_lahir" : globalFunc.formatTanggal(data[index].tanggal_lahir),
                    "golongan" : data[index].golongan,
                    "pendidikan" : data[index].pendidikan,
                    "jabatan" : data[index].jabatan,
                    "pengalaman_jabatan" : data[index].pengalaman_jabatan,
                    "is_valid" : data[index].is_valid
                })
                
            }
            response.json({
                data: dataFinal
            })
        }
        
    } catch (error) {
         response.status(500).json({
            messsage: error
        })
    }
}

const updateProfilePegawai = async(req,response) => {
    const dataInsert = req.body
    try {
        if (req.file) {
            await pegawaiModel.updateProfilePegawai(dataInsert.idPegawai,req.file.path.replace(/\\/g, '/')).then((result) => {
                response.json({
                    messsage: "Success"
                })
            })
            
        } else {
            response.status(500).json({
                messsage: "No Image Selected"
            })
        }

        
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}

const getRecentPegawai = async(req,response) => {
    try {
        const [data] = await pegawaiModel.getRecentPegawai()
        let dataFinal = []
        for (let index = 0; index < data.length; index++) {
            var jenis_kelamin = ''
            var foto = ''
            if (data[index].jenis_kelamin == 'L') {
                jenis_kelamin = "Laki-Laki"
            } else {
                jenis_kelamin = "Perempuan"
            }
            if (data[index].foto != null) {
                foto = hostNetwork.host+data[index].foto
            }
            dataFinal.push({
                "id_pegawai" : data[index].id_pegawai,
                "old_nip" : data[index].old_nip,
                "new_nip" : data[index].new_nip,
                "nama_pegawai" : data[index].nama_pegawai,
                "foto" : foto, 
                "jenis_kelamin" : jenis_kelamin,
                "tempat_lahir" : data[index].tempat_lahir,
                "tanggal_lahir" : globalFunc.formatTanggal(data[index].tanggal_lahir),
                "golongan" : data[index].golongan,
                "pendidikan" : data[index].pendidikan,
                "jabatan" : data[index].jabatan,
                "pengalaman_jabatan" : data[index].pengalaman_jabatan,
                "is_valid" : data[index].is_valid
            })
            
        }
    
        response.json({
            data: dataFinal
        })
        
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}

const getAllPegawaiDetail = async(req,response) => {
    try {

        const [dataPegawai] = await pegawaiModel.getAllPegawai()

        const [kelebihanPegawai] =await sifatModel.getAllKelebihanPegawai()

        const [kekuranganPegawai] = await sifatModel.getAllKekuranganPegawai()

        const [diklatPegawai] = await diklatModel.getAlldiklat()

        const [sertifikatPegawai] = await sertifikatModel.getAllSertifikat()

        let dataFinal = []

        let kelebihanTemp = []

        let pegawaiTemp = []

        let kelemahanTemp = []

        let diklatTemp = []

        let sertifikatTemp = []


        for (let index = 0; index < dataPegawai.length; index++) {
            var jenis_kelamin = ''
            var foto = ''
            if (dataPegawai[index].jenis_kelamin == 'L') {
                jenis_kelamin = "Laki-Laki"
            } else {
                jenis_kelamin = "Perempuan"
            }
            if (dataPegawai[index].foto != null) {
                foto = hostNetwork.host+dataPegawai[index].foto
            }
            pegawaiTemp.push({
                "id_pegawai" : dataPegawai[index].id_pegawai,
            })
            for (let index = 0; index < kelebihanPegawai.length; index++) {
                 
                if (pegawaiTemp[0].id_pegawai == kelebihanPegawai[index].id_pegawai) {
                    kelebihanTemp.push(kelebihanPegawai[index])
                }
                
            }


            for (let index = 0; index < kekuranganPegawai.length; index++) {
                 
                if (pegawaiTemp[0].id_pegawai == kekuranganPegawai[index].id_pegawai) {
                    kelemahanTemp.push(kekuranganPegawai[index])
                }
                
            }

            for (let index = 0; index < diklatPegawai.length; index++) {
                 
                if (pegawaiTemp[0].id_pegawai == diklatPegawai[index].id_pegawai) {
                    diklatTemp.push(diklatPegawai[index])
                }
                
            }
            for (let index = 0; index < sertifikatPegawai.length; index++) {
                 
                if (pegawaiTemp[0].id_pegawai == sertifikatPegawai[index].id_pegawai) {
                    sertifikatTemp.push(sertifikatPegawai[index])
                }
                
            }

            dataFinal.push({
                "id_pegawai" : dataPegawai[index].id_pegawai,
                "old_nip" : dataPegawai[index].old_nip,
                "new_nip" : dataPegawai[index].new_nip,
                "nama_pegawai" : dataPegawai[index].nama_pegawai,
                "foto" : foto, 
                "jenis_kelamin" : jenis_kelamin,
                "tempat_lahir" : dataPegawai[index].tempat_lahir,
                "tanggal_lahir" : globalFunc.formatTanggal(dataPegawai[index].tanggal_lahir),
                "golongan" : dataPegawai[index].golongan,
                "pendidikan" : dataPegawai[index].pendidikan,
                "jabatan" : dataPegawai[index].jabatan,
                "pengalaman_jabatan" : dataPegawai[index].pengalaman_jabatan,
                "is_valid" : dataPegawai[index].is_valid,
                "kelebihan" : kelebihanTemp,
                "kekurangan" : kelemahanTemp,
                "diklat" : diklatTemp,
                "sertifikat" : sertifikatTemp
            })
        kelebihanTemp = []

        pegawaiTemp = []

        kelemahanTemp = []

        diklatTemp = []

        sertifikatTemp = []
            
        }

        response.json({
            data: dataFinal
        })
        
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}


module.exports = {
    addPegawai,
    deletePegawai,
    getAllPegawai,
    getSinglePegawai,
    updatePegawai,
    getDetailPegawaiFull,
    getSearchPegawaiByName,
    updateProfilePegawai,
    updateValidtyPegawai,
    getRecentPegawai,
    getAllValidatePegawai,
    getAllPegawaiDetail
}