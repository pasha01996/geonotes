<template>
    <Modal
    >
        <template #content>
            <h5>Your note</h5>
            <textarea v-model="modalNoteText" type="text" class="form-control textarea"/>
            <div class="dialog__footer">
                <button type="button" class="btn btn-secondary" @click="$emit('closeModal')" >Close</button>
                <button type="button" class="btn btn-success" @click="onAddNote">Add note</button>
            </div>
        </template>
    </Modal>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../../../core/modal/modal.vue'

const modalNoteText = ref('')
const emits = defineEmits(['onAddNote', 'closeModal', 'clearTextModal'])

const onAddNote = () => {
    emits('onAddNote', modalNoteText.value)
    modalNoteText.value = ''
}
</script>


<style lang="sass">
.textarea 
    height: 200px
    width: 300px

.dialog__footer 
    display: flex
    justify-content: space-between

@media (max-width: 700px)
    .textarea
        height: 180px
        width: 250px
</style>