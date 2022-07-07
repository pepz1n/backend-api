const db = require('../config/db')

//consultar cliente
const getAllmateriaisComprados = async () => {
    let sql = 'select * from materiais_comprados';
    let materiaisComprados = await db.query(sql);
    return materiaisComprados.rows;
}


//consultar por id
const getmateriaisCompradosById = async (params) =>{
    let sql = `select * from materiais_comprados where id = $1`;
    let materiaisComprados = await db.query(sql, [params.id]);
    return materiaisComprados.rows;
}

// //inserir novos clientes

// const postmateriaisComprados = async(params) =>{
//     let {valor_compra, id_fornecedor, id_materiais, quantidade} = params;
//     let sql = `
//         insert into materiais_comprados(
//             valor_compra,
//             id_fornecedor,
//             id_materiais,
//             quantidade
//         ) values ($1, $2, $3, $4) returning id`;
//     let insert = await db.query(sql, [valor_compra, id_fornecedor, id_materiais, quantidade])
//     return insert.rows[0];
// }
//inserir novo cadastro de material gasto

const postmateriaisComprados = async (params) =>{
    //função para pegar o estoque atual e reduir pelo gasto
    const updateEstoque = async (quantidade,id_material) =>{
        let sql = `select 
                    quantidade_estoque 
                   from materiais 
                   where id = $1
                   `;
        let estoqueAtual = await db.query(sql,[id_material])
        estoqueAtual = estoqueAtual.rows[0].quantidade_estoque;
        let estoqueDepoisCompra = estoqueAtual + quantidade;
        if(estoqueDepoisCompra>=0){
            return estoqueDepoisCompra;
        }else{
            return 0;
        }
    }
    //INSERT DOS MATERIAIS GASTOS NO 'MATERIAIS_GASTOS'
    let {valor_compra,id_fornecedor, id_materiais, quantidade} = params;
    let estoqueNovo = await updateEstoque(quantidade,id_materiais);
    let sql = `
        insert into materiais_comprados(
            valor_compra,
            id_fornecedor,
            id_materiais,
            quantidade
        ) values ($1, $2, $3, $4)`;
    await db.query(sql, [valor_compra, id_fornecedor, id_materiais, quantidade]);

    //select do nome do fornecedor com o id 'id_materiais'
    let sql3 = `select
                nome
                from fornecedor
                where id= $1`
    let nome_fornecedor = await db.query (sql3, [id_fornecedor])
    nome_fornecedor = nome_fornecedor.rows[0].nome

    //update da tabela materiais com o valor novo
    let sql2 = `update materiais set 
                    quantidade_estoque = $1 
                where id = $2 returning nome, quantidade_estoque`
    let insert = await db.query (sql2, [estoqueNovo, id_materiais])
    //return com a mensagem
    return  {
        nome_nome_fornecedor: nome_fornecedor,
        id_fornecedor,
        quantidade_comprado: quantidade,
        materiais: insert.rows[0]
    };
}

// deletar um cliente
const deletemateriaisComprados = async (params) =>{
    let sql ='delete from materiais_comprados where id = $1';
    let delet = await db.query(sql, [params.id])
    return delet.rowCount == 1;
}

//update um cliente
const patchmateriaisComprados = async (params) =>{
    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update materiais_comprados set ${fields} where id = ${params.id}`;
    await db.query(sql);
}






//exportar
module.exports.getAllmateriaisComprados = getAllmateriaisComprados;
module.exports.getmateriaisCompradosById = getmateriaisCompradosById;
module.exports.postmateriaisComprados = postmateriaisComprados;
module.exports.deletemateriaisComprados = deletemateriaisComprados;
module.exports.patchmateriaisComprados = patchmateriaisComprados;