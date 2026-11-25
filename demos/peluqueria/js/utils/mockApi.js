/*
 * API SIMULADA (solo para la demo del portafolio)
 * ------------------------------------------------
 * Imita los endpoints REST de Spring Boot (/v1/Clientes, /v1/Peluqueros,
 * /v1/Servicios, /v1/Citas) y genera datos iniciales igual que DataLoader.java.
 * Los cambios se guardan en el localStorage del navegador.
 */

const CLAVE = 'reda-barber-demo-db';
let memoria = null; // respaldo si localStorage no está disponible

const NOMBRES = ['Lucas', 'Martina', 'Hugo', 'Sofía', 'Mateo', 'Valeria', 'Leo', 'Carla', 'Adam', 'Noa',
    'Omar', 'Lucía', 'Daniel', 'Sara', 'Youssef', 'Paula', 'Álvaro', 'Inés', 'Nabil', 'Elena'];
const PELUQUEROS = ['Reda', 'Samir', 'Javi', 'Andrea'];
const ESPECIALIDADES = ['Cortes modernos', 'Barbería clásica', 'Color y mechas', 'Peinados', 'Tintes fantasía', 'Corte degradado'];
const ESTADOS = ['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA'];
const NOTAS = ['Degradado bajo con textura', 'Corte clásico con tijera', 'Arreglar barba y perfilar', 'Corte fade alto', 'Lavado + masaje capilar'];
const HORAS = [9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22];

const azar = (n) => Math.floor(Math.random() * n);
const pad = (n) => String(n).padStart(2, '0');

function fechaLocal(fecha) {
    return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())}T${pad(fecha.getHours())}:00:00`;
}

function generarDatos() {
    const servicios = [
        { id: 1, nombre: 'Corte', precio: 10.0, duracionMinutos: 30 },
        { id: 2, nombre: 'Barba', precio: 8.0, duracionMinutos: 20 },
        { id: 3, nombre: 'Tinte', precio: 35.0, duracionMinutos: 90 },
        { id: 4, nombre: 'Mechas', precio: 25.0, duracionMinutos: 80 },
        { id: 5, nombre: 'Lavado', precio: 5.0, duracionMinutos: 10 }
    ];

    const clientes = NOMBRES.map((nombre, i) => ({
        id: i + 1,
        nombre,
        email: `${nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}${i + 1}@mail.com`,
        telefono: '6' + String(10000000 + azar(89999999))
    }));

    const peluqueros = PELUQUEROS.map((nombre, i) => ({
        id: i + 1,
        nombre,
        especialidad: ESPECIALIDADES[azar(ESPECIALIDADES.length)],
        disponible: i === 3 ? 'No' : 'Si'
    }));

    const citas = [];
    for (let i = 0; i < 24; i++) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + azar(10));
        fecha.setHours(HORAS[azar(HORAS.length)], 0, 0, 0);

        const serviciosCita = [servicios[azar(servicios.length)]];
        if (Math.random() > 0.5) {
            const extra = servicios[azar(servicios.length)];
            if (!serviciosCita.includes(extra)) serviciosCita.push(extra);
        }

        citas.push({
            id: i + 1,
            fechaHora: fechaLocal(fecha),
            estado: ESTADOS[azar(ESTADOS.length)],
            notas: NOTAS[azar(NOTAS.length)],
            cliente: clientes[azar(clientes.length)],
            peluquero: peluqueros[azar(peluqueros.length)],
            servicios: serviciosCita
        });
    }
    citas.sort((a, b) => a.fechaHora.localeCompare(b.fechaHora));

    return { Clientes: clientes, Peluqueros: peluqueros, Servicios: servicios, Citas: citas };
}

function cargar() {
    try {
        const guardado = localStorage.getItem(CLAVE);
        if (guardado) return JSON.parse(guardado);
    } catch (e) { /* sin localStorage */ }
    if (!memoria) memoria = generarDatos();
    return memoria;
}

function guardar(db) {
    memoria = db;
    try { localStorage.setItem(CLAVE, JSON.stringify(db)); } catch (e) { /* sin localStorage */ }
}

// Permite reiniciar los datos de la demo desde la consola: resetDemoPeluqueria()
window.resetDemoPeluqueria = () => { try { localStorage.removeItem(CLAVE); } catch (e) { } memoria = null; location.reload(); };

// Igual que hace JPA: una cita guarda referencias completas a cliente/peluquero/servicios
function resolverRelaciones(db, cita) {
    const r = { ...cita };
    if (cita.cliente?.id) r.cliente = db.Clientes.find(c => c.id === Number(cita.cliente.id)) || cita.cliente;
    if (cita.peluquero?.id) r.peluquero = db.Peluqueros.find(p => p.id === Number(cita.peluquero.id)) || cita.peluquero;
    r.servicios = (cita.servicios || []).map(s => db.Servicios.find(x => x.id === Number(s.id)) || s);
    return r;
}

const copia = (obj) => JSON.parse(JSON.stringify(obj));
const esperar = () => new Promise(res => setTimeout(res, 150 + azar(200))); // simula latencia de red

export async function mockFetchApi(method = 'GET', path, body = null) {
    await esperar();

    const [, , recurso, idTexto] = path.split('/'); // "/v1/Citas/3" → ['', 'v1', 'Citas', '3']
    const db = cargar();
    const tabla = db[recurso];
    if (!tabla) throw new Error('Error en el servidor: 404');
    const id = idTexto ? Number(idTexto) : null;

    if (method === 'GET') {
        if (id === null) return copia(tabla);
        const item = tabla.find(x => x.id === id);
        if (!item) throw new Error('Error en el servidor: 404');
        return copia(item);
    }

    if (method === 'POST') {
        const nuevoId = tabla.reduce((max, x) => Math.max(max, x.id), 0) + 1;
        let nuevo = { ...body, id: nuevoId };
        if (recurso === 'Citas') nuevo = resolverRelaciones(db, nuevo);
        tabla.push(nuevo);
        guardar(db);
        return copia(nuevo);
    }

    if (method === 'PUT') {
        const i = tabla.findIndex(x => x.id === id);
        if (i === -1) throw new Error('Error en el servidor: 404');
        let actualizado = { ...tabla[i], ...body, id };
        if (recurso === 'Citas') actualizado = resolverRelaciones(db, actualizado);
        tabla[i] = actualizado;
        // Propaga los cambios a las citas (como haría la relación en la BD)
        if (recurso !== 'Citas') {
            db.Citas = db.Citas.map(c => resolverRelaciones(db, c));
        }
        guardar(db);
        return copia(actualizado);
    }

    if (method === 'DELETE') {
        const i = tabla.findIndex(x => x.id === id);
        if (i === -1) throw new Error('Error en el servidor: 404');
        tabla.splice(i, 1);
        // cascade = CascadeType.ALL → al borrar cliente/peluquero se borran sus citas
        if (recurso === 'Clientes') db.Citas = db.Citas.filter(c => c.cliente?.id !== id);
        if (recurso === 'Peluqueros') db.Citas = db.Citas.filter(c => c.peluquero?.id !== id);
        if (recurso === 'Servicios') db.Citas.forEach(c => { c.servicios = (c.servicios || []).filter(s => s.id !== id); });
        guardar(db);
        return null;
    }

    throw new Error('Error en el servidor: 405');
}
