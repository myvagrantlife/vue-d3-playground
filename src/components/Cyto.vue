<template>
  <div id="holder">
    <cytoscape
      class="cytoscape"
      id="cytoscape"
      :config="config"
      :preConfig="preConfig"
      :afterCreated="afterCreated"
    />
  </div>
</template>

<script>
import cola from "cytoscape-cola";
import config from "../data/cyto.json";
import nodeHtmlLabel from "cytoscape-node-html-label";
import { constants } from "crypto";

export default {
  data() {
    return {
      config,
      i: 1
    };
  },
  methods: {
    preConfig(cytoscape) {
      // cytoscape: this is the cytoscape constructor
      cytoscape.use(cola);
      try {
        nodeHtmlLabel(cytoscape);
      } catch (err) {
        console.error(err);
      }
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log("calling afterCreated", cy);
      cy.nodeHtmlLabel([
        {
          query: "node", // cytoscape query selector
          halign: "center", // title vertical position. Can be 'left',''center, 'right'
          valign: "center", // title vertical position. Can be 'top',''center, 'bottom'
          halignBox: "center", // title vertical position. Can be 'left',''center, 'right'
          valignBox: "center", // title relative box vertical position. Can be 'top',''center, 'bottom'
          cssClass: "label", // any classes will be as attribute of <div> container for every title
          tpl: function(data) {
            return `<span>${data.label}</span>`;
          } // your html template here
        }
      ]);
      this.cy = cy;
    }
  }
};
</script>

<style lang="scss" scoped>
#holder {
  width: 100%;
  height: 500px;
  text-align: initial;
}
#cytoscape {
  left: 0;
  width: 100%;
  height: 100%;
  & ::v-deep .label {
    font-size: 180%;

    max-width: 8em;
    min-width: 1em;
    background-color: whitesmoke;
    border: 2px #999 solid;
    color: #999;
    padding: 0.3em 0.4em;
    text-align: center;
    overflow: hidden;
  }
}
</style>