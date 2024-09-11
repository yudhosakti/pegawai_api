const pegawaiModel = require('../models/pegawai')
const fs = require('fs')
const globalFunc = require('../controller/global_function')

const addPegawai = async(req,response) => {
    const dataInsert = req.body
    let image = ''
    if (req.file) {
        image = req.file.path.replace(/\\/g, '/'); 
    }
    try {
        await pegawaiModel.addPegawai(dataInsert.id_admin,dataInsert.oldNip,dataInsert.newNip,dataInsert.nama,image,dataInsert.jenisKelamin,dataInsert.tempatLahir,dataInsert.tanggalLahir,dataInsert.pangkat,dataInsert.golongan,dataInsert.pendidikan,dataInsert.jabatan).then((result) => {
            const [data] = result
            console.log(data[0][0].id_pegawai
            )
            response.json({
                id: data[0][0].id_pegawai,
                messsage: "Data Insert Success"
            })
        })
        
    } catch (error) {
        response.status(500).json({
            messsage: error
        })
    }
}

const getAllPegawai = async(req,response) =>{
    try {
        const [data] = await pegawaiModel.getAllPegawai()

        response.json({
            data: data
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
                dataInsert.tanggalLahir,dataInsert.pangkat,dataInsert.golongan,dataInsert.pendidikan,dataInsert.jabatan,dataInsert.idAdmin).then((result) => {
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


module.exports = {
    addPegawai,
    deletePegawai,
    getAllPegawai,
    getSinglePegawai,
    updatePegawai
}