// ==========================================================================
// CLASS FORM OPERATIONS
// ==========================================================================

import { saveClass, updateClass, getClassById } from '@/services/ClassService'
import { v4 as uuidv4 } from 'uuid'

/**
 * Update student class names when class name is changed
 * @param {string} oldClassName - Old class name
 * @param {string} newClassName - New class name
 * @returns {number} Number of students updated
 */
function updateStudentClassNames(oldClassName, newClassName) {
  if (oldClassName === newClassName) return 0

  const students = JSON.parse(localStorage.getItem('students') || '[]')
  let updatedCount = 0

  for (let i = 0; i < students.length; i++) {
    if (students[i].class === oldClassName) {
      students[i].class = newClassName
      updatedCount++
    }
  }

  if (updatedCount > 0) {
    localStorage.setItem('students', JSON.stringify(students))
  }

  return updatedCount
}

/**
 * Save class data (create or update)
 * @param {Object} classData - Class data
 * @param {boolean} isEdit - Is editing mode
 */
function saveClassData(classData, isEdit) {
  if (isEdit) {
    // Get old class name before updating
    const oldClass = getClassById(classData.id)
    const oldClassName = oldClass ? oldClass.name : null

    // Update class
    updateClass(classData)

    // Update student class names if class name changed
    if (oldClassName && oldClassName !== classData.name) {
      const updatedCount = updateStudentClassNames(oldClassName, classData.name)
      if (updatedCount > 0) {
        alert(
          `Đã cập nhật tên lớp cho ${updatedCount} học sinh từ "${oldClassName}" thành "${classData.name}"`,
        )
      }
    }
  } else {
    classData.id = uuidv4()
    saveClass(classData)
  }

  window.dispatchEvent(new Event('classListChanged'))
}

export { saveClassData, updateStudentClassNames }
