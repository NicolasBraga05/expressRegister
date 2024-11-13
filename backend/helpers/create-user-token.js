const jwt = require('jsonwebtoken')

const createUserToken = async(usuario, req, res) => {

    // create a token
    const token = jwt.sign({
        name: usuario.name,
        id: usuario._id
    }, 'nossosecret')

    // return a token 
    res.status(200).json({
        message: 'Voce esta autenticado',
        token: token,
        userId: usuario._id,
    })

}

module.exports = createUserToken