const db = require('../config/db')

//consultar cliente
const getAllFornecedor = async () => {
    let sql = 'select * from fornecedor';
    let fornecedor = await db.query(sql);
    return fornecedor.rows;
}


//consultar por id
const getFornecedorById = async (params) =>{
    let sql = `select * from fornecedor where id = $1`;
    let fornecedor = await db.query(sql, [params.id]);
    return fornecedor.rows;
}

//inserir novos clientes

const postFornecedor = async(params) =>{
    let {nome, cnpj, inscricao_estudal, uf, bairro, rua, numero, cidade} = params;
    let sql = `
        insert into fornecedor(
            nome,
            cnpj,
            inscricao_estudal,
            uf,
            bairro,
            rua,
            numero,
            cidade
        ) values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`;
    let insert = await db.query(sql, [nome, cnpj, inscricao_estudal, uf, bairro, rua, numero, cidade])
    return insert.rows[0];
}


// deletar um cliente
const deleteFornecedor = async (params) =>{
    let sql ='delete from fornecedor where id = $1';
    let delet = await db.query(sql, [params.id])
    return delet.rowCount == 1;
}

//update um cliente
const patchFornecedor = async (params) =>{
    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update fornecedor set ${fields} where id = ${params.id}`;
    await db.query(sql);
}




//exportar
module.exports.getAllFornecedor = getAllFornecedor;
module.exports.getFornecedorById = getFornecedorById;
module.exports.postFornecedor = postFornecedor;
module.exports.deleteFornecedor = deleteFornecedor;
module.exports.patchFornecedor = patchFornecedor;