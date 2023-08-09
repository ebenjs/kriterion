<script setup>
import KriterionInput from "@/components/KriterionInput.vue";
import KriterionPassword from "@/components/KriterionPassword.vue";
import KriterionValidator from "@/components/KriterionValidator.vue";

</script>

<template>
  <KriterionValidator
      :activate-errors="true">
    <KriterionInput
        placeholder="Validate Required Field"
        :label="'reqfield'"
        isRequired
    >
      <template v-slot:error>Eben</template>
    </KriterionInput>

    <br/><br/>

    <!--     Define priority of validation min and hasNegativeValues for instance -->
    <KriterionInput
        placeholder="Validate Number"
        validationType="number"
        :min="5"
        :max="8"
        numberType="int"
        :hasNegativeValues="true"
        :isRequired="true"
    >
    </KriterionInput>

    <br/><br/>

    <KriterionInput
        placeholder="Validate Alphabetic Values"
        validationType="alpha"
        :hasSpace="true"
        :minLength="1"
        :maxLength="5"
        isRequired
    >
    </KriterionInput>

    <br/><br/>

    <KriterionInput
        placeholder="Validate Alphabetic Values"
        validationType="alpha"
        :hasSpace="true"
        :minLength="2"
        :maxLength="10"
        isRequired
    >
    </KriterionInput>

    <br/><br/>

    <KriterionInput
        placeholder="Validate AlphaNum Values"
        validationType="alphanum"
        :hasSpace="true"
        :minLength="2"
        :maxLength="10"
        isRequired
    >
    </KriterionInput>

    <br/><br/>

    <KriterionInput
        placeholder="Validate PhoneNumber"
        validationType="phone"
        :hasPlusSign="false"
        :digits="0"
        isRequired
    >
    </KriterionInput>

    <br/><br/>

    <KriterionInput
        placeholder="Validate Email"
        validationType="email"
        isRequired
    >
    </KriterionInput>


    <br/><br/>
    <KriterionPassword
        :hasNumerical="true"
        :hasLowerCase="true"
        :hasUpperCase="true"
        :hasSpecialChar="false"
        :minLength="8"
        :inputStyles="'background-color: gray; color: white'"
        :placeholder="{first: 'First Placeholder', second: 'Second Placeholder'}">

      <template v-slot:first-custom-error>
        <div>Custom error for first input</div>
      </template>

    </KriterionPassword>
  </KriterionValidator>
</template>

<style scoped>
</style>
