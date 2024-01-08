<script setup >
import MapLeaf from '../components/MapLeaf.vue'
import RestaurantCardMap from '@/views/card/RestaurantCardMap.vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue';
import { getRestaurantById, getRestaurantNearby } from '@/services/axios/api/api'


const route = useRoute()
const router = useRouter()

const restaurantData = reactive({ restaurant: null, show: false })


const onClickMap = (e) => {
  getRestaurantNearby(e.latlng.lat, e.latlng.lng).then(res => {
    restaurant_nearby.splice(0, restaurant_nearby.length)
    restaurant_nearby.push(...res.data.data)
  })
  router.push({ path: route.path, query: { lat: e.latlng.lat, lng: e.latlng.lng } })
}


const onClickRestaurant = (item) => {
  restaurantData.restaurant = item
  restaurantData.show = true
  allow_click_map = false
  _find_round = false
  router.push({ path: route.path, query: { ...route.query, restaurantId: item._id } })
}

const onClickHint = (hint) => {
  getRestaurantNearby(hint.lat, hint.lon).then(res => {
    restaurant_nearby.splice(0, restaurant_nearby.length)
    restaurant_nearby.push(...res.data.data)
  })
  router.push({ path: route.path, query: { lat: hint.lat, lng: hint.lon, qs: hint.display_name, } })
}


const closeRestaurantCard = () => {
  restaurantData.show = false;

  router.push({ path: route.path, query: { ...route.query, restaurantId: undefined } })
  allow_click_map = true
  _find_round = findAround
}

const findAround = (user_lat, user_lng) => {
  getRestaurantNearby(user_lat, user_lng).then(res => {
    restaurant_nearby.splice(0, restaurant_nearby.length)
    restaurant_nearby.push(...res.data.data)
  })
  router.push({ path: route.path, query: null })
}

const onDirect = () => {
  destination.id = restaurantData.restaurant._id
  destination.name = restaurantData.restaurant.restaurantName
  destination.lat = restaurantData.restaurant.lat
  destination.lng = restaurantData.restaurant.lng
  restaurantData.show = false
  router.push({ path: route.path, query: { ...route.query, direct: true } })
}

const offDirect = () => {
  destination.name = null
  destination.lat = null
  destination.lng = null
  restaurantData.show = true
  router.push({ path: route.path, query: { ...route.query, direct: undefined } })
}


let allow_click_map = true
let restaurant_nearby = reactive([])
let init_point = reactive({ lat: null, lng: null })
let _find_round = findAround

let destination = reactive({
  name: null,
  lat: null,
  lng: null
})


if (route.query.lat && route.query.lng) {
  init_point.lat = route.query.lat
  init_point.lng = route.query.lng
  onClickMap({ latlng: { lat: route.query.lat, lng: route.query.lng } })
}


if (route.query.restaurantId) {
  getRestaurantById(route.query.restaurantId).then(res => {
    console.log(res);
    onClickRestaurant(res.data.data)
    restaurant_nearby.push(res.data.data)
    if (route.query.direct) {
      console.log(restaurantData);
      destination.id = restaurantData.restaurant._id
      destination.name = restaurantData.restaurant.restaurantName
      destination.lat = restaurantData.restaurant.lat
      destination.lng = restaurantData.restaurant.lng
      restaurantData.show = false
    }

  }).catch(err => {
    console.log(err);
  })
}




</script>

<template>
  <VRow class="row">
    <div class="map-view">
      <MapLeaf map_type="restaurant" :item_list="restaurant_nearby" :allow_click_map="allow_click_map"
        :init_point="init_point" :destination="destination" :_click_map="onClickMap" :_click_hint="onClickHint"
        :_click_item="onClickRestaurant" :_turn_off_direct="offDirect" :_find_round="_find_round">
      </MapLeaf>
    </div>
    <div v-if="restaurantData.show" class="restaurant-news">
      <v-card class="restaurant-card">
        <VBtn v-on:click="() => closeRestaurantCard()" variant="text" color="#1f1f1f" icon="mdi-close-thick">
        </VBtn>
        <RestaurantCardMap :restaurant="restaurantData.restaurant" @onDirect="onDirect"></RestaurantCardMap>
      </v-card>
    </div>
  </VRow>
</template>

<style lang="scss" scoped>
.row {
  height: 100%;
  position: relative;

  .map-view {
    width: 100%;
  }

  .restaurant-news {
    position: absolute;
    top: 0;
    right: 0;
    height: 95%;
    width: 40%;
    background-color: #fff;
    z-index: 1000;
    margin: 32px 80px;
    border-radius: 5px;
    box-shadow: 0 0 10px #9f9f9f;
    transition: width .5s ease-out;
    animation: fadeIn .5s ease-out;

    .restaurant-card {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      overflow-y: unset;

      button {
        margin: 8px;
        align-self: end;

      }
    }


  }


  @media only screen and (max-width: 1100px) {
    .restaurant-news {
      width: 60%;
    }
  }

  @media only screen and (max-width: 750px) {
    .restaurant-news {
      width: 80%;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

}
</style>
