const construtorService = require('../services/construtorService')


const getAllConstrutores = async (req, res) =>{
    try{
        const construtor = await construtorService.getAllConstrutores();
        res.status(200).send(construtor)
    }catch (error){
        res.satus(500).send(error)

    }
}


const getConstrutorById = async (req, res) => {
    try {
        const construtor = await construtorService.getConstrutorById(req.params);
        res.status(200).send(construtor)
    }catch (error){
        res.status(500).send(error)
    }
}

const postConstrutor = async (req, res) =>{
    try{
        const construtor = await construtorService.postConstrutor(req.body);
        res.status(201).send(construtor);    
    }catch (error){
        res.status(500).send(error);
    }
}


module.exports.getAllConstrutores = getAllConstrutores;
module.exports.getConstrutorById = getConstrutorById;
module.exports.postConstrutor = postConstrutor;