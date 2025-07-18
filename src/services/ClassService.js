/**
 * ES5-compatible ClassService - Main Entry Point
 * Provides CRUD operations for class management
 */

'use strict'

// Import data access functions
import { getClasses, getClassById } from './classDataAccess'

// Import persistence functions
import { saveClass, updateClass, deleteClass } from './classPersistence'

// Re-export all functions for backward compatibility
export { getClasses, getClassById, saveClass, updateClass, deleteClass }
