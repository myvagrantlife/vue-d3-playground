<template>
 <svg easypz='{ "applyTransformTo": "svg > *", "modes": ["SIMPLE_PAN", "FLICK_PAN", "DBLCLICK_ZOOM_IN", "DBLRIGHTCLICK_ZOOM_OUT", "WHEEL_ZOOM_EASE", "PINCH_ZOOM"], "options": { "minScale": 0.5, "maxScale": 1.5, "bounds": { "top": -4000, "right": 4000, "bottom": 4000, "left": -4000 } }, "modeSettings": { "SIMPLE_PAN": { "minDistance": 3, "delay": "100" }, "FLICK_PAN": { "minDistance": 3, "delay": 300, "friction": 0.005 }, "DBLCLICK_ZOOM_IN": { "dblClickTime": 300, "zoomInScaleChange": "0.3", "zoomOutScaleChange": 3, "maxHoldTime": 200 }, "WHEEL_ZOOM": { "zoomInScaleChange": 0.8, "zoomOutScaleChange": 1.2, "momentumSpeedPercentage": 0.001, "momentumFriction": 0.000004, "easeDuration": 300 }, "PINCH_ZOOM": { "friction": "0.00001" }, "WHEEL_PAN_X": { "speed": 50 }, "BRUSH_ZOOM": { "minDistance": 3, "delay": 300, "minTime": 150 }, "DYNAMIC_ZOOM_X_STATIC": { "speed": 0.05, "minDistance": 3, "delay": 300, "minDirectionPercentage": 0.7 }, "RUB_ZOOM_IN_X": { "speed": 0.02, "minDistance": 15, "minDistanceAfterDirectionChange": 10 }, "SHIFT_DRAG_ZOOM": { "speed": 0.05 } } }'>
    <path stroke="#90b1c5" fill="none" stroke-width="5" :d="d" />
    <g v-for="(item, index) in dataset" :key="index">
      <rect 
        :x="item.x" 
        :y="item.y"
        width="100" 
        height="40" 
        fill="#e69138" 
        @click="onClick(item)" />
      <text 
        :x="item.x + 35" 
        :y="item.y + 25"
        fill="#ffffff">test</text>
    </g>
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
      console.log(`open the menu for item: ${item.title}`)
      this.dataset = _.shuffle(this.dataset);
    }
  },
  computed: {
    lineGenerator() {
      return d3
        .line()
        .curve(d3["curveMonotoneX"])
        .x(v => v.x + 50)
        .y(v => v.y + 20);
    },
    d() {
      return this.lineGenerator(this.dataset);
    }
  }
};
</script>

<style lang="scss" scoped>
/* path,
circle {
  transition: all 500ms ease;
} */

svg {
  width:100vw;
  height:90vh;
}

rect:hover {
  fill: #dc8427;
  cursor: pointer;
}
</style>