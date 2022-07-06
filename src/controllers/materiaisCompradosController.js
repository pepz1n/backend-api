const materiaisCompradosCompradosService = require('../services/materiaisCompradosService')


const getAllmateriaisComprados = async (req, res) =>{
    try{
        const materiaisComprados = await materiaisCompradosCompradosService.getAllmateriaisComprados();
        res.status(200).send(materiaisComprados)
    }catch (error){
        res.satus(500).send(error)

    }
}


const getmateriaisCompradosById = async (req, res) => {
    try {
        const materiaisComprados = await materiaisCompradosCompradosService.getmateriaisCompradosById(req.params);
        res.status(200).send(materiaisComprados)
    }catch (error){
        res.status(500).send(error)
    }
}

const postmateriaisComprados = async (req, res) =>{
    try{
        const materiaisComprados = await materiaisCompradosCompradosService.postmateriaisComprados(req.body);
        res.status(201).send(materiaisComprados);    
    }catch (error){
        res.status(500).send(error);
    }
}

const deletemateriaisComprados = async (req, res) =>{
    try{
        let deletado = await materiaisCompradosCompradosService.deletemateriaisComprados(req.params);
        let msg = deletado  
            ? `Material ${req.params.id} deletado com sucesso`
            : `Não foi encontrado nenhum material com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg })    
    }catch (error){
        res.status(500).send(error)
        
    }
}


const patchmateriaisComprados = async (req, res ) => {
    try{
        const materiaisComprados = await materiaisCompradosCompradosService.patchmateriaisComprados(req.body);
        res.status(201).send(materiaisComprados) 
    }catch (error){
        res.status(500).send(error)
    }
}



module.exports.getAllmateriaisComprados = getAllmateriaisComprados;
module.exports.getmateriaisCompradosById = getmateriaisCompradosById;
module.exports.postmateriaisComprados = postmateriaisComprados;
module.exports.deletemateriaisComprados = deletemateriaisComprados;
module.exports.patchmateriaisComprados = patchmateriaisComprados