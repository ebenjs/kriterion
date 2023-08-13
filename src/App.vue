<script setup>
import KriterionInput from "@/components/KriterionInput.vue";
import KriterionPassword from "@/components/KriterionPassword.vue";
import KriterionValidator from "@/components/KriterionValidator.vue";

const captureError = (error) => {
  console.log('error captured', error);
}

const showError = (error) => {
  console.log('error showed for single input', error);
}

</script>

<template>
  <KriterionValidator :activate-errors="true" @error="captureError">

    <KriterionInput placeholder="Email criteria" validationType="email"
      style="border: solid 1px rgba(0,0,0,0.1); padding: 10px; border-radius: 5px">
    </KriterionInput>

    <br /><br />

    <KriterionInput validationType="email" class="custom-input-style" placeholder="Custom error message">
      <!-- We add a slot -->
      <div class="error">Email validation failed</div>
    </KriterionInput>
    <br /><br />

    <KriterionInput placeholder="Validate Required Field" :label="'reqfield'" isRequired @error="showError">
      <div @error="showError">Error captured</div>
    </KriterionInput>

    <br /><br />

    <!--     Define priority of validation min and hasNegativeValues for instance -->
    <KriterionInput placeholder="Validate Number" validationType="number" :min="5" :max="8" numberType="int"
      :hasNegativeValues="true" :isRequired="true">
    </KriterionInput>

    <br /><br />

    <KriterionInput placeholder="Validate Alphabetic Values" validationType="alpha" :hasSpace="true" :minLength="1"
      :maxLength="5" isRequired>
    </KriterionInput>

    <br /><br />

    <KriterionInput placeholder="Validate Alphabetic Values" validationType="alpha" :hasSpace="true" :minLength="2"
      :maxLength="10" isRequired>
    </KriterionInput>

    <br /><br />

    <KriterionInput placeholder="Validate AlphaNum Values" validationType="alphanum" :hasSpace="true" :minLength="2"
      :maxLength="10" isRequired>
    </KriterionInput>

    <br /><br />

    <KriterionInput placeholder="Validate PhoneNumber" validationType="phone" :hasPlusSign="false" :digits="0" isRequired>
    </KriterionInput>

    <br /><br />

    <KriterionInput placeholder="Validate Email" validationType="email" isRequired>
    </KriterionInput>


    <br /><br />
    <KriterionPassword class="custom-input-style" :hasNumerical="true" :hasLowerCase="true" :hasUpperCase="true"
      :hasSpecialChar="false" :minLength="10" :placeholder="{ first: 'First Placeholder', second: 'Second Placeholder' }">

      <template v-slot:first-custom-error>
        <div>Custom error for first input</div>
      </template>

    </KriterionPassword>
  </KriterionValidator>
</template>

<style>
.custom-input-style {
  border: solid 1px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
}

/* .custom-input-style:not(:first-child) {
  margin-left: 10px;
} */

.error {
  color: red;
  margin-top: 10px;
  font-family: 'Courier New', Courier, monospace;
}
</style>

