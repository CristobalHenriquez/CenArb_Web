<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  items: { type: Array, required: true },
  bgColor: { type: String, default: '#26473c' },
  hvColor: { type: String, default: '#3c6354' },
  txColor: { type: String, default: '#91a19c' },
  hvTxColor: { type: String, default: '#3c6354' },
  txAlign: { type: String, default: 'center' },
  color: { type: String, default: 'white' },
  initialDirection: { type: String, default: 'left' }
});

const carousel = ref(null);
const hoveredIndex = ref(null);
let scrollInterval = null;

// Pasa los datos directamente al Alert
const emit = defineEmits(['showAlert']);

const handleClick = (item) => {
  emit('showAlert', {
    name: item.name,
    arboles: item.totalArboles,
    co2: item.co2Absorbido,
    totalEspecies: item.totalEspecies,
  });
};

// Iniciar el desplazamiento del carrusel
const setInitialScroll = () => {
  if (!carousel.value) return;
  const scrollDirection = props.initialDirection === 'right' ? carousel.value.scrollWidth - carousel.value.clientWidth : 0;
  carousel.value.scrollLeft = scrollDirection;
};

// Iniciar el desplazamiento automático
const startAutoScroll = () => {
  if (!carousel.value) return;

  stopAutoScroll();

  const direction = props.initialDirection === 'right' ? -1 : 1;
  const speed = 1;

  scrollInterval = setInterval(() => {
    if (!carousel.value) return;

    carousel.value.scrollLeft += speed * direction;

    if (direction === 1 && carousel.value.scrollLeft >= carousel.value.scrollWidth - carousel.value.clientWidth) {
      carousel.value.scrollLeft = 0;
    }
    if (direction === -1 && carousel.value.scrollLeft <= 0) {
      carousel.value.scrollLeft = carousel.value.scrollWidth - carousel.value.clientWidth;
    }
  }, 12);  // Intervalo de actualización
};

// Detener el desplazamiento automático
const stopAutoScroll = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
};

// Manejo de interacción con el carrusel
const handleMouseEnter = (index) => {
  hoveredIndex.value = index;
  stopAutoScroll();
};

const handleMouseLeave = () => {
  hoveredIndex.value = null;
  startAutoScroll();
};

// Inicialización del carrusel cuando el componente se monta
onMounted(() => {
  setInitialScroll();
  startAutoScroll();
});

// Detener el desplazamiento al desmontar el componente
onUnmounted(() => {
  stopAutoScroll();
});

// Reaccionar a cambios en `props.items` y `props.initialDirection`
watch([() => props.items, () => props.initialDirection], () => {
  setInitialScroll();
  startAutoScroll();
}, { immediate: true });

</script>

<template>
  <div 
    ref="carousel" 
    class="flex overflow-x-scroll scroll-snap-x snap-mandatory scrollbar-hide space-x-10 p-4 w-full"
  >
    <div 
      v-for="(item, index) in items" 
      :key="item.id"
      :style="{ 
        backgroundColor: hoveredIndex === index ? hvColor : bgColor,
        userSelect: 'none' 
      }"
      class="flex-shrink-0 w-auto h-36 rounded-3xl shadow-inner-top flex flex-col justify-center snap-start"
      @mouseenter="handleMouseEnter(index)"
      @mouseleave="handleMouseLeave"
      @click="handleClick(item)"
    >
      <div class="w-auto px-5">
        <h5 class="text-2xl md:text-3xl xl:text-4xl font-bold" :style="{ textAlign: txAlign, color: hoveredIndex === index ? hvTxColor : color }">{{ item.totalArboles }}</h5>
        <h4 class="text-xl md:text-2xl xl:text-3xl font-semibold" :style="{ color: txColor, textAlign: txAlign }">{{ item.name }}</h4>
        <h3 class="text-xl md:text-2xl xl:text-3xl font-semibold" :style="{ color: txColor, textAlign: txAlign }">{{ item.prov }}</h3>
      </div>
    </div>
  </div>
</template>
