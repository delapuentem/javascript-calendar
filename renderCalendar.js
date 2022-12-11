"use strict"
// Mision: 
// - Crea el calendario
// - Renderiza las citas devueltas de base de datos.

const DATOS = [
    {
        id: 1,
        from_code: 'DIECALGAR025546',
        from_name: 'Diego Calzadilla García',
        from_avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLyGselFgr4KtgsTz7d1GJY66Wtcju48lOhA&usqp=CAU',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2022-12-06 17:00:00',
    },
    {
        id: 2,
        from_code: 'ALBFERPER547885',
        from_name: 'Alberto Fernandez Pérez',
        from_avatar: 'https://tecnofanatico.com/wp-content/uploads/2019/02/thispersondoesnotexist.com_.jpeg',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2022-12-06 18:00:00',
    },       
    {
        id: 3,
        from_code: 'MARGONLOP025546',
        from_name: 'Marta Gonzalez López',
        from_avatar: 'https://f.rpp-noticias.io/2019/02/15/753301descarga-12jpg.jpg',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2022-12-08 12:00:00',
    },
    {
        id: 4,
        from_code: 'DIECALGAR025546',
        from_name: 'Pablo Gonzalez Perez',
        from_avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgkyxR6OcCNzlU9GlUkg34UlCT_LtSeWKmPmPpRQigoTTv_hgQMNxre7PPwSdoRHhBGCc&usqp=CAU',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2022-12-14 12:00:00',
    },    
    {
        id: 4,
        from_code: 'DIECALGAR025546',
        from_name: 'Vanesa Martinez Martinez',
        from_avatar: 'https://files.oyebesmartest.com/uploads/preview/insta-118801856-27s0m3wvj.jpeg',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2022-12-14 14:00:00',
    },        
    {
        id: 5,
        from_code: 'MARGONLOP025546',
        from_name: 'Marta Gonzalez López',
        from_avatar: 'https://f.rpp-noticias.io/2019/02/15/753301descarga-12jpg.jpg',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2022-12-14 18:30:00',
    },
    {
        id: 6,
        from_code: 'DIECALGAR025546',
        from_name: 'Carlos Matallanas Rodriguez',
        from_avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWSAT9QUpYcpYv1yoJLdjLyne_qjMCXLAG2A4oqx9Ch8_Aa50TKtBTXY9eKWuvV01PeZ8&usqp=CAU',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2022-12-14 19:30:00',
    },
    {
        id: 7,
        from_code: 'DIECALGAR025546',
        from_name: 'Alejandro Luis Abone',
        from_avatar: 'https://f.rpp-noticias.io/2019/02/15/753300descarga-11jpg.jpg',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2022-12-14 20:30:00',
    },            
    {
        id: 8,
        from_code: 'MARGONLOP025546',
        from_name: 'Marta Gonzalez López',
        from_avatar: 'https://f.rpp-noticias.io/2019/02/15/753301descarga-12jpg.jpg',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2022-12-05 18:00:00',
    },
    {
        id: 9,
        from_code: 'ALBFERPER547885',
        from_name: 'Alberto Fernandez Pérez',
        from_avatar: 'https://tecnofanatico.com/wp-content/uploads/2019/02/thispersondoesnotexist.com_.jpeg',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2023-05-18 18:00:00',
    },  
    {
        id: 10,
        from_code: 'ALBFERPER547885',
        from_name: 'Alberto Fernandez Pérez',
        from_avatar: 'https://tecnofanatico.com/wp-content/uploads/2019/02/thispersondoesnotexist.com_.jpeg',
        assigned_code: 'MARAGULOP568845',
        assigned_name: 'María Aguado López',        
        datetime: '2023-11-01 18:00:00',
    },          
]


// CSS Grid global
// Area del navbar del titulo, los años y los meses
const calendar_navbar = document.querySelector('#calendar-navbar')
// Area del calendario
const calendar = document.querySelector('#calendar')
// Area del detalle del dia
const calendar_detail = document.querySelector('#calendar-detail')

// Variables constantes de tiempo
const date = new Date()
let currentYear = date.getFullYear()
let currentMonth = date.getMonth() + 1
let currentDay = date.getDate()

// Función que convierte un Mes(string) en Number
function parseMonthString(string){
    let value
    if (string ==='Enero') value = 1
    if (string ==='Febrero') value = 2
    if (string ==='Marzo') value = 3
    if (string ==='Abril') value = 4
    if (string ==='Mayo') value = 5
    if (string ==='Junio') value = 6
    if (string ==='Julio') value = 7
    if (string ==='Agosto') value = 8
    if (string ==='Septiembre') value = 9
    if (string ==='Octubre') value = 10
    if (string ==='Noviembre') value = 11
    if (string ==='Diciembre') value = 12
    return value
}

// Función que convierte un Mes(number) en String
function parseMonthValue(value){
    let string
    if (value === 1) string = 'Enero'
    if (value === 2) string = 'Febrero'
    if (value === 3) string = 'Marzo'
    if (value === 4) string = 'Abril'
    if (value === 5) string = 'Mayo'
    if (value === 6) string = 'Junio'
    if (value === 7) string = 'Julio'
    if (value === 8) string = 'Agosto'
    if (value === 9) string = 'Septiembre'
    if (value === 10) string = 'Octubre'
    if (value === 11) string = 'Noviembre'
    if (value === 12) string = 'Diciembre'
    return string
}

// Función que devuelve el numero de dias que tiene un mes
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// Funcion que agrega zeros a la izquierda
function addTrailingZeros(num, totalLength) {
    return String(num).padEnd(totalLength, '0');
}  

// Funcion que de un array de horas (numeros), te devuelve un array de arrays con las horas (numeros) consecutivos -> Se usa para stackear las citas
function getConsecutiveNumbers(array){
    const result = array.reduce(function(r, n){
      const lastSubArray = r[r.length - 1]
      if(!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) {
        r.push([])
      }
      r[r.length - 1].push(n)
      return r
    }, [])
    return result
  }

// Función que renderiza en cada dia del calendario las citas devueltas de base de datos
function renderAppointments(data, infoArea, i){
    let horas = []
    // Renderiza en el calendario las citas devueltas de base de datos
    data.forEach(function(appointment){
        const datetime = new Date(Date.parse(appointment.datetime))
        if(i === datetime.getDate() && currentMonth === datetime.getMonth() + 1 && currentYear === datetime.getFullYear()){
            const hora = datetime.getHours() == 0 ? '00' : datetime.getHours()
            const minutos = datetime.getMinutes() == 0 ? '00' : datetime.getMinutes()
            horas.push(parseFloat(`${hora}.${minutos}`))
            const nombre = String(appointment.from_name).split(' ')
            infoArea.innerHTML += `<div class='badge bagde-appointment'>${nombre[0]} ${nombre[1]} <span class='badge-time'>${hora}:${minutos}</span></div>`
        }
    })    

    // Stackear las citas si son más de 2 y son consecutivas
    if(getConsecutiveNumbers(horas).length > 0){
        getConsecutiveNumbers(horas).forEach(function(consecutiveArray){
            if(consecutiveArray.length > 2){
                //console.log('STACK! dia ' + i + ' horas: ' + consecutiveArray)
                const numero_citas = consecutiveArray.length
                const hora_desde = String(Math.min(...consecutiveArray)).split('.')[0]
                const hora_hasta = String(Math.max(...consecutiveArray) + 1).split('.')[0]
                const minuto_desde = String(Math.min(...consecutiveArray)).split('.')[1]
                const minuto_hasta = String(Math.max(...consecutiveArray) + 1).split('.')[1]                
                // me cargo las citas consecutivas y lo sustituyo por las stackeadas
                infoArea.querySelectorAll('div').forEach(function(item){
                    if(consecutiveArray.includes(parseFloat(`${item.querySelector('.badge-time').textContent.split(':')[0]}.${item.querySelector('.badge-time').textContent.split(':')[1]}`))){
                        item.remove()
                    }
                })
                // agrego el stack
                infoArea.innerHTML += `<div class='badge full bagde-appointment'><span class='counter'>${numero_citas}</span><span>Citas </span><span class='badge-time'> ${addTrailingZeros(hora_desde, 2)}:${addTrailingZeros(minuto_desde, 2)} - ${addTrailingZeros(hora_hasta, 2)}:${addTrailingZeros(minuto_hasta, 2)}</span></div>`
            }
        })
    }

}

// Función que renderiza el calendario
function renderCalendar(totalMonthDays){
    for(let i = 1; i <= totalMonthDays; i++){ 
        // Creamos el div del día del mes
        const area = document.createElement('div')
        if (i === currentDay){
            area.classList = 'area area-active'
        }
        else{
            area.classList = 'area'
        }
        // Creamos el dia
        const dia = document.createElement('div')
        dia.classList = 'dia'
        dia.innerText = i  
        // Creamos el area donde van las reservas
        const infoArea = document.createElement('div')
        infoArea.classList = 'info-area'
        // Agregamos el numero del dia al area
        area.appendChild(dia)       
        // Agregamos el area de informacion
        area.appendChild(infoArea)
        // Renderizo las citas de cada dia
        renderAppointments(DATOS, infoArea, i)
        // Agregamos cada dia al calendario
        calendar.appendChild(area)     
        // Rellenar los huecos de la ultima fila del calendario hasta completarlo
        if (i === getDaysInMonth(currentYear, currentMonth)){
            const nextmultiple = Math.ceil(i/7)*7
            while (i < nextmultiple){
                i++
                const area = document.createElement('div')
                area.classList = 'area' 
                calendar.appendChild(area)    
            }
        }
    }
}

renderCalendar(getDaysInMonth(currentYear, currentMonth))