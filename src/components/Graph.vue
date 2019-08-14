<template>
  <svg ref="svg">
    <!-- <switch>
      <g requiredFeatures="http://www.w3.org/Graphics/SVG/feature/1.2/#TextFlow">
        <textArea width="200" height="auto">Text goes here</textArea>
      </g>
      <foreignObject
        width="200"
        height="200"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
        <p xmlns="http://www.w3.org/1999/xhtml">Text goes here</p>
      </foreignObject>
      <text x="20" y="20">No automatic linewrapping.</text>
    </switch>-->
    <Segment v-for="(item, index) in dataset" :item="item" :key="index" />
  </svg>
</template>

<script>
import * as d3 from "d3";
import _ from "lodash";
import Segment from "@/components/Segment.vue";

import dataset from "@/data/graph.json";

export default {
  data() {
    let boundingBox = {
      x: 50,
      y: 50,
      width: 400,
      height: 300,
      get top() {
        return this.y;
      },
      get left() {
        return this.x;
      },
      get right() {
        return this.x + this.width;
      },
      get bottom() {
        return this.y + this.height;
      }
    };
    return {
      boundingBox,
      rawDataset: dataset
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  mounted() {
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    onClick(item) {
      console.log("this is the item!", item);
      this.dataset = _.shuffle(this.dataset);
    },
    handleResize(event) {
      this.boundingBox.x = 50;
      this.boundingBox.y = 50;
      this.boundingBox.width = this.$refs.svg.clientWidth - 100;
      this.boundingBox.height = this.$refs.svg.clientHeight - 100;
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
  components: {
    Segment
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

svg {
  width: 100vw;
  height: 90vh;
}

circle:hover {
  fill: red;
}
</style>