<script setup>
import { ref, onMounted } from "vue";
import GoogleMap from '@/components/GoogleMap.vue';
import Carousel from '@/components/Carousel.vue';
import MunicipioService from "@/services/MunicipioService";
import ArbolService from "@/services/ArbolService";
import EspecieService from "@/services/EspecieService";


const mapCenter = { lat: -40.691200, lng: -63.616672 }
const mapZoom = 4

const cargando = ref(true);

const locations = ref([]);
const arboles = ref([]);
const especies = ref([]);

const cargarMunicipios = async () => {
  cargando.value = true;
  try {
    const response = await MunicipioService.obtenerMunicipios();
    if (!response || !response.data || !Array.isArray(response.data)) {
      throw new Error("Respuesta inválida al obtener municipios.");
    }
    locations.value = response.data.map(municipio => ({
      id: municipio.id,
      name: municipio.nombre,
      lat: municipio.latitud,
      lng: municipio.longitud,
      prov: municipio.provincia
    }));
    console.log("Municipios cargados:", locations.value);
  } catch (error) {
    console.error("Error cargando municipios:", error);
  } finally {
    cargando.value = false;
  }
};


const cargarArboles = async () => {
  cargando.value = true;
  try {
    const response = await ArbolService.obtenerArboles();
    if (!response || !response.data) {
      throw new Error("Respuesta inválida al obtener árboles.");
    }
    arboles.value = response.data.map(arbol => ({
      id: arbol.id,
      idMunicipio: arbol.municipio,
    }));
  } catch (error) {
    console.error("Error cargando árboles:", error);
  } finally {
    cargando.value = false;
  }
};

const cargarEspecies = async () => {
  cargando.value = true;
  try {
    const response = await EspecieService.obtenerEspecies();
    if (!response || !response.data) {
      throw new Error("Respuesta inválida al obtener especies.");
    }
    if (response.data) {
      especies.value = response.data.map(especie => ({
        id: especie.id
      }));
    }
  } catch (error) {
    console.error("Error cargando especies:", error);
  } finally {
    cargando.value = false;
  }
};


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
  cargarMunicipios();
  cargarArboles();
  cargarEspecies();
  setInterval(moveCarousel, 3000);
});

</script>

<template>

<a target="_blank" class="z-10 fixed top-[92%] left-[85%] md:top-[92%] md:left-[93%] xl:top-[92%] xl:left-[96%]" href="https://wa.me/5493415071162"><svg width="50px" height="50px" viewBox="-1.44 -1.44 50.88 50.88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(6.48,6.48), scale(0.73)"><rect x="-1.44" y="-1.44" width="50.88" height="50.88" rx="25.44" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" stroke-width="5.28"> <title>Whatsapp-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke-width="0.9120000000000001" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E"> <path d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z" id="Whatsapp"> </path> </g> </g> </g><g id="SVGRepo_iconCarrier"> <title>Whatsapp-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke-width="0.9120000000000001" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E"> <path d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z" id="Whatsapp"> </path> </g> </g> </g></svg></a>
  <!-- Mapa de Argentina -->
  <div id="datos-y-mapa" class="flex flex-col xl:px-28 xl:flex-row xl:justify-evenly items-center xl:space-x-6 pt-20">
    <div id="map" class="w-4/5 md:w-5/6 xl:w-3/5 h-[700px] xl:h-[550px] md:h-[570px] rounded-2xl overflow-hidden flex flex-col md:flex-row xl:flex-row">
      <div id="map-info" class="relative xl:flex-1 xl:order-1 md:left-3 h-1/3 xl:h-full md:h-full md:w-1/2 rounded-2xl bg-[#365351] p-6 flex justify-start text-left">
        <div class="xl:pt-24 xl:pl-6 xl:pr-3 md:pt-24 md:pl-6">
          <h5 class="text-[#99a7a6] text-xl md:text-4xl xl:text-5xl font-extrabold opacity-70">Municipios</h5>
          <h3 class="text-white text-xl md:text-4xl xl:text-5xl font-bold my-4" v-if="cargando">Cargando Municipios...</h3>
          <h3 class="text-white text-xl md:text-4xl xl:text-5xl font-semibold my-4" v-else>Somos {{ locations.length }} municipios activos contra el cambio climático</h3>
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
    <div id="datos" class="flex flex-col mt-10 w-4/5 space-y-10 md:flex-row md:h-1/3 md:space-y-0 md:space-x-6 md:mt-10 md:justify-evenly xl:w-1/5 xl:h-[550px] xl:flex-col xl:justify-between xl:space-x-0 xl:mt-0 ">
      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <p class="font-bold text-2xl sm:text-3xl md:text-2xl xl:text-4xl text-[#042825]" v-if="cargando"> Cargando Arboles... </p>
          <p class="font-bold text-2xl sm:text-3xl md:text-2xl xl:text-4xl text-[#042825]" v-else> {{ arboles.length }} </p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Árboles relevados</p>
        </div>
        <img class="w-20 xl:w-28 ml-auto" src="../components/icons/Arbol_Home.svg" alt="Árbol">
      </div>

      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <p class="font-bold text-2xl sm:text-3xl md:text-2xl xl:text-4xl text-[#042825]">290 T</p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Absorción de CO2 Aprox</p>
        </div>
        <img class="w-20 xl:w-28 ml-auto" src="../components/icons/CO2_Home.svg" alt="CO2">
      </div>

      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <p class="font-bold text-2xl sm:text-3xl md:text-2xl xl:text-4xl text-[#042825]" v-if="cargando"> Cargando Especies... </p>
          <p class="font-bold text-2xl sm:text-3xl md:text-2xl xl:text-4xl text-[#042825]" v-else> {{ especies.length }} </p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Especies de árboles</p>
        </div>
        <img class="w-20 xl:w-28 ml-auto" src="../components/icons/Especies_Home.svg" alt="Especies de árboles">
      </div>
    </div>
  </div>

  <!-- Logos de socios -->
  <div id="socios" class="pt-10 pb-36 flex flex-col justify-evenly items-center xl:px-52 xl:flex-row">
    <h2 class="text-xl md:text-2xl text-center xl:text-start p-5 mb-4"> 
      <!--centrado a la izquierda -->
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
      <img class="h-12 xl:h-16 md:w-44 xl:w-64 object-contain" src="../components/icons/logosSocios/Logo Alpa Nuevo (Negro).svg" alt="socios" />
      <img class="h-12 xl:h-16 md:w-44 xl:w-64 object-contain" src="../components/icons/logosSocios/Recurso 39.svg" alt="socios" />
      <img class="h-12 xl:h-16 md:w-44 xl:w-64 object-contain" src="../components/icons/logosSocios/Signify.svg" alt="socios" />
      <img class="h-12 xl:h-16 md:w-44 xl:w-64 object-contain" src="../components/icons/logosSocios/EUROCLIMA_horizontal ES 1.svg" alt="socios" />
      <img class="h-12 xl:h-16 md:w-44 xl:w-64 object-contain" src="../components/icons/logosSocios/Logo Alpa Nuevo (Negro).svg" alt="socios" />
      <img class="h-12 xl:h-16 md:w-44 xl:w-64 object-contain" src="../components/icons/logosSocios/Recurso 39.svg" alt="socios" />
      <img class="h-12 xl:h-16 md:w-44 xl:w-64 object-contain" src="../components/icons/logosSocios/Signify.svg" alt="socios" />
      <img class="h-12 xl:h-16 md:w-44 xl:w-64 object-contain" src="../components/icons/logosSocios/EUROCLIMA_horizontal ES 1.svg" alt="socios" />
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
      v-if="locations.length > 0"
      :items="locations" 
      bgColor="#26473c" 
      hvColor="white"
      txColor="#92a29d"
      hvTxColor="#26473c"
      txAlign="start" 
    />
    

    <!-- Segundo Carrusel -->
    <Carousel 
      v-if="locations.length > 0"
      :items="locations" 
      bgColor="#aea646"
      hvColor="white"
      txColor="#6b6951"
      hvTxColor="#aea646"
      txAlign="end"
      initialDirection="right"
    />
  </div>

  <div class="h-auto lg:h-3/4 flex flex-col lg:flex-row p-6 my-24 lg:p-10 justify-evenly items-center">
    <p class="text-xl md:text-2xl xl:text-3xl md:w-4/5 xl:w-1/2 lg:pr-8">
      CenArb es una herramienta esencial para la gestión efectiva del entorno urbano frente al cambio climático. Al permitir un registro detallado y actualizado de los árboles en los municipios, facilita el monitoreo de su estado de salud y ubicación, ayudando a tomar decisiones más informadas sobre su cuidado y preservación. Con esta app, los municipios pueden optimizar la planificación urbana, fomentar la expansión de áreas verdes y mejorar la resiliencia frente a fenómenos climáticos extremos.    </p>
    <img class="mt-5 md:mt-8 w-full md:w-96 lg:w-1/3 xl:w-96 h-auto md:h-full object-cover rounded-2xl" src="/src/assets/img/smartphone.jpeg" alt="Smartphone">
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