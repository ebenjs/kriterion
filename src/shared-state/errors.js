import { ref } from 'vue';

export const errors = ref(new Map());

export function addError(message, fieldId) {
    errors.value.set(fieldId , message);
}
export function removeError(fieldId) {
    errors.value.delete(fieldId);
}