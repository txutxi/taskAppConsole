require('colors');
const Tarea = require("./tarea");

/**
 * _listado:
 *      { 'uuid-123456-123456-1': {id:12, des: asd, completadoEn: 92231}}
 */
class Tareas {
    //_listado = [];
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            //console.log(key);
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArr( tareas = [] ) {
        tareas.forEach(t => {
            this._listado[t.id] = t;     
        });
    }

    listadoCompleto() {
        // var i = 0;
        // tareas.forEach(t => {
        //     i++;
        //     console.log(`${i}. ${t.desc} :: ${t.completada==null?'Pendiente'.red:'Completada'.green}`);
        // });
        console.log();
        this.listadoArr.forEach((tarea, i) =>{
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas( completadas = true ){
        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? completadoEn.green : 'Pendiente'.red;
            if(completadas && completadoEn || !completadas && !completadoEn){
                contador++;
                console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
            }
        });
    }


    crearTarea( desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


    toggleCompletadas(ids = [] ) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    };

}


module.exports = Tareas;