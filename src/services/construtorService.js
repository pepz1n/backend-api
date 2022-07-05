const db = require('../config/db')

//consultar cliente
const getAllConstrutores = async () => {
    let sql = 'select * from construtor';
    let construtor = await db.query(sql);
    return construtor.rows;
}


//consultar por id
const getConstrutorById = async (params) =>{
    let sql = `select * from construtor where id = $1`;
    let construtor = await db.query(sql, [params.id]);
    return construtor.rows;
}

//inserir novos clientes

const postConstrutor = async(params) =>{
    let {nome, nascimento, telefone, cpf, casado, id_empresa_construtor} = params;
    let sql = `
        insert into construtor(
            nome,
            nascimento,
            telefone,
            cpf,
            casado,
            id_empresa_construtor
        ) values ($1, $2, $3, $4, $5, $6) returning id`;
    let insert = await db.query(sql, [nome, nascimento, telefone, cpf, casado, id_empresa_construtor])
    return insert.rows[0];
}


// deletar um cliente
const deleteConstrutor = async (params) =>{
    let sql ='delete from construtor where id = $1';
    let delet = await db.query(sql, [params.id])
    return delet.rowCount == 1;
}

//update um cliente
const patchConstrutor = async (params) =>{
    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update construtor set ${fields} where id = ${params.id}`;
    await db.query(sql);
}




//exportar
module.exports.getAllConstrutores = getAllConstrutores;
module.exports.getConstrutorById = getConstrutorById;
module.exports.postConstrutor = postConstrutor;
module.exports.deleteConstrutor = deleteConstrutor;
module.exports.patchConstrutor = patchConstrutor;