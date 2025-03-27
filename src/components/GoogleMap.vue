<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useRoute, useRouter } from "vue-router";

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
const router = useRouter();
const route = useRoute();
let markerClusterer = null;

const formatearCO2 = (valor) => {
  if (valor < 1) {
    return `${(valor * 1000).toFixed(4)} G`;
  } else if (valor < 1000) {
    return `${valor.toFixed(4)} KG`;
  } else {
    return `${(valor / 1000).toFixed(4)} T`;
  }
};

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

  markerClusterer = new MarkerClusterer({
    map: map.value,
    markers: [],
    renderer: {
      render: ({ count, position }) => {
        return new google.maps.Marker({
          position,
          icon: {
            url: getClusterIcon(count),
            scaledSize: new google.maps.Size(50, 50),
          },
          label: {
            text: count.toString(),
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
          },
        });
      },
    },
  });

  updateMarkers();
};

// Función para definir el color de los clusters
const getClusterIcon = (count) => {
  const color = count > 50 ? "#26473c" : count > 15 ? "#aea646" : "#72aa27" ; // Verde oscuro, mostaza o verde claro según cantidad

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <circle cx="40" cy="40" r="25" fill="${color}"/>
      <text x="50%" y="50%" font-size="24" font-weight="bold" text-anchor="middle" fill="white" dy=".3em">${count}</text>
    </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const getCustomMarkerIcon = () => {
  return {
    url: "src/components/icons/marker-svgrepo-com.svg",
    scaledSize: new google.maps.Size(30, 30), // Ajusta el tamaño
    anchor: new google.maps.Point(20, 40), // Ajusta el ancla para centrar el marcador
  };
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
    id: location.id,
    icon: getCustomMarkerIcon(),
  });

  marker.addListener("click", () => {
    if (route.name === "home") {
      handleMunicipioClick(location);
    } else if(route.name === "municipio") {
      verDetalleArbol(location)
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

  const co2Absorbido = municipio && municipio.co2Absorbido !== undefined
    ? municipio.co2Absorbido
    : (municipio?.totalArboles || 0) * 0.0446292;

    const co2Formateado = formatearCO2(co2Absorbido);

  emit("showAlert", {
    name: location.name,
    arboles: municipio ? municipio.totalArboles : 0,
    co2: co2Formateado || 0,
    totalEspecies: municipio ? municipio.totalEspecies : 0,
  });
};

//Redirigir a la vista ArbolDetalle al clickear en un marcador
const verDetalleArbol = (location) => {
  if (location.id) {
    router.push({ name: 'arboldetalle', params: { id: location.id } });
  } else {
    console.error("El árbol no tiene un ID válido.");
  }
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
