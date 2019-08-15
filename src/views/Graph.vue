<template>
  <div class="graph">
    <Graph />
  </div>
</template>

<script>
import Graph from "@/components/Graph.vue";

export default {
  components: {
    Graph
  }
};
</script>

<style scoped>
.graph {
  width: 100%;
  height: 100%;
}
</style>
