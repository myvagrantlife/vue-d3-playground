import cola from "cytoscape-cola";

<template>
  <div class="cyto">
    <Cyto />
  </div>
</template>

<script>
import Cyto from "@/components/Cyto.vue";

export default {
  components: {
    Cyto
  }
};
</script>


<style scoped>
.cyto {
  width: 100%;
  height: 100%;
}
</style>

