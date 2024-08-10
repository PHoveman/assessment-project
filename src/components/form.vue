<script lang="ts">
import { User } from "@/types";
import { FormAddress } from "@/types/FormAddress";
import Vue from "vue";
import FormAddressComponent from "./form-address.vue";
import SubmitComponent from "./submit.vue";
import TextComponent from "./text.vue";
import dayjs from "dayjs";

export default Vue.extend({
  name: "FormComponent",
  components: {
    TextComponent,
    SubmitComponent,
    FormAddressComponent,
  },
  data() {
    return {
      currentDateStr: new Date().toISOString().split("T")[0],
      threeYearsInDays: 1095,
      addresses: [
        {
          tempId: new Date().getTime().toString(),
          addressLineOne: "",
          postcode: "",
          dateMovedIn: "",
        },
      ] as FormAddress[],
      activeDateStrings: [] as string[],
    };
  },
  methods: {
    addAddress() {
      this.addresses = [
        ...this.addresses,
        {
          tempId: new Date().getTime().toString(),
          addressLineOne: "",
          postcode: "",
          dateMovedIn: "",
        },
      ];
    },
    removeAddress(indexToRemove: number) {
      this.addresses.splice(indexToRemove, 1);
      this.activeDateStrings.splice(indexToRemove, 1);
    },
    storeDateStringHandler({ index, date }: { index: number; date: string }) {
      this.$set(this.activeDateStrings, index, date);
    },
  },
  computed: {
    user(): User | null {
      return this.$store.state.user;
    },
    isOverThreeYears(): boolean {
      return (
        this.activeDateStrings.reduce((acc: number, val: string) => {
          const currentDateStrFormatted = dayjs(this.currentDateStr);
          const differenceInDays = currentDateStrFormatted.diff(val, "day");

          return differenceInDays + acc;
        }, 0) > this.threeYearsInDays
      );
    },
  },
});
</script>
<template>
  <div v-if="user">
    <div class="p-5">
      <TextComponent
        type="h2"
        class="mb-5"
        :text="`Welcome back ${user.firstName}`"
      ></TextComponent>
      <TextComponent
        type="h5"
        text="Please provide you address history for the past 3 years"
      ></TextComponent>
      <FormAddressComponent
        v-for="(address, index) of addresses"
        :key="address.tempId"
        v-model="addresses[index]"
        :index="index"
        @onRemoveAddress="removeAddress($event)"
        @dateMovedIn="storeDateStringHandler($event)"
      ></FormAddressComponent>
      <b-button
        v-if="
          addresses.length === activeDateStrings.length &&
          addresses.length < 3 &&
          !isOverThreeYears
        "
        @click="addAddress()"
        class="mb-2"
        >Add new address</b-button
      >
      <SubmitComponent
        :addresses="addresses"
        :user="user"
        :isOverThreeYears="isOverThreeYears"
        :currentDateStr="currentDateStr"
      ></SubmitComponent>
    </div>
  </div>
  <b-alert v-else class="m-2" show variant="danger"
    >You are not an existing user.</b-alert
  >
</template>
