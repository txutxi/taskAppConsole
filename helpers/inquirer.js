const inquirer = require('inquirer');
require('colors'); 

// const preguntas = [
//     {
//         type: 'list',
//         name: 'opcion',
//         message: '¿Qué desea hacer?',
//         choices: ['1. Crear Tarea', '2. Listar Tareas',new inquirer.Separator(), '0. Salir']
//     }
// ];

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            { value: '1', name: `${'1'.green}. Crear tarea` }, 
            { value: '2', name: `${'2'.green}. Listar tareas` },
            { value: '3', name: `${'3'.green}. Listar tareas completadas` },
            { value: '4', name: `${'4'.green}. Listar tareas pendientes` },
            { value: '5', name: `${'5'.green}. Completar tarea(s)` },
            { value: '6', name: `${'6'.green}. Borrar tarea(s)` },
            //new inquirer.Separator(),
            { value: '0', name: `${'0'.green}. Salir`}
        ]
    }
];

 


const inquirerMenu = async() => {
    console.clear();
    console.log('============================='.green);
    console.log('    Seleccione una Opción    '.white);
    console.log('=============================\n'.green);

    // const opt = await inquirer.prompt(preguntas);
    // return opt;
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() => {
    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar\n`
        }
    ];
    console.log('\n');  
    await inquirer.prompt(pregunta);
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

const listadoTareasBorrar = async ( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green   
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    // Añadir al inicio del arreglo
    choices.unshift({
        value: '0',
        name: '0.'.red + ' Cancelar'.red
    });
    //console.log(choices);
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices // puede ir solo o choices: choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
};

const confirmar = async ( message ) =>  {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
};


const mostrarListadoChecklist = async ( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green   
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices // puede ir solo o choices: choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
};


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}