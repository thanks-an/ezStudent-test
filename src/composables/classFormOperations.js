// ==========================================================================
// CLASS FORM OPERATIONS
// ==========================================================================

import { saveClass, updateClass } from '@/services/ClassService'
import { v4 as uuidv4 } from 'uuid'

/**
 * Save class data (create or update)
 * @param {Object} classData - Class data
 * @param {boolean} isEdit - Is editing mode
 */
function saveClassData(classData, isEdit) {
  if (isEdit) {
    updateClass(classData)
  } else {
    classData.id = uuidv4()
    saveClass(classData)
  }

  window.dispatchEvent(new Event('classListChanged'))
}

export { saveClassData }
