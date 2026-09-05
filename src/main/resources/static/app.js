const API_URL = "/api/tareas";

const formulario = document.getElementById("formTarea");
const tareaId = document.getElementById("tareaId");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fechaLimite = document.getElementById("fechaLimite");
const completada = document.getElementById("completada");

const tituloFormulario = document.getElementById("tituloFormulario");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const btnActualizar = document.getElementById("btnActualizar");

const mensaje = document.getElementById("mensaje");
const cargando = document.getElementById("cargando");
const sinTareas = document.getElementById("sinTareas");
const tablaTareas = document.getElementById("tablaTareas");
const cuerpoTabla = document.getElementById("cuerpoTabla");

document.addEventListener("DOMContentLoaded", cargarTareas);
formulario.addEventListener("submit", guardarTarea);
btnActualizar.addEventListener("click", cargarTareas);
btnCancelar.addEventListener("click", limpiarFormulario);

async function cargarTareas() {
    cargando.classList.remove("oculto");
    sinTareas.classList.add("oculto");
    tablaTareas.classList.add("oculto");

    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las tareas");
        }

        const tareas = await respuesta.json();
        cuerpoTabla.innerHTML = "";

        if (tareas.length === 0) {
            sinTareas.classList.remove("oculto");
            return;
        }

        tareas.forEach(tarea => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${tarea.id}</td>
                <td>${escaparTexto(tarea.titulo)}</td>
                <td>${escaparTexto(tarea.descripcion || "Sin descripción")}</td>
                <td>${tarea.fechaLimite || "Sin fecha"}</td>
                <td>
                    <span class="estado ${tarea.completada ? "completada" : "pendiente"}">
                        ${tarea.completada ? "Completada" : "Pendiente"}
                    </span>
                </td>
                <td>
                    <div class="botones-tabla">
                        <button class="editar"
                            onclick="editarTarea(${tarea.id})">
                            Editar
                        </button>

                        <button class="eliminar"
                            onclick="eliminarTarea(${tarea.id})">
                            Eliminar
                        </button>
                    </div>
                </td>
            `;

            cuerpoTabla.appendChild(fila);
        });

        tablaTareas.classList.remove("oculto");

    } catch (error) {
        mostrarMensaje(error.message, "error");
    } finally {
        cargando.classList.add("oculto");
    }
}

async function guardarTarea(evento) {
    evento.preventDefault();

    const datos = {
        titulo: titulo.value.trim(),
        descripcion: descripcion.value.trim(),
        completada: completada.checked,
        fechaLimite: fechaLimite.value || null
    };

    const id = tareaId.value;
    const editando = id !== "";

    btnGuardar.disabled = true;
    btnGuardar.textContent = editando ? "Actualizando..." : "Guardando...";

    try {
        const respuesta = await fetch(
            editando ? `${API_URL}/${id}` : API_URL,
            {
                method: editando ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            }
        );

        if (!respuesta.ok) {
            const error = await obtenerError(respuesta);
            throw new Error(error);
        }

        mostrarMensaje(
            editando
                ? "La tarea fue actualizada correctamente."
                : "La tarea fue creada correctamente.",
            "exito"
        );

        limpiarFormulario(false);
        await cargarTareas();

    } catch (error) {
        mostrarMensaje(error.message, "error");
    } finally {
        btnGuardar.disabled = false;
        btnGuardar.textContent = "Guardar tarea";
    }
}

async function editarTarea(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);

        if (!respuesta.ok) {
            throw new Error("No se encontró la tarea");
        }

        const tarea = await respuesta.json();

        tareaId.value = tarea.id;
        titulo.value = tarea.titulo;
        descripcion.value = tarea.descripcion || "";
        fechaLimite.value = tarea.fechaLimite || "";
        completada.checked = tarea.completada;

        tituloFormulario.textContent = "Editar tarea";
        btnGuardar.textContent = "Actualizar tarea";
        btnCancelar.classList.remove("oculto");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        mostrarMensaje(error.message, "error");
    }
}

async function eliminarTarea(id) {
    const confirmar = window.confirm(
        "¿Estás segura de eliminar esta tarea?"
    );

    if (!confirmar) {
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            const error = await obtenerError(respuesta);
            throw new Error(error);
        }

        mostrarMensaje(
            "La tarea fue eliminada correctamente.",
            "exito"
        );

        await cargarTareas();

    } catch (error) {
        mostrarMensaje(error.message, "error");
    }
}

function limpiarFormulario(ocultarMensaje = true) {
    formulario.reset();
    tareaId.value = "";
    tituloFormulario.textContent = "Nueva tarea";
    btnGuardar.textContent = "Guardar tarea";
    btnCancelar.classList.add("oculto");

    if (ocultarMensaje) {
        mensaje.className = "";
        mensaje.textContent = "";
    }
}

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
}

async function obtenerError(respuesta) {
    try {
        const datos = await respuesta.json();

        if (datos.errores) {
            return Object.values(datos.errores).join(", ");
        }

        return datos.mensaje || "Ocurrió un error en la solicitud";
    } catch {
        return "Ocurrió un error en la solicitud";
    }
}

function escaparTexto(texto) {
    const elemento = document.createElement("div");
    elemento.textContent = texto;
    return elemento.innerHTML;
}
