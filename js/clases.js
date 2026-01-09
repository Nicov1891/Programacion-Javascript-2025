
class Sistema {
    constructor() {
        this.listaAministradores = [];
        this.listaUsuarios = [];
        this.usuarioLogueado = null;
        this.listaConciertos = [];
        this.ListaReservas = [];
        this.Totalacumulado = 0;
    }

    PrecargaDatos() {
        this.listaUsuarios.push(new Usuario("Ana", "Gonzalez", "Anita12", "Anagon31", 3700));
        this.listaUsuarios.push(new Usuario("Luis", "Martinez", "LuMa98", "LomaN45", 5700));
        this.listaUsuarios.push(new Usuario("Carla", "Perez", "CaPe56", "CarpE72", 10000));
        this.listaUsuarios.push(new Usuario("Diego", "Lopez", "DiLo84", "DigoN19", 10000));
        this.listaUsuarios.push(new Usuario("Sofia", "Torres", "SoTo63", "Softa58", 9200));
        this.listaUsuarios.push(new Usuario("Mateo", "Fernandez", "MaFe90", "Mafon23", 10000));
        this.listaUsuarios.push(new Usuario("Valeria", "Suarez", "VaSu74", "Valsu66", 10000));
        this.listaUsuarios.push(new Usuario("Tomas", "Romero", "ToRo47", "Tomir88", 6400));//
        this.listaUsuarios.push(new Usuario("Lucia", "Castro", "LuCa51", "Lucar95", 10000));
        this.listaUsuarios.push(new Usuario("Marcos", "Diaz", "MaDi64", "Mardo12", 10000));
        this.listaAministradores.push(new Administrador("Anita122", "Anagon31"));
        this.listaConciertos.push(new Concierto("Juntos Otra Vez", "Erreway", "$2100", "show en vivo", "img/antelarena.jpg", 14997, false, true));
        this.listaConciertos.push(new Concierto("Bailemos Otra Vez", "Chayanne", "$2150", "show en vivo", "img/estadiocentenario.webp", 60233, true, true));
        this.listaConciertos.push(new Concierto("Gira 2025", "El Plan de la Mariposa", "$1280", "show en vivo", "img/teatrodeverano.webp", 5000, false, true));
        this.listaConciertos.push(new Concierto("De Amor, de Locura y de Guerra", "La Triple Nelson", "$800", "show en vivo", "img/auditorioadelareta.jpg", 1885, true, true));
        this.listaConciertos.push(new Concierto("Ciclo JARANA", "Pequeño Pez", "$1000", "show en vivo", "img/salazitarrosa.jpg", 527, true, true));//
        this.ListaReservas.push(new Reserva(this.listaUsuarios[0], this.listaConciertos[0], 3, "Aprobada"));
        this.ListaReservas.push(new Reserva(this.listaUsuarios[1], this.listaConciertos[2], 2, "Aprobada"));
        this.ListaReservas.push(new Reserva(this.listaUsuarios[4], this.listaConciertos[3], 1, "Aprobada"));
        this.ListaReservas.push(new Reserva(this.listaUsuarios[7], this.listaConciertos[4], 4, "Aprobada"));
        this.ListaReservas.push(new Reserva(this.listaUsuarios[5], this.listaConciertos[3], 4, "Pendiente"));
        this.ListaReservas.push(new Reserva(this.listaUsuarios[2], this.listaConciertos[0], 1, "Pendiente"));
        this.ListaReservas.push(new Reserva(this.listaUsuarios[8], this.listaConciertos[2], 8, "Pendiente"));
        this.ListaReservas.push(new Reserva(this.listaUsuarios[3], this.listaConciertos[2], 10, "Cancelada"));
        this.ListaReservas.push(new Reserva(this.listaUsuarios[0], this.listaConciertos[1], 5, "Cancelada"));
        this.ListaReservas.push(new Reserva(this.listaUsuarios[9], this.listaConciertos[4], 2, "Cancelada"));
    }
    //nombre, artista, precio, descripcion, imagen, cupos, oferta, estado
    //usuario, Concierto, entradas, estado

    cancelarDesdeTablaReserva(id) {
        let objReserva = this.obtenerReservaPorID(id);
        objReserva.estado = "Cancelado";
    }

    obtenerMontoyEntradas() {
        let listaConcierto = this.listaConciertos;
        let listaReservas = this.ListaReservas;
        let total = 0;
        for (let i = 0; i < listaConcierto.length; i++) {
            let objConcierto = listaConcierto[i];
            let totalgenerado = 0;
            let entradasvendidas = 0;
            for (let y = 0; y < listaReservas.length; y++) {
                let objReserva = listaReservas[y];
                if (objConcierto.id == objReserva.concierto.id && objReserva.estado == "Aprobada") {
                    totalgenerado += objReserva.montototalnumerico();
                    entradasvendidas += objReserva.cantidad;
                }
            }
            objConcierto.totalgenerado = totalgenerado;
            objConcierto.entradasvendidas = entradasvendidas;
            total += totalgenerado;
        }
        this.Totalacumulado = total;
    }

    modificarcupos(concierto, cuposnuevos) {
        let objConcierto = this.obtenerConciertosPorID(concierto);
        if (cuposnuevos == 0) {
            objConcierto.estado = false;
            objConcierto.cupos = cuposnuevos;
        }
        else {
            objConcierto.cupos = cuposnuevos;
        }
    }

    activarConciertoEstado(id) {
        let objConcierto = this.obtenerConciertosPorID(id);
        if(objConcierto.cupos >= 1){
            objConcierto.estado = true;
        }
    }

    activarConciertoOferta(id) {
        let objConcierto = this.obtenerConciertosPorID(id);
        objConcierto.oferta = true;
    }

    desactivarConciertoEstado(id) {
        let objConcierto = this.obtenerConciertosPorID(id);
        objConcierto.estado = false;
    }

    desactivarConciertoOferta(id) {
        let objConcierto = this.obtenerConciertosPorID(id);
        objConcierto.oferta = false;
    }

    ValidarConcierto(nombre, artista) {
        let lista = this.listaConciertos;
        let existe = false;
        for (let i = 0; i < lista.length && !existe; i++) {
            let obj = lista[i];
            if (obj.nombre.toLowerCase() == nombre.toLowerCase() && obj.artista.toLowerCase() == artista.toLowerCase()) {
                existe = true
            }
        }
        return existe;
    }

    ProcesarReservaPendiente(id) {
        let resp = false;
        let objReserva = this.obtenerReservaPorID(id);
        if (objReserva.montototalnumerico() <= objReserva.usuario.saldo && objReserva.cantidad <= objReserva.concierto.cupos && objReserva.estado == "Pendiente") {
            let saldouser = objReserva.usuario.saldo;
            let monto = objReserva.montototalnumerico();
            if (objReserva.cantidad >= 4) {
                monto = monto - (monto * 0.10);
                saldouser = saldouser - monto;
            }
            else {
                saldouser = saldouser - monto;
            }
            objReserva.concierto.cupos = objReserva.concierto.cupos - objReserva.cantidad;
            if (objReserva.concierto.cupos == 0) { objReserva.concierto.estado == false }
            objReserva.estado = "Aprobada";
            resp = true;
            objReserva.usuario.saldo = saldouser;
        }
        else {
            objReserva.estado = "Cancelada";
        }
        return resp;
    }

    obtenerReservaPorID(idReserva) {
        let resp = null;
        for (let i = 0; i < this.ListaReservas.length && resp == null; i++) {
            let obj = this.ListaReservas[i];
            if (obj.id == idReserva) {
                resp = obj;
            }
        }
        return resp;
    }

    cargarReservas(lista, estado) {
        let listaPendientes = [];
        for (let i = 0; i < lista.length; i++) {
            let obj = lista[i];
            if (obj.estado == estado) {
                listaPendientes.push(obj);
            }
        }
        return listaPendientes;
    }

    misConciertosReservados() {
        let listareserva = [];
        let lista = this.ListaReservas;
        for (let i = 0; i < lista.length; i++) {
            let obj = lista[i];
            if (obj.usuario.id == this.usuarioLogueado.id) {
                listareserva.push(obj);
            }
        }
        return listareserva;
    }

    mostrarconciertosoferta() {
        let lista = [];
        for (let i = 0; i < this.listaConciertos.length; i++) {
            let obj = this.listaConciertos[i];
            if (obj.oferta == true && obj.estado == true) {
                lista.push(obj);
            }
        }
        return lista;
    }

    existereservaconcierto(id) {
        let lista = this.ListaReservas;
        let existe = false;
        for (let i = 0; i < lista.length && !existe; i++) {
            let obj = lista[i];
            if (obj.concierto.id == id && obj.usuario.id == this.usuarioLogueado.id) {
                existe = true;
            }
        }
        return existe;
    }

    reservarConcierto(id, entradas) {
        let objConcierto = this.obtenerConciertosPorID(id);
        objConcierto.entradas = entradas;
        let objReserva = new Reserva(this.usuarioLogueado, objConcierto, entradas, "Pendiente");
        this.ListaReservas.push(objReserva);
    }

    conciertoactivos() {
        let lista = [];
        for (let i = 0; i < this.listaConciertos.length; i++) {
            let obj = this.listaConciertos[i];
            if (obj.estado == true) {
                lista.push(obj);
            }
        }
        return lista;
    }

    obtenerConciertosConStock() {
        let lista = [];
        for (let i = 0; i < this.listaConciertos.length; i++) {
            let obj = this.listaConciertos[i];
            if (obj.cupos > 0 && obj.estado == true) {
                lista.push(obj);
            }
        }
        return lista;
    }

    obtenerConciertosPorID(idConcierto) {
        let resp = null;
        for (let i = 0; i < this.listaConciertos.length && resp == null; i++) {
            let obj = this.listaConciertos[i];
            if (obj.id == idConcierto) {
                resp = obj;
            }
        }
        return resp;
    }

    conciertoactivosOferta() {
        let lista = [];
        for (let i = 0; i < this.listaConciertos.length; i++) {
            let obj = this.listaConciertos[i];
            if (obj.estado == true && obj.cupos > 0 && obj.oferta == true) {
                lista.push(obj);
            }
        }
        return lista;
    }

    RealizarLogout() {
        this.usuarioLogueado = null;
    }

    LoginUsuario(usuario, pass) {
        let exitoso = false;
        let usuariocase = usuario.toLowerCase();
        let contraseñacase = pass.toLowerCase();
        for (let i = 0; i < this.listaUsuarios.length && !exitoso; i++) {
            let obj = this.listaUsuarios[i];
            if (usuariocase == obj.usuario.toLowerCase() && contraseñacase == obj.contraseña.toLowerCase()) {
                exitoso = true;
                this.usuarioLogueado = obj;
            }
        }
        return exitoso;
    }

    LoginAdmin(usuario, pass) {
        let exitoso = false;
        let usuariocase = usuario.toLowerCase();
        let contraseñacase = pass.toLowerCase();
        for (let i = 0; i < this.listaAministradores.length && !exitoso; i++) {
            let obj = this.listaAministradores[i];
            if (usuariocase == obj.usuario.toLowerCase() && contraseñacase == obj.contraseña.toLowerCase()) {
                exitoso = true;
                this.usuarioLogueado = obj;
            }
        }
        return exitoso;
    }

    AgregarUser(nombre, apellido, usuario, contraseña) {
        let ingresado = false
        if (this.verificaruser(usuario) && this.validarpassword(contraseña)) {
            let obj = new Usuario(nombre, apellido, usuario, contraseña, 10000);
            this.listaUsuarios.push(obj);
            ingresado = true;
        }
        return ingresado;
    }

    verificaruser(user) {
        let usuariocase = user.toLowerCase();
        let noexiste = true;
        for (let i = 0; i < this.listaUsuarios.length && noexiste; i++) {
            let obj = this.listaUsuarios[i];
            if (usuariocase == obj.usuario.toLowerCase()) {
                noexiste = false;
            }
        }
        return noexiste;
    }

    validarpassword(pass) {
        let valida = false;
        if (pass.length >= 5 && this.validarmayus(pass) && this.validarmin(pass) && this.validarnum(pass)) {
            valida = true;
        }
        return valida;
    }

    validarmayus(pass) {
        let correcto = false;
        let letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passmay = pass.toUpperCase();
        for (let i = 0; i < pass.length && !correcto; i++) {
            let letra = pass.charAt(i);
            if ((letra == passmay.charAt(i)) && letras.includes(letra)) {
                correcto = true;
            }
        }
        return correcto;
    }

    validarmin(pass) {
        let correcto = false;
        let letras = "abcdefghijklmnopqrstuvwxyz";
        let passmin = pass.toLowerCase();
        for (let i = 0; i < pass.length && !correcto; i++) {
            let letra = pass.charAt(i);
            if ((letra == passmin.charAt(i)) && letras.includes(letra)) {
                correcto = true;
            }
        }
        return correcto;
    }
    validarnum(pass) {
        let correcto = false;
        let numeros = "0123456789";
        for (let i = 0; i < pass.length && !correcto; i++) {
            let letra = pass.charAt(i);
            if (numeros.includes(letra)) {
                correcto = true;
            }
        }
        return correcto;
    }

}

let idusuario = 1;
class Usuario {
    constructor(nombre, apellido, usuario, contraseña, saldo) {
        this.id = idusuario++;
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.saldo = saldo;
    }
}

class Administrador {
    constructor(usuario, contraseña) {
        this.usuario = usuario;
        this.contraseña = contraseña;
    }
}

let idconcierto = 1;
class Concierto {
    constructor(nombre, artista, precio, descripcion, imagen, cupos, oferta, estado) {
        this.id = "CON_ID_" + idconcierto++;
        this.nombre = nombre;
        this.artista = artista;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen
        this.cupos = cupos;
        this.oferta = oferta;
        this.estado = estado;
        this.entradas = 0;
        this.totalgenerado = 0;
        this.entradasvendidas = 0;
    }

    estaActivo() {
        let texto = "Pausado";
        if (this.estado) {
            texto = "Activo";
        }
        return texto;
    }

    estaenoferta() {
        let texto = "No";
        if (this.oferta) {
            texto = "Si";
        }
        return texto;

    }

    montototal() {
        let precioNumerico = parseInt(this.precio.replace("$", ""));
        let total = this.entradas * precioNumerico;
        let texto = `$${total}`;
        return texto
    }
}

let idreserva = 1;
class Reserva {
    constructor(usuario, concierto, cantidad, estado) {
        this.id = idreserva++;
        this.usuario = usuario;
        this.concierto = concierto;
        this.cantidad = cantidad;
        this.estado = estado;
    }

    estadoConcierto(){
        let texto = ``;
        if(this.estado){
            texto = "Pendiente";
        }
    }

    montototal() {
        let precioNumerico = parseInt(this.concierto.precio.replace("$", ""));
        let total = this.cantidad * precioNumerico;
        let texto = `$${total}`;
        return texto;
    }
    montototalnumerico() {
        let precioNumerico = parseInt(this.concierto.precio.replace("$", ""));
        let total = this.cantidad * precioNumerico;
        return total;
    }

}