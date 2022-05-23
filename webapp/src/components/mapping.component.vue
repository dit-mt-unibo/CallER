<!-- Visualizza mappa formita da OpenStreetMap, basato sui componenti di vue-leaflet-->

<template>
    <l-map style="height:300px;" 
        :zoom="zoom" 
        :maxZoom="18" 
        @update:zoom="zoomUpdated"
        :center="center">
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
        </l-tile-layer>
        <l-marker :lat-lng="markers"> </l-marker>
    </l-map>
</template>

<script>
import {
    LMap,
    LTileLayer,
    LMarker,
} from "@vue-leaflet/vue-leaflet";

import "leaflet/dist/leaflet.css";

export default {
  
    props: {

        // coordinate per segna posizione
        markers: {
            type: Array,
            default: () => [44.2227, 12.0407]
        },

        // cordinate centro mappa
        center: {
            type: Array,
            default: () => [44.2227, 12.0407]
        }

    },

    data (){

        return{
                        
            zoom: 16,

        }

    },

    methods: {

        /**
         * Listener evento update zoom.
         * Imposta nuovo valore variabile zoom
         * 
         * @param {Number} value: nuovo valore zoom
         */
        zoomUpdated(value) {
            
            this.zoom = value;
            
        },

        /**
         * Reimposta lo zoom al valore iniziale.         
         */
        resetZoom () {
            
            this.zoom = 16;

        },

    },

    components: {
        LMap,
        LTileLayer,
        LMarker,
    },    

};
</script>
