/**
 * Student Filter Core
 * ES5-compatible student filtering functionality
 */

'use strict'

import { filterByDirectClass } from './studentDirectFilter'
import { filterByClassHierarchy } from './studentHierarchyFilter'

/**
 * Filter students by selected class
 * @param {Array} students - Students array
 * @param {Array} classList - Classes array
 * @param {string} selectedClassName - Selected class name
 * @returns {Array} Filtered students
 */
function filterStudentsByClass(students, classList, selectedClassName) {
  if (!selectedClassName) {
    return students.slice()
  }

  var selectedClassObj = null
  for (var i = 0; i < classList.length; i++) {
    if (classList[i].name === selectedClassName) {
      selectedClassObj = classList[i]
      break
    }
  }

  if (selectedClassObj && selectedClassObj.parentId) {
    return filterByDirectClass(students, selectedClassName)
  } else {
    return filterByClassHierarchy(students, classList, selectedClassObj)
  }
}

export { filterStudentsByClass }
