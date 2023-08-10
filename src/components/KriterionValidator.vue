<script setup>

import { errors } from '@/shared-state/errors.js';
import { watch } from 'vue'

const emit = defineEmits(['error'])

const props = defineProps({
    activateErrors: {
        type: Boolean,
        default: true
    },
    errorStyle: {
        type: String,
        default: `
            padding: 10px;
            color: darkred;
            `
    },
    errorClass: {
        type: String,
        default: ''
    }
})

watch(errors.value, async (newError, oldError) => {
    emit('error', newError)
})

</script>

<template>
    <div>
        <slot name="errors">
            <div v-if="props.activateErrors && errors.size > 0"
                 :class="errorClass"
                 :style="errorStyle">
                <ul>
                    <li v-for="error in errors" :key="error">
                        {{ error.at(1) }}
                    </li>
                </ul>
            </div>
        </slot>
        <slot></slot>
    </div>
</template>

<style scoped>
</style>