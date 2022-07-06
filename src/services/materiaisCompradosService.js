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

//inserir novos clientes

const postmateriaisComprados = async(params) =>{
    let {valor_compra, id_fornecedor, id_materiais, quantidade} = params;
    let sql = `
        insert into materiais_comprados(
            valor_compra,
            id_fornecedor,
            id_materiais,
            quantidade
        ) values ($1, $2, $3, $4) returning id`;
    let insert = await db.query(sql, [valor_compra, id_fornecedor, id_materiais, quantidade])
    return insert.rows[0];
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