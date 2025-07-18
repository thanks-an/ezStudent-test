// ==========================================================================
// CLASS FORM DATA HANDLING
// ==========================================================================

import { ref, computed } from 'vue'
import { getClasses, getClassById } from '@/services/ClassService'

/**
 * Manage class form data
 * @param {string} classId - Class ID for editing
 * @returns {Object} Form data management functions
 */
export function useClassFormData(classId) {
  var classList = ref([])
  var isEdit = ref(!!classId)
  var classData = ref({ id: '', name: '', parentId: null })

  var parentOptions = computed(function () {
    var result = []
    var classes = classList.value
    for (var i = 0; i < classes.length; i++) {
      if (!classes[i].parentId) {
        result.push(classes[i])
      }
    }
    return result
  })

  var loadData = function () {
    classList.value = getClasses()
    if (classId) {
      var existingClass = getClassById(classId)
      if (existingClass) {
        classData.value = {
          id: existingClass.id,
          name: existingClass.name,
          parentId: existingClass.parentId,
        }
      }
    }
  }

  return {
    classList: classList,
    isEdit: isEdit,
    classData: classData,
    parentOptions: parentOptions,
    loadData: loadData,
  }
}
