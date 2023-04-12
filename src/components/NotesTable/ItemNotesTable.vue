<template> 

  <li class="list-group-item list-group-item-success">
    - {{ value }}
  </li>

</template>


<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});
</script>


<style lang="sass">
.list-group-item
  box-sizing: border-box
  display: flex
  align-items: center
  height: auto
  border: 0
  border-radius: 0.375rem !important
  word-break: break-all
@media (max-width: 700px)
  .list-group-item
    font-size: 13px
</style>