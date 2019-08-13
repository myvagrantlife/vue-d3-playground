<template>
  <g>
    <path :id="id" :fill="fill" :d="d" />
    <text x="10" y="100">
      <textPath :href="id">test</textPath>
    </text>
  </g>
</template>

<script>
import * as d3 from "d3-shape";

export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    fill: {
      type: String,
      default: "#000000"
    },
    innerRadius: {
      type: Number,
      default: 0
    },
    outerRadius: {
      type: Number,
      default: 100
    },
    startAngle: {
      type: Number,
      default: 0
    },
    endAngle: {
      type: Number,
      default: 2
    },
    cornerRadius: {
      type: Number,
      default: 10
    }
  },
  computed: {
    arcGenerator() {
      return d3
        .arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius)
        .cornerRadius(this.cornerRadius)
        .startAngle(this.startAngle)
        .endAngle(this.endAngle);
    },
    d() {
      return this.arcGenerator();
    }
  }
};
</script>