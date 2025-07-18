// ==========================================================================
// STUDENT DIRECT FILTER
// ==========================================================================

/**
 * Filter students by direct class match
 * @param {Array} students - Students array
 * @param {string} className - Class name
 * @returns {Array} Filtered students
 */
function filterByDirectClass(students, className) {
  var result = []
  for (var i = 0; i < students.length; i++) {
    if (students[i].class === className) {
      result.push(students[i])
    }
  }
  return result
}

export { filterByDirectClass }
