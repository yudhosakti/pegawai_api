const adminController = require('../controller/admin')

const express = require('express')

const router = express.Router()

router.get('/',adminController.getAllAdmin)
router.get('/single',adminController.getSingleAdmin)
router.get('/recent',adminController.getRecentUser)

router.get('/log',adminController.getLogUser)

router.post('/login',adminController.loginAdmin)

router.post('/login/image',adminController.loginAdminImage)

router.post('/register',adminController.addAdmin)

router.post('/insert',adminController.addUser)

router.put('/',adminController.updateAdmin)

router.put('/update',adminController.updateUser)

router.put('/status',adminController.deleteAdmin)



module.exports = router