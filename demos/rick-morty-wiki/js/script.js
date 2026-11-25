//Boton favoritos
const botonFav = document.querySelectorAll(".btn4");
const tarjetas = document.querySelectorAll(".card__body");
const indice = document.querySelector(".page-hero");
const nuevoParrafo = document.createElement("p");
nuevoParrafo.style.color = "#00ff9c";

if (indice) {
    nuevoParrafo.textContent = "Personajes destacados: ";
    indice.appendChild(nuevoParrafo);
    for (const boton of botonFav) {
        boton.addEventListener("click", function () {
            if (boton.textContent == "🌟") {
                boton.classList.add("guardado");
                boton.textContent = "Guardado";
                boton.style.color = "black";
            } else {
                boton.classList.remove("guardado");
                boton.textContent = "🌟"
            }
            let contador = document.getElementsByClassName("guardado").length;
            nuevoParrafo.textContent = "Personajes destacados: " + contador;
        });
    }
}

//Boton ocultar
const botonOcultar = document.querySelector(".btn-ocultar");
const tarjeta = document.querySelector(".detail__facts");

if (botonOcultar && tarjeta) {
    botonOcultar.addEventListener("click", function () {
        if (tarjeta.style.display == "none") {
            tarjeta.style.display = "flex"
            botonOcultar.textContent = "Ocultar ficha"
        } else {
            tarjeta.style.display = "none"
            botonOcultar.textContent = "Mostrar ficha"
        }
    })
}

// Boton detalle
const botonesDetalle = document.querySelectorAll(".btn");

botonesDetalle.forEach((boton) => {
    boton.addEventListener("click", () => {
        const idPersonaje = boton.dataset.id;
        window.location.href = `detalle.html?id=${idPersonaje}`;
    });
});

const personajes = [
    {
        id: "1",
        nombre: "Rick Sanchez",
        imagen: "img/RICK_C-137.jpg",
        especie: "Humano",
        estado: "Vivo",
    },
    {
        id: "2",
        nombre: "Morty Smith",
        imagen: "img/Morty_smith_.jpg",
        especie: "Humano",
        estado: "Vivo",
    },
    {
        id: "3",
        nombre: "Summer Smith",
        imagen: "img/Summer_Smith.jpg",
        especie: "Humana",
        estado: "Viva",
    },
    {
        id: "4",
        nombre: "Beth Smith",
        imagen: "img/Beth_smith.jpg",
        especie: "Humana",
        estado: "Viva",
    },
    {
        id: "5",
        nombre: "Jerry Smith",
        imagen: "img/Jerry_Smith1.jpg",
        especie: "Humano",
        estado: "Vivo",
    },
    {
        id: "6",
        nombre: "Rick Prime",
        imagen: "img/PrimeRick.jpg",
        especie: "Humano",
        estado: "Desconocido",
    },
    {
        id: "7",
        nombre: "Evil Morty",
        imagen: "img/Evil_Morty.jpg",
        especie: "Humano",
        estado: "Desconocido",
    },
    {
        id: "8",
        nombre: "Abradolf Lincler",
        imagen: "img/Abradolf.jpg",
        especie: "Híbrido",
        estado: "Muerto",
    },
    {
        id: "9",
        nombre: "Jaguar",
        imagen: "img/Jaguar1.jpg",
        especie: "Humano",
        estado: "Vivo",
    },
    {
        id: "10",
        nombre: "Lucius Needful",
        imagen: "img/Needful.jpg",
        especie: "Desconocido",
        estado: "Desconocido",
    },
];

const parametros = new URLSearchParams(window.location.search);
const idPersonaje = parametros.get("id");

const personajeEncontrado = personajes.find(
    (personaje) => personaje.id === idPersonaje,
);

if (personajeEncontrado) {
    document.querySelector("#nombre-personaje").textContent =
        personajeEncontrado.nombre;
    document.querySelector("#imagen-personaje").src = personajeEncontrado.imagen;
    document.querySelector("#imagen-personaje").alt = personajeEncontrado.nombre;
    document.querySelector("#especie-personaje").textContent =
        personajeEncontrado.especie;
    document.querySelector("#estado-personaje").textContent =
        personajeEncontrado.estado;
    document.querySelector("#descripcion-personaje").textContent =
        personajeEncontrado.descripcion;
}

// URL base de la API
const apiUrlID = "https://rickandmortyapi.com/api/character/";
const apiUrlNombre = "https://rickandmortyapi.com/api/character/?name=";

async function obtenerPersonaje(nombreOId) {
    try {
        let url;

        if (isNaN(nombreOId)) {
            url = `${apiUrlNombre}${nombreOId}`;
        } else {
            url = `${apiUrlID}${nombreOId}`;
        }

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se encontró el personaje");
        }

        const datos = await respuesta.json();

        // Si es búsqueda por nombre
        if (datos.results) {
            if (datos.results.length > 0) {
                mostrarPersonaje(datos.results[0]);
            } else {
                throw new Error("No hay resultados");
            }
        }
        // Si es búsqueda por ID
        else {
            mostrarPersonaje(datos);
        }

    } catch (error) {
        console.error("Error al obtener el personaje:", error);
    }
}

function mostrarPersonaje(personaje) {
    const contenedor = document.getElementById("resultado-busqueda");

    contenedor.innerHTML = `
        <h3><strong>${personaje.name}</strong></h3>
        <img src="${personaje.image}" alt="Imagen de ${personaje.name}">
        <p><strong>ID:</strong> ${personaje.id}</p>
        <p><strong>Especie:</strong> ${personaje.species}</p>
        <p><strong>Estado:</strong> ${personaje.status}</p>
    `;
}

document.getElementById("btn-buscar")?.addEventListener("click", function (event) {
    event.preventDefault();

    const input = document
        .getElementById("busqueda-personaje")
        .value
        .trim()
        .toLowerCase();

    if (input) {
        obtenerPersonaje(input);
    }
});

// Personaje aletorio
async function obtenerPersonajeAleatorio(nombreOId) {
    try {
        let url;


        url = `${apiUrlID}${nombreOId}`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se encontró el personaje");
        }

        const datos = await respuesta.json();

        if (datos != null) {
            mostrarPersonajeAleatorio(datos);
        } else {
            throw new Error("No hay resultados");
        }
    } catch (error) {
        console.error("Error al obtener el personaje:", error);
    }
}

function mostrarPersonajeAleatorio(personaje) {
    const contenedor = document.querySelector(".resultado-aleatorio");

    contenedor.innerHTML = `
        <h3><strong>${personaje.name}</strong></h3>
        <img src="${personaje.image}" alt="Imagen de ${personaje.name}">
        <p><strong>ID:</strong> ${personaje.id}</p>
        <p><strong>Especie:</strong> ${personaje.species}</p>
        <p><strong>Estado:</strong> ${personaje.status}</p>
    `;
}

document.querySelector(".btn-aleatorio")?.addEventListener("click", function (event) {
    event.preventDefault();
    let aleatorio = Math.floor(Math.random() * 826) + 1;

    obtenerPersonajeAleatorio(aleatorio)

});
