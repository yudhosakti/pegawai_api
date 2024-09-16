const dikaltController = require('../controller/diklat')

const express = require('express')

const router = express.Router()

router.get('/',dikaltController.getAlldiklatByIdPegawai)

router.get('/single',dikaltController.getSingleDiklatPegawai)

router.post('/',dikaltController.addDiklatPegawai)

router.put('/',dikaltController.updategetSingleDiklatPegawai)

router.delete('/',dikaltController.deleteDiklatPegawai)

module.exports = router