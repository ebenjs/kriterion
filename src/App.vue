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
  <h1>Kriterion validation demo</h1>
  <KriterionValidator :activate-errors="true" @error="captureError">

    <div class="block">
      <div>
        <label>Email validation with default values</label>
      </div>
      <KriterionInput placeholder="Email" validationType="email" class="custom-input-style">
      </KriterionInput>
    </div>

    <div class="block">
      <div>
        <label>Email validation with custom error slot</label>
      </div>
      <KriterionInput validationType="email" class="custom-input-style" placeholder="Custom error message">
        <div class="error">Email validation failed</div>
      </KriterionInput>
    </div>

    <div class="block">
      <div>
        <label>Simple required field validation with custom error style</label>
      </div>
      <KriterionInput placeholder="Required Field" class="custom-input-style"
        errorStyle="color: red; margin-top: 10px; font-family: 'Courier New', Courier, monospace" isRequired />
    </div>

    <div class="block">
      <div>
        <label>Validating a number with min and max properties</label>
      </div>
      <!--     Define priority of validation min and hasNegativeValues for instance -->
      <KriterionInput placeholder="Number" validationType="number" :min="1" :max="10" numberType="int" :isRequired="true"
        class="custom-input-style" />
    </div>

    <div class="block">
      <div>
        <label>Alphabetical validation with minLength and maxLength and space authorized properties</label>
      </div>
      <KriterionInput placeholder="Alphabetic Values" validationType="alpha" :hasSpace="true" :minLength="1"
        :maxLength="5" isRequired class="custom-input-style" />
    </div>


    <div class="block">
      <div>
        <label>Alphanumerical validation with minLength and maxLength and no space authorized properties</label>
      </div>
      <KriterionInput placeholder="AlphaNum Values" validationType="alphanum" :hasSpace="false" :minLength="2"
        :maxLength="10" isRequired class="custom-input-style" />
    </div>

    <div class="block">
      <div>
        <label>Phone number validation with no plus sign and only 8 digits</label>
      </div>
      <KriterionInput placeholder="PhoneNumber" validationType="phone" :hasPlusSign="false" :digits="8" isRequired
        class="custom-input-style" />
    </div>

    <!-- Slots have priority over errorClass and errorStyle properties. -->
    <div class="block">
      <KriterionPassword class="custom-input-style" errorClass="error" :hasNumerical="true" :hasLowerCase="true"
        :hasUpperCase="true" :hasSpecialChar="false" :minLength="10"
        :placeholder="{ first: 'First Placeholder', second: 'Second Placeholder' }">

        <template v-slot:first-custom-error>
          <div>Custom error for first input</div>
        </template>

      </KriterionPassword>
    </div>
  </KriterionValidator>
</template>

<style>
body {
  background-color: rgb(243, 242, 239);
}

.block {
  margin-top: 20px;
}

.block div {
  margin-bottom: 10px;
}

.custom-input-style {
  border: solid 1px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
}

.custom-input-style:not(:first-of-type) {
  margin-left: 10px;
}

.error {
  color: red;
  margin-top: 10px;
  font-family: 'Fira Code';
}
</style>

