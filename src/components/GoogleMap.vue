<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useRoute } from "vue-router";

const props = defineProps({
  center: { type: Object, required: true },
  zoom: { type: Number, required: true },
  locations: { type: Array, default: () => [] },
  arboles: { type: Array, default: () => [] },
  isMainView: { type: Boolean, default: true },
});

const emit = defineEmits(["showAlert"]);

const mapElement = ref(null);
const map = ref(null);
const route = useRoute();
let markerClusterer = null;

const loadGoogleMaps = async () => {
  if (window.google && window.google.maps) {
    initMap();
    return;
  }
  if (document.querySelector("script[src*='maps.googleapis.com']")) return;

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=visualization,places`;
  script.async = true;
  document.head.appendChild(script);
  window.initMap = initMap;
};

// Inicia mapa
const initMap = () => {
  if (!mapElement.value) return;

  map.value = new google.maps.Map(mapElement.value, {
    center: props.center,
    zoom: props.zoom,
    disableDefaultUI: true,
  });

  markerClusterer = new MarkerClusterer({ map: map.value, markers: [] });

  updateMarkers();
};

// Crea los markerClusterer
const updateMarkers = () => {
  if (!map.value) return;

  markerClusterer.clearMarkers();

  if (!props.locations.length) return;

  const markers = props.locations.map((location) => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat / 1000000, lng: location.lng / 1000000 },
      title: location.name,
    });

    marker.addListener("click", () => {
      if (route.name === "home") {
        handleMunicipioClick(location);
      }
    });

    return marker;
  });

  markerClusterer.addMarkers(markers);
};

// Pasa los datos directamente al Alert cuando se hace click en un municipio
const handleMunicipioClick = (location) => {
  if (!props.arboles.length) return;

  const municipioData = props.arboles[0];
  if (!municipioData || !municipioData.totalDatosPorMunicipio) return;

  const municipio = municipioData.totalDatosPorMunicipio.find(
    (m) => m.municipio.trim().toLowerCase() === location.name.trim().toLowerCase()
  );

  emit("showAlert", {
    name: location.name,
    arboles: municipio ? municipio.totalArboles : 0,
    co2: municipio ? municipio.co2 : 0,
    totalEspecies: municipio ? municipio.totalEspecies : 0,
  });
};

watch([() => props.center, () => props.zoom, () => props.locations], () => {
  if (map.value) {
    map.value.setCenter(props.center);
    map.value.setZoom(props.zoom);
    updateMarkers();
  }
});

onMounted(loadGoogleMaps);

onUnmounted(() => {
  if (markerClusterer) {
    markerClusterer.clearMarkers();
    markerClusterer = null;
  }
});
</script>

<template>
  <div ref="mapElement" class="w-full h-full"></div>
</template>
