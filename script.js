/* =================================
   PRECIO DEL SERVICIO
================================= */

const PRECIO_DIA = 35000;


/* =================================
   ELEMENTOS DEL HTML
================================= */

const formulario = document.getElementById("formularioFactura");

const idCliente = document.getElementById("idCliente");

const equipos = document.getElementById("equipos");

const dias = document.getElementById("dias");

const diasAdicionales =
    document.getElementById("diasAdicionales");

const tipoAlquiler =
    document.getElementById("tipoAlquiler");

const resultado =
    document.getElementById("resultado");


/* =================================
   GENERAR ID DEL CLIENTE
================================= */

function generarIdCliente() {

    const numero =
        Math.floor(10000 + Math.random() * 90000);

    return "ALQ-" + numero;
}

idCliente.value = generarIdCliente();


/* =================================
   FORMULARIO
================================= */

formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    /* ==============================
       OBTENER DATOS
    ============================== */

    const cantidadEquipos =
        Number(equipos.value);

    const cantidadDias =
        Number(dias.value);

    const cantidadDiasAdicionales =
        Number(diasAdicionales.value);

    const opcion =
        tipoAlquiler.value;


    /* ==============================
       VALIDAR EQUIPOS
    ============================== */

    if (cantidadEquipos < 2) {

        alert(
            "El alquiler debe ser de mínimo 2 equipos."
        );

        return;
    }


    /* ==============================
       VALIDAR DÍAS
    ============================== */

    if (cantidadDias < 1) {

        alert(
            "Debe ingresar mínimo 1 día de alquiler."
        );

        return;
    }


    /* ==============================
       VALIDAR DÍAS ADICIONALES
    ============================== */

    if (cantidadDiasAdicionales < 0) {

        alert(
            "Los días adicionales no pueden ser negativos."
        );

        return;
    }


    /* ==============================
       CALCULAR VALOR BASE
    ============================== */

    const valorDiasIniciales =
        cantidadEquipos *
        cantidadDias *
        PRECIO_DIA;


    /* ==============================
       CALCULAR DÍAS ADICIONALES
       
       REGLA MEJORADA:
       
       2% por día adicional
       Máximo 10% de descuento.

       El descuento se aplica
       únicamente al valor de
       los días adicionales.
    ============================== */

    const valorDiasAdicionales =
        cantidadEquipos *
        cantidadDiasAdicionales *
        PRECIO_DIA;


    let porcentajeDescuentoAdicional =
        cantidadDiasAdicionales * 2;


    if (porcentajeDescuentoAdicional > 10) {

        porcentajeDescuentoAdicional = 10;

    }


    const descuentoAdicional =
        valorDiasAdicionales *
        (porcentajeDescuentoAdicional / 100);


    const valorAdicionalFinal =
        valorDiasAdicionales -
        descuentoAdicional;


    /* ==============================
       SUBTOTAL
    ============================== */

    const subtotal =
        valorDiasIniciales +
        valorAdicionalFinal;


    /* ==============================
       DESCUENTO / INCREMENTO
    ============================== */

    let ajuste = 0;

    let textoAjuste = "";


    /* ==============================
       FUERA DE LA CIUDAD
       
       +5%
    ============================== */

    if (opcion === "fuera") {

        ajuste = subtotal * 0.05;

        textoAjuste =
            "Incremento del 5%: +" +
            formatoMoneda(ajuste);

    }


    /* ==============================
       DENTRO DEL ESTABLECIMIENTO
       
       -5%
    ============================== */

    else if (opcion === "establecimiento") {

        ajuste = subtotal * 0.05;

        textoAjuste =
            "Descuento del 5%: -" +
            formatoMoneda(ajuste);

    }


    /* ==============================
       DENTRO DE LA CIUDAD
    ============================== */

    else {

        textoAjuste =
            "Sin descuento ni incremento";

    }


    /* ==============================
       CALCULAR TOTAL
    ============================== */

    let total = subtotal;


    if (opcion === "fuera") {

        total = subtotal + ajuste;

    }

    else if (opcion === "establecimiento") {

        total = subtotal - ajuste;

    }


    /* ==============================
       MOSTRAR RESULTADO
    ============================== */

    document.getElementById("resultadoId").textContent =
        idCliente.value;


    document.getElementById("resultadoOpcion").textContent =
        obtenerNombreOpcion(opcion);


    document.getElementById("resultadoEquipos").textContent =
        cantidadEquipos;


    document.getElementById("resultadoDias").textContent =
        cantidadDias;


    document.getElementById("resultadoAdicionales").textContent =
        cantidadDiasAdicionales;


    document.getElementById("resultadoBase").textContent =
        formatoMoneda(subtotal);


    document.getElementById("resultadoAjuste").textContent =
        textoAjuste;


    document.getElementById("resultadoTotal").textContent =
        formatoMoneda(total);


    resultado.classList.remove("oculto");


    /* ==============================
       MOSTRAR RESULTADO EN PANTALLA
    ============================== */

    resultado.scrollIntoView({
        behavior: "smooth"
    });

});


/* =================================
   NOMBRE DE LA OPCIÓN
================================= */

function obtenerNombreOpcion(opcion) {

    if (opcion === "ciudad") {

        return "Dentro de la ciudad";

    }

    if (opcion === "fuera") {

        return "Fuera de la ciudad";

    }

    if (opcion === "establecimiento") {

        return "Dentro del establecimiento";

    }

    return "No especificado";
}


/* =================================
   FORMATO DE DINERO
================================= */

function formatoMoneda(valor) {

    return valor.toLocaleString(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }
    );

}


/* =================================
   ENVIAR FACTURA POR CORREO
================================= */

document.getElementById("enviarCorreo")
    .addEventListener("click", function() {

        const correo =
            document.getElementById("correoCliente").value;


        if (correo === "") {

            alert(
                "Por favor ingrese el correo del cliente."
            );

            return;
        }


        const total =
            document.getElementById("resultadoTotal")
                .textContent;


        const opcion =
            document.getElementById("resultadoOpcion")
                .textContent;


        const cantidadEquipos =
            document.getElementById("resultadoEquipos")
                .textContent;


        const cantidadDias =
            document.getElementById("resultadoDias")
                .textContent;


        const adicionales =
            document.getElementById("resultadoAdicionales")
                .textContent;


        const id =
            document.getElementById("resultadoId")
                .textContent;


        const asunto =
            "Factura ALQUIPC - " + id;


        const mensaje =
            "ALQUIPC%0D%0A%0D%0A" +

            "Factura de alquiler%0D%0A%0D%0A" +

            "ID Cliente: " + id +
            "%0D%0A" +

            "Opción de alquiler: " + opcion +
            "%0D%0A" +

            "Equipos alquilados: " +
            cantidadEquipos +
            "%0D%0A" +

            "Días iniciales: " +
            cantidadDias +
            "%0D%0A" +

            "Días adicionales: " +
            adicionales +
            "%0D%0A" +

            "Total a cancelar: " +
            total +
            "%0D%0A%0D%0A" +

            "Gracias por utilizar los servicios de ALQUIPC.";


        window.location.href =
            "mailto:" +
            correo +
            "?subject=" +
            encodeURIComponent(asunto) +
            "&body=" +
            mensaje;

    });