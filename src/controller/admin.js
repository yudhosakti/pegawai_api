const adminModel = require('../models/admin')
const fs = require('fs');
const getAllAdmin = async(req,response)=> {
    try {
        const [data] = await adminModel.getAllAdmin()
        let dataFinal = []
        for (let index = 0; index < data.length; index++) {
            dataFinal.push({
                id_user: data[index].id_user,
                username: data[index].username,
                avatar: data[index].avatar
            })
            
        }

        response.json({
            data: dataFinal
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const loginAdmin = async(req,response) => {
    const  dataInsert = req.body
    try {
        const [data] = await adminModel.loginAdmin(dataInsert.email,dataInsert.password)

        if (data.length < 1) {
            response.status(404).json({
                message: "User Not Found"
        })
        } else {
          await adminModel.updateLoginTime(data[0].id_user).then(async(result) => {
            const [dataNew] = await adminModel.loginAdmin(dataInsert.email,dataInsert.password)
                response.json({
             data: dataNew[0]
          })  
          })
          
        }


        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const addAdmin = async(req,response) => {
    const dataInsert = req.body
    try {
        await adminModel.addAdmin(dataInsert.email,dataInsert.username,dataInsert.password).then((result) => {
            response.json({
                message: "Admin Added"
            })
            
        }).catch((err) => {
            response.status(500).json({
                message: err
        })
        });
        
    } catch (error) {
        response.status(500).json({
            message: error
    })
    }
}

const deleteAdmin = async(req,response) => {
    const idAdmin = req.query.id_user
    const dataInsert = req.query.status
    try {
        const [data] = await adminModel.getSingleAdmin(idAdmin)
        if (data.length == 0) {
            response.status(404).json({
                message: "User Not Found"
            })
        } else {
            await adminModel.deleteAdmin(idAdmin,dataInsert).then((result) => {
              response.json({
                message: "Admin Update Status Succes"
              })
            }).catch((err) => {
                response.status(500).json({
                    message: err
            })
            })
        }
        
        
    } catch (error) {
        response.status(500).json({
            message: error
    })
    }
}

const updateAdmin = async(req,response) => {
    const dataInsert = req.body
    let image = '';
    if (req.file) {
        image = req.file.path.replace(/\\/g, '/'); 
    }
    try {
        const [data] = await adminModel.getSingleAdmin(dataInsert.id_user)
        if (data.length == 0) {
            if (image != '') {
                let path = image
            fs.unlink(path,(err) => {
                if (err) {
                    console.log(err)
                    }else{
                    console.log("Berhasil Hapus")
                    }
                    })
            }
            response.status(404).json({
                message: "User Not Found"
            })
        } else {
            if (data[0].avatar != null && image != '') {
                let path = data[0].avatar
              fs.unlink(path,(err) => {
            if (err) {
                console.log(err)
                }else{
                console.log("Berhasil Hapus")
                }
                })
            }
            await adminModel.updateAdmin(dataInsert.id_user,image,dataInsert.username).then((result) => {
                 response.json({
                    message: "Update Success"
                 })
            })
        }
        
        
    } catch (error) {
        if (image != '') {
            let path = image
        fs.unlink(path,(err) => {
            if (err) {
                console.log(err)
                }else{
                console.log("Berhasil Hapus")
                }
                })
        }
        response.status(500).json({
            message: error
    })
    }
}

const getRecentUser = async(req,response) => {
    try {
        const [data] = await adminModel.getRecentUser()
        let dataFinal = []
        for (let index = 0; index < data.length; index++) {
            dataFinal.push({
                id_user: data[index].id_user,
                username: data[index].username,
                avatar: data[index].avatar
            })
            
        }

        response.json({
            data: dataFinal
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
    })
    }
}



module.exports = {
    getAllAdmin,
    loginAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getRecentUser
}