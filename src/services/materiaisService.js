const db = require('../config/db')

//consultar cliente
const getAllmateriais = async () => {
    let sql = 'select * from materiais';
    let materiais = await db.query(sql);
    return materiais.rows;
}


//consultar por id
const getmateriaisById = async (params) =>{
    let sql = `select * from materiais where id = $1`;
    let materiais = await db.query(sql, [params.id]);
    return materiais.rows;
}

//inserir novos clientes

const postmateriais = async(params) =>{
    let {unidade_medida, nome, quantidade_estoque, tipo_material} = params;
    let sql = `
        insert into materiais(
            unidade_medida,
            nome,
            quantidade_estoque,
            tipo_material
        ) values ($1, $2, $3, $4) returning id`;
    let insert = await db.query(sql, [unidade_medida, nome, quantidade_estoque, tipo_material])
    return insert.rows[0];
}


// deletar um cliente
const deletemateriais = async (params) =>{
    let sql ='delete from materiais where id = $1';
    let delet = await db.query(sql, [params.id])
    return delet.rowCount == 1;
}

//update um cliente
const patchmateriais = async (params) =>{
    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update materiais set ${fields} where id = ${params.id}`;
    await db.query(sql);
}






//exportar
module.exports.getAllmateriais = getAllmateriais;
module.exports.getmateriaisById = getmateriaisById;
module.exports.postmateriais = postmateriais;
module.exports.deletemateriais = deletemateriais;
module.exports.patchmateriais = patchmateriais;