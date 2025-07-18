// ES5-friendly useClassForm
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getClasses, saveClass, updateClass, getClassById } from '@/services/ClassService'
import { v4 as uuidv4 } from 'uuid'

export function useClassForm(classId) {
  // Default parameter handling ES5 style
  if (classId === undefined) {
    classId = null
  }

  var router = useRouter()
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
        // Object spread ES5 style
        classData.value = {
          id: existingClass.id,
          name: existingClass.name,
          parentId: existingClass.parentId,
        }
      }
    }
  }

  var handleSubmit = function () {
    if (!classData.value.name || !classData.value.name.trim()) {
      alert('Vui lòng nhập tên lớp')
      return
    }

    if (isEdit.value) {
      updateClass(classData.value)
    } else {
      classData.value.id = uuidv4()
      saveClass(classData.value)
    }

    window.dispatchEvent(new Event('classListChanged'))
    router.push('/classes')
  }

  return {
    classList: classList,
    isEdit: isEdit,
    classData: classData,
    parentOptions: parentOptions,
    loadData: loadData,
    handleSubmit: handleSubmit,
  }
}
