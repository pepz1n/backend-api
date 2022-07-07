const db = require('../config/db')

//consultar cliente
const getAllmateriaisGastos = async () => {
    let sql = 'select * from materiais_gastos';
    let materiaisGastos = await db.query(sql);
    return materiaisGastos.rows;
}


//consultar por id
const getmateriaisGastosById = async (params) =>{
    let sql = `select * from materiais_gastos where id = $1`;
    let materiaisGastos = await db.query(sql, [params.id]);
    return materiaisGastos.rows;
}

//inserir novo cadastro de material gasto
const persistirMateriaisGastos = async (params) =>{
    //função para pegar o estoque atual e reduir pelo gasto
    const updateEstoque = async (quantidade,id_material) =>{
        let sql = `select 
                    quantidade_estoque 
                   from materiais 
                   where id = $1
                   `;
        let estoqueAtual = await db.query(sql,[id_material])
        estoqueAtual = estoqueAtual.rows[0].quantidade_estoque;
        let estoqueDepoisUso = estoqueAtual - quantidade;
        if(estoqueDepoisUso>=0){
            return estoqueDepoisUso;
        }else{
            return 0;
        }
    }
    //INSERT DOS MATERIAIS GASTOS NO 'MATERIAIS_GASTOS'
    let {quantidade_gasto,id_materiais, id_construtor} = params;
    let estoqueNovo = await updateEstoque(quantidade_gasto,id_materiais);
    let sql = `
        insert into materiais_gastos(
            quantidade_gasto,
            id_materiais,
            id_construtor
        ) values ($1, $2, $3)`;
    await db.query(sql, [quantidade_gasto, id_materiais, id_construtor]);

    //select do nome do construtor com o id 'id_construtor'
    let sql3 = `select
                nome
                from construtor
                where id= $1`
    let nomeConstrutor = await db.query (sql3, [id_construtor])
    nomeConstrutor = nomeConstrutor.rows[0].nome

    //update da tabela materiais com o valor novo
    let sql2 = `update materiais set 
                    quantidade_estoque = $1 
                where id = $2 returning nome, quantidade_estoque`
    let insert = await db.query (sql2, [estoqueNovo, id_materiais])
    //return com a mensagem
    return  {
        nome_construtor: nomeConstrutor,
        id_construtor,
        quantidade_gasto,
        materiais: insert.rows[0]
    };
}


// deletar um cliente
const deletemateriaisGastos = async (params) =>{
    let sql ='delete from materiais_gastos where id = $1';
    let delet = await db.query(sql, [params.id])
    return delet.rowCount == 1;
}

//update um cliente
const patchmateriaisGastos = async (params) =>{
    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update materiais_gastos set ${fields} where id = ${params.id}`;
    await db.query(sql);
}






//exportar
module.exports.getAllmateriaisGastos = getAllmateriaisGastos;
module.exports.getmateriaisGastosById = getmateriaisGastosById;
module.exports.postmateriaisGastos = persistirMateriaisGastos;
module.exports.deletemateriaisGastos = deletemateriaisGastos;
module.exports.patchmateriaisGastos = patchmateriaisGastos;