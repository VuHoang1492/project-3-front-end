<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import axios from 'axios'
import { onMounted, computed, ref, watch, reactive } from 'vue';
import { UserPositionSymbol, RestaurantSymbol, SearchSymbol } from './map-icons/MapIcon'
import { getLocationByLatlng } from '@/services/axios/map/MapAxiosApi'
import { useGeolocationStore } from '@/stores/geolocation';


const props = defineProps({
    map_type: {
        type: String,
        default: ""
    },
    geocoder: {
        type: Boolean,
        default: true
    },
    destination: {
        type: Object,
        default: reactive({
            lat: null,
            lng: null
        })
    },
    item_list: {
        type: Array,
        default: []
    },
    init_point: {
        type: Object,
        default: {
            lat: null,
            lng: null
        }
    },
    allow_click_map: {
        type: Boolean,
        default: true
    },
    _click_map: {
        type: Function,
        default: () => { }
    },
    _click_hint: {
        type: Function,
        default: () => { }
    },
    _click_item: {
        type: Function,
        default: () => { }
    },
    _click_geocoder_button: {
        type: Function,
        default: () => { }
    },
    _turn_off_direct: {
        type: Function,
        default: () => { }
    },
    _find_round: {
        type: [Function, Boolean],
        default: () => { }
    }
})


let map = null // map
let marker = null // marker choose position


let searchTimeOut = null // time when search
const dataHint = reactive([]) // Hint when search
const loading = ref(false) // loading hint


let currentLocationUserMarker = null // marker user location
const user_position = useGeolocationStore() // lat,lng hiện tại của user


const itemMaker = reactive([])
let controlDirect = null


watch(user_position, () => {
    getLocationByLatlng(user_position.latitude, user_position.longitude)
        .then(res => {
            if (currentLocationUserMarker) map.removeLayer(currentLocationUserMarker)
            currentLocationUserMarker = new L.marker([user_position.latitude, user_position.longitude], {
                icon: UserPositionSymbol
            })

            map.addLayer(currentLocationUserMarker)
            currentLocationUserMarker.bindTooltip(`<b>Vị trí của bạn</b><br />${res.data.display_name}`)


            if (props.destination.lat != null && props.destination.lng != null) {
                map.removeControl(controlDirect)
                controlDirect = null
                controlDirect = L.Routing.control({
                    waypoints: [
                        L.latLng(user_position.latitude, user_position.longitude),
                        L.latLng(props.destination.lat, props.destination.lng)
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

watch(props.item_list, () => {
    itemMaker.forEach((item) => {
        map.removeLayer(item)
    })
    itemMaker.splice(0, itemMaker.length)

    props.item_list.forEach(item => {
        let m = new L.marker([item.lat, item.lng], {
            icon: RestaurantSymbol
        })
        m.on('click', () => {
            props._click_item(item)
            map.setView([item.lat, item.lng], 16)
        })
        m.id = item._id
        itemMaker.push(m)
        map.addLayer(m);
        m.bindTooltip(`<b>${item.displayName}</b>`);
    })

}, { deep: true })

watch(props.destination, () => {

    if (props.destination.lat != null && props.destination.lng != null) {

        itemMaker.forEach((item) => {
            if (props.destination.id !== item.id) map.removeLayer(item)
        })


        controlDirect = L.Routing.control({
            waypoints: [
                L.latLng(user_position.latitude, user_position.longitude),
                L.latLng(props.destination.lat, props.destination.lng)
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
    return !user_position.accept
})

//get hint
const handleSearch = (e) => {
    loading.value = true
    clearTimeout(searchTimeOut)
    if (e.target.value === "") {
        dataHint.splice(0, dataHint.length)
        loading.value = false
        return
    }
    searchTimeOut = setTimeout(() => {
        axios.get(`https://nominatim.openstreetmap.org/search?q=${e.target.value}&limit=5&format=json&addressdetails=1`)
            .then(res => {
                dataHint.splice(0, dataHint.length)
                dataHint.push(...res.data)
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

    map.on('click', (e) => {
        if (props.allow_click_map) {

            getLocationByLatlng(e.latlng.lat, e.latlng.lng)
                .then(res => {
                    if (marker) map.removeLayer(marker)
                    marker = new L.marker([res.data.lat, res.data.lon], {
                        icon: SearchSymbol
                    })

                    map.addLayer(marker).setView(marker.getLatLng(), 16);
                    marker.bindTooltip(`<b>${res.data.address.country}</b><br />${res.data.display_name}`);


                }).catch(err => {
                    console.log("ERR >>> ", err);
                })
            props._click_map(e)
        }
    })

    //init current user location
    if (user_position.accept) {

        getLocationByLatlng(user_position.latitude, user_position.longitude)
            .then(res => {
                currentLocationUserMarker = new L.marker([user_position.latitude, user_position.longitude], {
                    icon: UserPositionSymbol
                })

                map.addLayer(currentLocationUserMarker).setView(currentLocationUserMarker.getLatLng(), 16);
                currentLocationUserMarker.bindTooltip(`<b>Vị trí của bạn</b><br />${res.data.display_name}`)


            }).catch(err => {
                console.log("ERR >>> ", err);
            })
    }

    if (props.init_point.lat != null && props.init_point.lng != null) {

        getLocationByLatlng(props.init_point.lat, props.init_point.lng)
            .then(res => {
                marker = new L.marker([res.data.lat, res.data.lon], {
                    icon: SearchSymbol
                })

                map.addLayer(marker).setView(marker.getLatLng(), 16);
                marker.bindTooltip(`<b>${res.data.address.country}</b><br />${res.data.display_name}`);


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
        <div class="tools mt-8 pl-4" v-if="geocoder">
            <div class="action-tool d-flex  flex-column align-start  flex-md-row" v-if="props.map_type === 'restaurant'">
                <VBtn class="mr-4 mb-4 action-tool-item" color="orange-lighten-2"
                    :disabled="!user_position.accept || _find_round == false" v-on:click="() => {
                        if (marker) map.removeLayer(marker)
                        marker = null
                        map.setView(currentLocationUserMarker.getLatLng(), 16)
                        props._find_round(user_position.latitude, user_position.longitude)
                    }">Tìm kiếm quanh bạn
                </VBtn>

                <VCard class="d-flex justify-space-between align-center pa-0 mb-4 action-tool-item"
                    v-if="props.destination.name != null">
                    <VCardText>
                        <template v-slot:default>
                            {{ props.destination.name }}
                        </template>
                    </VCardText>

                    <VBtn color="orange-lighten-2" variant="text" icon="mdi-close" v-on:click="() => {
                        map.removeControl(controlDirect)
                        controlDirect = null
                        itemMaker.forEach((item) => {
                            if (props.destination.name !== item.id) {
                                map.addLayer(item)
                            }

                        })
                        props._turn_off_direct()
                    }">
                    </VBtn>
                </VCard>
            </div>
            <div class="geocoder-tool d-flex flex-row ">
                <div class="search ">
                    <VTextField ref="input" placeholder="Tìm kiếm" @keyup="handleSearch" class="input-search"
                        :append-inner-icon='getIcon' :disabled="_find_round == false">
                    </VTextField>
                    <VList class="hint-list" v-if="dataHint.length != 0">
                        <VListItem class="hint-item" v-for="(item, index) in dataHint">


                            <div :key="index" v-on:click="() => {
                                if (marker) map.removeLayer(marker)
                                marker = new L.marker([item.lat, item.lon], {
                                    icon: SearchSymbol
                                })
                                map.addLayer(marker).setView(marker.getLatLng(), 16);
                                marker.bindTooltip(`<b>${item.address.country}</b><br />${item.display_name}`);
                                dataHint.splice(0, dataHint.length)
                                props._click_hint(item)

                            }">{{ item.display_name }}
                            </div>
                        </VListItem>
                    </VList>
                </div>
                <VBtn class="navigate-btn ml-4 mt-1" icon="mdi-crosshairs-gps" :disabled="disableGeoLocationBtn" v-on:click="() => {
                    map.setView(currentLocationUserMarker.getLatLng(), 16)
                    props._click_geocoder_button()
                }"></VBtn>
            </div>
        </div>

        <div id="mapDiv"> </div>

    </div>
</template>

<style lang="scss">
.map-wrap {
    position: relative;
    width: 100%;
    height: 100%;

    .tools {
        z-index: 1000 !important;
        position: absolute;
        width: 100%;
        top: 0;
        display: flex;
        flex-direction: column;

        .action-tool {
            .action-tool-item {
                height: 48px;
                width: 300px;
                background-color: #fff !important;
                color: #000 !important;
                transition: all 1s ease-out;
            }

        }

        .geocoder-tool {


            .navigate-btn {
                height: 48px;
                width: 48px;
                padding: 0;
                background-color: #fff !important;
                color: #000 !important;
            }

            .search {
                transition: all 1s ease-out;
                width: 25%;


                .input-search {
                    background-color: #FFF;
                    border-radius: 8px;

                    input {
                        color: #000 !important;
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


@media only screen and (max-width: 960px) {
    .map-wrap {
        .tools {
            .action-tool {
                .action-tool-item {
                    width: 70%;
                }
            }

            .geocoder-tool {
                .search {
                    width: 70%;
                }
            }
        }
    }
}
</style>