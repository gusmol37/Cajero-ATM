//*****************************************************************************
//                            FUNCIONES PRINCIPALES                           *
//*****************************************************************************

//    Muestra su saldo a el usuario
const consultar = () => {
  let saldo = cuentas[cuentaGlobal].saldo; // Obtiene el saldo
  let display = document.getElementById("saldo"); // Obtiene el elemento
  let screen = document.querySelectorAll(".activa"); // obtiene un arreglo con los elementos activos
  screen[0].classList.add("invisible"); // Oculta el elemento
  screen[0].classList.remove("activa"); // Quita la clase activa
  consultScreen.classList.remove("invisible"); // Muestra el elemento
  consultScreen.classList.add("activa"); // Agrega la clase activa
  display.innerText = `Tu saldo es $${saldo}`; // Muestra el saldo
};
//*****************************************************************************

/*    Depositar el valor ingresado en el input y evalua que no exceda el limite de $990
 * @param valor: cantidad a depositar */
const depositar = (valor) => {
  ingreso.classList.remove("is-invalid"); // Quita la clase de error por si existe
  if (verifyValue(valor)) {
    // Verifica que sea un numero entero y mayor a 0
    valor = parseFloat(valor); // Convierte a float
    let temp = cuentas[cuentaGlobal].saldo + valor; // Calcula el nuevo saldo
    if (temp <= 990) {
      // Verifica que no supere el limite de $990
      cuentas[cuentaGlobal].saldo += valor; // Actualiza el saldo
      ingreso.value = "";
      consultar(); // Consulta el saldo actualizado
    } else {
      // Si supera el limite
      errors("Recuerda que tu saldo no puede ser mayor a $990", "control"); // Muestra el mensaje de error
      ingreso.value = "";
      ingreso.focus();
    }
  } else {
    // Si no es un numero entero
    ingreso.classList.add("is-invalid"); // Agrega la clase de error
  }
};
//*****************************************************************************

/*    Retirar el valor ingresado en el input y evalua que no sea menor de $10
 * @param valor: cantidad a retirar */
const retirar = (valor) => {
  egreso.classList.remove("is-invalid"); // Quita la clase de error por si existe
  if (verifyValue(valor)) {
    // Verifica que sea un numero entero y mayor a 0
    valor = parseFloat(valor);
    let temp = cuentas[cuentaGlobal].saldo - valor; // Calcula el nuevo saldo
    if (temp >= 10) {
      // Verifica que no sea menor a $10
      cuentas[cuentaGlobal].saldo -= valor; // Actualiza el saldo
      egreso.value = "";
      consultar(); // Consulta el saldo actualizado
    } else {
      // Si es menor a $10
      errors("Recuerda que tu saldo no puede ser menor a $10", "control2"); // Muestra el mensaje de error
      egreso.value = "";
      egreso.focus();
    }
  } else {
    // Si no es un numero entero
    egreso.classList.add("is-invalid"); // Agrega la clase de error
  }
};

//*****************************************************************************
//                            FUNCIONES AUXILIARES                            *
//*****************************************************************************

/*    Verifica que sea un numero entero y mayor a 0
 *   @param valor: valor a verificar
 *   @return: true si es un numero entero y mayor a 0, false si no */
const verifyValue = (valor) => {
  valor = parseFloat(valor); // Convierte a float
  if (valor > 0 && Number.isInteger(valor)) {
    // Verifica que sea un numero entero y mayor a 0
    return true;
  } else {
    // Si no es un numero entero y mayor a 0
    return false;
  }
};
//*******************************************************************

/*   Muestra un mensaje de error sobre el input depositos/retiros
 *  @param mensaje: mensaje a mostrar
 *  @param element: id del elemento donde se mostrar el mensaje */
const errors = (mensaje, element) => {
  var wrapper = document.createElement("div"); // Crea un div
  wrapper.innerHTML =
    '<div class="alert alert-danger alert-dismissible" role="alert">' +
    mensaje +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'; // Agrega el mensaje

  document.getElementById(element).append(wrapper); // Agrega el div al elemento
};
//********************************************************************

/* Regresa al menu principal de opciones
 * Obtiene la pantalla activa, la oculta y quitale la clase activa
 * Agrega la clase activa y quita la clase invisible al menu
 */
const returnMenu = () => {
  let elements = document.querySelectorAll(".activa"); // Obtiene los elementos activos
  elements[0].classList.remove("activa"); // Quita la clase activa
  elements[0].classList.add("invisible"); // Agrega la clase invisible
  menuScreen.classList.add("activa"); // Agrega la clase activa
  menuScreen.classList.remove("invisible"); // Quita la clase invisible
};
//*********************************************************************

/* Regresa a la pantalla de cuentas, la cuenta seleccionada la regresa a null
 * Quita la clase "cuenta_activa" de cualquier cuenta selecciona previamente
 * El input del password se limpia y se oculta.
 */
const exit = () => {
  let visibleScreen = document.querySelectorAll(".activa"); // Obtiene los elementos activos
  visibleScreen[0].classList.remove("activa"); // Quita la clase activa
  visibleScreen[0].classList.add("invisible"); // Agrega la clase invisible
  accountScreen.classList.remove("invisible"); // Quita la clase invisible
  cuentaGlobal = null; // Cuenta seleccionada regresa a null
  let otraCuenta = document.getElementsByClassName("cuenta_activa"); // Obtiene las cuentas activas
  if (otraCuenta.length > 0) {
    otraCuenta[0].classList.remove("cuenta_activa"); // Quita la clase cuenta_activa
  }
  password.value = ""; // Limpia el input del password
  document.getElementById("contra").classList.add("invisible"); // Oculta el input del password
};
//**********************************************************************

/* Agrega la clase "cuenta_activa" a la cuenta seleccionada
 * @param index : indice de la cuenta seleccionada del array de cuentas
 * */
const cuentaSelect = (index) => {
  password.classList.remove("is-invalid"); // Quita la clase de error si existe
  password.value = ""; // Limpia el input del password
  cuentaGlobal = index; // Guardo el indice de la cuenta seleccionada en la variable global
  let otraCuenta = document.getElementsByClassName("cuenta_activa"); // Obtiene otra cuenta activa si existe
  if (otraCuenta.length > 0) {
    // Si existe una cuenta activa
    otraCuenta[0].classList.remove("cuenta_activa"); // Quita la clase cuenta_activa
  }
  let element = document.getElementById(cuentas[index].nombre); // Obtiene el elemento de la cuenta seleccionada
  element.classList.add("cuenta_activa"); // Agrega la clase cuenta_activa
  document.getElementById("contra").classList.remove("invisible"); // Muestra el input del password
  password.focus(); // Foco en el input del password
};
//**********************************************************************

/* Comprueba que tecla es presionada en el input.
 * Si es la tecla enter, se ejecuta la funcion de "validar" pasando el valor del input y el tipo de input (password, ingreso o egreso)
 * @param event: evento de teclado */
const checkKey = (e) => {
  if (e.key === "Enter") {
    // Si es la tecla enter
    let id = e.target.id; // Obtiene el id del input
    validar(e.target.value, id); // Ejecuta la funcion de validar pasando los parametros
  }
};
//***********************************************************************

/* Valida el tipo de input que envia valor (password, ingreso o egreso)
 * @param valor: valor del input (password, Cantidad a depositas o retirar)
 * @param id: id del input (password, ingreso o egreso) para saber como procesar el valor. */
const validar = (valor, id) => {
  if (id == "password") {
    // Si el id es password
    if (cuentas[cuentaGlobal].password === valor) {
      // Si el password es correcto
      accountScreen.classList.add("invisible"); // Oculta la pantalla de cuentas
      menuScreen.classList.remove("invisible"); // Muestra el menu principal
      menuScreen.classList.add("activa"); // Agrega la clase activa al menu
    } else {
      // Si el password es incorrecto
      password.classList.add("is-invalid"); // Agrega la clase de error
    }
    password.value = ""; // Limpia el input del password
  } else if (id == "ingreso") {
    // Si el id es ingreso
    depositar(valor); // Ejecuta la funcion de depositar pasando el valor
  } else if (id == "egreso") {
    // Si el id es egreso
    retirar(valor); // Ejecuta la funcion de retirar pasando el valor
  }
};

/******************************************************************************
 *            CONSTANTES CON LOS ELEMENTOS DE LAS PANTALLAS                   *
 ******************************************************************************/
const accountScreen = document.getElementById("account_screen"); // Pantalla de cuentas
const menuScreen = document.getElementById("menu_screen"); // Pantalla de menu
const consultScreen = document.getElementById("consult_screen"); // Pantalla de consulta
const depositScreen = document.getElementById("deposit_screen"); // Pantalla de deposito
const withdrawScreen = document.getElementById("withdraw_screen"); // Pantalla de retiro

/******************************************************************************
 *                 CONSTANTES CON LOS ELEMENTOS DE INPUTS                     *
 *****************************************************************************/
const password = document.getElementById("password"); // Input de la contraseña
const ingreso = document.getElementById("ingreso"); // Input del ingreso
const egreso = document.getElementById("egreso"); // Input del egreso

/******************************************************************************
 *                        ESCUCHAR LOS EVENTOS CLICK                          *
 *****************************************************************************/

// Escuchar el evento click en el boton de consulta
const consultarSaldo = document.getElementById("consultar_saldo"); // Boton de consulta
consultarSaldo.addEventListener("click", consultar); //  Boton de consultar saldo, ejecuta la funcion de consultar.
//*****************************************************************************

// Escuchar el evento click en el boton de deposito
const deposito = document.getElementById("deposito"); // Boton de deposito
deposito.addEventListener("click", () => {
  menuScreen.classList.remove("activa"); // Quita la clase activa del menu
  menuScreen.classList.add("invisible"); // Agrega la clase invisible al menu
  depositScreen.classList.remove("invisible"); // remueve la clase invisible a la pantalla de deposito
  depositScreen.classList.add("activa"); // Agrega la clase activa a la pantalla de deposito
  ingreso.focus(); // Foco en el input de ingreso
});
//*****************************************************************************

// Escucha el evento click en el boton de retiro
const retiro = document.getElementById("retiro"); // Boton de retiro
retiro.addEventListener("click", () => {
  menuScreen.classList.remove("activa"); // Quita la clase activa del menu
  menuScreen.classList.add("invisible"); // Agrega la clase invisible al menu
  withdrawScreen.classList.remove("invisible"); // remueve la clase invisible a la pantalla de retiro
  withdrawScreen.classList.add("activa"); // Agrega la clase activa a la pantalla de retiro
  egreso.focus();
});
//*****************************************************************************

// Escucha el evento click de todos los botones de "Regresar al menu principal"
const returns = document.querySelectorAll("#return"); // Selecciona todos los botones de regresar
returns.forEach((element) => {
  // Recorre todos los botones de regresar
  element.addEventListener("click", returnMenu); // Agrega el evento click a cada boton de regresar y ejecuta la funcion returnMenu
});
//*****************************************************************************

// Escucha el evento click de todos los botones de "Salir" para regresar al menu principal
const exits = document.querySelectorAll("#exit"); // Selecciona todos los botones de salir
exits.forEach((element) => {
  // Recorre todos los botones de salir
  element.addEventListener("click", exit); // Agrega el evento click a cada boton de salir y ejecuta la funcion exit
});

/******************************************************************************
 *                          VARIABLE DE LAS CUENTAS                           *
 *****************************************************************************/
var cuentas = [
  {
    nombre: "Han",
    saldo: 250,
    password: "45ko",
    photo: "./img/cuentas/1.jpg",
  },
  {
    nombre: "Gustavo",
    saldo: 450,
    password: "yolo",
    photo: "./img/cuentas/2.jpg",
  },
  {
    nombre: "Sebastian",
    saldo: 50,
    password: "oirt",
    photo: "./img/cuentas/3.jpg",
  },
  {
    nombre: "David",
    saldo: 650,
    password: "0309",
    photo: "./img/cuentas/4.jpg",
  },

 ];

/******************************************************************************
 *                         VARIABLE DE LA CUENTA ACTIVA                      *
 *****************************************************************************/
// Variable que guarda la cuenta seleccionada de forma global
var cuentaGlobal = null;

/******************************************************************************
 *                              PROGRAMA PRINCIPAL                             *
 ******************************************************************************/
/*    Intera el arreglo "cuentas" al iniciar el programa para crear elementos
      en el HTML de las cuentas existentes con sus datos*/
for (let i = 0; i < cuentas.length; i++) {
  // por cada cuenta existente
  let cuenta = document.createElement("div"); // creo un elemento div
  cuenta.classList.add("text-center"); // le agrego la clase text-center
  cuenta.classList.add("col-sm-12"); // le agrego la clase .col-md-3
  cuenta.classList.add("col-md-6"); // le agrego la clase .col-md-3
  cuenta.classList.add("col-lg-3"); // le agrego la clase .col-md-3
  cuenta.innerHTML = `  
      <button class="btn  btn-light" id="${cuentas[i].nombre}" style="width: 10rem;" onClick="cuentaSelect('${i}');">
        <img src="${cuentas[i].photo}" class="card-img-top" alt="${cuentas[i].nombre}">
          <div class="card-body">
            <h5 class="card-title text-center">${cuentas[i].nombre}</h5>
            </div>
        
      </button>
  `; // al elemento div le agrego un elemento button con el nombre de la cuenta y su imagen

  document.getElementById("grid-cuentas").appendChild(cuenta); // Agrego el elemento div a la seccion de cuentas
}
