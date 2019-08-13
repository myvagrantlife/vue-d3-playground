<template>
  <svg>
    <path stroke="#90b1c5" fill="none" stroke-width="5" :d="d" />
    <circle
      r="10"
      v-for="(item, index) in dataset"
      :cx="item[0]"
      :cy="item[1]"
      :key="index"
      fill="#5184a2"
      @click="onClick(item)"
    />
  </svg>
</template>

<script>
import * as d3 from "d3";
import _ from "lodash";
import dataset from "@/data/dots.json";

export default {
  data() {
    return {
      dataset
    };
  },
  methods: {
    onClick(item) {
      console.log("this is the item!", item);
      this.dataset = _.shuffle(this.dataset);
    }
  },
  computed: {
    lineGenerator() {
      return d3
        .line()
        .curve(d3["curveMonotoneX"])
        .x(v => v[0])
        .y(v => v[1]);
    },
    d() {
      return this.lineGenerator(this.dataset);
    }
  }
};
</script>

<style lang="scss" scoped>
path,
circle {
  transition: all 500ms ease;
}

circle:hover {
  fill: red;
}
</style>