<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import ArbolService from '@/services/ArbolService';
  import RouterLink from '../components/UI/RouterLink.vue';
  
  const route = useRoute();
  const arbolId = route.params.id;  // Obtiene el ID desde la URL
  const arbol = ref(null);
  
  onMounted(() => {
    ArbolService.obtenerArbolPorId(arbolId)  // Método que debes implementar para obtener un árbol por su ID
      .then(({ data }) => {
        arbol.value = data;
      })
      .catch(error => console.error('Error obteniendo el árbol', error));
  });
  </script>
  
  <template>
    <div v-if="arbol">

      <div class="flex justify-end">
          <RouterLink to="relevamientos">
              Volver
          </RouterLink>
      </div>
      <h2 class="text-2xl font-bold mb-4">Detalles del Árbol (ID: {{ arbol.id_arbol }})</h2>
      
      <!-- Datos Básicos -->
      <div class="mb-4">
        <p><strong>Especie:</strong> {{ arbol.especie.nombre_comun }}</p>
        <p><strong>Municipio:</strong> {{ arbol.id_municipio }}</p>
        <p><strong>Coordenadas:</strong> Lat: {{ arbol.latitude }}, Long: {{ arbol.longitude }}</p>
        <p><strong>Dirección:</strong> {{ arbol.calle }} {{ arbol.numero_aprox }}</p>
        <p><strong>Identificación:</strong> {{ arbol.identificacion }}</p>
        <p><strong>Barrio:</strong> {{ arbol.barrio }}</p>
      </div>
  
      <!-- Características del Árbol -->
      <div class="mb-4">
        <p><strong>Altura:</strong> {{ arbol.tipo_altura }}</p>
        <p><strong>Diámetro del tronco:</strong> {{ arbol.tipo_diametro_tronco }}</p>
        <p><strong>Ámbito:</strong> {{ arbol.tipo_ambito }}</p>
        <p><strong>Distancia entre ejemplares:</strong> {{ arbol.tipo_distancia_entre_ejemplares }}</p>
        <p><strong>Distancia al cordón:</strong> {{ arbol.tipo_distancia_al_cordon }}</p>
        <p><strong>Interferencia aérea:</strong> {{ arbol.tipo_interferencia_aerea }}</p>
        <p><strong>Tipo de cable:</strong> {{ arbol.tipo_cable }}</p>
      </div>
  
      <!-- Estado y Necesidades del Árbol -->
      <div class="mb-4">
        <p><strong>Requiere intervención:</strong> {{ arbol.requiere_intervencion ? 'Sí' : 'No' }}</p>
        <p><strong>Tipo de intervención:</strong> {{ arbol.tipo_intervencion }}</p>
        <p><strong>Tratamiento previo:</strong> {{ arbol.tratamiento_previo }}</p>
        <p><strong>Cazuela:</strong> {{ arbol.cazuela }}</p>
        <p><strong>Protegido:</strong> {{ arbol.protegido ? 'Sí' : 'No' }}</p>
      </div>
  
      <!-- Fechas y Detalles Adicionales -->
      <div class="mb-4">
        <p><strong>Fecha del Censo:</strong> {{ arbol.fecha_censo }}</p>
        <p><strong>Interferencias:</strong> {{ arbol.interferencias }}</p>
        <p><strong>Detalles adicionales:</strong> {{ arbol.detalles_arbol }}</p>
        <p><strong>Edad:</strong> {{ arbol.edad }}</p>
        <p><strong>Fecha de creación:</strong> {{ arbol.created_at }}</p>
        <p><strong>Última actualización:</strong> {{ arbol.updated_at }}</p>
      </div>
  
    </div>
    <div v-else>
      <p>Cargando detalles...</p>
    </div>
  </template>
  