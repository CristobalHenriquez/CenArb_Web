<script setup>
import { ref, onMounted } from "vue";
import GoogleMap from '@/components/GoogleMap.vue';
import Carousel from '@/components/Carousel.vue';

  //Centrar el mapa en Argentina

const mapCenter = { lat: -38.416097, lng: -63.616672 }
const mapZoom = 4


  //Municipios provisionales
  const locations = ref([
  { name: "Rosario", lat: -32.959648123706145, lng: -60.69087085480481, arboles: 56, co2: 4532, especies: 87, prov: "Santa Fe" },
  { name: "Granadero Baigorria", lat: -32.85850818963751, lng: -60.703092403554244, arboles: 78, co2: 9012, especies: 63, prov: "Santa Fe" },
  { name: "Castelar", lat: -31.66846673336747, lng: -62.090651217414205, arboles: 45, co2: 1234, especies: 101, prov: "Buenos Aires" },
  { name: "Funes", lat: -32.916912, lng: -60.812737, arboles: 32, co2: 8043, especies: 72, prov: "Santa Fe" },
  { name: "Villa Gobernador Galvez", lat: -33.031742, lng: -60.640957, arboles: 66, co2: 6721, especies: 98, prov: "Santa Fe" },
  { name: "San Lorenzo", lat: -32.749149, lng: -60.741749, arboles: 23, co2: 9340, especies: 125, prov: "Santa Fe" },
  { name: "Capitán Bermúdez", lat: -32.820082, lng: -60.718218, arboles: 50, co2: 8475, especies: 61, prov: "Santa Fe" },
  
  { name: "Buenos Aires", lat: -34.603722, lng: -58.381592, arboles: 80, co2: 7432, especies: 110, prov: "Buenos Aires" },
  { name: "Lanús", lat: -34.702636, lng: -58.394783, arboles: 67, co2: 8453, especies: 45, prov: "Buenos Aires" },
  { name: "Avellaneda", lat: -34.66334, lng: -58.366653, arboles: 24, co2: 5432, especies: 89, prov: "Buenos Aires" },
  { name: "Quilmes", lat: -34.72904, lng: -58.26374, arboles: 44, co2: 9021, especies: 78, prov: "Buenos Aires" },
  { name: "San Justo", lat: -34.678493, lng: -58.561646, arboles: 70, co2: 9823, especies: 58, prov: "Buenos Aires" },
  { name: "La Plata", lat: -34.92145, lng: -57.95453, arboles: 35, co2: 6745, especies: 105, prov: "Buenos Aires" },
  
  { name: "Cordoba", lat: -31.420083, lng: -64.188776, arboles: 59, co2: 9032, especies: 78, prov: "Córdoba" },
  { name: "Villa Carlos Paz", lat: -31.415897, lng: -64.50412, arboles: 42, co2: 8457, especies: 112, prov: "Córdoba" },
  { name: "Alta Gracia", lat: -31.666138, lng: -64.428257, arboles: 64, co2: 7834, especies: 96, prov: "Córdoba" },
  { name: "Río Cuarto", lat: -33.123867, lng: -64.349196, arboles: 37, co2: 9201, especies: 85, prov: "Córdoba" },
  { name: "Villa María", lat: -32.407459, lng: -63.240539, arboles: 29, co2: 7634, especies: 62, prov: "Córdoba" },
  
  { name: "Mendoza", lat: -32.889459, lng: -68.845838, arboles: 72, co2: 8902, especies: 135, prov: "Mendoza" },
  { name: "Godoy Cruz", lat: -32.892222, lng: -68.845833, arboles: 55, co2: 8412, especies: 98, prov: "Mendoza" },
  { name: "Las Heras", lat: -32.880593, lng: -68.836288, arboles: 38, co2: 9104, especies: 123, prov: "Mendoza" },
  { name: "Guaymallén", lat: -32.907635, lng: -68.827876, arboles: 81, co2: 6732, especies: 132, prov: "Mendoza" },
  { name: "Luján de Cuyo", lat: -33.054115, lng: -68.871007, arboles: 46, co2: 8035, especies: 77, prov: "Mendoza" },
  { name: "Maipú", lat: -32.978931, lng: -68.763473, arboles: 49, co2: 8450, especies: 92, prov: "Mendoza" }
]);


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

  <!-- frase inicial y boton de Sign Up -->
  <div id="frase" class="flex flex-col xl:flex-row justify-between items-center xl:px-44 pt-10 pb-6 md:flex-row md:px-32">
    <p class="text-[#042825] text-2xl md:text-3xl xl:text-4xl font-bold text-center md:text-left xl:text-left">Municipios <br>  
      <span class="text-[#919192] font-bold">Somos {{ locations.length }} municipios activos contra el cambio climático</span>
    </p>
  </div>

  <!-- Mapa de Argentina -->
  <div id="datos-y-mapa" class="flex flex-col xl:px-28 xl:flex-row xl:justify-evenly items-center xl:space-x-6 pt-14">
    <div id="map" class="w-4/5 md:w-5/6 xl:w-2/3 h-[700px] xl:h-[600px] md:h-[600px] rounded-2xl overflow-hidden flex flex-col md:flex-row xl:flex-row">
      <div id="map-info" class="border-black border-2 relative xl:flex-1 xl:order-1 md:left-3 h-1/3 xl:h-full md:h-full md:w-1/2 rounded-2xl bg-[#365351] p-6 flex justify-start text-left">
        <div class="xl:pt-24 xl:pl-6 xl:pr-3 md:pt-24 md:pl-6">
          <h5 class="text-[#99a7a6] text-xl md:text-3xl xl:text-4xl font-bold opacity-70">Municipios</h5>
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
    <div id="datos" class="flex flex-col mt-10 w-4/5 space-y-10 md:flex-row md:h-1/3 md:space-y-0 md:space-x-6 md:mt-10 md:justify-evenly xl:w-1/5 xl:h-[600px] xl:flex-col xl:space-y-16 xl:space-x-0 xl:mt-0 ">
      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-[#042825]">500 K</p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Árboles relevados</p>
        </div>
        <img class="w-12 sm:w-14 xl:w-16 ml-auto" src="../components/icons/tree-decidious-svgrepo-com.svg" alt="Árbol">
      </div>

      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-[#042825]">290 T</p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Absorción de CO2 Aprox</p>
        </div>
        <img class="w-12 sm:w-14 xl:w-16 ml-auto" src="../components/icons/co2-gas-svgrepo-com.svg" alt="CO2">
      </div>

      <div class="w-full h-28 sm:h-32 xl:h-40 bg-[#afc199] rounded-2xl p-4 flex items-center shadow-inner-top">
        <div class="flex flex-col">
          <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-[#042825]">500</p>
          <p class="text-[#042825] font-medium text-sm sm:text-base xl:text-2xl">Especies de árboles</p>
        </div>
        <img class="w-12 sm:w-14 xl:w-16 ml-auto" src="../components/icons/trees-tree-svgrepo-com.svg" alt="Especies de árboles">
      </div>
    </div>
  </div>

  <!-- Logos de socios -->
  <div id="socios" class="pt-14 pb-36 flex flex-col xl:flex-row justify-between items-center xl:px-32">
    <h2 class="text-2xl xl:text-3xl font-semibold text-center p-5 mb-4">
      socios comprometidos con el cambio climático
    </h2>
    <div
      ref="carousel"
      class="flex items-center justify-start xl:w-4/5 space-x-4 overflow-hidden relative"
    >
      <div
        class="flex transition-all duration-300 ease-in-out"
        ref="carouselItems"
      >
        <img class="h-20 xl:h-28 object-contain" src="../assets/img/0-crop (1).jpg" alt="socios" />
        <img class="h-20 xl:h-28 object-contain" src="../assets/img/0-crop (2).jpg" alt="socios" />
        <img class="h-20 xl:h-28 object-contain" src="../assets/img/0-crop (3).jpg" alt="socios" />
        <img class="h-20 xl:h-28 object-contain" src="../assets/img/0-crop (4).jpg" alt="socios" />
        <img class="h-20 xl:h-28 object-contain" src="../assets/img/0-crop (4).jpg" alt="socios" />
        <img class="h-20 xl:h-28 object-contain" src="../assets/img/0-crop (4).jpg" alt="socios" />
        <img class="h-20 xl:h-28 object-contain" src="../assets/img/0-crop (4).jpg" alt="socios" />
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
    />
  </div>

  <div class="h-auto md:h-3/4 flex flex-col md:flex-row p-6 md:p-10 justify-evenly items-center">
    <p class="text-xl md:text-2xl xl:text-3xl md:w-3/5 xl:w-1/2 md:pr-8">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis alias sint odit ipsum ullam fugit error, necessitatibus, quas sequi veritatis voluptatum doloremque atque quasi. Omnis reiciendis neque ducimus suscipit quam!
    </p>
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