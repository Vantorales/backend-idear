const { response, request } = require('express');

const Usuario = require('../models/usuario');

const usuariosPost = async(req, res = response) => {
    try{
        
        const { nombre, apellido, nickname, email, contraseña } = req.body;

        const usuario = new Usuario({ nombre, apellido, nickname, email, contraseña });
        console.log("Guardando usuario");
        // Guardar en BD
        await usuario.save();
    
        res.status(200).json({
            creacionCorrecta: true,
            msg:"Usuario registrado."
        });

    }catch(e){
        console.log(e)
        res.status(500).json({
            creacionCorrecta: false,
            msg:"No se pudo registrar"
        });
    }
   
}

const usuariosGet = async(req = request, res = response) => {

    const usuarios = await Usuario.find()

res.json({ usuarios });
}

const usuarioGet = async(req, res =  response) => {

    const { nickname } = req.body;
    const usuario = await Usuario.find({ nickname });

    res.json({ usuario });
}

const deleteUsuario =  async(req, res = response) =>{
    const { id } = req.body;
    const usuario = await Usuario.findByIdAndDelete(id);
    res.json({
        usuario,
        msg:"Usuario eliminado"
    });
}

const updateUsuario = async(req, res) => {

    const { nombre, apellido, email, nickname, ...resto} = req.body;
    let dataUser  = await Usuario.find({ nickname });
    console.log(dataUser);
    const id = dataUser[0]._id;
    console.log(id);
    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json({
        usuario,
        msg: "Usuario editado"
    });
}


const verificarUsuario = async(req, res) => {

    const {email, contraseña} = req.body;
    const usuario = await Usuario.find( {email:email} );
    console.log("usuario "+ usuario[0].apellido);
    console.log("contraseña " + usuario[0].contraseña);

    console.log(contraseña);

    

    if(contraseña == usuario[0].contraseña){
        res.status(200).json({
            usuarioverificado:true,
            nickname: usuario[0].nickname
        });
    }else{
        res.status(500).json({
            usuarioverificado:false,
            nickname:""
        });
    }
    
}


module.exports = { 
    usuariosPost,
    usuariosGet,
    deleteUsuario,
    updateUsuario,
    usuarioGet,
    verificarUsuario
};