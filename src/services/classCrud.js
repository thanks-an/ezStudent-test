/**
 * ES5-compatible Class CRUD Operations
 * Provides create, read, update, delete operations for classes
 */

'use strict'

import { CLASS_KEY, getClasses } from './classDataAccess'
import { handleStudentsForDeletedClass } from './classStudentHandler'
import { notifyClassChange, notifyStudentsAffected } from './classNotification'
import { findChildClasses } from './classFinder'

/**
 * Handle orphaned child classes when parent class changes level
 * @param {string} classId - The ID of the class being modified
 * @param {Object} updatedData - The new class data
 * @param {Array} allClasses - Array of all classes
 * @returns {number} Number of child classes affected
 */
function handleOrphanedChildClasses(classId, updatedData, allClasses) {
  // Only handle if the class is being assigned a parent (becoming a child class)
  if (!updatedData.parentId) {
    return 0
  }

  // Find current child classes of this class
  var childClasses = findChildClasses(classId, allClasses)

  if (childClasses.length === 0) {
    return 0
  }

  // Convert child classes to root classes (remove parentId)
  var affectedCount = 0
  for (var i = 0; i < childClasses.length; i++) {
    var childClass = childClasses[i]
    for (var j = 0; j < allClasses.length; j++) {
      if (allClasses[j].id === childClass.id) {
        allClasses[j].parentId = null
        affectedCount++
        break
      }
    }
  }

  return affectedCount
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

  // Handle orphaned child classes before updating the parent
  var orphanedCount = handleOrphanedChildClasses(updatedClass.id, updatedClass, classes)

  for (var i = 0; i < classes.length; i++) {
    if (classes[i].id === updatedClass.id) {
      updatedClasses.push(updatedClass)
    } else {
      updatedClasses.push(classes[i])
    }
  }

  localStorage.setItem(CLASS_KEY, JSON.stringify(updatedClasses))

  // Show notification if child classes were affected
  if (orphanedCount > 0) {
    console.log(
      '⚠️ ' +
        orphanedCount +
        ' lớp con đã được chuyển thành lớp gốc do lớp cha "' +
        updatedClass.name +
        '" được chuyển cấp.',
    )
  }

  notifyClassChange()
}

/**
 * Deletes a class from localStorage
 * @param {string} id - The ID of the class to delete
 */
function deleteClass(id) {
  // Handle student data before deleting class
  var affectedCount = handleStudentsForDeletedClass(id)

  var classes = getClasses()
  var filteredClasses = []

  for (var i = 0; i < classes.length; i++) {
    if (classes[i].id !== id) {
      filteredClasses.push(classes[i])
    }
  }

  localStorage.setItem(CLASS_KEY, JSON.stringify(filteredClasses))
  notifyStudentsAffected(affectedCount)
  notifyClassChange()
}

export { saveClass, updateClass, deleteClass }
