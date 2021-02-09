const express = require('express')
const router = express.Router()
const urlController = require('../app/controllers/urlController')

router.get('/urls', urlController.list)
router.post('/urls', urlController.create)
router.get('/urls/:id', urlController.show)
router.put('/urls/:id', urlController.update)
router.delete('/urls/:id', urlController.destroy)

router.get('/:hash', urlController.shift)

module.exports = router