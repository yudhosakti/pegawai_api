const adminModel = require('../models/admin')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const hostNetwork = require('../config/host')
const globalFunc = require('../controller/global_function')
require('dotenv').config()
const getAllAdmin = async(req,response)=> {
    try {
        const [data] = await adminModel.getAllAdmin()
        let dataFinal = []
        for (let index = 0; index < data.length; index++) {
            foto = ''
            if (data[index].avatar != null) {
                foto = hostNetwork.host+data[index].avatar
            }
            dataFinal.push({
                id_user: data[index].id_user,
                username: data[index].username,
                role: data[index].role,
                email: data[index].email,
                login_at : globalFunc.getDateTimeNow(data[index].login_at),
                avatar: foto
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
        console.log(data)
        if (data.length < 1) {
            response.status(404).json({
                message: "User Not Found"
        })
        } else {
          await adminModel.updateLoginTime(data[0].id_user).then(async(result) => {
            const [dataNew] = await adminModel.loginAdmin(dataInsert.email,dataInsert.password)
            let dataFinal = []
            foto = ''
            if (dataNew[0].avatar != null) {
                foto = hostNetwork.host+dataNew[0].avatar
            }
            const expired = 60 * 60 *24 * 7
            const payload = {
                id_user: dataNew[0].id_user
            }
            var token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: expired});
            console.log(token)
            dataFinal.push({
                id_user: dataNew[0].id_user,
                username: dataNew[0].username,
                role: dataNew[0].role,
                email: dataNew[0].email,
                login_at : globalFunc.getDateTimeNow(dataNew[0].login_at),
                avatar: foto
            })
            
            response.json({
             data: dataFinal[0],
             token: token
          })  
          })
          
        }


        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}


const loginAdminImage = async(req,response) => {
    const  dataInsert = req.body
    try {
        const [data] = await adminModel.loginAdminImage(dataInsert.email)
        console.log(data)
        if (data.length < 1) {
            response.status(404).json({
                message: "User Not Found"
        })
        } else {
          await adminModel.updateLoginTime(data[0].id_user).then(async(result) => {
            const [dataNew] = await adminModel.loginAdminImage(dataInsert.email)
            let dataFinal = []
            foto = ''
            if (dataNew[0].avatar != null) {
                foto = hostNetwork.host+dataNew[0].avatar
            }
            const expired = 60 * 60 *24 * 7
            const payload = {
                id_user: dataNew[0].id_user
            }
            var token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: expired});
            console.log(token)
            dataFinal.push({
                id_user: dataNew[0].id_user,
                username: dataNew[0].username,
                role: dataNew[0].role,
                email: dataNew[0].email,
                login_at : globalFunc.getDateTimeNow(dataNew[0].login_at),
                avatar: foto
            })
            
            response.json({
             data: dataFinal[0],
             token: token
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
            await adminModel.updateAdmin(dataInsert.id_user,image,dataInsert.username,dataInsert.email).then(async(result) => {

                const [updateData] = await adminModel.getSingleAdmin(dataInsert.id_user)
                 response.json({
                    message: "Update Success",
                    data: {
                        id_user: updateData[0].id_user,
                        username: updateData[0].username,
                        role: updateData[0].role,
                        email: updateData[0].email,
                        login_at : globalFunc.getDateTimeNow(updateData[0].login_at),
                        avatar: hostNetwork.host+updateData[0].avatar
                    }
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



const updateUser = async(req,response) => {
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
            await adminModel.updateUser(dataInsert.id_user,image,dataInsert.username,dataInsert.email,dataInsert.role).then(async(result) => {

                const [updateData] = await adminModel.getSingleAdmin(dataInsert.id_user)
                 response.json({
                    message: "Update Success",
                    data: {
                        id_user: updateData[0].id_user,
                        username: updateData[0].username,
                        role: updateData[0].role,
                        email: updateData[0].email,
                        login_at : globalFunc.getDateTimeNow(updateData[0].login_at),
                        avatar: hostNetwork.host+updateData[0].avatar
                    }
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
            foto = ''
            if (data[index].avatar != null) {
                foto = hostNetwork.host+data[index].avatar
            }
            dataFinal.push({
                id_user: data[index].id_user,
                username: data[index].username,
                role: data[index].role,
                email: data[index].email,
                login_at : globalFunc.getDateTimeNow(data[index].login_at),
                avatar: foto
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


const getLogUser = async(req,response) => {
    const dataId = req.query.id_user
    try {
        const [data] = await adminModel.getSingleAdmin(dataId)

        if (data.length == 0) {
            response.status(404).json({
                message: "User Not Found"
            })
        } else {
            role = data[0].role
            const [logData] = await adminModel.getLogUser(role,dataId)
            let dataFinal = []

            for (let index = 0; index < logData.length; index++) {
                dataFinal.push({
                    id_log: logData[index].id_log,
                    id_user: logData[index].id_user,
                    username: logData[index].username,
                    role: logData[index].role,
                    status: logData[index].status,
                    message: logData[index].message,
                    create_at: globalFunc.formatTanggal(logData[index].create_at)
                })
                
            }

            response.json({
                data: dataFinal
            })

        }
        
    } catch (error) {
        response.status(500).json({
            message: error
    })
    }
}


const addUser = async(req,response) => {
    const dataInsert = req.body
    let image = '';
    if (req.file) {
        image = req.file.path.replace(/\\/g, '/'); 
    }
    try {
        await adminModel.addUser(dataInsert.username,dataInsert.email,dataInsert.password,image,dataInsert.role).then((value) => {
            response.json({
                message: "Data Insert Success"
            })
        })
        
    } catch (error) {
        if (image != '') {
            globalFunc.hapusGambar(fs,image)
        }
        response.status(500).json({
            message: error
        })
    }
}

const getSingleAdmin = async(req,response)=> {
   const idAdmin = req.query.id_user
   
   try {

    const [data] = await adminModel.getSingleAdmin(idAdmin)

    if (data.length == 0) {
        response.status(404).json({
            message: "USer Not Found"
        })
    } else {
        let foto = ''
        if (data[0].avatar != null) {
            foto = hostNetwork.host+data[0].avatar
        }

        response.json({
            data: {
                id_user: data[0].id_user,
                username: data[0].username,
                role: data[0].role,
                email: data[0].email,
                password: data[0].password,
                login_at : globalFunc.getDateTimeNow(data[0].login_at),
                avatar: foto
            }
           
        })
    }
    
   } catch (error) {
      response.status(500).json({
        message : error
      })
   }
}



module.exports = {
    getAllAdmin,
    loginAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getRecentUser,
    addUser,
    getSingleAdmin,
    loginAdminImage,
    updateUser,
    getLogUser
}