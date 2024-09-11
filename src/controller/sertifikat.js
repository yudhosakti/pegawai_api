const sertifikatModel  = require('../models/sertifikat')
const globalFunc = require('../controller/global_function')
const fs = require('fs')
const pegawaiModel = require('../models/pegawai')


const addSertifikatPegawai = async(req,response) => {
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
                message: "Pegawai Not Found"
            })
        } else {
           await sertifikatModel.addSertifikatPegawai(dataInsert.id_pegawai,dataInsert.id_admin,dataInsert.nama_sertifikat,image).then((result) => {
            response.json({
                message: "Sertifikat Berhasil Ditambahkan"
            })
           }) 
        }
        
    } catch (error) {
        if (image != '') {
            globalFunc.hapusGambar(fs,image)
        }

        response.status(500).json({
            message: error
        })
    }
}

const getSingleSertifikat = async(req,response) => {
    const idSertifikat = req.query.idSertifikat

    try {
        const [data] = await sertifikatModel.getSingleSertifikat(idSertifikat)

        if (data.length == 0) {
            response.status(404).json({
                message: "Sertificate Not Found"
            })
        } else {
            response.json({
                data: data[0]
            })
        }
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const getAllSertifikatByIdPegawai = async(req,response) => {
    const idPegawai = req.query.idPegawai

    try {
        const [data] = await sertifikatModel.getAllSertifikatByIdPegawai(idPegawai)

        if (data.length == 0 ) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            response.json({
                data: data
            })
        }
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const updateSertifikatPegawai = async(req,response) => {
    const dataInsert = req.body
    let image = ''
    if (req.file) {
        image = req.file.path.replace(/\\/g, '/')
    }
    try {
        const [data] = await sertifikatModel.getSingleSertifikat(dataInsert.idSertifikat)

        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            if (image != '' && data[0].bukti_sertifikat != null) {
                globalFunc.hapusGambar(fs,data[0].bukti_sertifikat)
            }
            await sertifikatModel.updateSertifikatPegawai(dataInsert.idSertifikat,dataInsert.nama_sertifikat,image,dataInsert.id_admin).then((result) => {
                response.json({
                    message: "Update Success",
                    data : dataInsert
                })
            })
        }
        
    } catch (error) {
        globalFunc.hapusGambar(fs,image)
        response.status(500).json({
            message: error
        })
    }
}

const deleteSertifikatPegawai = async(req,response) => {
    const idSertifikat = req.query.idSertifikat

    try {

        const [data] = await sertifikatModel.getSingleSertifikat(idSertifikat)

        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            if (data[0].bukti_sertifikat != null) {
                globalFunc.hapusGambar(fs,data[0].bukti_sertifikat)
            }
            await sertifikatModel.deleteSertifikatPegawai(idSertifikat).then((result) => {
                response.json({
                    message: "Delete Data Success"
                })
            })
        }
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

module.exports = {
    addSertifikatPegawai,
    getAllSertifikatByIdPegawai,
    getSingleSertifikat,
    updateSertifikatPegawai,
    deleteSertifikatPegawai
}