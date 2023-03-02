require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
    } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//const { pausa } = require('./helpers/mensajes');

//console.clear();


const main = async() => {
    //console.log('Hola mundo');
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    
    if(tareasDB){ // cargarTareas
        tareas.cargarTareasFromArr(tareasDB);
    }
    
    do {
        opt = await inquirerMenu();
        //console.log({opt});
        
        switch (opt) {
            case '1': //crear tarea                
                const desc = await leerInput('Descripción: ');
                //console.log(desc);
                tareas.crearTarea(desc);
                break;

            case '2': // Listar tareas
                //console.log(tareas._listado);
                //console.log(tareas.listadoArr);
                tareas.listadoCompleto(tareas.listadoArr);
                break;

            case '3': // Listar tareas completadas                
                tareas.listarPendientesCompletadas(true);
                break;

            case '4': // Listar tareas pendientes                
                tareas.listarPendientesCompletadas(false);
                break;
            
            case '5': //Completar tareas
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                console.log(ids);
                tareas.toggleCompletadas(ids);
            break;

            case '6': // Borrar tareas                
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0') {
                    // TODO: Preguntar si está seguro
                    const ok = await confirmar('¿Está seguro?');
                    //console.log(ok);
                    if(ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                
                break;
    

        }

        guardarDB(tareas.listadoArr);



        await pausa();

    } while (opt !== '0');
}

main();