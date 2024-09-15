const sifatModel = require('../models/sifat')

const pegawaiModel  =require('../models/pegawai')

const addKelebihanPegawai = async(req,response) => {
    const dataInsert = req.body
    try {
      const [data] = await pegawaiModel.getSinglePegawai(dataInsert.idPegawai)

      if (data.length == 0) {
        response.status(404).json({
            message: "Data Not Found"
        })
      } else {
         await sifatModel.addKelebihanPegawai(dataInsert.idPegawai,dataInsert.kelebihan,dataInsert.idAdmin).then((result) => {
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

const getSingleKelebihanPegawai = async(req,response) => {
    const id_sifat_pegawai = req.query.id_kelebihan

    try {
        const [data] = await sifatModel.getSingleKelebihanPegawai(id_sifat_pegawai)

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

const getAllKelebihanByIdPegawai = async(req,response) => {
    const idPegawai = req.query.idPegawai

    try {
      const [data] = await sifatModel.getAllKelebihanByIdPegawai(idPegawai)
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

const updateKelebihanPegawai = async(req,response) => {
    const dataInsert = req.body

    try {
        const [data] = await sifatModel.getSingleKelebihanPegawai(dataInsert.id_kelebihan)
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            await sifatModel.updateKelebihanPegawai(dataInsert.id_kelebihan,
                dataInsert.kelebihan,dataInsert.idAdmin).then((result) => {
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

const deleteKelebihanPegawai = async(req,response) => {
    const idupdateKelebihanPegawai = req.query.id_kelebihan

    try {
        const [data] = await sifatModel.getSingleKelebihanPegawai(idupdateKelebihanPegawai)
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            await sifatModel.deleteKelebihanPegawai(idupdateKelebihanPegawai).then((result) => {
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

const addKekuranganPegawai = async(req,response) => {
    const dataInsert = req.body
    try {
      const [data] = await pegawaiModel.getSinglePegawai(dataInsert.idPegawai)

      if (data.length == 0) {
        response.status(404).json({
            message: "Data Not Found"
        })
      } else {
         await sifatModel.addKekuranganPegawai(dataInsert.idPegawai,dataInsert.kekurangan,dataInsert.idAdmin).then((result) => {
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

const getSingleKekuranganPegawai = async(req,response) => {
    const id_sifat_pegawai = req.query.id_kekurangan

    try {
        const [data] = await sifatModel.getSingleKekuranganPegawai(id_sifat_pegawai)

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

const getAllKekuranganByIdPegawai = async(req,response) => {
    const idPegawai = req.query.idPegawai

    try {
      const [data] = await sifatModel.getAllKekuranganByIdPegawai(idPegawai)
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

const updateKekuranganPegawai = async(req,response) => {
    const dataInsert = req.body

    try {
        const [data] = await sifatModel.getSingleKekuranganPegawai(dataInsert.id_kekurangan)
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            await sifatModel.updateKekuranganPegawai(dataInsert.id_kekurangan,
                dataInsert.kekurangan,dataInsert.idAdmin).then((result) => {
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

const deleteKekuranganPegawai = async(req,response) => {
    const idupdateKelebihanPegawai = req.query.id_kekurangan

    try {
        const [data] = await sifatModel.getSingleKekuranganPegawai(idupdateKelebihanPegawai)
        if (data.length == 0) {
            response.status(404).json({
                message: "Data Not Found"
            })
        } else {
            await sifatModel.deleteKekuranganPegawai(idupdateKelebihanPegawai).then((result) => {
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
    addKelebihanPegawai,
    getSingleKelebihanPegawai,
    getAllKelebihanByIdPegawai,
    deleteKelebihanPegawai,
    updateKelebihanPegawai,
    addKekuranganPegawai,
    getAllKekuranganByIdPegawai,
    getSingleKekuranganPegawai,
    deleteKekuranganPegawai,
    updateKekuranganPegawai
}