const construtorController = require('../controllers/construtorControlller')


module.exports = (app) =>{
    app.get('/construtor', construtorController.getAllConstrutores)
    app.get('/construtor/:id', construtorController.getConstrutorById)
    app.post('/construtor',construtorController.postConstrutor)
}