// ==========================================================================
// CLASS FORM VALIDATION
// ==========================================================================

/**
 * Validate class form data
 * @param {Object} classData - Class data to validate
 * @returns {boolean} Is valid
 */
function validateClassForm(classData) {
  if (!classData.name || !classData.name.trim()) {
    alert('Vui lòng nhập tên lớp')
    return false
  }
  return true
}

export { validateClassForm }
