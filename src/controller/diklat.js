const diklatModel = require('../models/diklat')
const pegawaiModel = require('../models/pegawai')
const fs = require('fs')
const globalFunc = require('../controller/global_function')

const addDiklatPegawai = async(req,response) => {
    const dataInsert = req.body
    let image = ''
    if (req.file) {
        image = req.file.path.replace(/\\/g, '/')
    }
    try {
      const [data] = await pegawaiModel.getSinglePegawai(dataInsert.id_pegawai)

      if (data.length == 0) {
        response.status(404).json({
            message: "Data Not Found"
        })
      } else {
         await diklatModel.addDiklatPegawai(dataInsert.id_pegawai,dataInsert.diklat,dataInsert.id_user,image).then((result) => {
            response.json({
                message: "Add Data Success"
            })
         })
      }

        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const getSingleDiklatPegawai = async(req,response) => {
    const id_sifat_pegawai = req.query.id_diklat

    try {
        const [data] = await diklatModel.getSingleDiklatPegawai(id_sifat_pegawai)

        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
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
}}

const getAlldiklatByIdPegawai = async(req,response) => {
    const id_pegawai = req.query.id_pegawai

    try {
      const [data] = await diklatModel.getAlldiklatByIdPegawai(id_pegawai)
      if (data.length == 0) {
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

const updategetSingleDiklatPegawai = async(req,response) => {
    const dataInsert = req.body
    let image = ''
    if (req.file) {
        image = req.file.path.replace(/\\/g, '/')
    }
    try {
        const [data] = await diklatModel.getSingleDiklatPegawai(dataInsert.id_diklat)
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            if (data[0].foto != null && image != '') {
                globalFunc.hapusGambar(fs,data[0].foto)
            }
            await diklatModel.updateDiklatPegawai(dataInsert.id_diklat,
                dataInsert.diklat,dataInsert.id_user,image).then((result) => {
                response.json({
                    message: "Data Updated"
                })
            })
        }
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const deleteDiklatPegawai = async(req,response) => {
    const idupdategetSingleDiklatPegawai = req.query.id_diklat
    try {
        const [data] = await diklatModel.getSingleDiklatPegawai(idupdategetSingleDiklatPegawai)
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            if (data[0].foto != null) {
                globalFunc.hapusGambar(fs,data[0].foto)
            }
            await diklatModel.deleteDiklatPegawai(idupdategetSingleDiklatPegawai).then((result) => {
                response.json({
                    message: "Data Deletion Success"
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
    addDiklatPegawai,
    deleteDiklatPegawai,
    getAlldiklatByIdPegawai,
    getSingleDiklatPegawai,
    updategetSingleDiklatPegawai
}