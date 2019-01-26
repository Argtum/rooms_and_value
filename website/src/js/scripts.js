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
  element.classList.add(className);
}

function selectRoom() {
  addClass(this.parentElement.parentElement, 'clicked');
  this.parentElement.parentElement.addEventListener('mouseleave', function () {
    if (this.classList.contains('clicked')) {
      removeClass(this, 'clicked');
      addClass(this, 'selected');
    }
  });
}

function clearSelection(event) {
  const rooms = document.getElementsByClassName('room-card');

  if (!event.target.closest('.room-card')) {
    for (let i = 0; i < rooms.length; i++) {
      removeClass(rooms[i], 'selected');
    }
  }
}

window.onload = function () {
  registerSetOfEvents('room__button', 'click', selectRoom);
  registerSetOfEvents('page', 'click', clearSelection);
};
