<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import axios from 'axios'
import { onMounted, computed, ref, watch, reactive } from 'vue';
import { UserPositionSymbol, RestaurantSymbol, SearchSymbol } from './map-icons/MapIcon'
import { getLocationByLatlng } from '@/services/axios/map/MapAxiosApi'


const props = defineProps({
    user_position: Object,
    choose_position: Object,
    destination_restaurant: Object,
    restaurant_nearby: Array,
    _click_map: Function,
    _click_hint: Function,
    _click_restaurant: Function,
    _click_geocoder_button: Function,
    _turn_off_direct: Function
})


let map = null // map
let marker = null // marker choose position
let searchTimeOut = null // time when search
const dataHint = ref(null) // Hint when search
const loading = ref(false) // loading hint
let currentLocationUserMarker = null // marker user location
const restaurantMarker = reactive([])
let controlDirect = null




watch(props.choose_position, () => {
    console.log(props.choose_position);
    getLocationByLatlng(props.choose_position.lat, props.choose_position.lng)
        .then(res => {
            if (marker) map.removeLayer(marker)
            marker = new L.marker([res.data.lat, res.data.lon], {
                icon: SearchSymbol
            })

            map.addLayer(marker).setView(marker.getLatLng(), 16);
            marker.bindTooltip(`<b>${res.data.address.country}</b><br />${res.data.display_name}`);
            dataHint.value = null


        }).catch(err => {
            console.log("ERR >>> ", err);
        })

})

watch(props.user_position, () => {
    getLocationByLatlng(props.user_position.latitude, props.user_position.longitude)
        .then(res => {
            if (currentLocationUserMarker) map.removeLayer(currentLocationUserMarker)
            currentLocationUserMarker = new L.marker([res.data.lat, res.data.lon], {
                icon: UserPositionSymbol
            })

            map.addLayer(currentLocationUserMarker)
            currentLocationUserMarker.bindTooltip(`<b>Vị trí của bạn</b><br />${res.data.display_name}`)


            if (props.destination_restaurant.lat != null && props.destination_restaurant.lng != null) {
                map.removeControl(controlDirect)
                controlDirect = null
                controlDirect = L.Routing.control({
                    waypoints: [
                        L.latLng(props.user_position.latitude, props.user_position.longitude),
                        L.latLng(props.destination_restaurant.lat, props.destination_restaurant.lng)
                    ],
                    draggableWaypoints: false,
                    addWaypoints: false,
                    showAlternatives: true,
                    createMarker: () => { return null; },
                    lineOptions: {
                        styles: [
                            { color: 'black', opacity: 0.2, weight: 9 },
                            { color: 'white', opacity: 0.8, weight: 7 },
                            { color: '#00b0ff', opacity: 1, weight: 5 }
                        ]
                    },
                    altLineOptions: {
                        styles: [
                            { color: 'black', opacity: 0.2, weight: 9 },
                            { color: 'white', opacity: 0.8, weight: 7 },
                            { color: '#9f9f9f', opacity: 1, weight: 5 }

                        ]
                    }
                }).addTo(map);
                controlDirect.hide()
            }

        }).catch(err => {
            console.log("ERR >>> ", err);
        })
})


watch(props.restaurant_nearby, () => {
    //  console.log(props.restaurant_nearby);
    restaurantMarker.forEach((item) => {
        map.removeLayer(item)
    })
    restaurantMarker.splice(0, restaurantMarker.length)

    props.restaurant_nearby.forEach(item => {
        let m = new L.marker([item.lat, item.lon], {
            icon: RestaurantSymbol
        })
        m.on('click', () => props._click_restaurant(item))
        restaurantMarker.push(m)
        map.addLayer(m);
        m.bindTooltip(`<b>${item.name}</b>`);
    })

}, { deep: true })



watch(props.destination_restaurant, () => {
    if (props.destination_restaurant.lat != null && props.destination_restaurant.lng != null) {
        controlDirect = L.Routing.control({
            waypoints: [
                L.latLng(props.user_position.latitude, props.user_position.longitude),
                L.latLng(props.destination_restaurant.lat, props.destination_restaurant.lng)
            ],
            draggableWaypoints: false,
            addWaypoints: false,
            showAlternatives: true,
            createMarker: () => { return null; },
            lineOptions: {
                styles: [
                    { color: 'black', opacity: 0.2, weight: 9 },
                    { color: 'white', opacity: 0.8, weight: 7 },
                    { color: '#00b0ff', opacity: 1, weight: 5 }
                ]
            },
            altLineOptions: {
                styles: [
                    { color: 'black', opacity: 0.2, weight: 9 },
                    { color: 'white', opacity: 0.8, weight: 7 },
                    { color: '#9f9f9f', opacity: 1, weight: 5 }

                ]
            }
        }).addTo(map);
        controlDirect.hide()
    }

}, { deep: true })


//Change icon in input
const getIcon = computed(() => {
    return loading.value ? " mdi-access-point" : "mdi-magnify"
})


const disableGeoLocationBtn = computed(() => {
    return !props.user_position.accept
})

//get hint
const handleSearch = (e) => {
    loading.value = true
    clearTimeout(searchTimeOut)
    if (e.target.value === "") {
        dataHint.value = null
        loading.value = false
        return
    }
    searchTimeOut = setTimeout(() => {
        axios.get(`https://nominatim.openstreetmap.org/search?q=${e.target.value}&limit=5&format=json&addressdetails=1`)
            .then(res => {
                dataHint.value = res.data
                loading.value = false

            }).catch(err => {
                console.log("ERR >>> ", err);
                loading.value = false

            })
    }, 1000)
}




const initMap = () => {
    map = L.map('mapDiv', { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true }).setView([21.028511, 105.804817], 10);
    var layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });
    layer.addTo(map);
    map.zoomControl.setPosition('bottomright');

    map.on('click', (latlng) => props._click_map(latlng))

    //init current user location
    if (props.user_position.accept) {
        getLocationByLatlng(props.user_position.latitude, props.user_position.longitude)
            .then(res => {
                currentLocationUserMarker = new L.marker([res.data.lat, res.data.lon], {
                    icon: UserPositionSymbol
                })

                map.addLayer(currentLocationUserMarker).setView(currentLocationUserMarker.getLatLng(), 16);
                currentLocationUserMarker.bindTooltip(`<b>Vị trí của bạn</b><br />${res.data.display_name}`)


            }).catch(err => {
                console.log("ERR >>> ", err);
            })
    }

    if (props.choose_position.lat != null && props.choose_position.lng != null) {
        getLocationByLatlng(props.choose_position.lat, props.choose_position.lng)
            .then(res => {
                if (marker) map.removeLayer(marker)
                marker = new L.marker([res.data.lat, res.data.lon], {
                    icon: SearchSymbol
                })

                map.addLayer(marker).setView(marker.getLatLng(), 16);
                marker.bindTooltip(`<b>${res.data.address.country}</b><br />${res.data.display_name}`);
                dataHint.value = null

            }).catch(err => {
                console.log("ERR >>> ", err);
            })
    }
}


onMounted(() => {
    initMap()
})




</script>

<template>
    <div class="map-wrap">
        <div class="map-geocoder">
            <VBtn class="navigate-btn" icon="mdi-crosshairs-gps" :disabled="disableGeoLocationBtn" v-on:click="() => {
                map.setView(currentLocationUserMarker.getLatLng(), 16)
            }"></VBtn>
            <VTextField ref="input" placeholder="Tìm kiếm" @keyup="handleSearch" class="input-search"
                :append-inner-icon='getIcon' color="#1f1f1f">
            </VTextField>
            <VList class="hint-list" v-if="dataHint">
                <VListItem class="hint-item" v-for="(item, index) in dataHint">
                    <div :key="index" v-on:click="() => {
                        props._click_hint(item)
                        dataHint.value = null
                    }">{{ item.display_name }}
                    </div>
                </VListItem>
            </VList>
            <VCard class="d-flex justify-space-between align-center name-card"
                v-if="props.destination_restaurant.name != null">
                <VCardText>
                    <template v-slot:default>
                        {{ props.destination_restaurant.name }}
                    </template>
                </VCardText>

                <VBtn color="orange-lighten-2" variant="text" icon="mdi-close" v-on:click="() => {
                    map.removeControl(controlDirect)
                    controlDirect = null
                    props._turn_off_direct()
                }">
                </VBtn>
            </VCard>

        </div>

        <div id="mapDiv"> </div>

    </div>
</template>

<style lang="scss">
.map-wrap {
    position: relative;
    width: 100%;
    height: 100%;

    .map-geocoder {
        z-index: 1000 !important;
        position: absolute;
        width: 30%;
        top: 5%;
        left: 16px;

        transition: all 1s ease-out;

        .navigate-btn {
            position: absolute;
            height: 48px;
            width: 48px;
            padding: 0;
            left: 105%;
            top: 4px;
            background-color: #fff !important;
            color: #000 !important;
        }

        .name-card {
            position: absolute;
            height: 48px;
            width: 300px;
            padding: 0;
            left: 125%;
            top: 4px;
            background-color: #fff !important;
            color: #000 !important;
        }

        .input-search {
            background-color: #FFF;
            border-radius: 8px;

            input {
                color: #000;
            }
        }

        .hint-list {
            border: #9f9f9f solid 1px;
            border-top: none;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;

            .hint-item {
                height: 100%;
                width: 100%;

                div {
                    height: 100%;
                    width: 100%;

                    :hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
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


@media screen and (max-width: 912px) {
    .map-geocoder {
        width: 60% !important;

        .name-card {
            width: 100% !important;
            left: 0 !important;
            top: 110% !important;
        }
    }
}
</style>