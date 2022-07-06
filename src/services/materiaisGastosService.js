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

//inserir novos clientes

const postmateriaisGastos = async(params) =>{
    let {quantidade_gasto, id_materiais, id_construtor, } = params;
    let sql = `
        insert into materiais_gastos(
            quantidade_gasto,
            id_materiais,
            id_construtor,
        ) values ($1, $2, $3) returning id`;
    let insert = await db.query(sql, [quantidade_gasto, id_materiais, id_construtor])
    return insert.rows[0];
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
module.exports.postmateriaisGastos = postmateriaisGastos;
module.exports.deletemateriaisGastos = deletemateriaisGastos;
module.exports.patchmateriaisGastos = patchmateriaisGastos;