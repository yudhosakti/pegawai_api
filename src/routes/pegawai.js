const pegawaiController = require('../controller/pegawai')

const express = require('express')

const router = express.Router()

router.post('/',pegawaiController.addPegawai)

router.get('/',pegawaiController.getAllPegawai)

router.get('/single', pegawaiController.getSinglePegawai)

router.get('/search', pegawaiController.getSearchPegawaiByName)

router.get('/detail', pegawaiController.getDetailPegawaiFull)

router.put('/',pegawaiController.updatePegawai)

router.put('/profile',pegawaiController.updateProfilePegawai)
router.put('/valid',pegawaiController.updateValidtyPegawai)

router.delete('/',pegawaiController.deletePegawai)

module.exports = router