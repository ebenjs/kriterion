import * as regex from './regex.js';
import { defaultOptions, $pluginOptions } from '@/helpers/options.js';

// Global
export const isFilled = (value, field) => {
    if (value !== null && value !== undefined && value.trim() !== '') {
        return {
            isValid: true,
            message: '',
        };
    }

    return {
        isValid: false,
        message: `Please enter a value for field ${field}`,
    };
}

// Numerical
export const validateNumber = ({ number, type = 'int', min = Number.NEGATIVE_INFINITY, max, hasNegativeValues = true, required = true, field }) => {

    const requiredCheckResult = checkIsFilled(number, field);

    if (required) {
        if (!requiredCheckResult.isValid) {
            return requiredCheckResult
        }
    }

    if (requiredCheckResult.isValid) {

        if (!checkForValidNumber(number, field).isValid) {
            return checkForValidNumber(number, field);
        }

        if (!checkForNegativeValues(number, hasNegativeValues, field).isValid) {
            return checkForNegativeValues(number, hasNegativeValues, field)
        }

        if (!checkForProperNumberType(number, type, field).isValid) {
            return checkForProperNumberType(number, type, field)
        }

        if (!checkForProperNumberType(number, type, field).isValid) {
            return checkForProperNumberType(number, type, field)
        }

        const floatNumber = parseFloat(number);

        if (typeof min === 'number' && floatNumber < min) {
            return {
                isValid: false,
                message: `Number must be greater than or equal to ${min} for field ${field}`,
            };
        }

        if (typeof max === 'number' && floatNumber > max) {
            return {
                isValid: false,
                message: `Number must be less than or equal to ${max} for field ${field}`,
            };
        }
    }

    return {
        isValid: true,
        message: '',
    };
};

// Alphabetical
export const validateAlphabet = ({ value, minLength = 1, maxLength, required = true, hasSpace = false, hasNumerical = false, field }) => {
    const requiredCheckResult = checkIsFilled(value, field);

    if (required) {
        if (!requiredCheckResult.isValid) {
            return requiredCheckResult
        }
    }

    if (requiredCheckResult.isValid) {

        if (!checkForValidLetterNumberAndSpace(value, hasSpace, hasNumerical, field).isValid) {
            return checkForValidLetterNumberAndSpace(value, hasSpace, hasNumerical, field);
        }

        if (typeof minLength === 'number' && value.length < minLength) {
            return {
                isValid: false,
                message: `Please enter at least ${minLength} characters for field ${field}`,
            };
        }

        if (typeof maxLength === 'number' && value.length > maxLength) {
            return {
                isValid: false,
                message: `Please enter at most ${maxLength} characters for field ${field}`,
            };
        }
    }
    return {
        isValid: true,
        message: '',
    }
}

// Phone number
export const validatePhoneNumber = ({ phoneNumber, digitsNumber = 8, hasPlusSign = true, required = true, field }) => {

    const requiredCheckResult = checkIsFilled(phoneNumber, field);

    const checkForValidNumberResult = validateNumber({
        number: phoneNumber,
        required: required,
        type: 'int',
        hasNegativeValues: false,
        field: field
    });

    if (required) {
        if (!checkForValidNumberResult.isValid) {
            return checkForValidNumberResult;
        }
    }

    if (requiredCheckResult.isValid) {
        if (hasPlusSign && !regex.phoneWithPlusSignRegex.test(phoneNumber)) {
            return {
                isValid: false,
                message: 'Please enter a valid phone number with a + sign',
            };
        }

        if (!hasPlusSign && regex.phoneWithPlusSignRegex.test(phoneNumber)) {
            return {
                isValid: false,
                message: 'Please enter a valid phone number without a + sign',
            };
        }

        if (phoneNumber.length !== digitsNumber) {
            return {
                isValid: false,
                message: `Phone number must be ${digitsNumber} digits`,
            };
        }

    }

    return {
        isValid: true,
        message: '',
    };
};

// Email validation
export const isEmailValid = ({ email, required = true, field }) => {
    const requiredCheckResult = checkIsFilled(email, field);

    if (required) {
        if (!requiredCheckResult.isValid) {
            return requiredCheckResult
        }
    }

    if(requiredCheckResult.isValid){
        if (!regex.emailRegex.test(email)) {
            return {
                isValid: false,
                message: 'Please enter a valid email address for field ' + field,
            };
        }
    }

    return {
        isValid: true,
        message: '',
    }
};

// Password

export const isBothPasswordValid = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return {
            isValid: false,
            message: 'Passwords do not match',
        };
    }

    return {
        isValid: true,
        message: '',
    };
};

export const isPasswordValid = ({
    password,
    hasLowerCase = true,
    hasUpperCase = true,
    hasNumber = true,
    hasSpecialChar = true,
    minLength = $pluginOptions.minPasswordLength ?? defaultOptions.minPasswordLength,
    field
}) => {

    const requiredCheckResult = checkIsFilled(password, field);

    if (!requiredCheckResult.isValid) {
        return requiredCheckResult
    }

    if (password.length < minLength) {
        return {
            isValid: false,
            message: `Password must be at least ${minLength} characters long for field ${field}`,
        };
    }

    if (hasLowerCase && !regex.lowercaseRegex.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one lowercase letter for field ' + field,
        };
    }

    if (hasUpperCase && !regex.uppercaseRegex.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one uppercase letter for field ' + field,
        };
    }

    if (hasNumber && !regex.atLeastOneIntRegex.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one number for field ' + field,
        };
    }

    if (hasSpecialChar && !regex.specialCharRegex.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one special character for field ' + field,
        };
    }

    return {
        isValid: true,
        message: '',
    };
};


// Internal functions to reduce cognitive complexity on some validation functions

const checkIsFilled = (value, field) => {
    return isFilled(value, field);
}

const checkForValidNumber = (number, field) => {
    if (isNaN(number) || checkIsFilled(number, field).isValid === false) {
        return {
            isValid: false,
            message: 'Please enter a valid number for field ' + field,
        };
    }

    return { isValid: true, message: '' };
}

const checkForNegativeValues = (number, hasNegativeValues, field) => {
    if (!hasNegativeValues && number < 0) {
        return {
            isValid: false,
            message: 'Please enter a positive number for field ' + field,
        };
    }

    return { isValid: true, message: '' };
}

const checkForProperNumberType = (number, type, field) => {
    if (type === 'int') {
        if (!regex.intRegex.test(number)) {
            return {
                isValid: false,
                message: 'Please enter an integer for field ' + field,
            };
        }

    } else if (type === 'float') {
        if (!regex.floatRegex.test(number)) {
            return {
                isValid: false,
                message: 'Please enter a float for field ' + field,
            };
        }
    } else {
        return {
            isValid: false,
            message: 'Unknown type for field ' + field,
        };
    }

    return { isValid: true, message: '' };
}

const checkForValidLetterNumberAndSpace = (value, hasSpace, hasNumerical, field) => {
    if (hasSpace) {
        if (!hasNumerical && !regex.alphaWIthSpaceRegex.test(value)) {
            return {
                isValid: false,
                message: 'Only letters and spaces are allowed for field ' + field,
            };
        } else if (hasNumerical && !regex.alphaNumWithSpaceRegex.test(value)) {
            return {
                isValid: false,
                message: 'Only letters, numbers and spaces are allowed for field ' + field,
            };
        }
    } else {
        if (!hasNumerical && !regex.alphabetRegex.test(value)) {
            return {
                isValid: false,
                message: 'Please enter only letters for field ' + field,
            };
        } else if (hasNumerical && !regex.alphaNumRegex.test(value)) {
            return {
                isValid: false,
                message: 'Please enter only letters and numbers for field ' + field,
            };
        }
    }

    return { isValid: true, message: '' };
}