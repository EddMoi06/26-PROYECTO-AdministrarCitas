const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

eventListeners()

class Citas {
    constructor(){
        this.citas = []
    }

    agregarCita(cita){
        this.citas = [ ...this.citas, cita];
    }

    eliminarCitas(id){
        this.citas = this.citas.filter( citas => citas.id !== id)
    }
}

class UI {
    imprimirAlerta(mensaje, tipo){
        const error = document.querySelector('.error')
        if(!error){
            const divMensaje = document.createElement('div');
            divMensaje.className = 'text-center alert d-block col-12 error'
            divMensaje.textContent = mensaje;

            if(tipo === 'error'){
                divMensaje.classList.add('alert-danger')
            }else{
                divMensaje.classList.add('alert-success')
            }

            document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

            setTimeout(() => {
                divMensaje.remove()
            }, 5000);
        }
    }

    imprimirCitas({citas}){

        this.limpiarHTML()
        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const divCita = document.createElement('div');
            divCita.className = 'cita p-3';
            divCita.dataset.id = id
            divCita.innerHTML = `
                <h2 class="card-title font-weight-bolder">${mascota}</h2>
                <p> <span class="font-weight-bolder"> Propietario: </span> ${propietario}</p>
                <p> <span class="font-weight-bolder"> Telefono: </span> ${telefono}</p>
                <p> <span class="font-weight-bolder"> Fecha: </span> ${fecha}</p>
                <p> <span class="font-weight-bolder"> Hora: </span> ${hora}</p>
                <p> <span class="font-weight-bolder"> Sintomas: </span> ${sintomas}</p>
            `;

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn btn-danger mt-2'
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            `;

            btnEliminar.onclick = () => {
                eliminarCita(id)
            }

            divCita.appendChild(btnEliminar)
            contenedorCitas.appendChild(divCita)
        })
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const ui = new UI();
const admin = new Citas()

function eventListeners(){
    
    mascotaInput.addEventListener('input', datosCita)
    propietarioInput.addEventListener('input', datosCita)
    telefonoInput.addEventListener('input', datosCita)
    fechaInput.addEventListener('input', datosCita)
    horaInput.addEventListener('input', datosCita)
    sintomasInput.addEventListener('input', datosCita)

    formulario.addEventListener('submit', nuevaCita)
}

const citasObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

function datosCita(e){
    citasObj[e.target.name] = e.target.value;
}

function nuevaCita(e){
    e.preventDefault()

    if(Object.values(citasObj).includes('')){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return
    }

    citasObj.id = Date.now()
    admin.agregarCita({...citasObj})
    reiniciarObjeto()
    formulario.reset()

    ui.imprimirCitas(admin)
    ui.imprimirAlerta('Agregado Correctamente')
}

function reiniciarObjeto(){
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
}

function eliminarCita(id){
    admin.eliminarCitas(id)
    ui.imprimirCitas(admin)
    ui.imprimirAlerta('Eliminado Correctamente')
}