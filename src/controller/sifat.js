const sifatModel = require('../models/sifat')

const pegawaiModel  =require('../models/pegawai')

const addSifatPegawai = async(req,response) => {
    const dataInsert = req.body
    try {
      const [data] = await pegawaiModel.getSinglePegawai(dataInsert.idPegawai)

      if (data.length == 0) {
        response.status(404).json({
            message: "Data Not Found"
        })
      } else {
         await sifatModel.addSifatPegawai(dataInsert.idPegawai,dataInsert.sifatPegawai,dataInsert.idAdmin).then((result) => {
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

const getSingleSifatPegawai = async(req,response) => {
    const id_sifat_pegawai = req.query.idSifatPegawai

    try {
        const [data] = await sifatModel.getSingleSifatPegawai(id_sifat_pegawai)

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

const getAllSifatByIdPegawai = async(req,response) => {
    const idPegawai = req.query.idPegawai

    try {
      const [data] = await sifatModel.getAllSifatByIdPegawai(idPegawai)
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

const updateSifatPegawai = async(req,response) => {
    const dataInsert = req.body

    try {
        const [data] = await sifatModel.getSingleSifatPegawai(dataInsert.idSifatPegawai)
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            await sifatModel.updateSifatPegawai(dataInsert.idSifatPegawai,dataInsert.sifatPegawai,dataInsert.idAdmin).then((result) => {
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

const deleteSifatPegawai = async(req,response) => {
    const idSifatPegawai = req.query.idSifatPegawai

    try {
        const [data] = await sifatModel.getSingleSifatPegawai(idSifatPegawai)
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            await sifatModel.deleteSifatPegawai(idSifatPegawai).then((result) => {
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
    addSifatPegawai,
    getSingleSifatPegawai,
    getAllSifatByIdPegawai,
    deleteSifatPegawai,
    updateSifatPegawai
}