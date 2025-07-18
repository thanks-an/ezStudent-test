// ==========================================================================
// CLASS FORM COMPOSABLE
// ==========================================================================

import { useRouter } from 'vue-router'
import { useClassFormData } from './useClassFormData'
import { validateClassForm } from './classFormValidation'
import { saveClassData } from './classFormOperations'

export function useClassForm(classId) {
  if (classId === undefined) {
    classId = null
  }

  var router = useRouter()
  var formData = useClassFormData(classId)

  var handleSubmit = function () {
    if (!validateClassForm(formData.classData.value)) {
      return
    }

    saveClassData(formData.classData.value, formData.isEdit.value)
    router.push('/classes')
  }

  return {
    classList: formData.classList,
    isEdit: formData.isEdit,
    classData: formData.classData,
    parentOptions: formData.parentOptions,
    loadData: formData.loadData,
    handleSubmit: handleSubmit,
  }
}
