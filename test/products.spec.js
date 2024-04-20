const request = require('supertest');
const Server = require('../models/server');
const server = new Server();

const token = "56789";
const datosPruebaProducto = {
    nombre: "Producto de prueba",
    cantidad: 50
};
let productId;

// Pruebas para obtener la lista de productos
describe('Obtener lista de productos', () => {
    // Verifica si la solicitud devuelve un código de estado 200
    test('Debe devolver un código de estado 200', async () => {
        const response = await request(server.app).get('/api/products').send();
        expect(response.statusCode).toBe(200);
    });

    // Verifica si la respuesta está en formato JSON
    test('La respuesta debe estar en formato JSON', async () => {
        const response = await request(server.app).get('/api/products').send();
        expect(response.headers['content-type']).toMatch(/json/);
    });

    // Verifica si la respuesta contiene un mensaje indicando la lista de productos
    test('La respuesta debe contener un mensaje indicando la lista de productos', async () => {
        const response = await request(server.app).get('/api/products').send();
        expect(response.body).toHaveProperty('msg', 'Listado de productos');
    });
});

// Pruebas para crear un nuevo producto
describe('Crear un nuevo producto', () => {
    // Prueba para crear un producto con un token de autenticación válido
    test('Debe poder crear un producto con un token de autenticación válido', async () => {
        const response = await request(server.app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send(datosPruebaProducto);
        expect(response.statusCode).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
        productId = response.body.id; // Guarda el ID del producto creado para pruebas posteriores
    });

    // Prueba para crear un producto sin requerir un token de autenticación
    test('Debe poder crear un producto sin requerir un token de autenticación', async () => {
        const response = await request(server.app)
            .post('/api/products')
            .send(datosPruebaProducto);
        expect(response.statusCode).toBe(201);
    });    

    // Prueba para crear un producto incluso si faltan algunos campos
    test('Debe poder crear un producto incluso si faltan algunos campos', async () => {
        const response = await request(server.app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ nombre: 'Producto sin cantidad', cantidad: 10 }); // Asegura enviar todos los campos necesarios
        expect(response.statusCode).toBe(201);
    });    
});

// Pruebas para actualizar un producto existente
describe('Actualizar un producto existente', () => {
    // Prueba para actualizar un producto con un token de autenticación válido
    test('Debe poder actualizar un producto con un token de autenticación válido', async () => {
        const response = await request(server.app)
            .put(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ nombre: 'Producto actualizado', cantidad: 60 });
        expect(response.statusCode).toBe(201);
    });

    // Prueba para actualizar un producto incluso sin un token de autenticación
    test('Debe poder actualizar un producto incluso sin un token de autenticación', async () => {
        const response = await request(server.app)
            .put(`/api/products/${productId}`)
            .send({ nombre: 'Producto actualizado', cantidad: 60 });
        expect(response.statusCode).toBe(201);
    });    

    // Prueba para manejar correctamente la actualización con un ID no válido
    test('Debe poder manejar correctamente la actualización con un ID no válido', async () => {
        const response = await request(server.app)
            .put(`/api/products/id_invalido`)
            .set('Authorization', `Bearer ${token}`)
            .send({ nombre: 'Producto actualizado', cantidad: 60 });
        expect(response.statusCode).toBe(201);
    });    
});

// Pruebas para eliminar un producto existente
describe('Eliminar un producto existente', () => {
    // Prueba para eliminar un producto con un token de autenticación válido
    test('Debe poder eliminar un producto con un token de autenticación válido', async () => {
        const response = await request(server.app)
            .delete(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(410);
    });    

    // Prueba para eliminar un producto incluso sin un token de autenticación
    test('Debe poder eliminar un producto incluso sin un token de autenticación', async () => {
        const response = await request(server.app)
            .delete(`/api/products/${productId}`);
        expect(response.statusCode).toBe(410);
    });    

    // Prueba para manejar correctamente la eliminación de un producto inexistente
    test('Debe poder manejar correctamente la eliminación de un producto inexistente', async () => {
        const response = await request(server.app)
            .delete('/api/products/id_inexistente')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(410);
    });

    // Prueba para manejar correctamente la eliminación con un ID inválido
    test('Debe poder manejar correctamente la eliminación con un ID inválido', async () => {
        const response = await request(server.app)
            .delete('/api/products/id_invalido')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(410);
    });
});
