<template>
    <button
    class="btn btn-primary d-flex align-items-center custom-button"
    :class="extraClass"
    >
        <img
            class="custom-icon"
            :src="icon"
            alt="icon"
        />
    </button>
</template>

<script setup>
const props = defineProps({
    icon: {
        type: String,
        default: '',
    },
    extraClass: {
        type: String,
        default: '',
    }
})
</script>

<style lang="sass">
    .custom-button
        padding: 10px
        width: 45px
        height: 45px
    .custom-icon
        color: #f2f5f7
        width: 100%
        height: 100%
</style>