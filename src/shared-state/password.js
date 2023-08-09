import { ref } from 'vue';
export const passwordValues = ref({});
export function setPasswordValue (value, fieldId) {
    passwordValues.value[fieldId] = value;
}