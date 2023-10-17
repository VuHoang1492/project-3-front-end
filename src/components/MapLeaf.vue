<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import 'leaflet-control-geocoder'
import { onMounted } from 'vue';
import { ref } from 'vue';

let map = null
let pos = ref(null)

onMounted(() => {
    navigator.geolocation.getCurrentPosition((res) => {
        console.log(res);
        map = L.map('mapDiv').setView([40.71455, -74.00712], 10);
        var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        });
        CartoDB_Voyager.addTo(map);
        map.zoomControl.setPosition('bottomright');

        L.Control.geocoder({
            collapsed: false,
            position: "topleft",
            placeholder: 'Rechercher...',
        }).addTo(map);
    })


})
</script>

<template>
    <div class="map-wrap">
        <div id="mapDiv"></div>
    </div>
</template>

<style lang="scss">
.map-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

#mapDiv {
    position: absolute;
    width: 100%;
    height: 100%;
}

.leaflet-control-zoom {
    margin: 16px !important;
    border: none !important;
}

.leaflet-control-geocoder {
    margin: 32px !important;
    height: 48px;
    border-radius: 5px;
    padding-left: 16px;
    border: none !important;
    display: flex;
    flex-direction: row;
    align-items: center;

    input {
        margin-left: 8px;
        height: 32px;
        font-size: 16px;
    }
}
</style>