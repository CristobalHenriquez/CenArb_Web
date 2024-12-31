<script setup>
    import { ref } from 'vue';

    defineProps({
        items: { type: Array, required: true },
        bgColor: { type: String, default: '#26473c' },
        txColor: { type: String, default: '#91a19c' },
        txAlign: { type: String, default: 'center' },
        pL: {type: String, default: 'p-0'},
        pR: {type: String, default: 'p-0'}
    });

    const carousel = ref(null);
    const isDragging = ref(false);
    const startX = ref(0);
    const scrollLeft = ref(0);

 
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
      :style="{ backgroundColor: bgColor, userSelect: 'none' }"
      class="flex-shrink-0 w-auto h-36 rounded-3xl shadow-inner-top flex flex-col justify-center snap-start"
    >
      <div class="w-auto px-5">
        <h5 class="text-white text-4xl font-bold" :style="{ textAlign: txAlign }">{{items.length}}</h5>
        <h4 class="text-3xl font-semibold" :style="{ color: txColor, textAlign: txAlign }">{{item.name}}</h4>
        <h3 class="text-3xl font-semibold" :style="{ color: txColor, textAlign: txAlign }">{{ item.prov }}</h3>
      </div>
    </div>
  </div>
</template>

  
  