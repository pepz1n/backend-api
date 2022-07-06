const empresaFornecedorService = require('../services/fornecedorService')


const getAllFornecedor = async (req, res) =>{
    try{
        const empresaConstrutor = await empresaFornecedorService.getAllFornecedor();
        res.status(200).send(empresaConstrutor)
    }catch (error){
        res.satus(500).send(error)

    }
}


const getFornecedorById = async (req, res) => {
    try {
        const Fornecedor = await empresaFornecedorService.getFornecedorById(req.params);
        res.status(200).send(Fornecedor)
    }catch (error){
        res.status(500).send(error)
    }
}

const postFornecedor = async (req, res) =>{
    try{
        const Fornecedor = await empresaFornecedorService.postFornecedor(req.body);
        res.status(201).send(Fornecedor);    
    }catch (error){
        res.status(500).send(error);
    }
}

const deleteFornecedor = async (req, res) =>{
    try{
        let deletado = await empresaFornecedorService.deleteFornecedor(req.params);
        let msg = deletado  
            ? `Empresa ${req.params.id} deletado com sucesso`
            : `Não foi encontrado nenhuma Empresa com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg })    
    }catch (error){
        res.status(500).send(error)
        
    }
}


const patchFornecedor = async (req, res ) => {
    try{
        const Fornecedor = await empresaFornecedorService.patchFornecedor(req.body);
        res.status(201).send(Fornecedor) 
    }catch (error){
        res.status(500).send(error)
    }
}



module.exports.getAllFornecedor = getAllFornecedor;
module.exports.getFornecedorById = getFornecedorById;
module.exports.postFornecedor = postFornecedor;
module.exports.deleteFornecedor = deleteFornecedor;
module.exports.patchFornecedor = patchFornecedor