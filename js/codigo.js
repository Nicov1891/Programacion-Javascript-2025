let sistema = new Sistema();
sistema.PrecargaDatos();


document.querySelector("#btnLogin").addEventListener("click", Login);
document.querySelector("#btnRegistro").addEventListener("click", Registro);
document.querySelector("#btnLogoutadm").addEventListener("click", Logout);
document.querySelector("#btnLogoutuser").addEventListener("click", Logout);
document.querySelector("#btnreserva").addEventListener("click", Reservar);
document.querySelector("#btnreservaoferta").addEventListener("click", ReservaOferta);
document.querySelector("#ProcesarReserva").addEventListener("click", ProcesarReserva);
document.querySelector("#agregarconcierto").addEventListener("click", AgregarConcierto);
document.querySelector("#btnModificarCupos").addEventListener("click", ModificarCupos);
document.querySelector("#btnMostrartotal").addEventListener("click", Mostrartotal);

function actualizarSeccionUsuario() {
    actualizarTablaConciertos();
    ConciertosReservas();
    ConciertosenOferta();
    ConciertosReservasOfertas();
    CargarComboReservas();
}

function actualizarSeccionAdmin() {
    cargarComboReservasPendientes();
    ReservasPendientes();
    ReservasCanceladas();
    ReservasAprobadas();
    mostrarConciertos();
    losConciertos();
    cargarComboGanancias();
}

function Registro() {
    let form = document.querySelector("#formregistro");
    if (form.reportValidity()) {
        let nombre = document.querySelector("#nombreregistro").value;
        let apellido = document.querySelector("#apellidoregistro").value;
        let usuario = document.querySelector("#usuarioregistro").value;
        let contraseña = document.querySelector("#contraregistro").value;
        if (sistema.AgregarUser(nombre, apellido, usuario, contraseña)) {
            alert("se ingreso correctamente");
            form.reset();
        }
        else {
            alert("no se ingreso correctamente.")
        }
    }
}

function Login() {
    let form = document.querySelector("#formlogin");
    if (form.reportValidity()) {
        let usuario = document.querySelector("#usuariolog").value;
        let contraseña = document.querySelector("#contralog").value;
        if (sistema.LoginUsuario(usuario, contraseña)) {
            MostrarSection("#sectionUsuario");
            form.reset();
            actualizarSeccionUsuario();
        }
        else if (sistema.LoginAdmin(usuario, contraseña)) {
            MostrarSection("#sectionAdmin");
            form.reset();
            actualizarSeccionAdmin();
        }
        else {
            alert("Datos incorrectos.");
        }
    }
}

function Logout() {
    sistema.RealizarLogout();
    MostrarSection("#sectionInicio");
}

function MostrarSection(id) {
    let secciones = document.querySelectorAll(".section");
    for (let i = 0; i < secciones.length; i++) {
        let section = secciones[i];
        section.style.display = "none";
    }
    document.querySelector(id).style.display = "block";
}

function actualizarTablaConciertos() {
    let lista = sistema.conciertoactivos();
    let texto = ``;
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<tr>
                    <td><img src="${obj.imagen}"></td>
                    <td>${obj.nombre}</td>
                    <td>${obj.artista}</td>
                    <td>${obj.descripcion}</td>
                    <td>${obj.precio}</td>
                    <td>${obj.estaenoferta()}</td>
                </tr>`;
    }
    document.querySelector("#tablaConcierto").innerHTML = texto;
}

function ConciertosReservas() {
    let lista = sistema.obtenerConciertosConStock();
    let texto = ``;
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<option value= "${obj.id}">${obj.nombre} - Cupos:${obj.cupos} </option>`;
    }
    document.querySelector("#selreserva").innerHTML = texto;
}

function Reservar() {
    let form = document.querySelector("#formReservar");
    if (form.reportValidity()) {
        let id = document.querySelector("#selreserva").value;
        let entradas = Number(document.querySelector("#cantentradas").value)
        if (sistema.existereservaconcierto(id)) {
            alert("Este concierto ya fue reservado.");
        }
        else {
            sistema.reservarConcierto(id, entradas);
            alert("Se Reservo Correctamente.");
            actualizarSeccionUsuario();
            form.reset();
        }
    }
}

function CargarComboReservas() {
    let lista = sistema.misConciertosReservados();
    let texto = ``;
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        let botonestado = `<input type="button" id="${obj.id}" value="Cancelar" class="cancelarreserva">`;
        if (obj.usuario.id == sistema.usuarioLogueado.id) {
            texto += `<tr>
                    <td>${obj.concierto.nombre}</td>
                    <td>${obj.cantidad}</td>
                    <td>${obj.montototal()}</td>
                    <td>${obj.estado}</td>
                    <td>${botonestado}</td>
                </tr>`;
        }
    }
    document.querySelector("#tablaHistorialReserva").innerHTML = texto;

    let botonesCancelarReserva = document.querySelectorAll(".cancelarreserva");
    for (let i = 0; i < botonesCancelarReserva.length; i++) {
        let boton = botonesCancelarReserva[i];
        boton.addEventListener("click", cancelarDesdeTablaReserva);
    }

}

function cancelarDesdeTablaReserva(){
    let id = this.id;
    sistema.cancelarDesdeTablaReserva(id);
    actualizarSeccionUsuario();
}

function ConciertosenOferta() {
    let lista = sistema.mostrarconciertosoferta();
    let texto = ``;
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<tr>
                    <td><img src="${obj.imagen}"></td>
                    <td>${obj.nombre}</td>
                    <td>${obj.artista}</td>
                    <td>${obj.descripcion}</td>
                    <td>${obj.precio}</td>
                </tr>`;
    }
    document.querySelector("#tablaConciertosOferta").innerHTML = texto;
}

function ConciertosReservasOfertas() {
    let lista = sistema.conciertoactivosOferta();
    let texto = ``;
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<option value= "${obj.id}">${obj.nombre} - Cupos:${obj.cupos} </option>`;
    }
    document.querySelector("#selreservaoferta").innerHTML = texto;
}

function ReservaOferta() {
    let id = document.querySelector("#selreservaoferta").value;
    let entradas = Number(document.querySelector("#cantentradasoferta").value)
    if (sistema.existereservaconcierto(id)) {
        alert("Este concierto ya fue reservado.");
    }
    else {
        sistema.reservarConcierto(id, entradas) 
            alert("Se reservo correctamente.");
            actualizarSeccionUsuario();
    }
}

function cargarComboReservasPendientes() {
    let lista = sistema.cargarReservas(sistema.ListaReservas, "Pendiente");
    let texto = "";
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<tr>
                    <td>${obj.usuario.usuario}</td>
                    <td>${obj.concierto.nombre}</td>
                    <td>${obj.cantidad}</td>
                    <td>${obj.montototal()}</td>
                    <td>${obj.estado}</td>
                    <td>$${obj.usuario.saldo}</td>
                </tr>`;
    }
    document.querySelector("#tablaReservasPendientes").innerHTML = texto;
}

function ReservasPendientes() {
    let lista = sistema.cargarReservas(sistema.ListaReservas, "Pendiente");
    let texto = ``;
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<option value= "${obj.id}">${obj.concierto.nombre} - Entradas:${obj.cantidad} </option>`;
    }
    document.querySelector("#selreservaspendientes").innerHTML = texto;
}

function ReservasAprobadas() {
    let lista = sistema.cargarReservas(sistema.ListaReservas, "Aprobada");
    let texto = "";
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<tr>
                    <td>${obj.usuario.usuario}</td>
                    <td>${obj.concierto.nombre}</td>
                    <td>${obj.cantidad}</td>
                    <td>${obj.montototal()}</td>
                    <td>${obj.estado}</td>
                    <td>$${obj.usuario.saldo}</td>
                </tr>`;
    }
    document.querySelector("#tablaReservasAprobadas").innerHTML = texto;
}

function ReservasCanceladas() {
    let lista = sistema.cargarReservas(sistema.ListaReservas, "Cancelada");
    let texto = "";
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<tr>
                    <td>${obj.usuario.usuario}</td>
                    <td>${obj.concierto.nombre}</td>
                    <td>${obj.cantidad}</td>
                    <td>${obj.montototal()}</td>
                    <td>${obj.estado}</td>
                    <td>$${obj.usuario.saldo}</td>
                </tr>`;
    }
    document.querySelector("#tablaReservasCanceladas").innerHTML = texto;
}

function ProcesarReserva() {
    let id = document.querySelector("#selreservaspendientes").value;
    if (sistema.ProcesarReservaPendiente(id)) {
        alert("Procesada correctamente");
        actualizarSeccionAdmin();
    }
    else {
        alert("Reserva Cancelada");
        actualizarSeccionAdmin();
    }
}

function AgregarConcierto() {
    let form = document.querySelector("#formAgregarConcierto");
    if (form.reportValidity()) {
        let nombre = document.querySelector("#nombreconcierto").value;
        let artista = document.querySelector("#nombreartista").value;
        let precioentrada = Number(document.querySelector("#precioconcierto").value);
        let descripcion = document.querySelector("#descripcionconcierto").value;
        let cupoconcierto = Number(document.querySelector("#cuposconcierto").value);
        let oferta = document.querySelector("#conciertooferta").value;
        let foto = document.querySelector("#selfotoconcierto").value;
        if (oferta) {
            oferta = true;
        }
        else {
            oferta = false;
        }
        if (!sistema.ValidarConcierto(nombre, artista)) {
            sistema.listaConciertos.push(new Concierto(nombre, artista, "$" + precioentrada, descripcion, foto, cupoconcierto, oferta, true));
            alert("Agregado correctamente.");
            actualizarSeccionAdmin();
            form.reset();
        }
        else {
            alert("Este concierto ya existe.");
        }
    }
}

function mostrarConciertos() {
    let lista = sistema.listaConciertos;
    let texto = "";
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        let botonestado = `<input type="button" id="${obj.id}" value="Activar" class="activarestado">`;
        let botonoferta = `<input type="button" id="${obj.id}" value="Activar" class="activaroferta">`;
        if (obj.estado) {
            botonestado = `<input type="button" id="${obj.id}" value="Desactivar" class="desactivarestado">`;
        }
        if (obj.oferta) {
            botonoferta = `<input type="button" id="${obj.id}" value="Desactivar" class="desactivaroferta">`;
        }
        texto += `<tr>
                    <td>${obj.nombre}</td>
                    <td>${obj.artista}</td>
                    <td>${obj.precio}</td>
                    <td>${obj.descripcion}</td>
                    <td>${obj.cupos}</td>
                    <td>${obj.estaenoferta()}</td>
                    <td>${obj.estaActivo()}</td>
                    <td>${botonoferta}</td>
                    <td>${botonestado}</td>
                </tr>`;
    }
    document.querySelector("#tablaConciertos").innerHTML = texto;

    let botonesActivarestado = document.querySelectorAll(".activarestado");
    for (let i = 0; i < botonesActivarestado.length; i++) {
        let boton = botonesActivarestado[i];
        boton.addEventListener("click", activarDesdeTablaEstado);
    }

    let botonesActivarOferta = document.querySelectorAll(".activaroferta");
    for (let i = 0; i < botonesActivarOferta.length; i++) {
        let boton = botonesActivarOferta[i];
        boton.addEventListener("click", activarDesdeTablaOferta);
    }

    let botonesDesactivarestado = document.querySelectorAll(".desactivarestado");
    for (let i = 0; i < botonesDesactivarestado.length; i++) {
        let boton = botonesDesactivarestado[i];
        boton.addEventListener("click", desactivarDesdeTablaEstado);
    }

    let botonesDesactivarOferta = document.querySelectorAll(".desactivaroferta");
    for (let i = 0; i < botonesDesactivarOferta.length; i++) {
        let boton = botonesDesactivarOferta[i];
        boton.addEventListener("click", desactivarDesdeTablaOferta);
    }
}

function activarDesdeTablaEstado() {
    let id = this.id;
    sistema.activarConciertoEstado(id);
    actualizarSeccionAdmin();
}

function activarDesdeTablaOferta() {
    let id = this.id;
    sistema.activarConciertoOferta(id);
    actualizarSeccionAdmin();
}

function desactivarDesdeTablaEstado() {
    let id = this.id;
    sistema.desactivarConciertoEstado(id);
    actualizarSeccionAdmin();
}

function desactivarDesdeTablaOferta() {
    let id = this.id;
    sistema.desactivarConciertoOferta(id);
    actualizarSeccionAdmin();
}


function losConciertos() {
    let lista = sistema.listaConciertos;
    let texto = ``;
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<option value= "${obj.id}">Nombre:${obj.nombre} - Cupos:${obj.cupos}</option>`;
    }
    document.querySelector("#selectconciertos").innerHTML = texto;
}

function ModificarCupos() {
    let form = document.querySelector("#formmodificarcupos");
    if (form.reportValidity()) {
        let concierto = document.querySelector("#selectconciertos").value;
        let cuposnuevos = document.querySelector("#modificarcupos").value;
        sistema.modificarcupos(concierto, cuposnuevos)
        alert("Se modifico correctamente.");
        actualizarSeccionAdmin();

    }
}

function cargarComboGanancias() {
    sistema.obtenerMontoyEntradas();
    let lista = sistema.listaConciertos;
    let texto = "";
    for (let i = 0; i < lista.length; i++) {
        let obj = lista[i];
        texto += `<tr>
                    <td>${obj.nombre}</td>
                    <td>${obj.entradasvendidas}</td>
                    <td>$${obj.totalgenerado}</td>
                </tr>`;
    }
    document.querySelector("#tablaInformeGanancias").innerHTML = texto;
}

function Mostrartotal(){
    let total = sistema.Totalacumulado;
    let texto = `Se va recaudando: $${total}.`
    document.querySelector("#pMostrarGanancias").innerHTML = texto;
}


