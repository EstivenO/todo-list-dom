
// ==========================
// Selección de elementos DOM
// ==========================

const input = document.querySelector("#inputTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const listaTareas = document.querySelector("#listaTareas");
const mensaje = document.querySelector("#mensaje");


// ==========================
// Estado de la aplicación
// ==========================
const tareas = [];


// ==========================
// Carga inicial desde localStorage
// ==========================
const tareasGuardadas = localStorage.getItem("tareas");

if( tareasGuardadas === null ) {
  
}else{
    const tareasString =JSON.parse(tareasGuardadas);
    for(let tarea of tareasString) {
        tareas.push(tarea);
        crearYMostrarTarea(tarea);
    }
};


// ==========================
// Evento: agregar tarea
// ==========================
btnAgregar.addEventListener("click", () => {

    const texto = input.value.trim();

    if(texto === ""){
        mensaje.textContent = "No has ingresado ninguna tarea.";
        mensaje.classList.add("tasks_msjVisible");
        return;
    }

    mensaje.classList.remove("tasks_msjVisible");
    
    const tarea = {
        texto: texto,
        completado: false
    };

    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));

    crearYMostrarTarea(tarea);
    
    input.value = "";
});


// ==========================
// Funciones
// ==========================

function crearYMostrarTarea(tarea){
    const item = document.createElement("li");
    item.textContent = tarea.texto;
    item.classList.add("tasks__item");
    listaTareas.appendChild(item);
    actividadRealizada(item,tarea.texto);
    botonEliminar(item,tarea);

    if(tarea.completado){
        item.classList.toggle("tasks__list--completed");   
    }
    
}

// function saveTasks(tareas,texto){
//     let tarea = {texto: texto, completed:false};
//     tareas.push(tarea);
//     localStorage.setItem("tareas",JSON.stringify(tareas));
// }

function botonEliminar(item, tarea){
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.classList.add("tasks__button-delete");
    item.appendChild(btnEliminar);

    btnEliminar.addEventListener("click", (e)=>{
        e.stopPropagation();
        item.remove();
        console.log(tarea);
        eliminarDeStorage(tarea);
    });
   
};

function eliminarDeStorage (tarea) {
    let tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));
    let nuevasTareas = tareasGuardadas.filter( t => t.texto !== tarea.texto);
    tareas.length = 0;
    tareas.push(...nuevasTareas);
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
}

function actividadRealizada (actividad,texto){
    actividad.addEventListener("click",()=>{
        let tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));
        tareasGuardadas.forEach(tarea => {
           if(texto === tarea.texto){
                if(tarea.completado){
                    tarea.completado = false;
                    return;
                }
                tarea.completado = true;
           } 
        });
        tareas.push(...tareasGuardadas);
        localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));
        actividad.classList.toggle("tasks__list--completed");
    });
}