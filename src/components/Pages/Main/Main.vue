<template>
    <div class="wrapper__main_page">
        <GMap
            :data="DATA"
            :user-location="userCoords"
        />

        <div
            class="button-group d-flex flex-row align-self-center"
        >
            <custom-button
                class="button-size"
                icon="https://raw.githubusercontent.com/pasha01996/geonotes/fded66a8a0a0ea8eef782db9a674080b5030ad72/src/assets/layers.svg"
            />
            <custom-button
                class="button-size"
                icon="https://raw.githubusercontent.com/pasha01996/geonotes/fded66a8a0a0ea8eef782db9a674080b5030ad72/src/assets/add-square.svg"
            />
            <custom-button
                class="button-size"
                icon="https://raw.githubusercontent.com/pasha01996/geonotes/fded66a8a0a0ea8eef782db9a674080b5030ad72/src/assets/settings.svg"
            />
        </div>


<!--        <NotesTable>-->
<!--            <template #notes-button>-->
<!--                <button -->
<!--                    @click="isActiveModal = true" -->
<!--                    type="button" -->
<!--                    class="btn btn-outline-success btn_add_note"-->
<!--                >-->
<!--                    + Add new note-->
<!--                </button>-->
<!--            </template>-->

<!--            <template #notes-items>-->
<!--                <ItemNotesTable-->
<!--                    v-if="DATA"-->
<!--                    v-for="(text) in DATA.markers"-->
<!--                    :value="text.note"-->
<!--                />-->
<!--            </template>-->

<!--        </NotesTable>-->
        



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
import CustomButton from "@/components/core/button/customButton.vue";

const DATA = ref(null)
const isActiveModal = ref(false);
const endpoints = new Endpoints();
const userId = storageAPI.get(storageNames.userId);
const userCoords = ref(geolocationAPI.userGeolocationCallback())

onBeforeMount(async () => {
    DATA.value = await serverAPI.get(endpoints.userId(userId))
})

const onAddNote = (text) => {
    const marker = {
        cords: userCoords.value,
        note: text
    };

    DATA.value.markers.push(marker)
    serverAPI.put(endpoints.userId(userId), DATA.value)
    isActiveModal.value = false
};
</script>


<style lang="sass">
    body
        width: 100vw
        height: 100vh
    .wrapper__main_page
        position: fixed
        overflow-y: scroll !important
        display: flex
        justify-content: center
        width: 100%
        height: 100%
    .map
        position: relative
        height: 100%
        width: 100%
    .button-group
        column-gap: 20px
        position: absolute
        margin: auto
        bottom: 20px

    .btn_add_note 
        display: flex
        align-items: center
        justify-content: center
        height: 5.5rem
        font-size: 24px
        font-weight: 600
        border-radius: 0
        border: 0

    .notes_list_button
        width: 50px
        height: 50px

    .button-size
        width: 60px
        height: 60px

@media (max-width: 700px)
    .wrapper__main_page
        flex-direction: column-reverse
    
    .btn_add_note
        font-size: 16px
        height: 100%
</style>