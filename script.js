function agregarDatos(array, prestamo) {
  const plazos = [60, 54, 48, 42, 36, 30, 24];
  const tasas = [1.359264, 1.199144, 1.044002, 0.894172, 0.7498, 0.6117, 0.47961];
  
  for (let i = 0; i < plazos.length; i++) {
    const total = prestamo * tasas[i] + prestamo;
    const abono = Number((total / plazos[i]).toFixed(2));

    array.push({
      prestamo,
      total,
      abono,
      plazo: plazos[i] + 'M',
    });
  }
  
  if (prestamo <= 500000) {
    agregarDatos(array, prestamo + 500);
  } else {
    return array;
  }
}


// Crear un array vacío para almacenar los datos
let datos = [];

// Llamar a la función para agregar los datos al array
agregarDatos(datos, 5000);

// Función para encontrar el elemento en el array con el valor de abono más cercano a abus
function encontrarAbonoCercano(datos, abus, meses) {
  const abonos = datos.filter(dato => dato.plazo === meses && dato.abono < abus);
  if (abonos.length === 0) {
    return null;
  }
  return abonos.reduce((anterior, actual) => {
    // Calcular la diferencia entre el valor de abono actual y abus
    let diferenciaActual = Math.abs(actual.abono - abus);
   
    // Calcular la diferencia entre el valor de abono anterior y abus
    let diferenciaAnterior = Math.abs(anterior.abono - abus);
   
    // Retornar el elemento con el valor de abono más cercano a abus
    return diferenciaActual < diferenciaAnterior  ? actual : anterior;
  });
}

const myForm = document.querySelector('#myForm');
const myInput = document.querySelector('#myInput');

myForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const inputValue = myInput.value.trim();
  
  // Validar que el input solo contenga números
  const numberRegex = /^\d+$/;
  if (!numberRegex.test(inputValue)) {
    alert('Ingrese solo números');
    return;
  }

  // Ejecutar la función con el número ingresado
  miFuncion(parseInt(inputValue));
});

function miFuncion(numero) {
  console.log('El número ingresado es:', numero);
  // Llamar a la función para encontrar el elemento con el valor de abono más cercano a 180
  const abus = numero;
  const abonosCercanos = ['60M', '54M', '48M', '42M', '36M', '30M', '24M'].map(meses => encontrarAbonoCercano(datos, abus, meses)).filter(abono => abono !== null);

  // Imprimir los elementos con el valor de abono más cercano a abus
  console.log(abonosCercanos);

  // Obtener la tabla y su cuerpo
  const tabla = document.getElementById('tabla-datos');
  const tbody = tabla.getElementsByTagName('tbody')[0];

  // Limpiar el cuerpo de la tabla
  tbody.innerHTML = '';

  // Recorrer los datos y agregar cada fila a la tabla
  abonosCercanos.forEach(abonoCercano => {
    const fila = document.createElement('tr');
    const celdaPrestamo = document.createElement('td');
    celdaPrestamo.innerText = abonoCercano.prestamo;
    const celdaTotal = document.createElement('td');
    celdaTotal.innerText = Number((abonoCercano.total).toFixed(2));
    const celdaAbono = document.createElement('td');
    celdaAbono.innerText = abonoCercano.abono;
    const celdaPlazo = document.createElement('td');
    celdaPlazo.innerText = abonoCercano.plazo;
    fila.appendChild(celdaPrestamo);
    fila.appendChild(celdaAbono);
    fila.appendChild(celdaPlazo);
    fila.appendChild(celdaTotal);
    tbody.appendChild(fila);
  });
}

