<template>
  <div style="height: 75vh; width: 50vw">
    <l-map :zoom = "zoom" :center = "center">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <!-- <l-control-layers /> -->
      <l-marker :lat-lng="latLng"> </l-marker>
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
} from "@vue-leaflet/vue-leaflet";

import "leaflet/dist/leaflet.css";

export default {
  props: ["latLng"],
  inject: ["apiUrl"],

  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  data() {
    return {
      zoom: 12,
      center: [44.2227, 12.0407],
      iconWidth: 25,
      iconHeight: 40,
    };
  },

};
</script>
