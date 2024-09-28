const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let calculos = []

app.post('/ejer2', (req, res) => {
  const { largo, ancho } = req.body
  const perimetro = 2 * largo + 2 * ancho
  const superficie = largo * ancho

  calculos = [...calculos, {
    "largo": largo,
    "ancho": ancho,
    "perimetro": perimetro,
    "superficie": superficie
  }]


  res.json({
    "perimetro": perimetro,
    "superficie": superficie
  })
})

app.get('/ejer2/calculos', (req, res) => {
  res.json(calculos)
})

app.put('/ejer2/calculos/:index', (req, res) => {
  const { index } = req.params;
  const { largo, ancho } = req.body;

  if (!calculos[index]) {
    return res.status(404).send('Cálculo no encontrado.');
  }
  calculos[index].largo = largo || calculos[index].largo;
  calculos[index].ancho = ancho || calculos[index].ancho;
  calculos[index].perimetro = 2 * (calculos[index].largo + calculos[index].ancho);
  calculos[index].superficie = calculos[index].largo * calculos[index].ancho;
  calculos[index].esCuadrado = calculos[index].largo === calculos[index].ancho;

  // Enviar el cálculo actualizado como respuesta
  res.json(calculos);
});

app.delete('/ejer2/calculos/:index', (req, res) => {
  const { index } = req.params;

  if (!calculos[index]) {
    return res.status(404).send('Cálculo no encontrado.');
  }
  calculos.splice(index, 1);

  res.status(204).send();
});



const PORT = 5300
app.listen(PORT, console.log(`Servidor escuchando en http://localhost:${PORT}`))