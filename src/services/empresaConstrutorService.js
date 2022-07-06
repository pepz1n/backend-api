const db = require('../config/db')

//consultar cliente
const getAllEmpresaConstrutores = async () => {
    let sql = 'select * from empresa_construtor';
    let construtor = await db.query(sql);
    return construtor.rows;
}


//consultar por id
const getEmpresaConstrutorById = async (params) =>{
    let sql = `select * from empresa_construtor where id = $1`;
    let construtor = await db.query(sql, [params.id]);
    return construtor.rows;
}

//inserir novos clientes

const postEmpresaConstrutor = async(params) =>{
    let {nome, cnpj, telefone, uf, bairro, rua, numero, cidade} = params;
    let sql = `
        insert into empresa_construtor(
            nome,
            cnpj,
            telefone,
            uf,
            bairro,
            rua,
            numero,
            cidade
        ) values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`;
    let insert = await db.query(sql, [nome, cnpj, telefone, uf, bairro, rua, numero, cidade])
    return insert.rows[0];
}


// deletar um cliente
const deleteEmpresaConstrutor = async (params) =>{
    let sql ='delete from empresa_construtor where id = $1';
    let delet = await db.query(sql, [params.id])
    return delet.rowCount == 1;
}

//update um cliente
const patchEmpresaConstrutor = async (params) =>{
    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update empresa_construtor set ${fields} where id = ${params.id}`;
    await db.query(sql);
}






//exportar
module.exports.getAllEmpresaConstrutores = getAllEmpresaConstrutores;
module.exports.getEmpresaConstrutorById = getEmpresaConstrutorById;
module.exports.postEmpresaConstrutor = postEmpresaConstrutor;
module.exports.deleteEmpresaConstrutor = deleteEmpresaConstrutor;
module.exports.patchEmpresaConstrutor = patchEmpresaConstrutor;