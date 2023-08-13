export const kriterionProps = {
    validationType: {
        type: String,
        default: 'required',
        validator(value) {
            return ['required', 'alpha', 'alphanum', 'number', 'email', 'phone', 'password'].includes(value)
        }
    },
    // Global
    isRequired: {
        type: Boolean,
        default: true
    },
    id: {
        type: String,
    },
    kid: {
        type: String,
    },
    label: {
        type: String,
    },
    hasTitle: {
        type: Boolean,
        default: true
    },

    // Numerical
    min: {
        type: Number,
        required: false
    },
    max: {
        type: Number,
        required: false
    },
    hasNegativeValues: {
        type: Boolean,
        default: true
    },
    numberType: {
        type: String,
        default: 'int',
        validator(value) {
            return ['int', 'float'].includes(value)
        }
    },
    // Alpha and AlphaNum
    minLength: {
        type: Number,
        required: false
    },
    maxLength: {
        type: Number,
        required: false
    },
    hasSpace: {
        type: Boolean,
        default: false

    },
    // Phone
    digits: {
        type: Number,
        default: 8,
        required: false
    },
    hasPlusSign: {
        type: Boolean,
        default: true
    },
    // Password
    minlength: {
        type: Number,
        default: 8,
    },
    hasLowerCase: {
        type: Boolean,
        default: true,
    },
    hasUpperCase: {
        type: Boolean,
        default: true,
    },
    hasNumber: {
        type: Boolean,
        default: true,
    },
    hasSpecialChar: {
        type: Boolean,
        default: true,
    },
    identifier: {
        type: String,
    },
    // Other attributes
    class: {
        type: String,
        default: ''
    },
    errorClass: {
        type: String,
        default: ''
    },
    style: {
        type: String,
        default: ''
    },
    errorStyle: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    readonly: {
        type: Boolean,
        default: false
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    autocomplete: {
        type: String,
        default: 'off'
    },
    disabled: {
        type: Boolean,
        default: false
    },
}