// ES5-friendly ClassService
var CLASS_KEY = 'classes'

function notifyClassChange() {
  window.dispatchEvent(new CustomEvent('classListChanged'))
}

export function getClasses() {
  var data = localStorage.getItem(CLASS_KEY)
  return data ? JSON.parse(data) : []
}

export function getClassById(id) {
  var classes = getClasses()
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].id === id) {
      return classes[i]
    }
  }
  return null
}

export function saveClass(newClass) {
  var classes = getClasses()
  classes.push(newClass)
  localStorage.setItem(CLASS_KEY, JSON.stringify(classes))
  notifyClassChange()
}

export function updateClass(updatedClass) {
  var classes = getClasses()
  var updatedClasses = []

  for (var i = 0; i < classes.length; i++) {
    if (classes[i].id === updatedClass.id) {
      updatedClasses.push(updatedClass)
    } else {
      updatedClasses.push(classes[i])
    }
  }

  localStorage.setItem(CLASS_KEY, JSON.stringify(updatedClasses))
  notifyClassChange()
}

export function deleteClass(id) {
  var classes = getClasses()
  var filteredClasses = []

  for (var i = 0; i < classes.length; i++) {
    if (classes[i].id !== id) {
      filteredClasses.push(classes[i])
    }
  }

  localStorage.setItem(CLASS_KEY, JSON.stringify(filteredClasses))
  notifyClassChange()
}
