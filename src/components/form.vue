<script lang="ts">
import { FormAddress } from "@/types/FormAddress";
import Vue from "vue";
import FormAddressComponent from "./form-address.vue";
import SubmitComponent from "./submit.vue";
import TextComponent from "./text.vue";

export default Vue.extend({
  name: "FormComponent",
  components: {
    TextComponent,
    SubmitComponent,
    FormAddressComponent,
  },
  data() {
    return {
      yearCount: 0,
      currentDate: new Date(),
      addresses: [] as FormAddress[],
    };
  },
  methods: {
    formatDate(date: Date): string {
      return "";
    },
    addNewAddress() {
      this.addresses = [
        ...this.addresses,
        {
          addressLineOne: "",
          postcode: "",
          dateMovedIn: "",
        },
      ];
    },
    removeAddress(indexToRemove: number) {
      this.addresses.splice(indexToRemove, 1);
    },
  },
});
</script>
<template>
  <div class="p-2">
    <TextComponent
      type="h2"
      :text="`Welcome back ${'placeholder name'}`"
    ></TextComponent>
    <TextComponent
      type="h4"
      text="Please provide you address history for the past 3 years"
    ></TextComponent>

    <FormAddressComponent
      v-for="(address, index) of addresses"
      :key="index"
      :address="address"
      :index="index"
      @onRemoveAddress="removeAddress($event)"
    ></FormAddressComponent>
    <b-button @click="addNewAddress()">Add new address</b-button>

    <SubmitComponent :addresses="addresses"></SubmitComponent>
  </div>
</template>
