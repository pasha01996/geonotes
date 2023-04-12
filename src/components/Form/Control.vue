<template>
  <input
    class="control"
    :class="{
    'has-error': errorMessage,
    'success': meta.validated && !errorMessage,
    }"
    :name="name"
    :id="name"
    :type="type"
    :placeholder="placeholder"
    v-model="inputValue"
  />
</template>


<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const name = toRef(props, "name");
const { value: inputValue, errorMessage, meta } = useField( name, undefined);

</script>



<style scoped>
.control {
  margin-bottom: 20px;
  border-radius: 5px;
  border: 2px solid transparent;
  box-sizing: border-box;
  padding: 15px 10px;
  outline: none;
  background-color: #f2f5f7;
  width: 100%;
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
  background-color 0.3s ease-in-out;
}
.has-error {
  background-color: #fddfe2;
  color: #f23648;
}
.success {
  background-color: #e0eee4;
  color: #21a67a;
}
</style>