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
        
        <GMapMap
            class="map"
            ref="myMapRef"
            :center=userGeolocation
            :zoom="10"
            :disableDefaultUI="true"
            :options="{
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            }"
        >
            <GMapMarker
                v-if="DATA"
                :key="index"
                v-for="(pos, index) in DATA.markers"
                :position="pos.cords"
                :clickable="true"
            />
        </GMapMap>

        <ModalAddNotes
            v-model:isActive=isActiveModal
            @closeModal="isActiveModal = false"
            @onAddNote="onAddNote($event)"
        />
    </div>
</template>


<script setup>
import NotesTable from '../../NotesTable/NotesTable.vue';
import ItemNotesTable from '../../NotesTable/ItemNotesTable.vue';
import ModalAddNotes from './modal/ModalAddNotes.vue';
import { User } from '../../core/user/user.js';
import { geolocationAPI } from '../../../geolocationAPI/geolocationAPI.js';
import { serverAPI } from '../../../serverAPI/serverAPI.js';
import { storageAPI } from '../../../storageAPI/storageAPI.js';
import { Endpoints } from '../../../serverAPI/endpoints.js';
import { storageNames } from '../../../storageAPI/storageNames.js';
import { ref, watchEffect, watch, onBeforeMount } from 'vue';


let userCoords;
const myMapRef = ref();
const DATA = ref(null)
const isActiveModal = ref(false);
const endpoints = new Endpoints();
const userId = storageAPI.get(storageNames.userId);
const userGeolocation = geolocationAPI.userGeolocationCallback();

onBeforeMount(async () => {
    const response = await serverAPI.get(endpoints.userId(userId))
    DATA.value = response
})

watchEffect(() => {
    if (userGeolocation.value.lat !== 0) {
        userCoords = userGeolocation.value;
    }

    
});

function addMyButton(map) {
  const controlZoomUI = document.createElement('div');
  const buttonMinus = document.createElement('button')
  const buttonPlus = document.createElement('button')

  buttonMinus.innerText = `-`
  buttonPlus.innerText = `+`
  controlZoomUI.classList.add('btn-group-vertical')
  controlZoomUI.classList.add('flex-column')
  controlZoomUI.classList.add('m-2')
  buttonMinus.classList.add('btn')
  buttonMinus.classList.add('btn-primary')
  buttonPlus.classList.add('btn')
  buttonPlus.classList.add('btn-primary')
  
  controlZoomUI.appendChild(buttonPlus);
  controlZoomUI.appendChild(buttonMinus);
  
  buttonPlus.addEventListener('click', () => {
    map.setZoom(map.getZoom() + 1);
  });

  buttonMinus.addEventListener('click', () => {
    map.setZoom(map.getZoom() - 1);
  });

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlZoomUI); 
}

watch(myMapRef, googleMap => {
      if (googleMap) {
        googleMap.$mapPromise.then(map=> {
          addMyButton(map)
        })
      }
});

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