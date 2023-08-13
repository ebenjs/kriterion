<script setup>
import KriterionInput from "@/components/KriterionInput.vue";
import {uniqIdentifier} from "@/helpers/utility.js";

const props = defineProps({
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
})

</script>

<template>
    <div>
        <!--        Repeated type or not -->
        <!--        One object props instead of multiple hasproperties -->

        <KriterionInput
                validationType="password"
                :minLength="props.minLength"
                :hasLowerCase="props.hasLowerCase"
                :hasUpperCase="props.hasUpperCase"
                :hasNumber="props.hasNumber"
                :hasSpecialChar="props.hasSpecialChar"
                :placeholder="props.placeholder.first"
                :style="props.style"
                :class="props.class"
                :errorStyle="props.errorStyle"
                :errorClass="props.errorClass"
                :identifier="'password.first'"
                :kid="uniqIdentifier()"
        >

            <template v-slot:error>
                <slot name="first-custom-error"></slot>
            </template>

        </KriterionInput>


        <slot name="between-content"></slot>


        <KriterionInput
                validationType="password"
                :hasLowerCase="props.hasLowerCase"
                :hasUpperCase="props.hasUpperCase"
                :hasNumber="props.hasNumber"
                :hasSpecialChar="props.hasSpecialChar"
                :placeholder="props.placeholder.second"
                :style="props.style"
                :class="props.class"
                :errorStyle="props.errorStyle"
                :errorClass="props.errorClass"
                :identifier="'password.second'"
                :kid="uniqIdentifier()"
        >

            <!--            Activate errors or not-->
            <template v-slot:error>
                <slot name="second-custom-error"></slot>
            </template>

        </KriterionInput>


        <slot name="after-content"></slot>
    </div>
</template>

<style scoped>

</style>