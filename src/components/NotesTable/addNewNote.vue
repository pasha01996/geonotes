<template>
    <h5 class="title_add_note">Write your note:</h5>
    <textarea v-model="modalNoteText" type="text" class="form-control textarea"/>
    <div class="dialog__footer">
        <button type="button" class="btn btn-success" @click="onClickButton">Add note</button>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../core/modal/modal.vue'

const modalNoteText = ref('')
const emits = defineEmits(['onClickAddNote'])

const onClickButton = () => {
    emits('onClickAddNote', modalNoteText.value)
    modalNoteText.value = ''
}
</script>


<style lang="sass">
.title_add_note
    text-align: center
    margin-bottom: 0
    line-height: 1
.textarea 
    height: 200px
    width: 300px

.dialog__footer 
    display: flex
    justify-content: center

@media (max-width: 700px)
    .textarea
        height: 180px
        width: 250px
</style>