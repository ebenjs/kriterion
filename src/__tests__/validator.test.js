import { describe, test, expect } from 'vitest'
import * as validator from '@/helpers/validator.js'

const field = 'fancyField'

describe("isFilled function", () => {
    test('if a form field is filled ?', () => {
        const inputValue = 'Hello'
        expect(validator.isFilled(inputValue, field)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })
    test('if it is falsy when only spaces are entered', () => {
        const inputValue = ' '
        expect(validator.isFilled(inputValue, field)).not.toStrictEqual({
            isValid: true,
            message: '',
        })
    })
});

/**
 * Number validation 
 */

describe('validateNumber function', () => {
    test('if can handle proper int', () => {
        const options = {
            number: '15',
            type: 'int',
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if it throws error when negative values set to false but is provided', () => {
        const options = {
            number: '-15',
            type: 'int',
            hasNegativeValues: false,
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a positive number for field fancyField',
        })
    })

    test('if it throws error when type is int but no int is provided', () => {
        const options = {
            number: '1.85',
            type: 'int',
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter an integer for field fancyField',
        })
    })

    test('if it throws error when type is float but no float is provided', () => {
        const options = {
            number: '15',
            type: 'float',
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a float for field fancyField',
        })
    })

    test('if it throws error when type is set to something not known', () => {
        const options = {
            number: '15',
            type: 'bool',
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Unknown type for field fancyField',
        })
    })

    test('if can handle float', () => {
        const options = {
            number: '15.5',
            type: 'float',
            min: 0,
            max: 50,
            hasNegativeValues: true,
            required: true,
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if can handle negative values', () => {
        const options = {
            number: '-105',
            type: 'int',
            hasNegativeValues: true,
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if can handle min values', () => {
        const options = {
            number: '25',
            type: 'int',
            min: 20,
            hasNegativeValues: true,
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if it throws error when min condition is not met', () => {
        const options = {
            number: '5',
            type: 'int',
            min: 20,
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Number must be greater than or equal to 20 for field fancyField',
        })
    })

    test('if can handle max float values', () => {
        const options = {
            number: '50.5',
            type: 'float',
            min: 20,
            max: 50.5,
            hasNegativeValues: true,
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if can handle max int values', () => {
        const options = {
            number: '50',
            type: 'int',
            min: 20,
            max: 50.5,
            hasNegativeValues: true,
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if it throws error when max condition is not met', () => {
        const options = {
            number: '25',
            type: 'int',
            max: 20,
            field: field
        }
        expect(validator.validateNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Number must be less than or equal to 20 for field fancyField',
        })
    })
})

/**
 * Alphabet/Alphanum validation tests
 */

describe('validateAlphabet function', () => {
    test('if it throws error when required is true and no proper string is provided', () => {
        const options = {
            value: '',
            required: true,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a value for field fancyField',
        })
    })

    test('if it throws error when min condition is not met', () => {
        const options = {
            value: 'Hello',
            required: true,
            minLength: 10,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter at least 10 characters for field fancyField',
        })
    })

    test('if it throws error when max condition is not met', () => {
        const options = {
            value: 'Hello',
            required: true,
            maxLength: 2,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter at most 2 characters for field fancyField',
        })
    })

    test('if can handle both min and max limitation', () => {
        const options = {
            value: 'Hello',
            required: true,
            minLength: 2,
            maxLength: 5,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if can handle space setting', () => {
        const options = {
            value: 'Hello',
            required: true,
            hasSpace: false,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if can throw error when hasSpace is false', () => {
        const options = {
            value: 'Hello World',
            required: true,
            hasSpace: false,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter only letters for field fancyField',
        })
    })

    test('if can handle numerical when set to true', () => {
        const options = {
            value: 'HelloWorld123',
            required: true,
            hasNumerical: true,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if can throw error when hasNumerical is false', () => {
        const options = {
            value: 'Hello World 123',
            required: true,
            hasNumerical: false,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: false,
            message: "Please enter only letters for field fancyField",
        })
    })

    test('if can handle numerical and spaces when set to true', () => {
        const options = {
            value: 'Hello World 123',
            required: true,
            hasSpace: true,
            hasNumerical: true,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if it throws error when only letters condition is not met', () => {
        const options = {
            value: 'Not found : 404',
            required: true,
            hasSpace: false,
            hasNumerical: false,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter only letters for field fancyField',
        })
    })

    test('if it throws error when only letters and numbers condition is not met', () => {
        const options = {
            value: 'Not found : 404',
            required: true,
            hasSpace: false,
            hasNumerical: true,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter only letters and numbers for field fancyField',
        })
    })

    test('if it throws error when only letters and spaces condition is not met', () => {
        const options = {
            value: 'Not found : 404',
            required: true,
            hasSpace: true,
            hasNumerical: false,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: false,
            message: 'Only letters and spaces are allowed for field fancyField',
        })
    })

    test('if it throws error when only letters, numbers and spaces condition is not met', () => {
        const options = {
            value: 'Not found : 404',
            required: true,
            hasSpace: true,
            hasNumerical: true,
            field: field
        }

        expect(validator.validateAlphabet(options)).toStrictEqual({
            isValid: false,
            message: 'Only letters, numbers and spaces are allowed for field fancyField',
        })
    })
})


/**
 * Phone number validation tests
 */

describe('validatePhoneNumber function', () => {
    test('if throw error when required is true and no phone number is provided', () => {
        const options = {
            phoneNumber: '',
            required: true,
            field: field
        }

        expect(validator.validatePhoneNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a value for field fancyField',
        })
    })

    test('if can handle digit limitation', () => {
        const options = {
            phoneNumber: '90032163',
            digitsNumber: 8,
            hasPlusSign: false,
            required: true,
            field: field
        }

        expect(validator.validatePhoneNumber(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if it throws error when phone number length not match digit', () => {
        const digits = 8
        const options = {
            phoneNumber: '900321635',
            digitsNumber: digits,
            hasPlusSign: false,
            required: true,
            field: field
        }

        expect(validator.validatePhoneNumber(options)).toStrictEqual({
            isValid: false,
            message: `Phone number must be ${digits} digits`,
        })
    })

    test('if it throws error when hasPlusSign is set to false but a + sign is provided', () => {
        const options = {
            phoneNumber: '+22890032163',
            digitsNumber: 12,
            hasPlusSign: false,
            required: true,
            field: field
        }

        expect(validator.validatePhoneNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a valid phone number without a + sign',
        })
    })

    test('if it throws error when wrong characters are provided', () => {
        const options = {
            phoneNumber: '90032163helo',
            digitsNumber: 12,
            hasPlusSign: false,
            required: true,
            field: field
        }

        expect(validator.validatePhoneNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a valid number for field fancyField',
        })
    })

    test('if it throws error when hasPlusSign is set to true but a + sign is not provided', () => {
        const options = {
            phoneNumber: '22890032163',
            digitsNumber: 12,
            hasPlusSign: true,
            required: true,
            field: field
        }

        expect(validator.validatePhoneNumber(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a valid phone number with a + sign',
        })
    })
})

/**
 * Email validation tests
 */

describe('isEmailValid function', () => {
    test('if it throws error when required is true but no email is provided', () => {
        const options = {
            email: '',
            required: true,
            field: field
        }

        expect(validator.isEmailValid(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a value for field fancyField',
        })
    })

    test('if it throws error when proper email is not provided', () => {
        const options = {
            email: 'something not correct',
            required: true,
            field: field
        }

        expect(validator.isEmailValid(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a valid email address for field fancyField',
        })
    })

    test('if it handle proper email when provided', () => {
        const options = {
            email: 'example@domain.ext',
            required: true,
            field: field
        }

        expect(validator.isEmailValid(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })
})

/**
 * Password validation tests
 */

describe('password functions', () => {
    test('if it accepts correct passwords', () => {
        const firstPassword = 'password'
        const secondPassword = 'password'

        expect(validator.isBothPasswordValid(firstPassword, secondPassword)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })

    test('if it throws error when passwords are not the same', () => {
        const firstPassword = 'password'
        const secondPassword = 'wrong-password'

        expect(validator.isBothPasswordValid(firstPassword, secondPassword)).toStrictEqual({
            isValid: false,
            message: 'Passwords do not match',
        })
    })

    test('if it throws error when password is not set', () => {
        const options = {
            password: '',
            field: field
        }

        expect(validator.isPasswordValid(options)).toStrictEqual({
            isValid: false,
            message: 'Please enter a value for field fancyField',
        })
    })

    test('if it throws error when passwords length condition is not met', () => {
        const options = {
            password: 'pass',
            field: field
        }

        expect(validator.isPasswordValid(options)).toStrictEqual({
            isValid: false,
            message: 'Password must be at least 8 characters long for field fancyField',
        })
    })

    test('if it throws error when at least one lowercase letter condition is not met', () => {
        const options = {
            password: 'PASSWORD',
            hasLowerCase: true,
            field: field
        }

        expect(validator.isPasswordValid(options)).toStrictEqual({
            isValid: false,
            message: 'Password must contain at least one lowercase letter for field fancyField',
        })
    })

    test('if it throws error when at least one uppercase letter condition is not met', () => {
        const options = {
            password: 'password',
            hasUpperCase: true,
            field: field
        }

        expect(validator.isPasswordValid(options)).toStrictEqual({
            isValid: false,
            message: 'Password must contain at least one uppercase letter for field fancyField',
        })
    })

    test('if it throws error when at least one number condition is not met', () => {
        const options = {
            password: 'password',
            hasUpperCase: false,
            hasNumber: true,
            field: field
        }

        expect(validator.isPasswordValid(options)).toStrictEqual({
            isValid: false,
            message: 'Password must contain at least one number for field fancyField',
        })
    })

    test('if it throws error when at least one special character condition is not met', () => {
        const options = {
            password: 'password',
            hasUpperCase: false,
            hasNumber: false,
            hasSpecialChar: true,
            field: field
        }

        expect(validator.isPasswordValid(options)).toStrictEqual({
            isValid: false,
            message: 'Password must contain at least one special character for field fancyField',
        })
    })

    test('if it works when all conditions ar met', () => {
        const options = {
            password: 'pa$$W0rd',
            field: field
        }

        expect(validator.isPasswordValid(options)).toStrictEqual({
            isValid: true,
            message: '',
        })
    })
})