import {
  ERROR_CATEGORIES,
  ERROR_CODES,
  getCategoryForCode,
  success,
  failure,
} from './validationContract';

describe('validationContract', () => {
  describe('success', () => {
    it('returns a valid success result', () => {
      const result = success('Test passed');
      expect(result.allowed).toBe(true);
      expect(result.errorCode).toBeNull();
      expect(result.errorCategory).toBeNull();
      expect(result.message).toBe('Test passed');
      expect(result.escalationRequired).toBe(false);
      expect(result.retryable).toBe(false);
    });

    it('uses default message when none provided', () => {
      const result = success();
      expect(result.message).toBe('Validation passed');
    });
  });

  describe('failure', () => {
    it('returns a valid failure result with category lookup', () => {
      const result = failure(ERROR_CODES.INVALID_TRANSITION, 'Bad transition');
      expect(result.allowed).toBe(false);
      expect(result.errorCode).toBe('INVALID_TRANSITION');
      expect(result.errorCategory).toBe('TRANSITION_ERROR');
      expect(result.message).toBe('Bad transition');
      expect(result.retryable).toBe(false);
    });

    it('sets escalationRequired from category defaults', () => {
      const approvalResult = failure(ERROR_CODES.APPROVAL_REQUIRED, 'Needs approval');
      expect(approvalResult.escalationRequired).toBe(true);

      const transitionResult = failure(ERROR_CODES.INVALID_TRANSITION, 'Bad');
      expect(transitionResult.escalationRequired).toBe(false);
    });

    it('allows overrides for escalationRequired', () => {
      const result = failure(ERROR_CODES.INVALID_TRANSITION, 'Bad', {
        escalationRequired: true,
      });
      expect(result.escalationRequired).toBe(true);
    });

    it('allows overrides for retryable', () => {
      const result = failure(ERROR_CODES.INVALID_TRANSITION, 'Bad', {
        retryable: true,
      });
      expect(result.retryable).toBe(true);
    });
  });

  describe('getCategoryForCode', () => {
    it('maps transition error codes to TRANSITION_ERROR', () => {
      expect(getCategoryForCode(ERROR_CODES.INVALID_TRANSITION)).toBe(ERROR_CATEGORIES.TRANSITION_ERROR);
      expect(getCategoryForCode(ERROR_CODES.TERMINAL_STATE)).toBe(ERROR_CATEGORIES.TRANSITION_ERROR);
    });

    it('maps schema error codes to SCHEMA_ERROR', () => {
      expect(getCategoryForCode(ERROR_CODES.INVALID_STATUS)).toBe(ERROR_CATEGORIES.SCHEMA_ERROR);
      expect(getCategoryForCode(ERROR_CODES.INVALID_WORK_TYPE)).toBe(ERROR_CATEGORIES.SCHEMA_ERROR);
      expect(getCategoryForCode(ERROR_CODES.INVALID_DEPARTMENT)).toBe(ERROR_CATEGORIES.SCHEMA_ERROR);
      expect(getCategoryForCode(ERROR_CODES.MALFORMED_ID)).toBe(ERROR_CATEGORIES.SCHEMA_ERROR);
    });

    it('maps permission error codes to PERMISSION_ERROR', () => {
      expect(getCategoryForCode(ERROR_CODES.IMMUTABLE_FIELD)).toBe(ERROR_CATEGORIES.PERMISSION_ERROR);
      expect(getCategoryForCode(ERROR_CODES.FIELD_NOT_ALLOWED)).toBe(ERROR_CATEGORIES.PERMISSION_ERROR);
      expect(getCategoryForCode(ERROR_CODES.AGENT_CANNOT_OWN)).toBe(ERROR_CATEGORIES.PERMISSION_ERROR);
      expect(getCategoryForCode(ERROR_CODES.DEPARTMENT_MISMATCH)).toBe(ERROR_CATEGORIES.PERMISSION_ERROR);
      expect(getCategoryForCode(ERROR_CODES.APPEND_ONLY_VIOLATION)).toBe(ERROR_CATEGORIES.PERMISSION_ERROR);
    });

    it('maps approval code to APPROVAL_REQUIRED', () => {
      expect(getCategoryForCode(ERROR_CODES.APPROVAL_REQUIRED)).toBe(ERROR_CATEGORIES.APPROVAL_REQUIRED);
    });

    it('maps dependency code to DEPENDENCY_ERROR', () => {
      expect(getCategoryForCode(ERROR_CODES.OPEN_CHILDREN)).toBe(ERROR_CATEGORIES.DEPENDENCY_ERROR);
    });

    it('returns null for unknown codes', () => {
      expect(getCategoryForCode('UNKNOWN_CODE')).toBeNull();
    });
  });

  describe('contract shape', () => {
    const REQUIRED_FIELDS = ['allowed', 'errorCode', 'errorCategory', 'message', 'escalationRequired', 'retryable'];

    it('success has all required fields', () => {
      const result = success('ok');
      REQUIRED_FIELDS.forEach((field) => {
        expect(result).toHaveProperty(field);
      });
    });

    it('failure has all required fields', () => {
      const result = failure(ERROR_CODES.INVALID_TRANSITION, 'bad');
      REQUIRED_FIELDS.forEach((field) => {
        expect(result).toHaveProperty(field);
      });
    });
  });
});
