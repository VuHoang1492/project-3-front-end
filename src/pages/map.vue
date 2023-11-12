<script setup>
import MapLeaf from '../components/MapLeaf.vue'
import RestaurantCard from '@/views/restaurant/RestaurantCard.vue'
import { useRoute, useRouter } from 'vue-router'
import { watch, reactive } from 'vue';
import { getRestaurantById, getRestaurantNearby } from '@/services/axios/api/api'
import { useGeolocationStore } from '@/stores/geolocation';

const route = useRoute()
const router = useRouter()

const restaurantData = reactive({ restaurant: null, show: false })
const currentLocationUser = useGeolocationStore() // lat,lng hiện tại của user



const onClickMap = (latlng) => {
  //console.log('click map', latlng);
  router.push({ path: '/home', query: { lat: latlng.latlng.lat, lng: latlng.latlng.lng } })

}

const onClickRestaurant = (item) => {
  router.push({ path: '/home', query: { ...route.query, restaurantId: item.id } })
  _click_map = () => { }
}




const onClickHint = (hint) => {
  console.log(hint);
  router.push({ path: '/home', query: { lat: hint.lat, lng: hint.lon, qs: hint.display_name, } })
}

const closeRestaurantCard = () => {
  restaurantData.show = false;
  router.push({ path: '/home', query: { lat: route.query.lat, lng: route.query.lng } })
  _click_map = onClickMap
}


const closeDirectCard = () => {
  _click_map = onClickMap
  destination_restaurant.name = null
  destination_restaurant.lat = null
  destination_restaurant.lng = null
  router.push({ path: '/home', query: { lat: route.query.lat, lng: route.query.lng, restaurantId: restaurantData.restaurant.id } })
}


const choose_position = reactive({
  lat: route.query.lat ? route.query.lat : null,
  lng: route.query.lng ? route.query.lng : null,
})
let destination_restaurant = reactive({
  name: null,
  lat: null,
  lng: null
})

let restaurant_nearby = reactive([])
let _click_map = onClickMap
let _click_restaurant = onClickRestaurant
let _click_hint = onClickHint
let _turn_off_direct = closeDirectCard



if (choose_position.lat != null && choose_position.lng != null) {
  getRestaurantNearby(choose_position.lat, choose_position.lng).then(res => {
    restaurant_nearby.splice(0, restaurant_nearby.length)
    restaurant_nearby.push(...res)

  })
} else if (currentLocationUser.accept) {
  getRestaurantNearby(currentLocationUser.lat, currentLocationUser.lng).then(res => {
    restaurant_nearby.splice(0, restaurant_nearby.length)
    restaurant_nearby.push(...res)
  })
}

if (route.query.restaurantId) {
  getRestaurantById(route.query.restaurantId).then(res => {
    restaurantData.restaurant = res
    restaurantData.show = true
    if (route.query.direct) {
      restaurantData.show = false
      destination_restaurant.name = restaurantData.restaurant.name
      destination_restaurant.lat = restaurantData.restaurant.lat
      destination_restaurant.lng = restaurantData.restaurant.lon
    }
  }).catch(err => {
    console.log(err);
  })

}







watch(route, () => {
  if (route.query.restaurantId) {
    if (route.query.direct) {
      restaurantData.show = false
      destination_restaurant.name = restaurantData.restaurant.name
      destination_restaurant.lat = restaurantData.restaurant.lat
      destination_restaurant.lng = restaurantData.restaurant.lon
      _click_map = () => { }
    } else
      getRestaurantById(route.query.restaurantId).then(res => {
        restaurantData.restaurant = res
        restaurantData.show = true
        _click_map = () => { }
      }).catch(err => {
        console.log(err);
      })
  }





  if (route.query.lat && route.query.lng) {
    if (route.query.lat !== choose_position.lat) {
      if (route.query.lng !== choose_position.lng) {

        choose_position.lat = route.query.lat
        choose_position.lng = route.query.lng

        getRestaurantNearby(choose_position.lat, choose_position.lng).then(res => {
          restaurant_nearby.splice(0, restaurant_nearby.length)
          restaurant_nearby.push(...res)
        })
      }
    }
  }
})








</script>

<template>
  <VRow class="row">
    <div class="map-view">
      <MapLeaf :_click_map="_click_map" :_click_hint="_click_hint" :_click_restaurant="_click_restaurant"
        :user_position="currentLocationUser" :_turn_off_direct="_turn_off_direct" :choose_position="choose_position"
        :restaurant_nearby="restaurant_nearby" :destination_restaurant="destination_restaurant">
      </MapLeaf>
    </div>
    <div v-if="restaurantData.show" class="restaurant-news">
      <v-card class="restaurant-card">
        <VBtn v-on:click="() => closeRestaurantCard()" variant="text" color="#1f1f1f" icon="mdi-close-thick">
        </VBtn>
        <RestaurantCard :restaurant="restaurantData.restaurant"></RestaurantCard>
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
