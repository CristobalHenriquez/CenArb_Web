<script setup>
import { ref, onMounted, watch } from 'vue';

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
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const hoveredIndex = ref(null);


const setInitialScroll = () => {
  if (!carousel.value) return;
  if (props.initialDirection === 'right') {
    carousel.value.scrollLeft = carousel.value.scrollWidth - carousel.value.clientWidth;
  } else {
    carousel.value.scrollLeft = 0;
  }
};


const startDrag = (e) => {
  isDragging.value = true;
  startX.value = e.pageX - carousel.value.offsetLeft;
  scrollLeft.value = carousel.value.scrollLeft;
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  const x = e.pageX - carousel.value.offsetLeft;
  const walk = (x - startX.value) * 2;
  carousel.value.scrollLeft = scrollLeft.value - walk;
};

const stopDrag = () => {
  isDragging.value = false;
};

const handleMouseEnter = (index) => {
  hoveredIndex.value = index;
};

const handleMouseLeave = () => {
  hoveredIndex.value = null;
};

onMounted(() => {
  if (props.items.length === 0) {
    console.log("No hay datos en 'items'");
  } else {
    console.log("Hay datos en 'items'");
  }
  setTimeout(() => {
    if (carousel.value) setInitialScroll();
  }, 100);
  setTimeout(() => {
  console.log("Contenido del carrusel:", carousel.value?.innerHTML);
}, 500);
});

watch(() => props.items, (newItems) => {
  console.log("Nuevos items recibidos en Carousel:", newItems);
}, { deep: true });

watch(() => props.initialDirection, () => {
  setTimeout(setInitialScroll, 100);
});
</script>

<template>
  <div 
    ref="carousel" 
    class="flex overflow-x-scroll scroll-snap-x snap-mandatory scrollbar-hide space-x-10 p-4 w-full"
    @mousedown="startDrag($event)" 
    @mousemove="onDrag($event)" 
    @mouseup="stopDrag" 
    @mouseleave="stopDrag"
  >
    <div 
      v-for="(item, index) in items" 
      :key="index"
      :style="{ 
        backgroundColor: hoveredIndex === index ? hvColor : bgColor,
        userSelect: 'none' 
      }"
      class="flex-shrink-0 w-auto h-36 rounded-3xl shadow-inner-top flex flex-col justify-center snap-start"
      @mouseenter="handleMouseEnter(index)"
      @mouseleave="handleMouseLeave"
    >
      <div class="w-auto px-5">
        <h5 class="text-2xl md:text-3xl xl:text-4xl font-bold" :style="{ textAlign: txAlign, color: hoveredIndex === index ? hvTxColor : color }">{{ items.length }}</h5>
        <h4 class="text-xl md:text-2xl xl:text-3xl font-semibold" :style="{ color: txColor, textAlign: txAlign }">{{ item.name }}</h4>
        <h3 class="text-xl md:text-2xl xl:text-3xl font-semibold" :style="{ color: txColor, textAlign: txAlign }">{{ item.prov }}</h3>
      </div>
    </div>
  </div>
</template>
