//primerio passso e importar  dependencia do express para a criaçao do servidor
const express = require('express');

//criar constante que representa a nossa aplicação como um todo
// vamos chamar ela de 'app' e ela recebe a invocação do express
const app = express();
const db = require('./config/db');

//criação de rota que vai listar todos os cadastros
app.get('/pedreiros', async (req, res, Next) => {
    const sql = 'select nome, cpf, casado from construtor';
    const pedreiros = await db.query(sql);
    res.status(200).send({
        Quantidade: pedreiros.rowCount,
        Dados: [pedreiros.rows]
    })
});




//define-se em qual porta a aplicação vai rodar
// para isso usamos a função .listen(PORT , CALLBACK FUNCTIONS)
const PORT =process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando! na porta ${PORT}`);
});
