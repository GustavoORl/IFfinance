// banco de dados, ("crude") → Create Read Update Delete

function openModal(modalId){
    const modal = document.querySelector(modalId)
    modal.style.display = "flex"
}

function closeModal(modalId){
    const modal = document.querySelector(modalId)
    modal.style.display = "none"
}

function addTicker(event){
   event.preventDefault() /*form por padrão tenta mandar os dados para algum lugar, como ele não 
   acha nada, ele manda para si mesmo, ou seja, ele recarrega a página, usando essa função
   "preventDefault()", você interrompe esse envio padrão; */

    const ticker = event.target.ticker.value
    const bolsa = event.target.bolsa.value
    const valor = event.target.valor.value
    const ativos = event.target.ativos.value

    const total = valor * ativos
// crase ( `) é chamada de template string
    const card = `
        <div class="card-stock" id="${ticker}" onmouseenter="showButtons(event)" onmouseleave="hiddenButtons(event)">
            <header>
                <h2>${ticker}</h2>
                <h3>${bolsa}</h3>
            </header>
            <main>
                <span>▲ US$ <span>${valor}</span></span>
            </main>
            <footer>
                <span>Ativos: <span>${ativos}</span></span>
                <span class="total">US$ <span> ${total}</span></span>
            </footer>
            <div class="buttons">
                <button type="button" onclick="openEditCard(event)">Editar</button>
                <button type="button" onclick="deleteCard(event)">Excluir</button>
            </div>
        </div>
    `
    const cards = document.querySelector("#cards")
    cards.innerHTML += card

    event.target.reset()

    closeModal('#add')
}

function showButtons(event) {

    const cardStock = event.target
    const buttons = cardStock.querySelector(".buttons") //queryslector busca descendente do elemento pai
    buttons.style.display = "flex"
}

function hiddenButtons(event) {

    const cardStock = event.target
    const buttons = cardStock.querySelector(".buttons")
    buttons.style.display = "none"
}

function deleteCard(event){
    
    const buttonDelete = event.target
    const cardStock = buttonDelete.closest(".card-stock") //closest é uma função que busca por elementos ascendentes e com o seletor que você especificar no atributo dele
    cardStock.remove()
}

function openEditCard(event) {

    const buttonEdit = event.target
    const cardStock = buttonEdit.closest(".card-stock")

    const ticker = cardStock.querySelector('header h2').innerText
    const inputEditTicker = document.getElementById('editticker')
    inputEditTicker.value = ticker

    const idCard = cardStock.getAttribute('id')
    //cardStock.setAttribute("teste", "123") //exemplo de setAttribute
    const inputIdCard = document.getElementById('idcard')
    inputIdCard.value = idCard

    const bolsa = cardStock.querySelector('header h3').innerText
    const selectEditBolsa = document.getElementById('editbolsa')
    selectEditBolsa.value = bolsa

    const valor = cardStock.querySelector('main span span').innerText
    const inputEditValor = document.getElementById('editvalor')
    inputEditValor.value = valor

    const ativos = cardStock.querySelector('footer span span').innerText
    const inputEditAtivos = document.getElementById('editativos')
    inputEditAtivos.value = ativos

    openModal('#edit')

}

function editTicker(event){
   event.preventDefault() /*form por padrão tenta mandar os dados para algum lugar, como ele não 
   acha nada, ele manda para si mesmo, ou seja, ele recarrega a página, usando essa função
   "preventDefault()", você interrompe esse envio padrão; */

    const idcard = event.target.idcard.value
    const ticker = event.target.editticker.value
    const bolsa = event.target.editbolsa.value
    const valor = event.target.editvalor.value
    const ativos = event.target.editativos.value

    const total = valor * ativos

    const cardStockEdit = document.getElementById(idcard)
    
    const h2ticker = cardStockEdit.querySelector('header h2')
    h2ticker.innerText = ticker

    const h3Bolsa = cardStockEdit.querySelector('header h3')
    h3Bolsa.innerText = bolsa

    const spanValor = cardStockEdit.querySelector('main span span')
    spanValor.innerText = valor

    const spanAtivos = cardStockEdit.querySelector('footer span span')
    spanAtivos.innerText = ativos
    
    const spanTotal = cardStockEdit.querySelector('footer span.total span')
    spanTotal.innerText = total
   
    closeModal('#edit')
}