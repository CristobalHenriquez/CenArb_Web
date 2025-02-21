<script setup>
import { ref, onMounted } from "vue";
import GoogleMap from '@/components/GoogleMap.vue';
import Carousel from '@/components/Carousel.vue';
import MunicipioService from "@/services/MunicipioService";
import ArbolService from "@/services/ArbolService";
import EspecieService from "@/services/EspecieService";


const mapCenter = { lat: -40.691200, lng: -63.616672 }
const mapZoom = 4


const locations = ref([]);
const arboles = ref([]);
const especies = ref([]);

const cargarMunicipios = async () => {
  try {
    const response = await MunicipioService.obtenerMunicipios();

    locations.value = response.data.map(municipio => ({
      id: municipio.id,
      name: municipio.nombre,
      lat: municipio.latitud,
      lng: municipio.longitud,
      prov: municipio.provincia
    }));
  } catch (error) {
    console.error("Error cargando municipios:", error);
  }
};

const cargarArboles = async () => {
  try {
    const response = await ArbolService.obtenerArboles();

    arboles.value = response.data.map(arbol => ({
      idArbol: arbol.id,
      idMunicipio: arbol.municipio,
    }));
  } catch (error) {
    console.error("Error cargando árboles:", error);
  }
};

const cargarEspecies = async () => {
  try {
    const response = await EspecieService.obtenerEspecies();
    especies.value = response.data.map(especie => ({
      idEspecie: especie.id,
      nombre: especie.nombre
    }));
  } catch (error) {
    console.error("Error cargando especies:", error);
  }
};

onMounted(() => {
  cargarMunicipios();
  cargarArboles();
  cargarEspecies();
});





const carousel = ref(null);
const carouselItems = ref(null);

//Movimiento de logos
const moveCarousel = () => {
  if (carouselItems.value) {
    const firstItem = carouselItems.value.querySelector("img");
    const itemWidth = firstItem.offsetWidth + 16; 
    const maxScroll = carouselItems.value.scrollWidth - carouselItems.value.offsetWidth;

    const currentTranslate = parseFloat(getComputedStyle(carouselItems.value).transform.split(',')[4]) || 0;
    if (Math.abs(currentTranslate) < maxScroll) {
      carouselItems.value.style.transform = `translateX(${currentTranslate - itemWidth}px)`; 
    } else {
      carouselItems.value.style.transform = `translateX(0px)`;
    }
  }
};

onMounted(() => {
  setInterval(moveCarousel, 3000);
});



</script>

<template>

  <!-- Mapa de Argentina -->
  <div id="datos-y-mapa" class="flex flex-col xl:px-28 xl:flex-row xl:justify-evenly items-center xl:space-x-6 pt-20">
    <div id="map" class="w-4/5 md:w-5/6 xl:w-3/5 h-[700px] xl:h-[550px] md:h-[570px] rounded-2xl overflow-hidden flex flex-col md:flex-row xl:flex-row">
      <div id="map-info" class="relative xl:flex-1 xl:order-1 md:left-3 h-1/3 xl:h-full md:h-full md:w-1/2 rounded-2xl bg-[#365351] p-6 flex justify-start text-left">
        <div class="xl:pt-24 xl:pl-6 xl:pr-3 md:pt-24 md:pl-6">
          <h5 class="text-[#99a7a6] text-xl md:text-4xl xl:text-5xl font-bold opacity-70">Municipios</h5>
          <h3 class="text-white text-xl md:text-4xl xl:text-5xl font-bold my-4">Somos {{ locations.length }} municipios activos contra el cambio climático</h3>
        </div>
      </div>

      <div class=" md:w-5/6 xl:w-2/3 xl:flex-1 md:flex-1 md:order-2 h-full ">
        <GoogleMap 
        :center="mapCenter" 
        :zoom="mapZoom" :locations="locations" 
        class="bottom-6 md:bottom-0 xl:bottom-0 md:right-3 rounded-2xl"
        />
      </div>
      
    </div>

    <!-- Datos de municipios  -->
    <div id="datos" class="flex flex-col mt-10 w-4/5 space-y-10 md:flex-row md:h-1/3 md:space-y-0 md:space-x-6 md:mt-10 md:justify-evenly xl:w-1/5 xl:h-[550px] xl:flex-col xl:space-y-10 xl:space-x-0 xl:mt-0 ">
      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-[#042825]">{{ arboles.length }}</p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Árboles relevados</p>
        </div>
        <img class="w-20 xl:w-32 ml-auto" src="../components/icons/Arbol_Home.svg" alt="Árbol">
      </div>

      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-[#042825]">290 T</p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Absorción de CO2 Aprox</p>
        </div>
        <img class="w-20 xl:w-32 ml-auto" src="../components/icons/CO2_Home.svg" alt="CO2">
      </div>

      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-[#042825]">{{ especies.length }}</p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Especies de árboles</p>
        </div>
        <img class="w-20 xl:w-32 ml-auto" src="../components/icons/Especies_Home.svg" alt="Especies de árboles">
      </div>
    </div>
  </div>

  <!-- Logos de socios -->
  <div id="socios" class="pt-10 pb-36 flex flex-col xl:flex-row justify-evenly items-center xl:px-48">
    <h2 class="text-xl md:text-2xl text-center p-5 mb-4">
      socios comprometidos <br>
      con el cambio climático
    </h2>
    <div
      ref="carousel"
      class="flex items-center justify-end xl:w-4/5 overflow-hidden relative"
    >
      <div
        class="flex transition-all duration-300 ease-in-out space-x-10"
        ref="carouselItems"
      >
      <img class="h-20 xl:h-16 w-64 object-contain" src="../components/icons/logosSocios/Logo Alpa Nuevo (Negro).svg" alt="socios" />
      <img class="h-20 xl:h-16 w-64 object-contain" src="../components/icons/logosSocios/Recurso 39.svg" alt="socios" />
      <img class="h-20 xl:h-16 w-64 object-contain" src="../components/icons/logosSocios/Signify.svg" alt="socios" />
      <img class="h-20 xl:h-16 w-64 object-contain" src="../components/icons/logosSocios/EUROCLIMA_horizontal ES 1.svg" alt="socios" />
      <img class="h-20 xl:h-16 w-64 object-contain" src="../components/icons/logosSocios/Logo Alpa Nuevo (Negro).svg" alt="socios" />
      <img class="h-20 xl:h-16 w-64 object-contain" src="../components/icons/logosSocios/Recurso 39.svg" alt="socios" />
      <img class="h-20 xl:h-16 w-64 object-contain" src="../components/icons/logosSocios/Signify.svg" alt="socios" />
      <img class="h-20 xl:h-16 w-64 object-contain" src="../components/icons/logosSocios/EUROCLIMA_horizontal ES 1.svg" alt="socios" />
      </div>
    </div>
  </div>
  
  <!-- Carousel de datos -->
   <div id="datos-actualizados" class="border-t-2 border-b-2 border-black bg-gradient-to-b from-[#b0c298] to-[#b0c298bd] py-16 xl:w-full">
    <div class="flex flex-col pb-10 space-y-2">
      <h2 class="font-bold text-center text-2xl xl:text-4xl text-[#042825]">Datos Actualizados</h2>
      <h6 class="font-bold text-center text-2xl xl:text-4xl text-[#6a735f]">Totales por municipios activos</h6>
    </div>

    <!-- Primer Carrusel -->
    <Carousel 
      :items="locations" 
      bgColor="#26473c" 
      hvColor="white"
      txColor="#92a29d"
      hvTxColor="#26473c"
      txAlign="start" 
    />

    <!-- Segundo Carrusel -->
    <Carousel 
      :items="locations" 
      bgColor="#aea646"
      hvColor="white"
      txColor="#6b6951"
      hvTxColor="#aea646"
      txAlign="end"
      initialDirection="right"
    />
  </div>

  <div class="h-auto md:h-3/4 flex flex-col md:flex-row p-6 md:p-10 justify-evenly items-center">
    <p class="text-xl md:text-2xl xl:text-3xl md:w-3/5 xl:w-1/2 md:pr-8">
      CenArb es una herramienta esencial para la gestión efectiva del entorno urbano frente al cambio climático. Al permitir un registro detallado y actualizado de los árboles en los municipios, facilita el monitoreo de su estado de salud y ubicación, ayudando a tomar decisiones más informadas sobre su cuidado y preservación. Con esta app, los municipios pueden optimizar la planificación urbana, fomentar la expansión de áreas verdes y mejorar la resiliencia frente a fenómenos climáticos extremos.    </p>
    <img class="mt-5 md:mt-0 w-full md:w-1/3 xl:w-1/4 h-auto md:h-full object-cover rounded-2xl" src="/src/assets/img/smartphone.jpeg" alt="Smartphone">
  </div>


 <div id="fondo" class="w-full py-36 flex flex-col justify-evenly bg-[#042825]">
  <div class="mb-20">
    <p class="text-center text-xl md:text-2xl xl:text-3xl text-white px-8 sm:px-20">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad cumque aliquam excepturi temporibus, a repellendus quae labore. Hic, doloremque provident rem, quod accusamus accusantium eligendi ratione ullam ex repellat officiis?
    </p>
  </div>
  <div class="flex flex-wrap justify-evenly items-center px-2 md:px-5 xl:px-44">
  <img class="w-10 md:w-16 xl:w-24 mx-auto -mt-20" src="../components/icons/celu1.svg" alt="">
  <img class="w-10 md:w-16 xl:w-24 mx-auto mt-20" src="../components/icons/celu2.svg" alt="">
  <img class="w-10 md:w-16 xl:w-24 mx-auto -mt-20" src="../components/icons/celu3.svg" alt="">
  <img class="w-10 md:w-16 xl:w-24 mx-auto mt-20" src="../components/icons/celu4.svg" alt="">
  <img class="w-10 md:w-16 xl:w-24 mx-auto -mt-20" src="../components/icons/celu5.svg" alt="">
  <img class="w-10 md:w-16 xl:w-24 mx-auto mt-20" src="../components/icons/celu6.svg" alt="">
  <img class="w-10 md:w-16 xl:w-24 mx-auto -mt-20" src="../components/icons/celu7.svg" alt="">
  <img class="w-10 md:w-16 xl:w-24 mx-auto mt-20" src="../components/icons/celu8.svg" alt="">
  <img class="w-10 md:w-16 xl:w-24 mx-auto -mt-20" src="../components/icons/celu9.svg" alt="">
</div>

</div>





</template>

<style>
/* Ocultar la barra de desplazamiento */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE y Edge */
  scrollbar-width: none; /* Firefox */
}

.alert {
  animation: slide-up 0.5s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>