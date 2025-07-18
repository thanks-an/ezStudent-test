/**
 * ES5-compatible Class Persistence Operations
 * Provides save, update, and delete operations
 */

'use strict'

import { CLASS_KEY, getClasses } from './classDataAccess'

/**
 * Notifies that class data has changed
 * @private
 */
function notifyClassChange() {
  window.dispatchEvent(new CustomEvent('classListChanged'))
}

/**
 * Saves a new class to localStorage
 * @param {Object} newClass - The class object to save
 */
function saveClass(newClass) {
  var classes = getClasses()
  classes.push(newClass)
  localStorage.setItem(CLASS_KEY, JSON.stringify(classes))
  notifyClassChange()
}

/**
 * Updates an existing class in localStorage
 * @param {Object} updatedClass - The updated class object
 */
function updateClass(updatedClass) {
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

/**
 * Deletes a class from localStorage
 * @param {string} id - The ID of the class to delete
 */
function deleteClass(id) {
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

export { saveClass, updateClass, deleteClass }
