const materiaisGastosService = require('../services/materiaisGastosService')


const getAllmateriaisGastos = async (req, res) =>{
    try{
        const materiaisGastos = await materiaisGastosService.getAllmateriaisGastos();
        res.status(200).send(materiaisGastos)
    }catch (error){
        res.satus(500).send(error)

    }
}


const getmateriaisGastosById = async (req, res) => {
    try {
        const materiaisGastos = await materiaisGastosService.getmateriaisGastosById(req.params);
        res.status(200).send(materiaisGastos)
    }catch (error){
        res.status(500).send(error)
    }
}

const postmateriaisGastos = async (req, res) =>{
    try{
        const materiaisGastos = await materiaisGastosService.postmateriaisGastos(req.body);
        res.status(201).send(materiaisGastos);    
    }catch (error){
        res.status(500).send(error);
    }
}

const deletemateriaisGastos = async (req, res) =>{
    try{
        let deletado = await materiaisGastosService.deletemateriaisGastos(req.params);
        let msg = deletado  
            ? `Material ${req.params.id} deletado com sucesso`
            : `Não foi encontrado nenhum material com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg })    
    }catch (error){
        res.status(500).send(error)
        
    }
}


const patchmateriaisGastos = async (req, res ) => {
    try{
        const materiaisGastos = await materiaisGastosService.patchmateriaisGastos(req.body);
        res.status(201).send(materiaisGastos) 
    }catch (error){
        res.status(500).send(error)
    }
}



module.exports.getAllmateriaisGastos = getAllmateriaisGastos;
module.exports.getmateriaisGastosById = getmateriaisGastosById;
module.exports.postmateriaisGastos = postmateriaisGastos;
module.exports.deletemateriaisGastos = deletemateriaisGastos;
module.exports.patchmateriaisGastos = patchmateriaisGastos