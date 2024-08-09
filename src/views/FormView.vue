<script lang="ts">
import FormComponent from "@/components/form.vue";
import Vue from "vue";

export default Vue.extend({
  name: "FormView",
  components: {
    FormComponent,
  },
});
</script>
<template>
  <div>
    <FormComponent>
      <!-- TODO add relevant components to render form here -->
    </FormComponent>
  </div>
</template>
