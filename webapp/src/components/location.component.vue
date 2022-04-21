<template>
  <l-map
    @ready="onReady"
    @locationfound="onLocationFound"
    :zoom="zoom"
    :center="center"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <!-- <l-control-layers /> -->
    <l-marker
      v-if="loc"
      :lat-lng="latLng"
    >
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

import "leaflet/dist/leaflet.css";


export default {
  inject: ["apiUrl"],

  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  methods: {
    onReady(mapObject) {
      mapObject.locate();
    },
    onLocationFound(location) {
      console.log(location);
      this.latLng=[location.latitude, location.longitude]
      this.loc = true;
    },
  },

  data() {
    return {
      loc: false,
      latLng:[],
      zoom: 12,
      center: [44.2227, 12.0407],
      iconWidth: 25,
      iconHeight: 40,
    };
  },
};
</script>
