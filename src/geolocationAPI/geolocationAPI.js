import { ref, computed } from 'vue'

export const geolocationAPI = {
    userGeolocationCallback: () => {
        const coords = ref({ latitude: 0, longitude: 0 })

        navigator.geolocation.getCurrentPosition(position => (coords.value = position.coords))
        const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude
        }))
        return currPos
    },
}

