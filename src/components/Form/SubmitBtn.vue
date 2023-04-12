<template>
    <button class="submit_btn" type="submit">{{ text }}</button> 
</template>



<script setup lang="ts">
const props = defineProps({ text: String })
</script>


<style scoped>
.submit_btn {
  background: #0071fe;
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}
.submit_btn:hover {
    background: #0095f6;
}
</style>
