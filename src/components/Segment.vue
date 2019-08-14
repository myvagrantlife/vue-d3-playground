<template>
  <g>
    <rect
      :x="item.shape.cx"
      :y="item.shape.cy"
      width="100"
      height="40"
      fill="#e69138"
      @click="onClick(item)"
    />
    <text :x="item.shape.cx" :y="item.shape.cy + 25" fill="#ffffff">{{ item.title }}</text>
  </g>
</template>

<script>
import * as d3 from "d3";
import Vue from "vue";

Vue.directive("wraptext", {
  bind(el, binding) {
    var width = binding.value;
    var text = d3.select(el),
      words = text
        .text()
        .split(/\s+/)
        .reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");
  },
  update(el, binding) {
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  }
});

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    test() {}
  },
  computed: {
    d() {
      return this.data;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>