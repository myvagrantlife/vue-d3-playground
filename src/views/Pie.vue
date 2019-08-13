<template>
  <div class="pie">
    <div class="controls">
      <div v-for="(item, index) in arcProps" :key="index">
        <ValueSlider
          :name="index"
          :min="arcRanges[index][0]"
          :max="arcRanges[index][1]"
          :step="0.000000000000001"
          v-model.number="arcProps[index]"
        />
      </div>
    </div>
    <svg>
      <D3Pie v-bind="arcProps" />
    </svg>
  </div>
</template>

<script>
import D3Pie from "@/components/D3Pie.vue";
import ValueSlider from "@/components/ValueSlider.vue";

export default {
  components: {
    D3Pie,
    ValueSlider
  },
  data() {
    return {
      arcProps: {
        startAngle: 0,
        endAngle: 6.283185307179586,
        innerRadius: 0,
        outerRadius: 150,
        cornerRadius: 0,
        padAngle: 0.059
      },
      arcRanges: {
        cornerRadius: [0, 100],
        endAngle: [0, 6.283185307179586],
        innerRadius: [0, 300],
        outerRadius: [0, 500],
        startAngle: [0, 6.283185307179586],
        padAngle: [0, 0.05 * 5]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.pie {
  height: 90vh;

  svg {
    position: relative;
    top: 30%;
    left: 50%;
    height: inherit;
    width: inherit;
    display: block;
    overflow: visible;
  }

  .controls {
    display: flex;
    justify-content: space-around;
    grid-area: controls;
  }
}
</style>