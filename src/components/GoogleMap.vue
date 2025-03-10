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
  },
  arboles: {
    type: Array,
    required: true,
  }
});

const mapElement = ref(null);
const map = ref(null);
const route = useRoute();
let currentAlertContainer = null; 

// Cargar la API de Google Maps de manera eficiente
const loadGoogleMaps = async () => {
  if (window.google) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=visualization,places`;
    script.async = true;
    document.head.appendChild(script);
    window.initMap = initMap;
  }
};

// Iniciar el mapa
const initMap = () => {
  if (!mapElement.value) return;

  map.value = new google.maps.Map(mapElement.value, {
    center: props.center,
    zoom: props.zoom,
    disableDefaultUI: true,
  });

  setTimeout(updateMarkers, 1000);
};

// Actualizar los marcadores
const updateMarkers = () => {
  if (!map.value) return;

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

  new MarkerClusterer({ map: map.value, markers });
};

// Mostrar alerta
const showAlert = (location) => {
  const municipioData = props.arboles[0];
  const municipio = municipioData.totalEspeciesPorMunicipio.find((municipio) =>
    municipio.municipio.trim().toLowerCase() === location.name.trim().toLowerCase()
  );

  const arboles = municipio ? municipio.totalArboles : 0;
  const co2 = municipio ? municipio.co2 : 0;
  const especies = municipio ? municipio.totalEspecies : 0;

  createAndDisplayAlert(location.name, arboles, co2, especies);
};

// Función para crear y mostrar un alerta
const createAndDisplayAlert = (nombre, arboles, co2, especies) => {
  if (currentAlertContainer) {
    render(null, currentAlertContainer);
    currentAlertContainer.remove();
  }

  const container = document.createElement("div");
  document.body.appendChild(container);

  const vnode = createVNode(Alert, { nombre, arboles, co2, especies });
  render(vnode, container);
  currentAlertContainer = container;

  setTimeout(() => {
    if (currentAlertContainer === container) {
      render(null, container);
      container.remove();
      currentAlertContainer = null;
    }
  }, 5000);
};

watch([() => props.center, () => props.zoom, () => props.locations], () => {
  if (map.value) {
    map.value.setCenter(props.center);
    map.value.setZoom(props.zoom);
    updateMarkers();
  }
});

onMounted(loadGoogleMaps);
</script>

<template>
  <div ref="mapElement" class="w-full h-full"></div>
</template>
