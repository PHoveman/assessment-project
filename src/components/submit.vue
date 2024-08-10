<script lang="ts">
import { createClaim } from "@/core/createClaim";
import { FormAddress, User } from "@/types";
import dayjs from "dayjs";
import store from "@/store";
import Vue from "vue";

interface SubmitNotification {
  type: "success" | "danger";
  message: string;
}

export default Vue.extend({
  name: "SubmitComponent",
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
    addresses: {
      type: Array as () => FormAddress[],
      required: true,
    },
    isOverThreeYears: {
      type: Boolean,
      required: true,
    },
    currentDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      notification: null as SubmitNotification | null,
    };
  },
  methods: {
    async submit() {
      this.notification = null;

      if (this.isOverThreeYears)
        return (this.notification = {
          type: "danger",
          message:
            "Entered addresses have exceeded 3 years. Please update your information.",
        });
      if (this.dateIsInFuture())
        return (this.notification = {
          type: "danger",
          message:
            "One of the entered dates is in the future. Please update your information.",
        });
      if (this.hasEmptyInputs())
        return (this.notification = {
          type: "danger",
          message:
            "At least one of the fields is empty. Please update your information.",
        });

      store.dispatch("createClaim", {
        userId: this.user.id,
        ipAddress: "123.123.123.123",
        addresses: this.addresses,
      });

      this.notification = {
        type: "success",
        message: "Claim successfully added.",
      };
    },
    dateIsInFuture(): boolean {
      return this.addresses.some(
        (address) =>
          dayjs(this.currentDate).diff(dayjs(address.dateMovedIn)) < 0
      );
    },
    hasEmptyInputs(): boolean {
      return this.addresses.some(
        (address) =>
          !address.postcode.trim() ||
          !address.addressLineOne.trim() ||
          !address.dateMovedIn.trim()
      );
    },
  },
});
</script>
<template>
  <div>
    <b-alert
      v-if="notification"
      class="mb-2"
      show
      :variant="notification.type"
      >{{ notification.message }}</b-alert
    >
    <b-button :disabled="isOverThreeYears" @click="submit">Submit</b-button>
  </div>
</template>
