<script lang="ts">
import fetchAutocompletePostcodes from "@/core/fetchAutocompletePostcodes";
import { FormAddress } from "@/types/FormAddress";
import Vue, { PropType } from "vue";
import TextComponent from "./text.vue";

export default Vue.extend({
  name: "FormAddressComponent",
  components: {
    TextComponent,
  },
  props: {
    value: {
      type: Object as PropType<FormAddress>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      postcode: this.value.postcode,
      addressLineOne: this.value.addressLineOne,
      dateMovedIn: this.value.dateMovedIn,
      postcodeResults: [] as string[],
      isEnteringPostcode: false,
    };
  },
  methods: {
    handleSelectedPostcode(result: string) {
      this.postcode = result;
      this.postcodeResults = [];
      this.isEnteringPostcode = false;
    },
    removeAddress(index: number) {
      this.$emit("onRemoveAddress", index);
    },
  },
  watch: {
    async postcode(newPostcode, previousPostcode) {
      this.$emit("input", { ...this.value, postcode: newPostcode });
      this.postcodeResults = await fetchAutocompletePostcodes(
        newPostcode,
        previousPostcode
      );
    },
    addressLineOne(newAddressLineOne) {
      this.$emit("input", { ...this.value, addressLineOne: newAddressLineOne });
    },
    dateMovedIn(newDateMovedIn) {
      this.$emit("input", { ...this.value, dateMovedIn: newDateMovedIn });
      this.$emit("dateMovedIn", { index: this.index, date: newDateMovedIn });
    },
  },
});
</script>
<template>
  <section class="w-100">
    <div class="d-flex py-2 justify-content-between">
      <TextComponent type="h6" :text="`Address ${index + 1}`"></TextComponent>
      <b-icon
        v-if="index !== 0"
        role="button"
        icon="x-square"
        @click="removeAddress(index)"
      ></b-icon>
    </div>
    <b-form-input
      type="date"
      class="mb-2"
      id="dateMovedIn"
      placeholder="Date moved in"
      v-model="dateMovedIn"
    ></b-form-input>
    <b-form-input
      type="text"
      class="mb-2"
      id="addressLineOne"
      placeholder="Address line one"
      v-model="addressLineOne"
    ></b-form-input>
    <div class="position-relative">
      <b-form-input
        type="text"
        id="postcode"
        class="mb-2"
        placeholder="Postcode"
        v-model="postcode"
        @focus="isEnteringPostcode = true"
      ></b-form-input>
      <b-list-group
        v-if="postcodeResults.length > 0 && isEnteringPostcode"
        class="position-absolute w-100 z-1"
        role="button"
      >
        <b-list-group-item
          v-for="(result, index) in postcodeResults"
          :key="index"
          @click="handleSelectedPostcode(result)"
          >{{ result }}</b-list-group-item
        >
      </b-list-group>
    </div>
  </section>
</template>
