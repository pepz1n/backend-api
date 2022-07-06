const empresaConstrutorService = require('../services/empresaConstrutorService')


const getAllEmpresaConstrutores = async (req, res) =>{
    try{
        const empresaConstrutor = await empresaConstrutorService.getAllEmpresaConstrutores();
        res.status(200).send(empresaConstrutor)
    }catch (error){
        res.satus(500).send(error)

    }
}


const getEmpresaConstrutorById = async (req, res) => {
    try {
        const empresaConstrutor = await empresaConstrutorService.getEmpresaConstrutorById(req.params);
        res.status(200).send(empresaConstrutor)
    }catch (error){
        res.status(500).send(error)
    }
}

const postEmpresaConstrutor = async (req, res) =>{
    try{
        const empresaConstrutor = await empresaConstrutorService.postEmpresaConstrutor(req.body);
        res.status(201).send(empresaConstrutor);    
    }catch (error){
        res.status(500).send(error);
    }
}

const deleteEmpresaConstrutor = async (req, res) =>{
    try{
        let deletado = await empresaConstrutorService.deleteEmpresaConstrutor(req.params);
        let msg = deletado  
            ? `Empresa ${req.params.id} deletado com sucesso`
            : `Não foi encontrado nenhuma Empresa com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg })    
    }catch (error){
        res.status(500).send(error)
        
    }
}


const patchEmpresaConstrutor = async (req, res ) => {
    try{
        const empresaConstrutor = await empresaConstrutorService.patchEmpresaConstrutor(req.body);
        res.status(201).send(empresaConstrutor) 
    }catch (error){
        res.status(500).send(error)
    }
}



module.exports.getAllEmpresaConstrutores = getAllEmpresaConstrutores;
module.exports.getEmpresaConstrutorById = getEmpresaConstrutorById;
module.exports.postEmpresaConstrutor = postEmpresaConstrutor;
module.exports.deleteEmpresaConstrutor = deleteEmpresaConstrutor;
module.exports.patchEmpresaConstrutor = patchEmpresaConstrutor