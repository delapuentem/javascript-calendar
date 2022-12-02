class Modal extends HTMLElement {
    constructor(){
        super()
        // Encapsulacion del componente
        this.attachShadow({mode: 'open'})

        // Event listener
        this.modalContainer = document.querySelector('#appointment-info-modal')

        // Propiedades
        this.appointment = 'None'
        this.hora = 'None'
        this.minutos = 'None'

        // Template del componente
        this.shadowRoot.innerHTML = `
        <style>
        #appointment-detail-card{
            border: 1px solid rgb(221, 221, 221);
            margin-bottom: 1rem;
            padding: 1rem 2rem;
            border-radius: 3px;
            background-color: #ffffff;
            display:grid;
            grid-template-columns: 50px auto;
            column-gap: 0.7rem;
        }
        
        #appointment-detail-card:hover{
            cursor: pointer;
        }
        
        #appointment-detail-card h3{
            margin:0;
            margin-bottom:0.5rem;
            font-size: 18px;
        }
        
        #appointment-detail-card img{
            width: 45px;
            height: 45px;
            border-radius: 50%;
            float: left;
            margin-right: 15px;
        }
        </style>
        <div id="appointment-detail-card">
        <div class='avatar'><img src=''></div>
        <div class='text'>
        <h3></h3> <span></span>
        </div>
        </div>`
    }

    connectedCallback(){
        // Button open modal
        const card = this.shadowRoot.querySelector('#appointment-detail-card')
        const img = card.querySelector('img')
        img.src = this.appointment.from_avatar
        const name = card.querySelector('h3')
        name.innerText = `${String(this.appointment.from_name).split(' ')[0]} ${String(this.appointment.from_name).split(' ')[1]}`
        const hour = card.querySelector('span')
        hour.innerText = `Desde: ${this.hora}:${this.minutos} Hasta: ${this.hora + 1}:${this.minutos}`
        card.addEventListener('click', this._openModal.bind(this))
        this.shadowRoot.appendChild(card)

        // Close modal clicking close icon
        const closeIcon = this.modalContainer.querySelector('.modal-content').querySelector('.close')
        closeIcon.addEventListener('click', this._closeModal.bind(this))

        // Close modal clicking outside
        this.modalContainer.addEventListener('click', this._closeModalOutsideArea.bind(this))
    }

    _openModal(){
        this.modalContainer.style.display = "block"
        // Construyo el contenido del modal
        const container = this.modalContainer.querySelector('.client-info')
        // Lado izquierdo
        const leftContainer = container.querySelector('.left')
        const avatar = leftContainer.querySelector('img')
        avatar.src = this.appointment.from_avatar
        const name = leftContainer.querySelector('h3')
        name.innerText = `${String(this.appointment.from_name).split(' ')[0]} ${String(this.appointment.from_name).split(' ')[1]}`
        const email = leftContainer.querySelector('span')
        email.innerText = `correoelectronico@email.com`
        const hour = leftContainer.querySelector('.appointment')
        console.log(hour)
        hour.querySelector('.since').querySelector('p').innerText = `${this.hora}:${this.minutos}`
        hour.querySelector('.until').querySelector('p').innerText = `${this.hora + 1}:${this.minutos}`
        // Lado derecho
        const rightContainer = container.querySelector('.right')
        const status = rightContainer.querySelector('.status').querySelector('p')
        status.innerText = 'Confirmed'
        const assigned = rightContainer.querySelector('.assigned').querySelector('p')
        assigned.innerText = 'María Aguado'
        const code = rightContainer.querySelector('.code').querySelector('p')
        code.innerText = 'CITA00001'
        const number = rightContainer.querySelector('.number').querySelector('p')
        number.innerText = '680000000'
    }

    _closeModal(){
        this.modalContainer.style.display = "none"
    }

    _closeModalOutsideArea(_event){
        if (_event.target === this.modalContainer) {
            this.modalContainer.style.display = "none"
        }
    }
}

customElements.define('componente-modal', Modal)