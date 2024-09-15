const sifatController = require('../controller/sifat')

const express = require('express')

const router = express.Router()

router.get('/kelebihan',sifatController.getAllKelebihanByIdPegawai)

router.get('/kelebihan/single',sifatController.getSingleKelebihanPegawai)

router.post('/kelebihan',sifatController.addKelebihanPegawai)

router.put('/kelebihan',sifatController.updateKelebihanPegawai)

router.delete('/kelebihan',sifatController.deleteKelebihanPegawai)

router.get('/kekurangan',sifatController.getAllKekuranganByIdPegawai)

router.get('/kekurangan/single',sifatController.getSingleKekuranganPegawai)

router.post('/kekurangan',sifatController.addKekuranganPegawai)

router.put('/kekurangan',sifatController.updateKekuranganPegawai)

router.delete('/kekurangan',sifatController.deleteKekuranganPegawai)

module.exports = router