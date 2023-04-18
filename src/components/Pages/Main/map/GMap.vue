<template>
    <GMapMap
      class="map"
      ref="myMapRef"
      :center=userLocation
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
        v-if="data"
        :key="index"
        v-for="(pos, index) in data.markers"
        :position="pos.cords"
        :clickable="true"
      />
    </GMapMap>
</template>


<script setup>
import {ref, watch} from "vue";

const props = defineProps({
    data: {
        type: Object,
        default: {},
    },
    userLocation: {
        type: Object,
        default: {}
    }
})
const myMapRef = ref();

watch(myMapRef, googleMap => {
    if (googleMap) {
        googleMap.$mapPromise.then(map=> {
            addMyButton(map)
        })
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
</script>