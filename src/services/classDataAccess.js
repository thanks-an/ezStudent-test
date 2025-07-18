/**
 * ES5-compatible Class Data Access Layer
 * Provides basic data retrieval operations
 */

'use strict'

var CLASS_KEY = 'classes'

/**
 * Retrieves all classes from localStorage
 * @returns {Array} Array of class objects
 */
function getClasses() {
  var data = localStorage.getItem(CLASS_KEY)
  return data ? JSON.parse(data) : []
}

/**
 * Retrieves a specific class by ID
 * @param {string} id - The class ID to search for
 * @returns {Object|null} Class object or null if not found
 */
function getClassById(id) {
  var classes = getClasses()
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].id === id) {
      return classes[i]
    }
  }
  return null
}

export { CLASS_KEY, getClasses, getClassById }
