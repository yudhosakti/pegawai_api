const sifatController = require('../controller/sifat')

const express = require('express')

const router = express.Router()

router.get('/',sifatController.getAllSifatByIdPegawai)

router.get('/single',sifatController.getSingleSifatPegawai)

router.post('/',sifatController.addSifatPegawai)

router.put('/',sifatController.updateSifatPegawai)

router.delete('/',sifatController.deleteSifatPegawai)

module.exports = router