const materiaisController = require('../controllers/materiaisController')


module.exports = (app) =>{
    app.get('/materiais', materiaisController.getAllmateriais)
    app.get('/materiais/:id', materiaisController.getmateriaisById)
    app.post('/materiais',materiaisController.postmateriais)
    app.delete('/materiais/:id', materiaisController.deletemateriais)
    app.patch('/materiais', materiaisController.patchmateriais)
}