const decisionController = require('../controller/decision')

const express = require('express')

const router = express.Router()

router.get('/',decisionController.getAllDecisionByIdUser)

router.get('/chat',decisionController.getAllChatByIdDecision)

router.post('/',decisionController.addChatDecision)

router.post('/chat',decisionController.addChatDecisionChat)

router.put('/',decisionController.updateDecisionTitle)

router.delete('/',decisionController.deleteDecision)


module.exports = router