/**
 * ES5-compatible Class Student Handler
 * Handles student data when classes are modified or deleted
 */

'use strict'

import { getClasses } from './classDataAccess'
import { findAffectedClassNames } from './classFinder'
import { updateStudentClassAssignments, saveStudentData, loadStudentData } from './studentUpdater'

/**
 * Handle student data when class is deleted
 * @param {string} classId - The ID of the deleted class
 * @returns {number} Number of students affected
 */
function handleStudentsForDeletedClass(classId) {
  var classes = getClasses()
  var students = loadStudentData()

  var affectedClassNames = findAffectedClassNames(classId, classes)
  if (affectedClassNames.length === 0) return 0

  var affectedCount = updateStudentClassAssignments(affectedClassNames, students)

  if (affectedCount > 0) {
    saveStudentData(students)
  }

  return affectedCount
}

export { handleStudentsForDeletedClass }
