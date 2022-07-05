const { ClientBase } = require('pg')
const construtor = require('./construtorRote')

module.exports = (app) =>{
    construtor(app)
}