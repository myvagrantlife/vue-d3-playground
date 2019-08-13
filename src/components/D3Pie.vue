<template>
  <g>
    <D3Arc
      v-for="(item, index) in paths"
      :key="index"
      :id="`arc-${index}`"
      :fill="colors(paths.length)[index]"
      :start-angle="item.startAngle"
      :end-angle="item.endAngle"
      :cornerRadius="cornerRadius"
      :innerRadius="innerRadius"
      :outerRadius="outerRadius"
    />
  </g>
</template>

<script>
import * as d3 from "d3-shape";
import chroma from "chroma-js";
import D3Arc from "@/components/D3Arc.vue";

export default {
  components: {
    D3Arc
  },
  props: {
    inputDatum: {
      type: Array,
      default() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    },
    index: {
      type: Number,
      default: 0
    },
    startAngle: {
      type: Number,
      default: 0
    },
    endAngle: {
      type: Number,
      default: Math.PI * 2
    },
    cornerRadius: {
      type: Number,
      default: 10
    },
    innerRadius: {
      type: Number,
      default: 10
    },
    outerRadius: {
      type: Number,
      default: 10
    },
    padAngle: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      colors: chroma.scale(chroma.brewer.Set3).colors
    };
  },
  computed: {
    pieGenerator() {
      return d3
        .pie()
        .startAngle(this.startAngle)
        .endAngle(this.endAngle)
        .padAngle(this.padAngle);
    },
    paths() {
      return this.pieGenerator(this.inputDatum);
    }
  }
};
</script>
