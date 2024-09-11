const sertifikatController = require('../controller/sertifikat')

const express = require('express')

const router = express.Router()

router.get('/',sertifikatController.getAllSertifikatByIdPegawai)

router.get('/single',sertifikatController.getSingleSertifikat)

router.post('/',sertifikatController.addSertifikatPegawai)

router.put('/',sertifikatController.updateSertifikatPegawai)

router.delete('/',sertifikatController.deleteSertifikatPegawai)

module.exports = router