// ==========================================================================
// STUDENT DATA UTILS
// ==========================================================================

/**
 * Load students data from localStorage
 * @returns {Array} Students data
 */
function loadStudentsData() {
  var studentsRaw = localStorage.getItem('students')
  return studentsRaw ? JSON.parse(studentsRaw) : []
}

/**
 * Save students data to localStorage
 * @param {Array} studentsData - Students array to save
 */
function saveStudentsData(studentsData) {
  localStorage.setItem('students', JSON.stringify(studentsData))
}

/**
 * Calculate age from date of birth
 * @param {string} dob - Date of birth
 * @returns {number|string} Age or empty string
 */
function calculateAge(dob) {
  return dob ? new Date().getFullYear() - new Date(dob).getFullYear() : ''
}

export { loadStudentsData, saveStudentsData, calculateAge }
