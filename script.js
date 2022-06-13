const dragAndDrop = () => {
  const icons = document.querySelectorAll('.js-i')
  const cards = document.querySelectorAll('.js-card')
  const buttons = document.querySelectorAll('.js-btn')
  const iconsBoxs2 = document.querySelector('#iconsBox')
  const checkBtn = document.querySelector('.btn1')
  let answerAmount = document.querySelector('.answer')
  const restartBtn = document.querySelector('.btn2')
  let currentCard
  let iconsId, cardsId
  const result = {}
  const intrvl = setInterval(startTimer, 1000)

  buttons.forEach(btn => btn.classList.add('hide'))

  const dragStart = function () {
    setTimeout(() => {
      this.classList.add('hide')
    }, 0)
  }
  const dragEnd = function (evt) {
    this.classList.remove('hide')

    if (currentCard) {
      const child = currentCard.firstElementChild
      if (child && child.nodeName.toLowerCase() === 'ion-icon') {
        iconsBoxs2.append(child)
      }
      currentCard.append(evt.target)
    }
    iconsId = evt.target.getAttribute('id')
    result[cardsId] = iconsId
    const iconsBoxs = document.querySelectorAll('#iconsBox > ion-icon')
    if (!iconsBoxs.length) {
      checkBtn.classList.remove('hide')
    }
  }

  const dragOver = function (evt) {
    evt.preventDefault()
  }
  const dragEnter = function (evt) {
    evt.preventDefault()
    evt.stopPropagation()
    this.classList.add('hovered')
  }
  const dragLeave = function () {
    this.classList.remove('hovered')
  }
  const dragDrop = function (evt) {
    this.classList.remove('hovered')
    currentCard = evt.target
    cardsId = currentCard.getAttribute('data-draggable-id')
  }

  function check() {
    Object.keys(result).forEach(key => {
      const el = document.querySelector(`[data-draggable-id="${key}"]`)
      console.log(key)
      // let counter = 0
      if (key === result[key]) {
        el.classList.add('green')
        counter = document.querySelectorAll('.green').length
        counter = answerAmount.innerHTML = counter
      } else {
        el.classList.add('red')
      }
    })
  }

  cards.forEach(cell => {
    cell.addEventListener('dragover', dragOver)
    cell.addEventListener('dragenter', dragEnter)
    cell.addEventListener('dragleave', dragLeave)
    cell.addEventListener('drop', dragDrop)
  })

  icons.forEach(item => item.addEventListener('dragstart', dragStart))
  icons.forEach(item => item.addEventListener('dragend', dragEnd))

  checkBtn.addEventListener('click', check)
  checkBtn.addEventListener('click', () => {
    restartBtn.classList.remove('hide')
    checkBtn.classList.add('hide')
  })

  restartBtn.addEventListener('click', () => document.location.reload())

  let seconds = 00
  let milseconds = 00
  let appenMil = document.getElementById('min')
  let appendSec = document.getElementById('sec')
  function startTimer() {
    milseconds++
    if (milseconds < 9) {
      appenMil.innerHTML = '0' + milseconds
    }
    if (milseconds > 9) {
      appenMil.innerHTML = milseconds
    }
    if (milseconds > 59) {
      seconds++
      appendSec.innerHTML = '0' + seconds
      milseconds = 0
      appenMil.innerHTML = '0' + 0
    }
    if (seconds > 9) {
      appendSec.innerHTML = seconds
    }
  }
  function RightAns() {}
  checkBtn.addEventListener('click', () => clearInterval(intrvl))
  checkBtn.addEventListener('click', RightAns)
}

dragAndDrop()
