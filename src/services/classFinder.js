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

/**
 * Check if a class will become orphaned when parent class changes level
 * @param {string} parentClassId - The ID of the parent class
 * @param {Object} newParentData - New data for the parent class
 * @param {Array} classes - Array of all classes
 * @returns {boolean} True if children will become orphaned
 */
function willCreateOrphanedClasses(parentClassId, newParentData, classes) {
  // If parent is being assigned a parentId (becoming a child class)
  if (newParentData.parentId) {
    var childClasses = findChildClasses(parentClassId, classes)
    return childClasses.length > 0
  }
  return false
}

/**
 * Get details about classes that will be affected by parent class level change
 * @param {string} parentClassId - The ID of the parent class being changed
 * @param {Array} classes - Array of all classes
 * @returns {Object} Details about affected classes
 */
function getOrphanedClassesInfo(parentClassId, classes) {
  var childClasses = findChildClasses(parentClassId, classes)
  var names = []
  for (var i = 0; i < childClasses.length; i++) {
    names.push(childClasses[i].name)
  }

  return {
    count: childClasses.length,
    names: names,
    classes: childClasses,
  }
}

export {
  findClassById,
  findChildClasses,
  findAffectedClassNames,
  willCreateOrphanedClasses,
  getOrphanedClassesInfo,
}
