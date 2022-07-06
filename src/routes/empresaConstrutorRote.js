const empresaConstrutorController = require('../controllers/EmpresaConstrutorController')


module.exports = (app) =>{
    app.get('/empresa-construtor', empresaConstrutorController.getAllEmpresaConstrutores)
    app.get('/empresa-construtor/:id', empresaConstrutorController.getEmpresaConstrutorById)
    app.post('/empresa-construtor',empresaConstrutorController.postEmpresaConstrutor)
    app.delete('/empresa-construtor/:id', empresaConstrutorController.deleteEmpresaConstrutor)
    app.patch('/empresa-construtor', empresaConstrutorController.patchEmpresaConstrutor)
}