<template>
    <GMapMap
      class="map"
      ref="MapRef"
      :center="userLocation"
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
      <GMapMarker
        :icon="{url: 'src/assets/iconMyGeo.png', scaledSize: {width: 40, height: 40}}"
        :position="userLocation"
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
const MapRef = ref();

watch(MapRef, googleMap => {
    if (googleMap) {
        googleMap.$mapPromise.then(map=> {
            addZoomButtons(map)
            addCurrentPositionButton(map)

        })
    }
});

function addZoomButtons(map) {
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

function addCurrentPositionButton(map) {
    const currentPositionButton = document.createElement('button')
    const iconButton = document.createElement('img')

    currentPositionButton.classList.add('m-2')
    currentPositionButton.classList.add('d-flex')
    currentPositionButton.classList.add('justify-content-center')
    currentPositionButton.style.width = '35px';
    currentPositionButton.style.height = '35px';
    iconButton.style.height = '100%';
    currentPositionButton.classList.add('btn')
    currentPositionButton.classList.add('btn-primary')
    iconButton.src = 'src/assets/arrow-geo.png'

    currentPositionButton.appendChild(iconButton)

    currentPositionButton.addEventListener('click', () => {
        map.panTo(props.userLocation);
    })

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(currentPositionButton);
}
</script>