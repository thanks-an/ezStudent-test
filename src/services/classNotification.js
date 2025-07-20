/**
 * ES5-compatible Class Notification System
 * Handles events and notifications for class changes
 */

'use strict'

/**
 * Notifies that class data has changed
 * Dispatches a custom event that components can listen to
 */
function notifyClassChange() {
  window.dispatchEvent(new CustomEvent('classListChanged'))
}

/**
 * Shows alert message for affected students
 * @param {number} affectedCount - Number of students affected
 */
function notifyStudentsAffected(affectedCount) {
  if (affectedCount > 0) {
    alert(affectedCount + ' học sinh đã bị bỏ lớp do xóa lớp học')
  }
}

/**
 * Logs class operation for debugging
 * @param {string} operation - The operation performed (save, update, delete)
 * @param {Object} classData - The class data involved
 */
function logClassOperation(operation, classData) {
  if (console && console.log) {
    console.log('Class ' + operation + ':', classData)
  }
}

export { notifyClassChange, notifyStudentsAffected, logClassOperation }
