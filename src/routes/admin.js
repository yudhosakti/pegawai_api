const adminController = require('../controller/admin')

const express = require('express')

const router = express.Router()

router.get('/',adminController.getAllAdmin)
router.get('/recent',adminController.getRecentUser)

router.post('/login',adminController.loginAdmin)

router.post('/register',adminController.addAdmin)

router.post('/insert',adminController.addUser)

router.put('/',adminController.updateAdmin)

router.put('/status',adminController.deleteAdmin)



module.exports = router