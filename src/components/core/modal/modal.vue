<template>
    <div
        v-if="isActive"
        class="dialog"
        @click="toggleModal"
    >
        <div
            class="dialog__content"
            @click.stop
            >
            <slot name="content"></slot>
        </div>
    </div>
</template>


<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  }
})

const emits = defineEmits(['update:isActive'])

const toggleModal = () => {
  emits('update:isActive')
}
</script>


<style>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}
.dialog__content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    row-gap: 20px;
    margin: auto;
    background-color: rgb(244, 247, 249);
    border-radius: 10px;
    padding: 20px;
}
</style>
