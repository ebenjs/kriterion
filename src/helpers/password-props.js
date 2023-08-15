import { $pluginOptions } from '@/helpers/options.js';

export const passwordProps = {
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: Object,
        default: {
            first: '',
            second: ''
        }
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
        default: $pluginOptions.minPasswordLength
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