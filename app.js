import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  onGetPendientes,
  savePendiente,
  deletePendiente,
  getPendiente,
  updatePendiente,
  onGetEventos,
  saveEvento,
  deleteEvento,
  getEvento,
  updateEvento,
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
const pendientesContainer = document.getElementById("pendientes-container");
const eventosContainer = document.getElementById("eventos-container");

const btnTasks = document.getElementById("btn-tasks");
const btnPendientes = document.getElementById("btn-pendientes");
const btnEventos = document.getElementById("btn-eventos");

let editStatus = false;
let id = "";
let currentCollection = "tasks";

window.addEventListener("DOMContentLoaded", async () => {
  loadTasks();
  loadPendientes();
  loadEventos();
});

btnTasks.addEventListener("click", () => switchCollection("tasks"));
btnPendientes.addEventListener("click", () => switchCollection("pendientes"));
btnEventos.addEventListener("click", () => switchCollection("eventos"));

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"].value;
  const description = taskForm["task-description"].value;

  if (!editStatus) {
    if (currentCollection === "tasks") {
      await saveTask(title, description);
    } else if (currentCollection === "pendientes") {
      await savePendiente(title, description);
    } else if (currentCollection === "eventos") {
      await saveEvento(title, description);
    }
  } else {
    if (currentCollection === "tasks") {
      await updateTask(id, { title, description });
    } else if (currentCollection === "pendientes") {
      await updatePendiente(id, { title, description });
    } else if (currentCollection === "eventos") {
      await updateEvento(id, { title, description });
    }
    editStatus = false;
    id = "";
    taskForm["btn-task-form"].innerText = "Guardar";
  }

  taskForm.reset();
});

function switchCollection(collection) {
  currentCollection = collection;
  tasksContainer.classList.add("d-none");
  pendientesContainer.classList.add("d-none");
  eventosContainer.classList.add("d-none");

  if (collection === "tasks") {
    tasksContainer.classList.remove("d-none");
  } else if (collection === "pendientes") {
    pendientesContainer.classList.remove("d-none");
  } else if (collection === "eventos") {
    eventosContainer.classList.remove("d-none");
  }
}

function loadTasks() {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      tasksContainer.innerHTML += createCard(doc.id, task.title, task.description, "task");
    });
    attachEventHandlers("task");
  });
}

function loadPendientes() {
  onGetPendientes((querySnapshot) => {
    pendientesContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const pendiente = doc.data();
      pendientesContainer.innerHTML += createCard(doc.id, pendiente.title, pendiente.description, "pendiente");
    });
    attachEventHandlers("pendiente");
  });
}

function loadEventos() {
  onGetEventos((querySnapshot) => {
    eventosContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const evento = doc.data();
      eventosContainer.innerHTML += createCard(doc.id, evento.title, evento.description, "evento");
    });
    attachEventHandlers("evento");
  });
}

function createCard(id, title, description, type) {
  return `
    <div class="card card-body mt-2 border-primary">
      <h3 class="h5">${title}</h3>
      <p>${description}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${id}" data-type="${type}">
          🗑 Delete
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${id}" data-type="${type}">
            🖉 Edit
        </button>
      </div>
    </div>`;
}

function attachEventHandlers(type) {
  const container = type === "task" ? tasksContainer : type === "pendiente" ? pendientesContainer : eventosContainer;
  const btnsDelete = container.querySelectorAll(".btn-delete");
  const btnsEdit = container.querySelectorAll(".btn-edit");

  btnsDelete.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      if (type === "task") {
        await deleteTask(id);
      } else if (type === "pendiente") {
        await deletePendiente(id);
      } else if (type === "evento") {
        await deleteEvento(id);
      }
    });
  });

  btnsEdit.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      let doc;
      if (type === "task") {
        doc = await getTask(id);
      } else if (type === "pendiente") {
        doc = await getPendiente(id);
      } else if (type === "evento") {
        doc = await getEvento(id);
      }
      const data = doc.data();

      taskForm["task-title"].value = data.title;
      taskForm["task-description"].value = data.description;

      editStatus = true;
      id = doc.id;

      taskForm["btn-task-form"].innerText = "Actualizar";
    });
  });
}

