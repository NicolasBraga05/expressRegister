const router = require('express').Router()

const RegisterController = require('../controllers/RegisterController')

router.post('/', RegisterController.register)
router.post('/login', RegisterController.login)


module.exports = router