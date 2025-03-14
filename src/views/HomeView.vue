<script setup>
import { ref, onMounted } from "vue";
import GoogleMap from '@/components/GoogleMap.vue';
import Carousel from '@/components/Carousel.vue';
import MunicipioService from "@/services/MunicipioService";
import ArbolService from "@/services/ArbolService";
import EspecieService from "@/services/EspecieService";
import Spinner from "@/components/Spinner.vue";

const mapCenter = { lat: -40.691200, lng: -63.616672 };
const mapZoom = 4;
const cargandoArboles = ref(true);
const cargandoEspecies = ref(true);
const cargando = ref(true);
const locations = ref([]);
const arboles = ref([]);
const especies = ref([]);

onMounted(async () => {
  await cargarMunicipios();
  await cargarArboles();
  await cargarEspecies();
  setInterval(moveCarousel, 3000);
});

// Cargar municipios
const cargarMunicipios = async () => {
  cargando.value = true;
  try {
    const response = await MunicipioService.obtenerMunicipios();
    if (!response?.data || !Array.isArray(response.data)) throw new Error("Respuesta inválida");
    locations.value = response.data.map(municipio => ({
      name: municipio.nombre,
      lat: municipio.latitud,
      lng: municipio.longitud,
    }));
  } catch (error) {
    console.error("Error cargando municipios:", error);
  } finally {
    cargando.value = false;
  }
};

// Cargar árboles y especies, total y por municipio
const cargarArboles = async () => {
  cargandoArboles.value = true;
  try {
    const [arbolesResponse, especiesPorMunicipioResponse] = await Promise.allSettled([
      ArbolService.mostrarArboles(),
      ArbolService.mostrarEspeciesPorMunicipio(),
    ]);

    if (arbolesResponse.status === 'fulfilled' && especiesPorMunicipioResponse.status === 'fulfilled') {
      arboles.value = [{
        totalArboles: arbolesResponse.value?.data?.total_arboles || 0,
        totalDatosPorMunicipio: especiesPorMunicipioResponse.value?.data?.total_especies_municipios || 0,
      }];
    } else {
      console.error("Error al cargar los árboles o especies.");
    }
  } catch (error) {
    console.error("Error cargando árboles o especies:", error);
  } finally {
    cargandoArboles.value = false;
  }
};

//Cargar especies
const cargarEspecies = async () => {
  cargandoEspecies.value = true;
  try {
    const response = await EspecieService.mostrarEspecies();
    if (!response?.data) throw new Error("Respuesta inválida");
    especies.value = [{
      totalEspecies: response.data.total_especies,
    }];
  } catch (error) {
    console.error("Error cargando especies:", error);
  } finally {
    cargandoEspecies.value = false;
  }
};

const carousel = ref(null);
const carouselItems = ref(null);

// Movimiento de carousel
const moveCarousel = () => {
  if (carouselItems.value) {
    const firstItem = carouselItems.value.querySelector("img");
    const itemWidth = firstItem?.offsetWidth + 16;
    const maxScroll = carouselItems.value.scrollWidth - carouselItems.value.offsetWidth;
    
    let currentTranslate = parseFloat(getComputedStyle(carouselItems.value).transform.split(',')[4]) || 0;
    if (Math.abs(currentTranslate) < maxScroll) {
      currentTranslate -= itemWidth;
    } else {
      currentTranslate = 0;
    }

    carouselItems.value.style.transform = `translateX(${currentTranslate}px)`;
  }
};
</script>

<template>

<a target="_blank" class="z-10 fixed top-[92%] left-[85%] md:top-[92%] md:left-[93%] xl:top-[92%] xl:left-[96%]" href="https://wa.me/5493415071162"><svg width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <path id="a" d="M1023.941 765.153c0 5.606-.171 17.766-.508 27.159-.824 22.982-2.646 52.639-5.401 66.151-4.141 20.306-10.392 39.472-18.542 55.425-9.643 18.871-21.943 35.775-36.559 50.364-14.584 14.56-31.472 26.812-50.315 36.416-16.036 8.172-35.322 14.426-55.744 18.549-13.378 2.701-42.812 4.488-65.648 5.3-9.402.336-21.564.505-27.15.505l-504.226-.081c-5.607 0-17.765-.172-27.158-.509-22.983-.824-52.639-2.646-66.152-5.4-20.306-4.142-39.473-10.392-55.425-18.542-18.872-9.644-35.775-21.944-50.364-36.56-14.56-14.584-26.812-31.471-36.415-50.314-8.174-16.037-14.428-35.323-18.551-55.744-2.7-13.378-4.487-42.812-5.3-65.649-.334-9.401-.503-21.563-.503-27.148l.08-504.228c0-5.607.171-17.766.508-27.159.825-22.983 2.646-52.639 5.401-66.151 4.141-20.306 10.391-39.473 18.542-55.426C34.154 93.24 46.455 76.336 61.07 61.747c14.584-14.559 31.472-26.812 50.315-36.416 16.037-8.172 35.324-14.426 55.745-18.549 13.377-2.701 42.812-4.488 65.648-5.3 9.402-.335 21.565-.504 27.149-.504l504.227.081c5.608 0 17.766.171 27.159.508 22.983.825 52.638 2.646 66.152 5.401 20.305 4.141 39.472 10.391 55.425 18.542 18.871 9.643 35.774 21.944 50.363 36.559 14.559 14.584 26.812 31.471 36.415 50.315 8.174 16.037 14.428 35.323 18.551 55.744 2.7 13.378 4.486 42.812 5.3 65.649.335 9.402.504 21.564.504 27.15l-.082 504.226z"></path> </defs> <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="512.001" y1=".978" x2="512.001" y2="1025.023"> <stop offset="0" stop-color="#61fd7d"></stop> <stop offset="1" stop-color="#2bb826"></stop> </linearGradient> <use xlink:href="#a" overflow="visible" fill="url(#b)"></use> <g> <path fill="#FFF" d="M783.302 243.246c-69.329-69.387-161.529-107.619-259.763-107.658-202.402 0-367.133 164.668-367.214 367.072-.026 64.699 16.883 127.854 49.017 183.522l-52.096 190.229 194.665-51.047c53.636 29.244 114.022 44.656 175.482 44.682h.151c202.382 0 367.128-164.688 367.21-367.094.039-98.087-38.121-190.319-107.452-259.706zM523.544 808.047h-.125c-54.767-.021-108.483-14.729-155.344-42.529l-11.146-6.612-115.517 30.293 30.834-112.592-7.259-11.544c-30.552-48.579-46.688-104.729-46.664-162.379.066-168.229 136.985-305.096 305.339-305.096 81.521.031 158.154 31.811 215.779 89.482s89.342 134.332 89.312 215.859c-.066 168.243-136.984 305.118-305.209 305.118zm167.415-228.515c-9.177-4.591-54.286-26.782-62.697-29.843-8.41-3.062-14.526-4.592-20.645 4.592-6.115 9.182-23.699 29.843-29.053 35.964-5.352 6.122-10.704 6.888-19.879 2.296-9.176-4.591-38.74-14.277-73.786-45.526-27.275-24.319-45.691-54.359-51.043-63.543-5.352-9.183-.569-14.146 4.024-18.72 4.127-4.109 9.175-10.713 13.763-16.069 4.587-5.355 6.117-9.183 9.175-15.304 3.059-6.122 1.529-11.479-.765-16.07-2.293-4.591-20.644-49.739-28.29-68.104-7.447-17.886-15.013-15.466-20.645-15.747-5.346-.266-11.469-.322-17.585-.322s-16.057 2.295-24.467 11.478-32.113 31.374-32.113 76.521c0 45.147 32.877 88.764 37.465 94.885 4.588 6.122 64.699 98.771 156.741 138.502 21.892 9.45 38.982 15.094 52.308 19.322 21.98 6.979 41.982 5.995 57.793 3.634 17.628-2.633 54.284-22.189 61.932-43.615 7.646-21.427 7.646-39.791 5.352-43.617-2.294-3.826-8.41-6.122-17.585-10.714z"></path> </g> </g></svg></a>
  <!-- Mapa de Argentina -->
  <div id="datos-y-mapa" class="flex flex-col xl:px-28 xl:flex-row xl:justify-evenly items-center xl:space-x-6 pt-20">
    <div id="map" class="w-4/5 md:w-5/6 xl:w-3/5 h-[700px] xl:h-[550px] md:h-[570px] rounded-2xl overflow-hidden flex flex-col md:flex-row xl:flex-row">
      <div id="map-info" class="relative xl:flex-1 xl:order-1 md:left-3 h-1/3 xl:h-full md:h-full md:w-1/2 rounded-2xl bg-[#365351] p-6 flex justify-start text-left">
        <div class="xl:pt-24 xl:pl-6 xl:pr-3 md:pt-24 md:pl-6">
          <h5 class="text-[#99a7a6] text-xl md:text-4xl xl:text-5xl font-extrabold opacity-70">Municipios</h5>
          <h3 class="text-white text-xl md:text-3xl xl:text-5xl font-semibold my-4">Somos 
            <span class="text-gray-300" v-if="cargando"><Spinner :size="'48'" :color="'gray-300'" :animate="true" /></span>
            <span v-else>{{ locations.length }}</span>
             municipios activos contra el cambio climático</h3>
        </div>
      </div>

      <div class=" md:w-5/6 xl:w-2/3 xl:flex-1 md:flex-1 md:order-2 h-full ">
        <GoogleMap 
        :center="mapCenter" 
        :zoom="mapZoom" 
        :locations="locations" 
        :arboles="arboles"
        :isMainView="true"
        class="bottom-6 md:bottom-0 xl:bottom-0 md:right-3 rounded-2xl"
        />
      </div>
      
    </div>

    <!-- Datos de municipios  -->
    <div id="datos" class="flex flex-col mt-10 w-4/5 space-y-10 md:flex-row md:h-1/3 md:space-y-0 md:space-x-6 md:mt-10 md:justify-evenly xl:w-1/5 xl:h-[550px] xl:flex-col xl:justify-between xl:space-x-0 xl:mt-0 ">
      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <span class="text-gray-300" v-if="cargandoArboles"><Spinner :size="'36'" :color="'gray-300'" :animate="true" /></span>
          <p class="font-bold text-2xl sm:text-3xl md:text-2xl xl:text-4xl text-[#042825]" v-else> {{ arboles[0]?.totalArboles }} </p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Árboles relevados</p>
        </div>
        <img class="w-20 xl:w-28 ml-auto" src="../components/icons/Arbol_Home.svg" alt="Árbol">
      </div>

      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <span class="text-gray-300" v-if="cargando"><Spinner :size="'36'" :color="'gray-300'" :animate="true" /></span>
          <p class="font-bold text-2xl sm:text-3xl md:text-2xl xl:text-4xl text-[#042825]" v-else>290 T</p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Absorción de CO2 Aprox</p>
        </div>
        <img class="w-20 xl:w-28 ml-auto" src="../components/icons/CO2_Home.svg" alt="CO2">
      </div>

      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <span class="text-gray-300" v-if="cargandoEspecies"><Spinner :size="'36'" :color="'gray-300'" :animate="true" /></span>
          <p class="font-bold text-2xl sm:text-3xl md:text-2xl xl:text-4xl text-[#042825]" v-else> {{ especies[0]?.totalEspecies }} </p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Especies de árboles</p>
        </div>
        <img class="w-20 xl:w-28 ml-auto" src="../components/icons/Especies_Home.svg" alt="Especies de árboles">
      </div>
    </div>
  </div>

  <!-- Logos de socios -->
  <div id="socios" class="pt-10 pb-36 flex flex-col justify-evenly items-center xl:px-[10%] xl:flex-row">
    <h2 class="text-xl md:text-2xl text-center xl:text-start xl:pr-5 py-5 mb-4"> 
      <!--centrado a la izquierda -->
      socios comprometidos <br>
      con el cambio climático
    </h2>
    <div
      ref="carousel"
      class="flex items-center justify-end xl:w-9/12 overflow-hidden relative"
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

  <div class="h-auto lg:h-3/4 flex flex-col lg:flex-row p-6 my-24 lg:p-10 justify-evenly items-center">
    <p class="text-xl md:text-2xl xl:text-3xl md:w-4/5 xl:w-1/2 lg:pr-8">
      CenArb es una herramienta esencial para la gestión efectiva del entorno urbano frente al cambio climático.
      <br>Al permitir un registro detallado y actualizado de los árboles en los municipios, facilita el monitoreo de su estado de salud y ubicación, ayudando a tomar decisiones más informadas sobre su cuidado y preservación.
      <br>Con esta app, los municipios pueden optimizar la planificación urbana, fomentar la expansión de áreas verdes y mejorar la resiliencia frente a fenómenos climáticos extremos.    </p>
    <img class="mt-5 md:mt-8 w-full md:w-96 lg:w-1/3 xl:w-96 h-auto md:h-full object-cover rounded-2xl" src="/src/assets/img/smartphone.jpeg" alt="Smartphone">
  </div>


 <div id="fondo" class="w-full py-28 flex flex-col justify-evenly bg-[#042825]">
  <div class="mb-20">
    <p class="text-center text-xl md:text-2xl xl:text-3xl text-white px-8 sm:px-20">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad cumque aliquam excepturi temporibus, a repellendus quae labore. Hic, doloremque provident rem, quod accusamus accusantium eligendi ratione ullam ex repellat officiis?
    </p>
  </div>
  <div class="flex justify-center px-2 md:px-5 xl:px-44">
  <img class="w-[90%] -mb-20 -mt-10 md:-mb-36 md:-mt-20 xl:-mb-44" src="../assets/img/ImgWEbMobile.svg" alt="App en Celulares">
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