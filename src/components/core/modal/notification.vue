<template>
    <div v-if="show" class="notification">{{ message }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    message: {
        type: String,
        default: "You note added!"
    },
});

const show = ref(true)

const hideNotification = () => {
    show.value = false
}

onMounted(() => {
    show.value = true
    setTimeout(() => {
        hideNotification()
    }, 1000)
})
</script>

<style scoped>
.notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    animation: fade-in 0.5s ease-in-out;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
