import express from "express";

export const productosRouter = express.Router();

let productos = [
   { id: 1, nombre: "lechuga", precio: 1000 },
   { id: 2, nombre: "tomate", precio: 1500},
];
let productosMaxId = productos.length;

// GET /productos
productosRouter.get("/", (req, res) => {
  res.send({ data: productos });
});
// POST /productos
productosRouter.post("/", (req, res) => {
    // Obtengo nombre y precio
    const { nombre, precio } = req.body;
  
    // Verifico si ya existe un producto con el mismo nombre
    const nombreRepetido = productos.some((producto) => producto.nombre === nombre);
  
    if (nombreRepetido) {
        return res.status(400).send({ error: "producto repetido" });
    }
    
    if (precio < 0){
        return res.status(400).send({ error: "el precio no puede ser menor que 0" });
    }

    // Creo objeto producto y lo agrego al arreglo y al cliente
    const producto = {
      id: ++productosMaxId,
      nombre,
      precio,
      fecha: new Date(),
    };
  
    productos.push(producto);
    res.status(201).send({ data: producto });
  });

  

// PUT /productos/:id
productosRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, precio } = req.body;
    // Crear el producto modificado
    const productoModificado = { id, nombre, precio, fecha: new Date() };

    // Verificar si el nombre ya existe en otro producto
    const nombreRepetido = productos.some((producto) => 
      producto.nombre === nombre && producto.id !== id);
    if (nombreRepetido) {
        return res.status(400).send({ error: "producto repetido" });
    }  
    else if (precio < 0) {
        return res.status(400).send({ error: "el precio no puede ser menor que 0" });
    }
    // Actualizar la lista de productos
    productos = productos.map((producto) => (producto.id === id ? productoModificado : producto));

    // Enviar la respuesta con el producto actualizado
    res.status(200).send({ data: productoModificado });
});


// DELETE /productos/:id
productosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter((producto) => producto.id !== id);
  res.status(200).send({ id });
});