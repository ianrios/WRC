/**
 * WRC-OS Validation Contract (ENG-008)
 *
 * Canonical error categories, error codes, and response builders
 * for all validation modules.
 *
 * All validators must conform to this contract.
 */

// Error categories (ENG-008)
export const ERROR_CATEGORIES = {
  SCHEMA_ERROR: 'SCHEMA_ERROR',
  TRANSITION_ERROR: 'TRANSITION_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  APPROVAL_REQUIRED: 'APPROVAL_REQUIRED',
  DEPENDENCY_ERROR: 'DEPENDENCY_ERROR',
};

// Error category metadata
const CATEGORY_META = {
  [ERROR_CATEGORIES.SCHEMA_ERROR]: {
    retryable: false,
    escalationRequired: false,
  },
  [ERROR_CATEGORIES.TRANSITION_ERROR]: {
    retryable: false,
    escalationRequired: false,
  },
  [ERROR_CATEGORIES.PERMISSION_ERROR]: {
    retryable: false,
    escalationRequired: false,
  },
  [ERROR_CATEGORIES.APPROVAL_REQUIRED]: {
    retryable: false,
    escalationRequired: true,
  },
  [ERROR_CATEGORIES.DEPENDENCY_ERROR]: {
    retryable: false,
    escalationRequired: false,
  },
};

// Unified error codes across all modules
export const ERROR_CODES = {
  // Transition errors
  INVALID_TRANSITION: 'INVALID_TRANSITION',
  TERMINAL_STATE: 'TERMINAL_STATE',
  AGENT_NOT_ALLOWED: 'AGENT_NOT_ALLOWED',
  INVALID_STATUS: 'INVALID_STATUS',

  // Schema errors
  INVALID_WORK_TYPE: 'INVALID_WORK_TYPE',
  INVALID_DEPARTMENT: 'INVALID_DEPARTMENT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  INVALID_ENUM_VALUE: 'INVALID_ENUM_VALUE',
  MALFORMED_ID: 'MALFORMED_ID',
  INVALID_DATE_FORMAT: 'INVALID_DATE_FORMAT',

  // Permission errors
  IMMUTABLE_FIELD: 'IMMUTABLE_FIELD',
  FIELD_NOT_ALLOWED: 'FIELD_NOT_ALLOWED',
  AGENT_CANNOT_OWN: 'AGENT_CANNOT_OWN',
  DEPARTMENT_MISMATCH: 'DEPARTMENT_MISMATCH',
  APPEND_ONLY_VIOLATION: 'APPEND_ONLY_VIOLATION',
  INVALID_OWNER_TYPE: 'INVALID_OWNER_TYPE',

  // Approval errors
  APPROVAL_REQUIRED: 'APPROVAL_REQUIRED',

  // Dependency errors
  OPEN_CHILDREN: 'OPEN_CHILDREN',
};

// Map error codes to their categories
const CODE_TO_CATEGORY = {
  [ERROR_CODES.INVALID_TRANSITION]: ERROR_CATEGORIES.TRANSITION_ERROR,
  [ERROR_CODES.TERMINAL_STATE]: ERROR_CATEGORIES.TRANSITION_ERROR,
  [ERROR_CODES.AGENT_NOT_ALLOWED]: ERROR_CATEGORIES.PERMISSION_ERROR,
  [ERROR_CODES.INVALID_STATUS]: ERROR_CATEGORIES.SCHEMA_ERROR,
  [ERROR_CODES.INVALID_WORK_TYPE]: ERROR_CATEGORIES.SCHEMA_ERROR,
  [ERROR_CODES.INVALID_DEPARTMENT]: ERROR_CATEGORIES.SCHEMA_ERROR,
  [ERROR_CODES.MISSING_REQUIRED_FIELD]: ERROR_CATEGORIES.SCHEMA_ERROR,
  [ERROR_CODES.INVALID_ENUM_VALUE]: ERROR_CATEGORIES.SCHEMA_ERROR,
  [ERROR_CODES.MALFORMED_ID]: ERROR_CATEGORIES.SCHEMA_ERROR,
  [ERROR_CODES.INVALID_DATE_FORMAT]: ERROR_CATEGORIES.SCHEMA_ERROR,
  [ERROR_CODES.IMMUTABLE_FIELD]: ERROR_CATEGORIES.PERMISSION_ERROR,
  [ERROR_CODES.FIELD_NOT_ALLOWED]: ERROR_CATEGORIES.PERMISSION_ERROR,
  [ERROR_CODES.AGENT_CANNOT_OWN]: ERROR_CATEGORIES.PERMISSION_ERROR,
  [ERROR_CODES.DEPARTMENT_MISMATCH]: ERROR_CATEGORIES.PERMISSION_ERROR,
  [ERROR_CODES.APPEND_ONLY_VIOLATION]: ERROR_CATEGORIES.PERMISSION_ERROR,
  [ERROR_CODES.INVALID_OWNER_TYPE]: ERROR_CATEGORIES.PERMISSION_ERROR,
  [ERROR_CODES.APPROVAL_REQUIRED]: ERROR_CATEGORIES.APPROVAL_REQUIRED,
  [ERROR_CODES.OPEN_CHILDREN]: ERROR_CATEGORIES.DEPENDENCY_ERROR,
};

/**
 * Get the error category for an error code
 */
export const getCategoryForCode = (errorCode) => {
  return CODE_TO_CATEGORY[errorCode] || null;
};

/**
 * Build a successful ValidationResult
 *
 * @param {string} message - Success message
 * @returns {Object} ValidationResult
 */
export const success = (message) => ({
  allowed: true,
  errorCode: null,
  errorCategory: null,
  message: message || 'Validation passed',
  escalationRequired: false,
  retryable: false,
});

/**
 * Build a failed ValidationResult
 *
 * @param {string} errorCode - One of ERROR_CODES
 * @param {string} message - Human-readable error message
 * @param {Object} [overrides] - Optional overrides for escalationRequired/retryable
 * @returns {Object} ValidationResult
 */
export const failure = (errorCode, message, overrides = {}) => {
  const category = getCategoryForCode(errorCode);
  const categoryMeta = CATEGORY_META[category] || {
    retryable: false,
    escalationRequired: false,
  };

  return {
    allowed: false,
    errorCode,
    errorCategory: category,
    message,
    escalationRequired: overrides.escalationRequired !== undefined
      ? overrides.escalationRequired
      : categoryMeta.escalationRequired,
    retryable: overrides.retryable !== undefined
      ? overrides.retryable
      : categoryMeta.retryable,
  };
};
