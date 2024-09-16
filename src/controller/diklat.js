const diklatModel = require('../models/diklat')
const pegawaiModel = require('../models/pegawai')

const addDiklatPegawai = async(req,response) => {
    const dataInsert = req.body
    try {
      const [data] = await pegawaiModel.getSinglePegawai(dataInsert.idPegawai)

      if (data.length == 0) {
        response.status(404).json({
            message: "Data Not Found"
        })
      } else {
         await diklatModel.addDiklatPegawai(dataInsert.idPegawai,dataInsert.diklat,dataInsert.idAdmin).then((result) => {
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
    const idPegawai = req.query.idPegawai

    try {
      const [data] = await diklatModel.getAlldiklatByIdPegawai(idPegawai)
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

    try {
        const [data] = await diklatModel.getSingleDiklatPegawai(dataInsert.id_diklat)
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            await diklatModel.updateDiklatPegawai(dataInsert.id_diklat,
                dataInsert.diklat,dataInsert.idAdmin).then((result) => {
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