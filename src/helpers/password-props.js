export const passwordProps = {
    placeholder: {
        type: Object,
    },
    hasNumerical: {
        type: Boolean,
        default: true
    },
    hasLowerCase: {
        type: Boolean,
        default: true
    },
    hasUpperCase: {
        type: Boolean,
        default: true
    },
    hasSpecialChar: {
        type: Boolean,
        default: true
    },
    minLength: {
        type: Number,
        default: 8
    },
    style: {
        type: String,
        default: ''
    },
    errorStyle: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    },
    errorClass: {
        type: String,
        default: ''
    }
}