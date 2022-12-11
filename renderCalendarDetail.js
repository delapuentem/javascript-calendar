"use strict"
// Misión:
// - Crea y renderiza los años y los meses en los dropdowns y hace dinamico el calendario
// - Cambia el valor del currentDay al hacer click en un día
// - Renderiza las citas en el area lateral del dia seleccionado
// - Renderiza la ventana modal del detalle de cada cita

// Funcion que selecciona un dia del calendario y modifica las variables constantes
function clickInCalendarDay(){
    const area = document.querySelectorAll('.area')
    const modal = document.querySelector('#appointment-info-modal')
    area.forEach(function(dia){
        dia.addEventListener('click', function(event){
            const currentArea = event.target.closest('.area')
            document.querySelectorAll('.area-active').forEach(function(item){
                item.classList = 'area'
            })
            currentDay = Number(currentArea.querySelector('.dia').textContent)

            const citas = currentArea.querySelector('.info-area').querySelectorAll('div')
            if(citas.length > 0){
                // Peevention remove appointments from calendar detail
                calendar_detail.querySelectorAll('div').forEach(function(item){
                    item.remove()
                })

                // Load detail of appointmetns and show it
                calendar_detail.style.display = 'block'
                calendar.style.display = 'none'   
                calendar_navbar.querySelector('.button.back').style.display = 'flex'
                calendar_detail.innerHTML += `
                <div class='row header'>
                <div class='column-name'>Nombre cliente</div>
                <div class='column-email'>Correo electrónico</div>
                <div>Estado</div>
                <div>Desde</div>
                <div>Hasta</div>
                <div>Acción</div>
                </div>
                `
                DATOS.forEach(function(appointment){
                    const datetime = new Date(Date.parse(appointment.datetime))
                    if(currentDay === datetime.getDate() && currentMonth === datetime.getMonth() + 1 && currentYear === datetime.getFullYear()){
                        const hora = datetime.getHours() == 0 ? '00' : datetime.getHours()
                        const minutos = datetime.getMinutes() == 0 ? '00' : datetime.getMinutes()
                        const nombre = String(appointment.from_name).split(' ')
                        const row = document.createElement('div')
                        row.classList = 'row'
                        const avatar = document.createElement('img')
                        avatar.classList = 'avatar'
                        avatar.src = appointment.from_avatar
                        row.appendChild(avatar)
                        const name = document.createElement('span')
                        name.classList = 'name'
                        name.innerText = `${nombre[0]} ${nombre[1]} ${nombre[2]}`
                        row.appendChild(name)
                        const email = document.createElement('span')
                        email.classList = 'email'
                        email.innerText = 'correoelectronico@email.com'
                        row.appendChild(email)
                        const status = document.createElement('span')
                        status.classList = 'status'
                        status.innerText = 'confirmed'
                        row.appendChild(status)
                        const since = document.createElement('span')
                        since.classList = 'hour'
                        since.innerText = `${hora}:${minutos}`
                        row.appendChild(since)
                        const until = document.createElement('span')
                        until.classList = 'hour'
                        until.innerText = `${hora + 1}:${minutos}`
                        row.appendChild(until)
                        const button = document.createElement('div')
                        button.classList = 'button'
                        button.innerText = 'ver cita'
                        row.appendChild(button)
                        calendar_detail.appendChild(row)

                        // Show modal
                        button.addEventListener('click', function(event){
                            const modal_content = modal.querySelector('.body')
                            modal_content.querySelector('.left').querySelector('img').src = appointment.from_avatar
                            modal_content.querySelector('.left').querySelector('h3').innerText = `${nombre[0]} ${nombre[1]} ${nombre[2]}`
                            modal_content.querySelector('.left').querySelector('span').innerText = 'correoelectronico@email.com'
                            modal_content.querySelector('.left').querySelector('.appointment').querySelector('.since').querySelector('p').innerText = `${hora}:${minutos}`
                            modal_content.querySelector('.left').querySelector('.appointment').querySelector('.until').querySelector('p').innerText = `${hora + 1}:${minutos}`
                            modal_content.querySelector('.right').querySelector('.status').querySelector('p').innerText = 'confirmed'
                            modal_content.querySelector('.right').querySelector('.code').querySelector('p').innerText = 'CITA0066552211'
                            modal_content.querySelector('.right').querySelector('.assigned').querySelector('p').innerText = `${String(appointment.assigned_name).split(' ')[0]} ${String(appointment.assigned_name).split(' ')[1]}`
                            modal_content.querySelector('.right').querySelector('.number').querySelector('p').innerText = '680000000'
                            modal.style.display = "block"
                        })
                    }                    
                })      

                // Close modal
                const closeIcon = modal.querySelector('.modal-content').querySelector('.close')
                closeIcon.addEventListener('click', function(event){
                    modal.style.display = "none"
                })                

                modal.addEventListener('click', function(event){
                    if(event.target === modal){
                        modal.style.display = "none"
                    }
                })

                // Back button
   
                calendar_navbar.querySelector('.button.back').addEventListener('click', function(event){
                    calendar.style.display = 'grid'
                    calendar_detail.style.display = 'none'
                    calendar_navbar.querySelector('.button.back').style.display = 'none'
                })
            }
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
        clickInCalendarDay()

        // Si estoy en calendar detail y modifico el mes y el año me devuelve al calendario de lo que he seleccionado
        if(calendar_detail.style.display = 'block'){
            calendar_detail.style.display = 'none'
            calendar.style.display = 'grid'
        }
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
        clickInCalendarDay()

        // Si estoy en calendar detail y modifico el mes y el año me devuelve al calendario de lo que he seleccionado
        if(calendar_detail.style.display = 'block'){
            calendar_detail.style.display = 'none'
            calendar.style.display = 'grid'
        }
        
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