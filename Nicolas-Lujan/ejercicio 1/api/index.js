const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/ejer1', (req, res) => {
  const { num1, num2, operacion } = req.body
  let resultado
  if (operacion == 'sumar') {
    resultado = num1 + num2
  }
  else if (operacion == 'restar') {
    resultado = num1 - num2
  }
  else if (operacion == 'multiplicar') {
    resultado = num1 * num2
  } else if (operacion == 'dividir') {
    if (num2 <= 0) {
      resultado = "El divisor no puede ser cero"
    } else {
      resultado = num1 / num2
    }

  }

  res.json({ "resultado": resultado })
})



const PORT = 5300
app.listen(PORT, console.log(`Servidor escuchando en http://localhost:${PORT}`))