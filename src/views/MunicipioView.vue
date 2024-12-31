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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.1" stroke="#042825" class="size-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </RouterLink>
          <p class="text-center font-medium text-2xl">Cencistas</p>
        </div>

        <div class="flex flex-col items-center">
          <RouterLink to="relevamientos" class="md:px-10 bg-white border-[#042825] border-4 rounded-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.1" stroke="#042825" class="size-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
            </svg>
          </RouterLink>
          <p class="text-center font-medium text-2xl">Listados</p>
        </div>

        <div class="flex flex-col items-center">
          <RouterLink to="intervenciones" class="md:px-10 bg-white border-[#042825] border-4 rounded-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.1" stroke="#042825" class="size-20">
             <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
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
          <img class="w-12 sm:w-14 md:w-12 xl:w-16 ml-auto" src="../components/icons/tree-decidious-svgrepo-com.svg" alt="Árbol">
        </div>

        <div class="w-80 h-28 sm:h-32 xl:h-36 bg-[#e2e4e5] rounded-2xl p-10 md:p-5 xl:p-10 flex items-center shadow-inner-top">
          <div class="flex flex-col w-3/5">
            <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-black">290 T</p>
            <p class="text-black text-lg xl:text-2xl">Absorción de CO2 Aprox</p>
          </div>
          <img class="w-12 sm:w-14 md:w-12 xl:w-16 ml-auto" src="../components/icons/co2-gas-svgrepo-com.svg" alt="CO2">
        </div>

        <div class="w-80 h-28 sm:h-32 xl:h-36 bg-[#e2e4e5] rounded-2xl p-10 md:p-5 xl:p-10 flex items-center shadow-inner-top">
          <div class="flex flex-col w-3/5">
            <p class="font-bold text-2xl sm:text-3xl xl:text-4xl text-black">500</p>
            <p class="text-black text-lg xl:text-2xl">Especies de árboles</p>
          </div>
          <img class="w-12 sm:w-14 md:w-12 xl:w-16 ml-auto" src="../components/icons/trees-tree-svgrepo-com.svg" alt="Especies de árboles">
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
