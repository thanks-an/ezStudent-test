// ==========================================================================
// CLASS OPTIONS UTILS
// ==========================================================================

/**
 * Generate class options for select dropdown
 * @param {Array} classList - Classes array
 * @returns {Array} Options array
 */
function generateClassOptions(classList) {
  var options = []
  var rootClasses = []

  // Get root classes
  for (var i = 0; i < classList.length; i++) {
    if (!classList[i].parentId) {
      rootClasses.push(classList[i])
    }
  }

  // Build options with hierarchy
  for (var j = 0; j < rootClasses.length; j++) {
    var rootClass = rootClasses[j]
    options.push({
      label: rootClass.name,
      value: rootClass.name,
    })

    var childClasses = getChildClassesForParent(classList, rootClass.id)
    for (var k = 0; k < childClasses.length; k++) {
      options.push({
        label: '----' + childClasses[k].name,
        value: childClasses[k].name,
      })
    }
  }

  return options
}

/**
 * Get child classes for a parent ID
 * @param {Array} classList - Classes array
 * @param {string} parentId - Parent class ID
 * @returns {Array} Child classes
 */
function getChildClassesForParent(classList, parentId) {
  var childClasses = []
  for (var i = 0; i < classList.length; i++) {
    if (classList[i].parentId === parentId) {
      childClasses.push(classList[i])
    }
  }
  return childClasses
}

export { generateClassOptions, getChildClassesForParent }
