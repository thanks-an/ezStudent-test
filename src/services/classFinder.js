/**
 * ES5-compatible Class Finder
 * Utilities to find classes and their relationships
 */

'use strict'

/**
 * Find a class by its ID
 * @param {string} classId - The ID of the class to find
 * @param {Array} classes - Array of all classes
 * @returns {Object|null} The found class or null
 */
function findClassById(classId, classes) {
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].id === classId) {
      return classes[i]
    }
  }
  return null
}

/**
 * Find child classes of a parent class
 * @param {string} parentId - The ID of the parent class
 * @param {Array} classes - Array of all classes
 * @returns {Array} Array of child classes
 */
function findChildClasses(parentId, classes) {
  var childClasses = []

  for (var i = 0; i < classes.length; i++) {
    if (classes[i].parentId === parentId) {
      childClasses.push(classes[i])
    }
  }

  return childClasses
}

/**
 * Find all class names that will be affected when a class is deleted
 * @param {string} classId - The ID of the class to be deleted
 * @param {Array} classes - Array of all classes
 * @returns {Array} Array of affected class names
 */
function findAffectedClassNames(classId, classes) {
  var deletedClass = findClassById(classId, classes)
  var affectedClassNames = []

  if (!deletedClass) return affectedClassNames

  // Add the deleted class name
  affectedClassNames.push(deletedClass.name)

  // If deleting a parent class, find child classes
  var childClasses = findChildClasses(classId, classes)
  for (var i = 0; i < childClasses.length; i++) {
    affectedClassNames.push(childClasses[i].name)
  }

  return affectedClassNames
}

export { findClassById, findChildClasses, findAffectedClassNames }
