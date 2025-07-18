// ==========================================================================
// STUDENT HIERARCHY FILTER
// ==========================================================================

/**
 * Filter students by class hierarchy
 * @param {Array} students - Students array
 * @param {Array} classList - Classes array
 * @param {Object} selectedClassObj - Selected class object
 * @returns {Array} Filtered students
 */
function filterByClassHierarchy(students, classList, selectedClassObj) {
  var childClasses = []
  for (var i = 0; i < classList.length; i++) {
    if (classList[i].parentId === (selectedClassObj ? selectedClassObj.id : null)) {
      childClasses.push(classList[i])
    }
  }

  var classNames = selectedClassObj ? [selectedClassObj.name] : []
  for (var j = 0; j < childClasses.length; j++) {
    classNames.push(childClasses[j].name)
  }

  return filterStudentsByClassNames(students, classNames)
}

/**
 * Filter students by array of class names
 * @param {Array} students - Students array
 * @param {Array} classNames - Array of class names
 * @returns {Array} Filtered students
 */
function filterStudentsByClassNames(students, classNames) {
  var result = []
  for (var i = 0; i < students.length; i++) {
    var student = students[i]
    for (var j = 0; j < classNames.length; j++) {
      if (student.class === classNames[j]) {
        result.push(student)
        break
      }
    }
  }
  return result
}

export { filterByClassHierarchy, filterStudentsByClassNames }
