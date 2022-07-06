const FornecedorController = require('../controllers/fornecedorController')


module.exports = (app) =>{
    app.get('/fornecedor', FornecedorController.getAllFornecedor)
    app.get('/fornecedor/:id', FornecedorController.getFornecedorById)
    app.post('/fornecedor',FornecedorController.postFornecedor)
    app.delete('/fornecedor/:id', FornecedorController.deleteFornecedor)
    app.patch('/fornecedor', FornecedorController.patchFornecedor)
}