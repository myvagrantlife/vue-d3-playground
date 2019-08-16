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
import chroma from "chroma-js";
import config from "../data/cyto.json";
import mongo from "../data/mongo.json";
import bmc from "../data/bmc.json";
import nodeHtmlLabel from "cytoscape-node-html-label";
import viewUtilities from "cytoscape-view-utilities";
import undoRedo from "cytoscape-undo-redo";
import cxtmenu from "cytoscape-cxtmenu";
import edgehandles from "cytoscape-edgehandles";

import { constants } from "crypto";

const canvas = mongo.canvas["7"];
const assumptions = Object.values(canvas.assumptions).map(({ title, id }) => ({
  data: { id, label: title },
  classes: ["assumption", "defaultLabel"]
}));
const hypotheses = [];
const segments = Object.values(bmc).map(({ slug, title, headline }) => ({
  data: { type: "segment", id: slug, label: title, tooltip: headline },
  classes: ["segment", "defaultLabel"]
}));

config.style = config.style.map(style => {
  if (
    style.css &&
    !style.css["border-color"] &&
    style.css["background-color"]
  ) {
    // make the border color a slightly darker version of background-color
    style.css["border-color"] = chroma(style.css["background-color"])
      .darken(0.3)
      .hex();
  }

  return style;
});

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

const edgehandlesConfig = {
  /* https://github.com/cytoscape/cytoscape.js-edgehandles */
  preview: true, // whether to show added edges preview before releasing selection
  hoverDelay: 150, // time spent hovering over a target node before it is considered selected
  handleNodes: "node", // selector/filter function for whether edges can be made from a given node
  snap: false, // when enabled, the edge can be drawn by just moving close to a target node
  snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
  handlePosition: function(node) {
    return "middle bottom"; // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
  }
};

const processRawDataset = (segments, boundingBox) => {
  let startArc = -Math.PI * 0.75;
  let arcLength = Math.PI * 1.5;
  let endArc = startArc + arcLength;
  let arcStep = (endArc - startArc) / (segments.length - 1);
  let currentArcPosition = startArc;

  let middle = {
    x: boundingBox.left + (boundingBox.right - boundingBox.left) / 2.0,
    y: boundingBox.top + (boundingBox.bottom - boundingBox.top) / 2.0
  };
  let radius = {
    x: (boundingBox.right - boundingBox.left) / 2.0,
    y: (boundingBox.bottom - boundingBox.top) / 2.0
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
};

export default {
  data() {
    return {
      config: {
        ...config,
        elements: {
          nodes: [...assumptions, ...processRawDataset(segments, boundingBox)],
          edges: []
        }
      },
      i: 1
    };
  },
  created() {
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);

    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
  },
  methods: {
    keyDown(event) {
      if (event.key === "Alt") {
        this.eh.enable();
        this.eh.enableDrawMode();
        // TODO: update hover style for UX
      }
      if (event.key === "z" && (event.metaKey || event.ctrlKey)) {
        this.ur.undo();
        event.stopPropagation();
        event.preventDefault();
      } else if (event.key === "y" && (event.metaKey || event.ctrlKey)) {
        this.ur.redo();
        event.stopPropagation();
        event.preventDefault();
      } else if (event.key === "l" && (event.metaKey || event.ctrlKey)) {
        let layout = this.cy.layout({
          ...config.layout
        });
        layout.run();
        event.stopPropagation();
        event.preventDefault();
      }
    },
    keyUp(event) {
      if (event.key === "Alt") {
        this.eh.disableDrawMode();
        this.eh.disable();
        // TODO: remove hover style for UX
      }
    },
    preConfig(cytoscape) {
      // cytoscape: this is the cytoscape constructor
      try {
        cytoscape.use(cola);
        undoRedo(cytoscape);
        cytoscape.use(edgehandles);
        cytoscape.use(cxtmenu);
        // viewUtilities(cytoscape);
      } catch (err) {
        console.warn(err);
      }
      //   try {
      //     nodeHtmlLabel(cytoscape);
      //   } catch (err) {
      //     console.error(err);
      //   }
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance

      //   cy.nodeHtmlLabel([
      //     {
      //       query: ".segment", // cytoscape query selector
      //       halign: "center", // title vertical position. Can be 'left',''center, 'right'
      //       valign: "center", // title vertical position. Can be 'top',''center, 'bottom'
      //       halignBox: "center", // title vertical position. Can be 'left',''center, 'right'
      //       valignBox: "center", // title relative box vertical position. Can be 'top',''center, 'bottom'
      //       cssClass: "label", // any classes will be as attribute of <div> container for every title
      //       tpl: function(data) {
      //         return `<span>${data.label}</span>`;
      //       } // your html template here
      //     }
      //   ]);

      let eh = cy.edgehandles(edgehandlesConfig);
      eh.disable();
      var ur = cy.undoRedo({
        debug: true
      });
      var ctxmenu = cy.cxtmenu({
        commands: [
          {
            // example command (https://github.com/cytoscape/cytoscape.js-cxtmenu)
            fillColor: "rgba(200, 200, 200, 0.75)", // optional: custom background color for item
            content: "new connection", // html/text content to be displayed in the menu
            contentStyle: {}, // css key:value pairs to set the command's css in js if you want
            select(ele) {
              eh.enable();
              eh.start(ele);
              const completeHandler = (
                event,
                sourceNode,
                targetNode,
                addedEles
              ) => {
                let { position } = event;
                eh.hide();
                eh.disable();
                // ...
              };
              cy.on("ehcomplete", completeHandler);
            },
            enabled: true // whether the command is selectable
          }
        ]
      });
      this.cy = cy;
      this.eh = eh;
      this.ur = ur;
      this.ctxmenu = ctxmenu;
    }
  }
};
</script>

<style lang="scss" scoped>
#holder {
  width: 100%;
  height: 100%;
  text-align: initial;
  background-color: #eaeef1;
  background-color: #e4e7eb;
  background: url("/img/bg/img-noise-300x300.png");
}
#cytoscape {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  & ::v-deep .label {
    font-size: 40%;

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