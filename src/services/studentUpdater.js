/**
 * ES5-compatible Student Updater
 * Handles updating student records when classes change
 */

'use strict'

/**
 * Update student records by removing class assignments
 * @param {Array} affectedClassNames - Names of classes to remove from students
 * @param {Array} students - Array of student objects
 * @returns {number} Number of students affected
 */
function updateStudentClassAssignments(affectedClassNames, students) {
  var affectedCount = 0

  // Remove class assignment from affected students
  for (var i = 0; i < students.length; i++) {
    for (var j = 0; j < affectedClassNames.length; j++) {
      if (students[i].class === affectedClassNames[j]) {
        students[i].class = ''
        affectedCount++
        break
      }
    }
  }

  return affectedCount
}

/**
 * Save updated student data to localStorage
 * @param {Array} students - Array of student objects to save
 */
function saveStudentData(students) {
  localStorage.setItem('students', JSON.stringify(students))
}

/**
 * Load student data from localStorage
 * @returns {Array} Array of student objects
 */
function loadStudentData() {
  return JSON.parse(localStorage.getItem('students') || '[]')
}

export { updateStudentClassAssignments, saveStudentData, loadStudentData }
