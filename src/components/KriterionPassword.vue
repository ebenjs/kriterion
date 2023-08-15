<script setup>
import KriterionInput from "@/components/KriterionInput.vue";
import { uniqIdentifier } from "@/helpers/utility.js";
import { passwordProps } from "@/helpers/password-props.js";

import { ref } from "vue";

const props = defineProps(passwordProps)
const emit = defineEmits(['update:modelValue'])
const passwordVmodel = ref(props.modelValue);

const updatePasswordVmodel = (newValue) => {
  passwordVmodel.value = newValue;
  emit('update:modelValue', passwordVmodel.value);
};

</script>

<template>
    <div>
        <!-- Repeated type or not -->
        <!-- One object props instead of multiple hasproperties -->

        <KriterionInput validationType="password" :minLength="props.minLength" :hasLowerCase="props.hasLowerCase"
            :hasUpperCase="props.hasUpperCase" :hasNumber="props.hasNumber" :hasSpecialChar="props.hasSpecialChar"
            :placeholder="props.placeholder.first" :style="props.style" :class="props.class" :errorStyle="props.errorStyle"
            :errorClass="props.errorClass" :identifier="'password.first'" :kid="uniqIdentifier()" 
            :modelValue="passwordVmodel"
            @update:modelValue="updatePasswordVmodel">

            <slot name="first-custom-error"></slot>

        </KriterionInput>

        <slot name="between-content"></slot>

        <KriterionInput validationType="password" :hasLowerCase="props.hasLowerCase" :hasUpperCase="props.hasUpperCase"
            :hasNumber="props.hasNumber" :hasSpecialChar="props.hasSpecialChar" :placeholder="props.placeholder.second"
            :style="props.style" :class="props.class" :errorStyle="props.errorStyle" :errorClass="props.errorClass"
            :identifier="'password.second'" :kid="uniqIdentifier()">

            <!--            Activate errors or not-->
            <slot name="second-custom-error"></slot>

        </KriterionInput>

        <slot name="after-content"></slot>
    </div>
</template>