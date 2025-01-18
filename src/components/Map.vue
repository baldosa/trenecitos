<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue'
const props = defineProps({ location: Object })

const zoom = ref(12)
</script>
<template>
    <!-- {{ location }} -->
    <div style="height:600px; width:800px">
        <l-map ref="map" zoom="12" :center="[location['lat'], location['long']]" :use-global-leaflet="false">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>
            <l-marker :latlng="[location['lat'], location['long']]" />
        </l-map>
    </div>
</template>
