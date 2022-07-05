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

const deleteConstrutor = async (req, res) =>{
    try{
        let deletado = await construtorService.deleteConstrutor(req.params);
        let msg = deletado  
            ? `Cliente ${req.params.id} deletado com sucesso`
            : `Não foi encontrado nenhum cliente com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg })    
    }catch (error){
        res.status(500).send(error)
        
    }
}


const patchConstrutor = async (req, res ) => {
    try{
        const construtor = await construtorService.patchConstrutor(req.body);
        res.status(201).send(construtor) 
    }catch (error){
        res.status(500).send(error)
    }
}



module.exports.getAllConstrutores = getAllConstrutores;
module.exports.getConstrutorById = getConstrutorById;
module.exports.postConstrutor = postConstrutor;
module.exports.deleteConstrutor = deleteConstrutor;
module.exports.patchConstrutor = patchConstrutor