<template>
  <div class="arc">
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
      <D3Arc v-bind="arcProps" fill="#d8c866" />
    </svg>
  </div>
</template>

<script>
import D3Arc from "@/components/D3Arc.vue";
import ValueSlider from "@/components/ValueSlider.vue";

export default {
  components: {
    D3Arc,
    ValueSlider
  },
  data() {
    return {
      arcProps: {
        startAngle: 0,
        endAngle: 2,
        innerRadius: 0,
        outerRadius: 150,
        cornerRadius: 0
      },
      arcRanges: {
        cornerRadius: [0, 50],
        endAngle: [0, 6.283185307179586],
        innerRadius: [0, 300],
        outerRadius: [0, 500],
        startAngle: [0, 6.283185307179586]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.arc {
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
