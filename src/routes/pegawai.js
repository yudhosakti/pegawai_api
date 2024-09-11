const pegawaiController = require('../controller/pegawai')

const express = require('express')

const router = express.Router()

router.post('/',pegawaiController.addPegawai)

router.get('/',pegawaiController.getAllPegawai)

router.get('/single', pegawaiController.getSinglePegawai)

router.put('/',pegawaiController.updatePegawai)

router.delete('/',pegawaiController.deletePegawai)

module.exports = router