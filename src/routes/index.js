const { ClientBase } = require('pg')
const construtor = require('./construtorRote')
const empresaConstrutor = require('./empresaConstrutorRote')
const fornecedor = require('./fornecedorRoute')
const materiaisComprados = require('./materiaisCompradosRoute')
const materiaisGastos = require('./materiaisGastosRoute')
const materiais = require('./materiaisRoute')

module.exports = (app) =>{
    construtor(app),
    empresaConstrutor(app),
    fornecedor(app),
    materiais(app),
    materiaisComprados(app),
    materiaisGastos(app)
}