/* =================================
   PRECIO DEL SERVICIO
================================= */

const PRECIO_DIA = 35000;


/* =================================
   ELEMENTOS DEL HTML
================================= */

const formulario =
    document.getElementById("formularioFactura");

const nombre =
    document.getElementById("nombre");

const apellido =
    document.getElementById("apellido");

const telefono =
    document.getElementById("telefono");

const correo =
    document.getElementById("correo");

const idCliente =
    document.getElementById("idCliente");

const equipos =
    document.getElementById("equipos");

const dias =
    document.getElementById("dias");

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
   VALIDAR NOMBRE
================================= */

function validarNombre(valor) {

    const patron =
        /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{2,30}$/;

    return patron.test(valor.trim());
}


/* =================================
   VALIDAR APELLIDO
================================= */

function validarApellido(valor) {

    const patron =
        /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{2,30}$/;

    return patron.test(valor.trim());
}


/* =================================
   VALIDAR TELÉFONO
================================= */

function validarTelefono(valor) {

    const patron =
        /^[0-9]{10}$/;

    return patron.test(valor);
}


/* =================================
   VALIDAR CORREO
================================= */

function validarCorreo(valor) {

    const patron =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return patron.test(valor);
}


/* =================================
   FORMULARIO
================================= */

formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        /* ============================
           DATOS DEL CLIENTE
        ============================ */

        const nombreCliente =
            nombre.value.trim();

        const apellidoCliente =
            apellido.value.trim();

        const telefonoCliente =
            telefono.value.trim();

        const correoCliente =
            correo.value.trim();


        /* ============================
           VALIDAR NOMBRE
        ============================ */

        if (!validarNombre(nombreCliente)) {

            alert(
                "El nombre solo puede contener letras " +
                "y debe tener entre 2 y 30 caracteres."
            );

            nombre.focus();

            return;
        }


        /* ============================
           VALIDAR APELLIDO
        ============================ */

        if (!validarApellido(apellidoCliente)) {

            alert(
                "El apellido solo puede contener letras " +
                "y debe tener entre 2 y 30 caracteres."
            );

            apellido.focus();

            return;
        }


        /* ============================
           VALIDAR TELÉFONO
        ============================ */

        if (!validarTelefono(telefonoCliente)) {

            alert(
                "El teléfono debe contener exactamente " +
                "10 números."
            );

            telefono.focus();

            return;
        }


        /* ============================
           VALIDAR CORREO
        ============================ */

        if (!validarCorreo(correoCliente)) {

            alert(
                "Ingrese un correo electrónico válido."
            );

            correo.focus();

            return;
        }


        /* ============================
           DATOS DEL ALQUILER
        ============================ */

        const cantidadEquipos =
            Number(equipos.value);

        const cantidadDias =
            Number(dias.value);

        const cantidadDiasAdicionales =
            Number(diasAdicionales.value);

        const opcion =
            tipoAlquiler.value;


        /* ============================
           VALIDAR EQUIPOS
        ============================ */

        if (
            cantidadEquipos < 2 ||
            cantidadEquipos > 100
        ) {

            alert(
                "La cantidad de equipos debe estar " +
                "entre 2 y 100."
            );

            equipos.focus();

            return;
        }


        /* ============================
           VALIDAR DÍAS
        ============================ */

        if (
            cantidadDias < 1 ||
            cantidadDias > 365
        ) {

            alert(
                "Los días iniciales deben estar " +
                "entre 1 y 365."
            );

            dias.focus();

            return;
        }


        /* ============================
           VALIDAR DÍAS ADICIONALES
        ============================ */

        if (
            cantidadDiasAdicionales < 0 ||
            cantidadDiasAdicionales > 365
        ) {

            alert(
                "Los días adicionales deben estar " +
                "entre 0 y 365."
            );

            diasAdicionales.focus();

            return;
        }


        /* ============================
           VALIDAR OPCIÓN
        ============================ */

        if (opcion === "") {

            alert(
                "Debe seleccionar una opción de alquiler."
            );

            tipoAlquiler.focus();

            return;
        }


        /* ============================
           VALOR DÍAS INICIALES
        ============================ */

        const valorDiasIniciales =
            cantidadEquipos *
            cantidadDias *
            PRECIO_DIA;


        /* ============================
           VALOR DÍAS ADICIONALES
        ============================ */

        const valorDiasAdicionales =
            cantidadEquipos *
            cantidadDiasAdicionales *
            PRECIO_DIA;


        /* ============================
           DESCUENTO DÍAS ADICIONALES

           2% por cada día adicional.

           Máximo 10%.
        ============================ */

        let porcentajeDescuento =
            cantidadDiasAdicionales * 2;


        if (porcentajeDescuento > 10) {

            porcentajeDescuento = 10;

        }


        const descuentoAdicional =
            valorDiasAdicionales *
            (porcentajeDescuento / 100);


        const valorAdicionalFinal =
            valorDiasAdicionales -
            descuentoAdicional;


        /* ============================
           SUBTOTAL
        ============================ */

        const subtotal =
            valorDiasIniciales +
            valorAdicionalFinal;


        /* ============================
           DESCUENTO / INCREMENTO
        ============================ */

        let ajuste = 0;

        let textoAjuste = "";


        /* ============================
           FUERA DE LA CIUDAD
           +5%
        ============================ */

        if (opcion === "fuera") {

            ajuste =
                subtotal * 0.05;

            textoAjuste =
                "Incremento del 5%: +" +
                formatoMoneda(ajuste);

        }


        /* ============================
           ESTABLECIMIENTO
           -5%
        ============================ */

        else if (
            opcion === "establecimiento"
        ) {

            ajuste =
                subtotal * 0.05;

            textoAjuste =
                "Descuento del 5%: -" +
                formatoMoneda(ajuste);

        }


        /* ============================
           DENTRO DE LA CIUDAD
        ============================ */

        else {

            textoAjuste =
                "Sin descuento ni incremento";

        }


        /* ============================
           TOTAL
        ============================ */

        let total =
            subtotal;


        if (opcion === "fuera") {

            total =
                subtotal + ajuste;

        }

        else if (
            opcion === "establecimiento"
        ) {

            total =
                subtotal - ajuste;

        }


        /* ============================
           MOSTRAR RESULTADO
        ============================ */

        document.getElementById(
            "resultadoId"
        ).textContent =
            idCliente.value;


        document.getElementById(
            "resultadoNombre"
        ).textContent =
            nombreCliente;


        document.getElementById(
            "resultadoApellido"
        ).textContent =
            apellidoCliente;


        document.getElementById(
            "resultadoTelefono"
        ).textContent =
            telefonoCliente;


        document.getElementById(
            "resultadoCorreo"
        ).textContent =
            correoCliente;


        document.getElementById(
            "resultadoOpcion"
        ).textContent =
            obtenerNombreOpcion(opcion);


        document.getElementById(
            "resultadoEquipos"
        ).textContent =
            cantidadEquipos;


        document.getElementById(
            "resultadoDias"
        ).textContent =
            cantidadDias;


        document.getElementById(
            "resultadoAdicionales"
        ).textContent =
            cantidadDiasAdicionales;


        document.getElementById(
            "resultadoBase"
        ).textContent =
            formatoMoneda(subtotal);


        document.getElementById(
            "resultadoAjuste"
        ).textContent =
            textoAjuste;


        document.getElementById(
            "resultadoTotal"
        ).textContent =
            formatoMoneda(total);


        /* ============================
           COLOCAR CORREO EN EL CAMPO
        ============================ */

        document.getElementById(
            "correoCliente"
        ).value =
            correoCliente;


        /* ============================
           MOSTRAR RESULTADO
        ============================ */

        resultado.classList.remove(
            "oculto"
        );


        resultado.scrollIntoView({
            behavior: "smooth"
        });

    }
);


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


    if (
        opcion === "establecimiento"
    ) {

        return "Dentro del establecimiento";

    }


    return "No especificado";
}


/* =================================
   FORMATO DE MONEDA
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
   ENVIAR FACTURA
================================= */

document.getElementById(
    "enviarCorreo"
).addEventListener(
    "click",
    function() {

        const correoDestino =
            document.getElementById(
                "correoCliente"
            ).value;


        if (correoDestino === "") {

            alert(
                "No se encontró un correo electrónico."
            );

            return;
        }


        const id =
            document.getElementById(
                "resultadoId"
            ).textContent;


        const nombreFactura =
            document.getElementById(
                "resultadoNombre"
            ).textContent;


        const apellidoFactura =
            document.getElementById(
                "resultadoApellido"
            ).textContent;


        const telefonoFactura =
            document.getElementById(
                "resultadoTelefono"
            ).textContent;


        const opcion =
            document.getElementById(
                "resultadoOpcion"
            ).textContent;


        const cantidadEquipos =
            document.getElementById(
                "resultadoEquipos"
            ).textContent;


        const cantidadDias =
            document.getElementById(
                "resultadoDias"
            ).textContent;


        const adicionales =
            document.getElementById(
                "resultadoAdicionales"
            ).textContent;


        const total =
            document.getElementById(
                "resultadoTotal"
            ).textContent;


        const asunto =
            "Factura ALQUIPC - " + id;


        const mensaje =

            "ALQUIPC%0D%0A%0D%0A" +

            "FACTURA DE ALQUILER%0D%0A%0D%0A" +

            "ID Cliente: " +
            id +
            "%0D%0A" +

            "Nombre: " +
            nombreFactura +
            "%0D%0A" +

            "Apellido: " +
            apellidoFactura +
            "%0D%0A" +

            "Teléfono: " +
            telefonoFactura +
            "%0D%0A" +

            "Opción de alquiler: " +
            opcion +
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

            "Gracias por utilizar " +
            "los servicios de ALQUIPC.";


        window.location.href =
            "mailto:" +
            correoDestino +
            "?subject=" +
            encodeURIComponent(asunto) +
            "&body=" +
            mensaje;

    }
);
