<script setup>
import { ref, onMounted, watch, createVNode, render } from "vue";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useRoute } from "vue-router";
import Alert from "./Alert.vue";

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
  zoom: {
    type: Number,
    required: true,
  },
  locations: {
    type: Array,
    required: true,
  }
});

const mapElement = ref(null);
const map = ref(null);
const route = useRoute();
let currentAlertContainer = null; 

onMounted(() => {
  loadGoogleMaps();
});

function loadGoogleMaps() {
  if (window.google) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAwWgC0Dp1_RRFobXOf1syZ-dOAypz4tks&callback=initMap&libraries=visualization,places`;
    script.async = true;
    document.head.appendChild(script);
    window.initMap = initMap;
  }
}

function initMap() {
  if (!mapElement.value) {
    return;
  }

  map.value = new google.maps.Map(mapElement.value, {
    center: props.center, 
    zoom: props.zoom,
    disableDefaultUI: true,
  });

  console.log("Mapa inicializado:", map.value);
  
  setTimeout(updateMarkers, 1000);
  setTimeout(updateMunicipios, 1000); 
}

function updateMarkers() {
  if (map.value) {
    const markers = props.locations.map((location) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat / 1000000, lng: location.lng / 1000000 },
        title: location.name,
        map: map.value,
      });


      marker.addListener("click", () => {
        if (route.name === "home") {
          showAlert(location);
        }
      });

      return marker;
    });


    new MarkerClusterer({ map: map.value, markers: markers });
  }
}

// Función para agregar los municipios al mapa
function updateMunicipios() {
  if (map.value) {
    const municipioMarkers = props.municipios.map((municipio) => {
      const marker = new google.maps.Marker({
        position: { lat: municipio.latitud / 1000000, lng: municipio.longitud / 1000000 }, // Ajustar las coordenadas
        title: municipio.nombre,
        map: map.value,
      });

      // Evento click para mostrar el alert del municipio
      marker.addListener("click", () => {
        showMunicipioAlert(municipio);
      });

      return marker;
    });

    // Agrupación de marcadores de municipios
    new MarkerClusterer({ map: map.value, markers: municipioMarkers });
  }
}

// Mostrar el alert
function showAlert(location) {
  if (currentAlertContainer) {
    render(null, currentAlertContainer);
    currentAlertContainer.remove();
    currentAlertContainer = null;
  }

  const container = document.createElement("div");
  document.body.appendChild(container);

  const vnode = createVNode(Alert, {
    name: location.name,
    arboles: location.arboles,
    co2: location.co2,
    especies: location.especies,
  });

  render(vnode, container);

  currentAlertContainer = container;

  setTimeout(() => {
    if (currentAlertContainer === container) {
      render(null, container);
      container.remove();
      currentAlertContainer = null;
    }
  }, 5000);
}

// Mostrar el alert del municipio
function showMunicipioAlert(municipio) {
  alert(`Municipio: ${municipio.nombre}\nProvincia: ${municipio.provincia.nombre}`);
}

watch(
  () => [props.center, props.zoom, props.locations, props.municipios],
  () => {
    if (map.value) {
      map.value.setCenter(props.center);
      map.value.setZoom(props.zoom);
      updateMarkers();
      updateMunicipios();
    }
  }
);
</script>

<template>
  <div ref="mapElement" class="w-full h-full"></div>
</template>
