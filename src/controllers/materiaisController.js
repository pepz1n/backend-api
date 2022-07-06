const materiaisService = require('../services/materiaisService')


const getAllmateriais = async (req, res) =>{
    try{
        const materiais = await materiaisService.getAllmateriais();
        res.status(200).send(materiais)
    }catch (error){
        res.satus(500).send(error)

    }
}


const getmateriaisById = async (req, res) => {
    try {
        const materiais = await materiaisService.getmateriaisById(req.params);
        res.status(200).send(materiais)
    }catch (error){
        res.status(500).send(error)
    }
}

const postmateriais = async (req, res) =>{
    try{
        const materiais = await materiaisService.postmateriais(req.body);
        res.status(201).send(materiais);    
    }catch (error){
        res.status(500).send(error);
    }
}

const deletemateriais = async (req, res) =>{
    try{
        let deletado = await materiaisService.deletemateriais(req.params);
        let msg = deletado  
            ? `Material ${req.params.id} deletado com sucesso`
            : `Não foi encontrado nenhum material com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg })    
    }catch (error){
        res.status(500).send(error)
        
    }
}


const patchmateriais = async (req, res ) => {
    try{
        const materiais = await materiaisService.patchmateriais(req.body);
        res.status(201).send(materiais) 
    }catch (error){
        res.status(500).send(error)
    }
}



module.exports.getAllmateriais = getAllmateriais;
module.exports.getmateriaisById = getmateriaisById;
module.exports.postmateriais = postmateriais;
module.exports.deletemateriais = deletemateriais;
module.exports.patchmateriais = patchmateriais