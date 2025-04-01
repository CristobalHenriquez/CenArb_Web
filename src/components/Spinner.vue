<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        size: {
            type: String,
            default: '24',
        },
        color: {
            type: String,
            default: 'gray-300',
        },
        animate: {
            type: Boolean,
            default: true,
        },
    });

    const spinnerClass = computed(() => {
        return {
            'animate-spin': props.animate,
            [`text-${props.color}`]: true,
        };
    });
</script>
