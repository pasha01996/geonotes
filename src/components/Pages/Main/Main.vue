<template>
    <div class="wrapper__main_page">
        
        <NotesTable>
            <template #notes-button>
                <button 
                    @click="isActiveModal = true" 
                    type="button" 
                    class="btn btn-outline-success btn_add_note"
                >
                    + Add new note
                </button>
            </template>

            <template #notes-items>
                <ItemNotesTable
                    v-if="DATA"
                    v-for="(text) in DATA.markers"
                    :value="text.note"
                />
            </template>

        </NotesTable>
        
        <GMap
            :data="DATA"
            :user-location="userCoords"
        />


        <ModalAddNotes
            v-model:isActive=isActiveModal
            @closeModal="isActiveModal = false"
            @onAddNote="onAddNote($event)"
        />
    </div>
</template>


<script setup>
import {onBeforeMount, ref} from 'vue';
import GMap from "@/components/Pages/Main/map/GMap.vue";
import NotesTable from '../../NotesTable/NotesTable.vue';
import ItemNotesTable from '../../NotesTable/ItemNotesTable.vue';
import ModalAddNotes from './modal/ModalAddNotes.vue';
import {serverAPI} from '@/serverAPI/serverAPI';
import {storageAPI} from '@/storageAPI/storageAPI';
import {Endpoints} from '@/serverAPI/endpoints';
import {storageNames} from '@/storageAPI/storageNames';
import {geolocationAPI} from "@/geolocationAPI/geolocationAPI";

const DATA = ref(null)
const isActiveModal = ref(false);
const endpoints = new Endpoints();
const userCoords = ref(geolocationAPI.userGeolocationCallback())
const userId = storageAPI.get(storageNames.userId);


onBeforeMount(async () => {
    DATA.value = await serverAPI.get(endpoints.userId(userId))
})

const onAddNote = (text) => {
    const marker = {
        cords: userCoords,
        note: text
    };
    DATA.value.markers.push(marker)
    serverAPI.put(endpoints.userId(userId), DATA.value)
    console.log(DATA.value.markers)
    isActiveModal.value = false
};
</script>


<style lang="sass">
    .wrapper__main_page
        display: flex
        justify-content: center
        width: 100vw
        height: 100vh

    .map 
        height: 100%
        width: 100%

    .btn_add_note 
        display: flex
        align-items: center
        justify-content: center
        height: 5.5rem
        font-size: 24px
        font-weight: 600
        border-radius: 0
        border: 0

@media (max-width: 700px)
    .wrapper__main_page
        flex-direction: column-reverse
    
    .btn_add_note
        font-size: 16px
        height: 100%
</style>