const materiaisGastosController = require('../controllers/materiaisGastosController')


module.exports = (app) =>{
    app.get('/materiais-gastos', materiaisGastosController.getAllmateriaisGastos)
    app.get('/materiais-gastos/:id', materiaisGastosController.getmateriaisGastosById)
    app.post('/materiais-gastos',materiaisGastosController.postmateriaisGastos)
    app.delete('/materiais-gastos/:id', materiaisGastosController.deletemateriaisGastos)
    app.patch('/materiais-gastos', materiaisGastosController.patchmateriaisGastos)
}