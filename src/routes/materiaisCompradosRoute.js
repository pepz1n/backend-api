const materiaisCompradosController = require('../controllers/materiaisCompradosController')


module.exports = (app) =>{
    app.get('/materiais-comprados', materiaisCompradosController.getAllmateriaisComprados)
    app.get('/materiais-comprados/:id', materiaisCompradosController.getmateriaisCompradosById)
    app.post('/materiais-comprados',materiaisCompradosController.postmateriaisComprados)
    app.delete('/materiais-comprados/:id', materiaisCompradosController.deletemateriaisComprados)
    app.patch('/materiais-comprados', materiaisCompradosController.patchmateriaisComprados)
}