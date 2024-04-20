const { response, request } = require('express');

const viewProducts = async (req = request, res = response) => {
    res.json({
        'msg': 'Listado de productos'
    });
};

const productsGet = (req = request, res = response) => {

    // Ejemplo de desestructuración de variables por parte del query
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    // Ejemplo de respuesta tipo JSON
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const productsPost = (req, res = response) => {

    // Ejemplo de desestructuración de datos del body
    const { nombre, cantidad } = req.body;

    // Ejemplo de respuesta del body
    res.status(201).json({
        msg: 'post API - productsPost',
        nombre,
        cantidad
    });
}

const productsPut = (req, res = response) => {

    // Ejemplo de desestructuración de datos que viajan por los params
    const { id } = req.params;

    // Ejemplo de respuesta del body
    res.status(201).json({
        msg: 'put API - productsPut',
        id
    });
}

const productsPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - productsPatch'
    });
}

const productsDelete = (req, res = response) => {
    res.status(410).json({
        msg: 'delete API - productsDelete'
    });
}


module.exports = {
    productsGet,
    productsPost,
    productsPut,
    productsPatch,
    productsDelete,
    viewProducts,
}
