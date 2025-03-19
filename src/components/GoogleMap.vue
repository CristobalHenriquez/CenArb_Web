<script setup>
import { ref, onMounted, watch, createVNode, render, onUnmounted } from "vue";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useRoute, useRouter } from "vue-router";
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
    required: false,
    default: () => []
  },
  arboles: {
    type: Array,
    required: false,
    default: () => []
  },
  isMainView: {
    type: Boolean,
    default: true,
  }
});

const mapElement = ref(null);
const map = ref(null);
const route = useRoute();
const router = useRouter();
let currentAlertContainer = null;
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


const initMap = () => {
  if (!mapElement.value) return;

  map.value = new google.maps.Map(mapElement.value, {
    center: props.center,
    zoom: props.zoom,
    disableDefaultUI: true,
  });

  // Inicializar MarkerClusterer
  markerClusterer = new MarkerClusterer({ map: map.value, markers: [] });

  updateMarkers();
};

// Actualizar los marcadores
const updateMarkers = () => {
  if (!map.value) return;

  // Borrar marcadores existentes antes de agregar nuevos
  markerClusterer.clearMarkers();

  if (!props.locations.length) return;

  const markers = props.locations.map((location) => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat / 1000000, lng: location.lng / 1000000 },
      title: location.name,
    });

    marker.addListener("click", () => {
      if (route.name === "home") {
        showAlert(location);
      }
    });

    return marker;
  });

  markerClusterer.addMarkers(markers);
};

// Mostrar alerta
const showAlert = (location) => {
  if (!props.arboles.length) return;

  const municipioData = props.arboles[0];
  if (!municipioData || !municipioData.totalDatosPorMunicipio) return;

  const municipio = municipioData.totalDatosPorMunicipio.find(
    (m) => m.municipio.trim().toLowerCase() === location.name.trim().toLowerCase()
  );

  const arboles = municipio ? municipio.totalArboles : 0;
  const co2 = municipio ? municipio.co2 : 0;
  const especies = municipio ? municipio.totalEspecies : 0;

  createAndDisplayAlert(location.name, arboles, co2, especies);
};

// Crear y mostrar una alerta
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

// Ver cambios para actualizar el mapa
watch([() => props.center, () => props.zoom, () => props.locations], () => {
  if (map.value) {
    map.value.setCenter(props.center);
    map.value.setZoom(props.zoom);
    updateMarkers();
  }
});

// Escuchar el cambio de ruta para eliminar la alerta
router.beforeEach((to, from, next) => {
  if (currentAlertContainer) {
    render(null, currentAlertContainer);
    currentAlertContainer.remove();
    currentAlertContainer = null;
  }
  next();
});

onMounted(loadGoogleMaps);

onUnmounted(() => {
  // Limpiar los marcadores y alertas al desmontar el componente
  if (markerClusterer) {
    markerClusterer.clearMarkers();
    markerClusterer = null;
  }
  if (currentAlertContainer) {
    render(null, currentAlertContainer);
    currentAlertContainer.remove();
    currentAlertContainer = null;
  }
});
</script>

<template>
  <div ref="mapElement" class="w-full h-full"></div>
</template>
