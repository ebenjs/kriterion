<script setup>
import {computed, onMounted, ref} from "vue";
import {addError, errors, removeError} from "@/shared-state/errors.js";
import {passwordValues} from "@/shared-state/password.js";
import {
  isBothPasswordValid,
  isEmailValid,
  isFilled,
  isPasswordValid,
  validateAlphabet as alphabetValidator,
  validateNumber as numberValidator,
  validatePhoneNumber as phoneNumberValidator
} from "@/helpers/validator.js";
import {kriterionProps} from "@/helpers/props.js";
import {uniqIdentifier} from "@/helpers/utility.js";

const props = defineProps(kriterionProps)

const kid = ref(uniqIdentifier())
const inputValue = ref('')

const validateNumber = (fieldLabel) => {
  const checkResult = numberValidator({
    number: inputValue.value,
    type: props.numberType,
    min: props.min,
    max: props.max,
    hasNegativeValues: props.hasNegativeValues,
    required: props.isRequired,
    field: fieldLabel
  })

  returnCheckResponse(checkResult)
}

const validateAlphaNum = ({numerical = true, field}) => {
  const checkResult = alphabetValidator({
    value: inputValue.value,
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
    phoneNumber: inputValue.value,
    hasPlusSign: props.hasPlusSign,
    digitsNumber: props.digits,
    required: props.isRequired,
    field: fieldLabel
  })

  returnCheckResponse(checkResult)
}

const validateEmail = (fieldLabel) => {
  const checkResult = isEmailValid({email: inputValue.value, field: fieldLabel})
  returnCheckResponse(checkResult)
}

const validatePassword = (identifier, fieldLabel) => {
  identifier === 'password.first' ? passwordValues.first = inputValue.value : passwordValues.second = inputValue.value
  const checkPasswordValidityResult = isPasswordValid({
    password: inputValue.value,
    hasLowerCase: props.hasLowerCase,
    hasUpperCase: props.hasUpperCase,
    hasNumber: props.hasNumber,
    hasSpecialChar: props.hasSpecialChar,
    field: fieldLabel
  })
  returnCheckResponse(checkPasswordValidityResult)

  if (identifier === 'password.second') {
    const checkBothPasswordValidityResult = isBothPasswordValid(passwordValues.first, passwordValues.second)
    returnCheckResponse(checkBothPasswordValidityResult)
  }
}

const validateRequired = () => {
  const checkResult = isFilled(inputValue.value, currentFieldLabel.value)
  console.log('checkResult', checkResult)
  returnCheckResponse(checkResult)
}

const returnCheckResponse = (checkResult) => {
  if (!checkResult.isValid) {
    addError(checkResult.message, props.kid ?? kid.value)
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
      validateAlphaNum({numerical: false, field: currentFieldLabel.value})
      break
    case 'alphanum':
      validateAlphaNum({numerical: true, field: currentFieldLabel.value})
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
  <input
      :id="props.id"
      :kid="props.kid ?? kid"
      type="text"
      :title="props.hasTitle ? currentFieldLabel : null"
      v-model="inputValue"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :disabled="props.disabled"
      :autofocus="props.autofocus"
      :autocomplete="props.autocomplete"
      :style="props.style"
      :class="props.class"
      @blur="validate()">

  <slot v-if="errors.has(props.kid ?? kid)" name="error">
    <div>
      {{ errors.get(props.kid ?? kid) }}
    </div>
  </slot>

</template>

<style scoped>

</style>