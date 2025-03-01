<script setup>
    import { onMounted, ref, computed } from 'vue';
    import ClienteService from '@/services/ClienteService';
    import RouterLink  from '../components/UI/RouterLink.vue';
    import GoogleMap from '@/components/GoogleMap.vue';

    const clientes = ref([])

    onMounted(() => {
        ClienteService.obtenerClientes()
            .then(({data}) => {
                clientes.value = data
            })
            .catch(error => console.log('Hubo un error'))
        })

    defineProps({
        titulo:{
        type: String
        }
    })


    const mapCenter = { lat: -32.959648123706145, lng: -60.69087085480481 }; // Ejemplo: Centro de Buenos Aires
    const mapZoom = 12;
    
    const locations = ref([
    {lat: -32.950001, lng: -60.666668},
    {lat: -32.957500, lng: -60.639444},
    {lat: -32.946820, lng: -60.639320},
    {lat: -32.960000, lng: -60.650000},
    {lat: -32.955000, lng: -60.645000},
    {lat: -32.952000, lng: -60.642000},
    {lat: -32.948000, lng: -60.638000},
    {lat: -32.954000, lng: -60.644000},
    {lat: -32.951000, lng: -60.641000},
    {lat: -32.949000, lng: -60.637000},
    {lat: -32.941521, lng: -60.651234},  
    {lat: -32.955781, lng: -60.646792},  
    {lat: -32.948923, lng: -60.632456},  
    {lat: -32.960342, lng: -60.640120},  
    {lat: -32.950012, lng: -60.666784},  
    {lat: -32.953234, lng: -60.643412},  
    {lat: -32.956718, lng: -60.637128},  
    {lat: -32.949821, lng: -60.634710},  
    {lat: -32.944531, lng: -60.645899},  
    {lat: -32.958712, lng: -60.642342},  
    {lat: -32.947112, lng: -60.638741},  
    {lat: -32.954652, lng: -60.641238},  
    {lat: -32.951021, lng: -60.636298},  
    {lat: -32.943451, lng: -60.639871},  
    {lat: -32.957652, lng: -60.643212},  
    {lat: -32.948232, lng: -60.635781},  
    {lat: -32.945672, lng: -60.632981},  
    {lat: -32.959781, lng: -60.638712},  
    {lat: -32.946721, lng: -60.640181},  
    {lat: -32.952781, lng: -60.642719},  
    {lat: -32.951123, lng: -60.634512},  
    {lat: -32.944112, lng: -60.645452},  
    {lat: -32.955192, lng: -60.638172},  
    {lat: -32.950781, lng: -60.631124},  
    {lat: -32.942412, lng: -60.640781},  
    {lat: -32.956231, lng: -60.646901},  
    {lat: -32.949132, lng: -60.637124},  
    {lat: -32.943452, lng: -60.634781},  
    {lat: -32.958972, lng: -60.644671},  
    {lat: -32.947421, lng: -60.632891},  
    {lat: -32.953892, lng: -60.639412},  
    {lat: -32.945671, lng: -60.646712},  
    {lat: -32.960182, lng: -60.640298},  
    {lat: -32.951172, lng: -60.641112},  
    {lat: -32.942341, lng: -60.635218},  
    {lat: -32.955892, lng: -60.646212},  
    {lat: -32.948901, lng: -60.632981},  
    {lat: -32.945681, lng: -60.643452},  
    {lat: -32.959182, lng: -60.644312},  
    {lat: -32.946972, lng: -60.640541},  
    {lat: -32.954812, lng: -60.642231},  
    {lat: -32.949231, lng: -60.639671},  
    {lat: -32.943811, lng: -60.641112},  
    {lat: -32.957421, lng: -60.643761},  
    {lat: -32.948132, lng: -60.637821},  
    {lat: -32.945421, lng: -60.633218},  
    {lat: -32.960471, lng: -60.636112},  
    {lat: -32.950123, lng: -60.635819},  
    {lat: -32.941718, lng: -60.646212},  
    {lat: -32.955231, lng: -60.638921},  
    {lat: -32.949892, lng: -60.631129},
]);

</script>

<template>
  <!-- Primer cuadro -->
    <div class="w-full h-auto bg-white py-20">
      <h1 class="font-semibold text-center text-5xl pb-16 text-[#042825]">Bienvenido municipio de Rosario</h1>
      <div class="flex flex-col space-y-10 md:space-y-0 md:flex-row md:justify-center md:space-x-24 xl:space-x-40">
        <div class="flex flex-col items-center">
          <RouterLink to="inicio" class="md:px-10 bg-white border-[#042825] border-4 rounded-3xl">
            <svg fill="#042825" width="64px" height="64px" class="size-20" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>group-line</title> <path class="clr-i-outline clr-i-outline-path-1" d="M17.9,17.3c2.7,0,4.8-2.2,4.8-4.9c0-2.7-2.2-4.8-4.9-4.8c-2.7,0-4.8,2.2-4.8,4.8C13,15.1,15.2,17.3,17.9,17.3z M17.8,9.6C17.9,9.6,17.9,9.6,17.8,9.6c1.6,0,2.9,1.3,2.9,2.9s-1.3,2.8-2.9,2.8c-1.6,0-2.8-1.3-2.8-2.8C15,10.9,16.3,9.6,17.8,9.6z"></path><path class="clr-i-outline clr-i-outline-path-2" d="M32.7,16.7c-1.9-1.7-4.4-2.6-7-2.5c-0.3,0-0.5,0-0.8,0c-0.2,0.8-0.5,1.5-0.9,2.1c0.6-0.1,1.1-0.1,1.7-0.1c1.9-0.1,3.8,0.5,5.3,1.6V25h2v-8L32.7,16.7z"></path><path class="clr-i-outline clr-i-outline-path-3" d="M23.4,7.8c0.5-1.2,1.9-1.8,3.2-1.3c1.2,0.5,1.8,1.9,1.3,3.2c-0.4,0.9-1.3,1.5-2.2,1.5c-0.2,0-0.5,0-0.7-0.1c0.1,0.5,0.1,1,0.1,1.4c0,0.2,0,0.4,0,0.6c0.2,0,0.4,0.1,0.6,0.1c2.5,0,4.5-2,4.5-4.4c0-2.5-2-4.5-4.4-4.5c-1.6,0-3,0.8-3.8,2.2C22.5,6.8,23,7.2,23.4,7.8z"></path><path class="clr-i-outline clr-i-outline-path-4" d="M12,16.4c-0.4-0.6-0.7-1.3-0.9-2.1c-0.3,0-0.5,0-0.8,0c-2.6-0.1-5.1,0.8-7,2.4L3,17v8h2v-7.2c1.6-1.1,3.4-1.7,5.3-1.6C10.9,16.2,11.5,16.3,12,16.4z"></path><path class="clr-i-outline clr-i-outline-path-5" d="M10.3,13.1c0.2,0,0.4,0,0.6-0.1c0-0.2,0-0.4,0-0.6c0-0.5,0-1,0.1-1.4c-0.2,0.1-0.5,0.1-0.7,0.1c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4c1,0,1.9,0.6,2.3,1.5c0.4-0.5,1-1,1.5-1.4c-1.3-2.1-4-2.8-6.1-1.5c-2.1,1.3-2.8,4-1.5,6.1C7.3,12.3,8.7,13.1,10.3,13.1z"></path><path class="clr-i-outline clr-i-outline-path-6" d="M26.1,22.7l-0.2-0.3c-2-2.2-4.8-3.5-7.8-3.4c-3-0.1-5.9,1.2-7.9,3.4L10,22.7v7.6c0,0.9,0.7,1.7,1.7,1.7c0,0,0,0,0,0h12.8c0.9,0,1.7-0.8,1.7-1.7c0,0,0,0,0,0V22.7z M24.1,30H12v-6.6c1.6-1.6,3.8-2.4,6.1-2.4c2.2-0.1,4.4,0.8,6,2.4V30z"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
          </RouterLink>
          <p class="text-center font-medium text-2xl">Cencistas</p>
        </div>

        <div class="flex flex-col items-center">
          <RouterLink to="relevamientos" class="md:px-10 bg-white border-[#042825] border-4 rounded-3xl">
            <svg width="64px" height="64px" class="size-20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <path d="M5 10L8 13L14 7" stroke="#042825" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 24L8 27L14 21" stroke="#042825" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 38L8 41L14 35" stroke="#042825" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 24H43" stroke="#042825" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 38H43" stroke="#042825" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 10H43" stroke="#042825" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </RouterLink>
          <p class="text-center font-medium text-2xl">Listados</p>
        </div>

        <div class="flex flex-col items-center">
          <RouterLink to="intervenciones" class="md:px-10 bg-white border-[#042825] border-4 rounded-3xl">
            <svg width="64px" height="64px" class="size-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="File / File_Add"> <path id="Vector" d="M12 18V15M12 15V12M12 15H9M12 15H15M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002" stroke="#042825" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
          </RouterLink>
          <p class="text-center font-medium text-2xl">Intervenciones</p>
        </div> 
      </div>
    </div>
    <!-- Segundo cuadro -->
    <div class="h-auto py-20 bg-gradient-to-b from-[#b0c298] to-[#b0c298bd]">
      <h1 class="font-semibold text-center text-5xl pb-16 text-[#042825]">Datos del municipio</h1>
      <div class="flex flex-col items-center space-y-10 md:space-y-0 md:flex-row md:justify-center md:space-x-10 xl:space-x-40">

        <div class="w-80 h-28 sm:h-32 xl:h-36 bg-[#e2e4e5] rounded-2xl p-10 md:p-5 xl:p-10 flex items-center shadow-inner-top">
          <div class="flex flex-col w-3/5">
            <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-black">500 K</p>
            <p class="text-black text-lg xl:text-2xl">Árboles relevados</p>
          </div>
          <img class="w-12 sm:w-14 md:w-12 xl:w-16 ml-auto" src="../components/icons/Arbol_Home.svg" alt="Árbol">
        </div>

        <div class="w-80 h-28 sm:h-32 xl:h-36 bg-[#e2e4e5] rounded-2xl p-10 md:p-5 xl:p-10 flex items-center shadow-inner-top">
          <div class="flex flex-col w-3/5">
            <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-black">290 T</p>
            <p class="text-black text-lg xl:text-2xl">Absorción de CO2 Aprox</p>
          </div>
          <img class="w-12 sm:w-14 md:w-12 xl:w-16 ml-auto" src="../components/icons/CO2_Home.svg" alt="CO2">
        </div>

        <div class="w-80 h-28 sm:h-32 xl:h-36 bg-[#e2e4e5] rounded-2xl p-10 md:p-5 xl:p-10 flex items-center shadow-inner-top">
          <div class="flex flex-col w-3/5">
            <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-black">500</p>
            <p class="text-black text-lg xl:text-2xl">Especies de árboles</p>
          </div>
          <img class="w-12 sm:w-14 md:w-12 xl:w-16 ml-auto" src="../components/icons/Especies_Home.svg" alt="Especies de árboles">
        </div>

      </div>
    </div>
    
    <!-- Mapa -->
    <div class="h-auto py-20 bg-white">
      <h1 class="font-semibold text-center text-5xl pb-16 text-[#042825]">Mapa interactivo</h1>
      <div class="flex justify-center">
        <div class="w-3/4 h-[550px] border-[#042825] border-8 rounded-3xl">
          <GoogleMap :center="mapCenter" :zoom="mapZoom" :locations="locations" class="rounded-2xl" />
        </div>
    </div>
    </div>
</template>