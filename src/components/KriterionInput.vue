<script setup>
import { computed, onMounted, ref } from "vue";
import { addError, errors, removeError } from "@/shared-state/errors.js";
import { passwordValues } from "@/shared-state/password.js";
import {
  isBothPasswordValid,
  isEmailValid,
  isFilled,
  isPasswordValid,
  validateAlphabet as alphabetValidator,
  validateNumber as numberValidator,
  validatePhoneNumber as phoneNumberValidator
} from "@/helpers/validator.js";
import { kriterionProps } from "@/helpers/props.js";
import { uniqIdentifier } from "@/helpers/utility.js";

const props = defineProps(kriterionProps)
const emit = defineEmits(['error', 'update:modelValue'])

const kid = ref(uniqIdentifier())

const validateNumber = (fieldLabel) => {
  const checkResult = numberValidator({
    number: props.modelValue,
    type: props.numberType,
    min: props.min,
    max: props.max,
    hasNegativeValues: props.hasNegativeValues,
    required: props.isRequired,
    field: fieldLabel
  })

  returnCheckResponse(checkResult)
}

const validateAlphaNum = ({ numerical = true, field }) => {
  const checkResult = alphabetValidator({
    value: props.modelValue,
    minLength: props.minLength,
    maxLength: props.maxLength,
    required: props.isRequired,
    hasSpace: props.hasSpace,
    hasNumerical: numerical,
    field: field
  })

  returnCheckResponse(checkResult)
}

const validatePhoneNumber = (fieldLabel) => {
  const checkResult = phoneNumberValidator({
    phoneNumber: props.modelValue,
    hasPlusSign: props.hasPlusSign,
    digitsNumber: props.digits,
    required: props.isRequired,
    field: fieldLabel
  })

  returnCheckResponse(checkResult)
}

const validateEmail = (fieldLabel) => {
  const checkResult = isEmailValid({ email: props.modelValue, required: props.isRequired, field: fieldLabel })
  returnCheckResponse(checkResult)
}

const validatePassword = (identifier, fieldLabel) => {

  if (identifier === 'password.first') {
    passwordValues.first = props.modelValue
  } else {
    passwordValues.second = props.modelValue
  }

  const checkPasswordValidityResult = isPasswordValid({
    password: props.modelValue,
    hasLowerCase: props.hasLowerCase,
    hasUpperCase: props.hasUpperCase,
    hasNumber: props.hasNumber,
    hasSpecialChar: props.hasSpecialChar,
    minLength: props.minLength,
    field: fieldLabel
  })

  returnCheckResponse(checkPasswordValidityResult)

  if (identifier === 'password.second') {
    const checkBothPasswordValidityResult = isBothPasswordValid(passwordValues.first, passwordValues.second)
    returnCheckResponse(checkBothPasswordValidityResult)
  }
}

const validateRequired = () => {
  const checkResult = isFilled(props.modelValue, currentFieldLabel.value)
  returnCheckResponse(checkResult)
}

const returnCheckResponse = (checkResult) => {
  if (!checkResult.isValid) {
    addError(checkResult.message, props.kid ?? kid.value)
    emit('error', checkResult.message)
  } else {
    removeError(props.kid ?? kid.value)
  }
}

const currentFieldLabel = computed(() => {
  return props.label ?? props.kid ?? kid.value
})

const validate = () => {

  switch (props.validationType) {
    case 'number':
      validateNumber(currentFieldLabel.value)
      break
    case 'alpha':
      validateAlphaNum({ numerical: false, field: currentFieldLabel.value })
      break
    case 'alphanum':
      validateAlphaNum({ numerical: true, field: currentFieldLabel.value })
      break
    case 'phone':
      validatePhoneNumber(currentFieldLabel.value)
      break
    case 'email':
      validateEmail(currentFieldLabel.value)
      break
    case 'password':
      validatePassword(props.identifier, currentFieldLabel.value)
      break
    default:
      validateRequired()
      break;
  }
}

const checkForNumberTypeProperties = () => {
  if (props.validationType === 'number') {
    if (props.hasNegativeValues && props.min >= 0) {
      console.warn('[Kriterion Warn]', 'You have set hasNegativeValues to true and min to >= 0. This will not allow negative values for field ' + (props.kid ?? kid.value) + ' as min is prioritized over hasNegativeValues');
    }

    if (props.min > props.max) {
      throw new Error('You have set min to greater than max for field ' + (props.kid ?? kid.value) + '. This will not allow any value to be entered as min is prioritized over max');
    }

    if (props.numberType === 'int' && (props.min % 1 !== 0 || props.max % 1 !== 0)) {
      throw new Error('You have set numberType to int but min or max is a float for field ' + (props.kid ?? kid.value) + '. This can lead to unexpected results');
    }
  }
}

const checkForAlphabetTypeProperties = () => {
  if (props.validationType === 'alpha' || props.validationType === 'alphanum') {

    if (props.maxLength <= 0) {
      throw new Error('You have set maxLength to less than or equal to 0 for field ' + (props.kid ?? kid.value) + '. This will not allow any value to be entered');
    }

    if (props.minLength > props.maxLength) {
      throw new Error('You have set minLength to greater than maxLength for field ' + (props.kid ?? kid.value) + '. This will not allow any value to be entered as minLength is prioritized over maxLength');
    }
  }
}

const checkForPhoneTypeProperties = () => {
  if (props.validationType === 'phone') {
    if (props.digits <= 0) {
      console.warn('[Kriterion Warn]', 'You have set digits to less than or equal to 0 for field ' + (props.kid ?? kid.value) + '. This will not allow any value to be entered');
    }
  }
}

onMounted(() => {
  checkForNumberTypeProperties()
  checkForAlphabetTypeProperties()
  checkForPhoneTypeProperties()
})

</script>

<template>
  <input :id="props.id" :kid="props.kid ?? kid" type="text" :title="props.hasTitle ? currentFieldLabel : null"
    :placeholder="props.placeholder" :readonly="props.readonly" :disabled="props.disabled"
    :autofocus="props.autofocus" :autocomplete="props.autocomplete" :style="props.style" :class="props.class"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="validate()" />

  <slot v-if="errors.has(props.kid ?? kid)">
    <div :class="props.errorClass" :style="props.errorStyle">
      <small>
        {{ errors.get(props.kid ?? kid) }}
      </small>
    </div>
  </slot>
</template>
