"use strict"
// Misión:
// - Crea y renderiza los años y los meses en los dropdowns y hace dinamico el calendario
// - Cambia el valor del currentDay al hacer click en un día
// - Renderiza las citas en el area lateral del dia seleccionado
// - Renderiza la ventana modal del detalle de cada cita

// Funcion que renderiza en el area lateral las citas del dia seleccionado
function addAppointmentsDetail(data){
    const badge = calendar_detail.querySelectorAll('componente-modal')
    badge.forEach(function(item){
        item.remove()
    })

    const fill = calendar_detail.querySelectorAll('div')
    fill.forEach(function(item){
        item.remove()
    })

    let citas = 0

    data.forEach(function(appointment){
        const datetime = new Date(Date.parse(appointment.datetime))
        if(currentDay === datetime.getDate() && currentMonth === datetime.getMonth() + 1 && currentYear === datetime.getFullYear()){
            // Datos de la cita
            const hora = datetime.getHours() == 0 ? '00' : datetime.getHours()
            const minutos = datetime.getMinutes() == 0 ? '00' : datetime.getMinutes()
            // Renderizar la cita desde el componente
            const cita = document.createElement('componente-modal')
            cita.appointment = appointment
            cita.hora = hora
            cita.minutos = minutos
            calendar_detail.appendChild(cita)
            calendar_detail.style.border = '1px solid transparent'
            calendar_detail.style.backgroundColor = 'transparent' 
            citas += 1   
        }
    })

    // Si el numero de citas es 0 renderizo una imagen de que no hay citas
    if(citas === 0){
        const fillappointmentArea = document.createElement('div')
        fillappointmentArea.classList = 'fill-appointmentarea'
        fillappointmentArea.innerHTML = `<img src='https://media.istockphoto.com/id/1171877472/vector/woman-meditating-in-nature-concept-illustration-for-yoga-meditation-relax-recreation-healthy.jpg?s=170667a&w=0&k=20&c=5WgKt9Su3HYVbqGUmxgcn1Qr6SPHEc6xjbB_zn5XEo8='>
        <h3>No tienes ninguna cita hoy 😊</h3>`
        calendar_detail.style.border = '1px solid rgb(221, 221, 221)'
        calendar_detail.style.backgroundColor = 'white'       
        calendar_detail.appendChild(fillappointmentArea)
    }
}

addAppointmentsDetail(DATOS)

// Funcion que selecciona un dia del calendario y modifica las variables constantes
function clickInCalendarDay(){
    const area = document.querySelectorAll('.area')
    area.forEach(function(dia){
        dia.addEventListener('click', function(event){
            const currentArea = event.target.closest('.area')
            document.querySelectorAll('.area-active').forEach(function(item){
                item.classList = 'area'
            })
            currentArea.classList = 'area area-active'
            currentDay = Number(currentArea.querySelector('.dia').textContent)
            addAppointmentsDetail(DATOS)
        })
        
    })
}

clickInCalendarDay()

// Logica dropdown Año: Renderizo los años, el actual y el siguiente
const yearsArray = []

for(let i = 0; i <= 1; i++){
    yearsArray.push(currentYear + i)
}

const dropdownYear = calendar_navbar.querySelector('#dropdown-year')
const dropdownYearValue = dropdownYear.querySelector('.selected').querySelector('.value')
dropdownYearValue.innerText = currentYear
const selectoptionsYear = dropdownYear.querySelector('.select-options')

// Logica dropdown Año: Inserto datos en el dropdown
yearsArray.forEach(function(item){
    const option = document.createElement('div')
    option.classList = 'option'
    option.innerText = item
    selectoptionsYear.appendChild(option)
    
    option.addEventListener('click', function(event){
        dropdownYearValue.innerText = event.target.textContent
        // Modifico la variable constante de año si clicko en uno de los años
        currentYear = Number(event.target.textContent)
        // Cuando hago click en un año elimino todos los dias del calendario y los vuelvo a renderizar con el año seleccionado
        const area = document.querySelectorAll('.area')
        area.forEach(function(item){
            item.remove()
        })
        currentDay = 1
        renderCalendar(getDaysInMonth(currentYear, currentMonth))
        addAppointmentsDetail(DATOS)
        clickInCalendarDay()
    })
})

// Logica dropdown Año: despliega y repliega cuando hago click en el desplegable
dropdownYear.addEventListener('click', function(item){
    if (selectoptionsYear.style.display === 'block'){
        selectoptionsYear.style.display = 'none'
    }
    else {
        selectoptionsYear.style.display = 'block'
    }
})

// Logica dropdown Año: repliega todos los dropdowns cuando hago click fuera del desplegable
document.addEventListener('click', function(event){
    if(!event.target.closest('#dropdown-year')){
        selectoptionsYear.style.display = 'none'
    }
},
false
)

// Logica dropdown Mes: Renderizo los meses
const monthDict = {'Enero': 1,'Febrero': 2,'Marzo': 3,'Abril': 4,'Mayo': 5,'Junio': 6,'Julio': 7,'Agosto': 8,'Septiembre': 9,'Octubre': 10,'Noviembre': 11,'Diciembre': 12}

const dropdownMonth = calendar_navbar.querySelector('#dropdown-month')
const dropdownMonthValue = dropdownMonth.querySelector('.selected').querySelector('.value')
dropdownMonthValue.innerText = parseMonthValue(currentMonth)
const selectoptionsMonth = dropdownMonth.querySelector('.select-options')

// Logica dropdown Mes: Inserto datos en el dropdown

for (const [key, value] of Object.entries(monthDict)) {
    const option = document.createElement('div')
    option.classList = 'option'
    option.innerText = key
    selectoptionsMonth.appendChild(option)

    option.addEventListener('click', function(event){
        dropdownMonthValue.innerText = event.target.textContent
        // Modifico la variable constante de año si clicko en uno de los mes
        currentMonth = parseMonthString(String(event.target.textContent))
        // Cuando hago click en un mes elimino todos los dias del calendario y los vuelvo a renderizar con el mes seleccionado
        const area = document.querySelectorAll('.area')
        area.forEach(function(item){
            item.remove()
        })
        currentDay = 1
        renderCalendar(getDaysInMonth(currentYear, currentMonth))
        addAppointmentsDetail(DATOS)
        clickInCalendarDay()
        
    })
}

// Logica dropdown Mes: despliega y repliega cuando hago click en el desplegable
dropdownMonth.addEventListener('click', function(item){
    if (selectoptionsMonth.style.display === 'block'){
        selectoptionsMonth.style.display = 'none'
    }
    else {
        selectoptionsMonth.style.display = 'block'
    }
})

// Logica dropdown Mes: repliega todos los dropdowns cuando hago click fuera del desplegable
document.addEventListener('click', function(event){
    if(!event.target.closest('#dropdown-month')){
        selectoptionsMonth.style.display = 'none'
    }
},
false
)