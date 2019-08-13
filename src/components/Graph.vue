<template>
  <svg>
    <path stroke="#90b1c5" fill="none" stroke-width="5" :d="d" />
    <circle
      r="10"
      v-for="(item, index) in dataset"
      :cx="item.shape.cx"
      :cy="item.shape.cy"
      :key="index"
      :fill="index === 0 ? '#5184a2': '#000000'"
      @click="onClick(item)"
    />
  </svg>
</template>

<script>
import * as d3 from "d3";
import _ from "lodash";
import dataset from "@/data/graph.json";

export default {
  data() {
    return {
      boundingBox: {
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        top: 0,
        bottom: 300,
        left: 0,
        right: 400
      },
      rawDataset: dataset
    };
  },
  methods: {
    onClick(item) {
      console.log("this is the item!", item);
      this.dataset = _.shuffle(this.dataset);
    },
    processRawDataset(data) {
      let dt = data.filter(item => !!item.type);
      let segments = data.filter(item => item.type === "SEGMENT");
      // TODO: decide whether to include sides as well

      //   this.boundingBox =
      let startArc = -Math.PI * 0.75;
      let arcLength = Math.PI * 1.5;
      let endArc = startArc + arcLength;
      let arcStep = (endArc - startArc) / (segments.length - 1);
      let currentArcPosition = startArc;

      let middle = {
        x:
          this.boundingBox.left +
          (this.boundingBox.right - this.boundingBox.left) / 2.0,
        y:
          this.boundingBox.top +
          (this.boundingBox.bottom - this.boundingBox.top) / 2.0
      };
      let radius = {
        x: (this.boundingBox.right - this.boundingBox.left) / 2.0,
        y: (this.boundingBox.bottom - this.boundingBox.top) / 2.0
      };

      let arc = segments.map(seg => ({
        ...seg,
        shape: {
          cx: middle.x + Math.cos(currentArcPosition) * radius.x,
          cy: middle.y + Math.sin(currentArcPosition) * radius.y
        },
        arcPosition: (currentArcPosition += arcStep)
      }));
      return arc;
    }
  },
  computed: {
    dataset() {
      return this.processRawDataset(this.rawDataset, this.boundingBox);
    },
    lineGenerator() {
      return d3
        .line()
        .curve(d3["curveMonotoneX"])
        .x(v => v.shape.cx)
        .y(v => v.shape.cy);
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