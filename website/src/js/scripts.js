function getByElementClass(className) {
  return document.getElementsByClassName(className);
}

function registerSetOfEvents(className, eventName, func) {
  let elements = getByElementClass(className);
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventName, func);
  }
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function addClass(element, className) {
  element.classList.remove(className);
}

function selectRoom() {
  addClass(this.parentElement, 'clicked');
  this.parentElement.addEventListener('mouseleave', function () {
    if (this.classList.contains('clicked')) {
      this.style.filter="grayscale(100%)";
      addClass(this, 'selected');
      removeClass(this, 'clicked');
    }
  });
}

function clearSelection(event) {
  const rooms = document.getElementsByClassName('room');

  if (!event.target.closest('.room')) {
    for (let i = 0; i < rooms.length; i++) {
      rooms[i].style.filter="grayscale(0)";
      removeClass(rooms[i], 'selected');
    }
  }
}

window.onload = function () {
  registerSetOfEvents('room__button', 'click', selectRoom);
  registerSetOfEvents('page', 'click', clearSelection);
};
