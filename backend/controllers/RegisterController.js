const Register = require('../models/Register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// helpers
const createUserToken = require('../helpers/create-user-token')


module.exports = class RegisterController{

    static async register(req, res) {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword
        const phone = req.body.phone
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const regexPhone = /^\d{11}$/

        if(!name) {
            res.status(422).json({message: 'O nome é obrigatorio!'})
            return
        }

        if(!email) {
            res.status(422).json({message: 'O email é obrigatorio!'})
            return
        }

        if(regexEmail.test(email)) {
            
        } else {
            res.status(400).json({message: 'O email é invalido, confirme se o dominio esta correto, por exemplo: teste@dominio.com'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'A senha é obrigatoria!'})
            return
        }

        if(!confirmpassword) {
            res.status(422).json({message: 'A confirmação de senha é obrigatoria!'})
            return
        }

        if(password !== confirmpassword) {
            res.status(400).json({message: 'A confirmação de senha precisa ser igual a senha!'})
        }

        if(!phone) {
            res.status(422).json({message: 'O telefone é obrigatorio!'})
            return
        }

        if(regexPhone.test(phone)) {
            
        } else {
            res.status(400).json({message: 'O numero de telefone é invalido, confirme se esta e acordo por exemplo: 11860437564'})
            return
        }

        // checando se o usuario existe
        const usuarioExistente = await Register.findOne({email: email})

        if(usuarioExistente) {
            res.status(400).json({message: 'Usuario ja cadastrado com esse endereço de email, favor usar outro!'})
            return
        }

        // criando a senha cryptografada
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // criando o usuario

        const usuario = new Register({
            name,
            email,
            password: passwordHash,
            phone,
        })

        try{
            const novoUsuario = await usuario.save()

            await createUserToken(novoUsuario, req, res)
        }catch(error) {
            res.status(500).json({message: error})
        }
    }

    static async login(req, res) {
        const email = req.body.email
        const password = req.body.password
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!email) {
            res.status(422).json({message: 'O email é obrigatorio!'})
            return
        }

        if(regexEmail.test(email)){

        } else {
            res.status(400).json({message: 'O endereço de email é invalido'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'A senha é obrigatoria!'})
            return
        }

        const usuario = await Register.findOne({email: email})

        if(!usuario) {
            res.status(400).json({message: 'Não existe usuario cadastrado com esse endereço de email!'})
            return
        }
        
        const checkPassword = await bcrypt.compare(password, usuario.password)

        if(!checkPassword) {
            res.status(400).json({message: 'A senha é invalida!'})
            return
        }

        await createUserToken(usuario, req, res)
    }
}

