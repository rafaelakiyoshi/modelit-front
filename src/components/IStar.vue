<template>
  <div class="istar">
  <h1>Welcome to I* Modeling</h1>
  <button @click="test">oioioi</button>
  <div style="width:100%; white-space:nowrap;">
    <span style="display: inline-block; horizontal-align: top; width:100px">
      <center><div id="myPaletteDiv" style="border: solid 1px black; height: 600px;"></div></center>
    </span>

    <span style="display: inline-block; vertical-align: top; width:80%">
      <div id="myDiagramDiv" style="border: solid 1px black; height: 600px"></div>
    </span>
  </div>
  </div></center>
  </div>
</template>

<script>
/*eslint-disable */
import * as go from 'gojs'
export default {
  name: 'istar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      $: null,
      diagram: null,
      linkType: null
    }
  },
  methods: {
    test () {
      this.diagram.linkTemplate =
      alert('oi')
    },
  },
  mounted () {
    this.$ = go.GraphObject.make
    this.diagram = new go.Diagram('myDiagramDiv')
    this.diagram.initialContentAlignment = go.Spot.Center
    this.diagram.undoManager.isEnabled = true
    this.diagram.allowDrop = true
    this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom
    // this.diagram.linkReshapingTool= new CurvedLinkReshapingTool()
    var diagram = this.diagram
    var $ = this.$
    var linkType = this.linkType
    diagram.initialContentAlignment = go.Spot.Center;

    diagram.toolManager.linkingTool.temporaryLink =
    $(go.Link,
      { layerName: "Tool" },
      $(go.Shape,
        { stroke: "red", strokeWidth: 2, strokeDashArray: [4, 2] })
      );

  var AdornmentDefault =
  $(go.Adornment, "Vertical",
  $(go.Panel, "Auto",
    $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 2 }),
    $(go.Placeholder)
  ),
  $(go.Panel, "Horizontal",
    { defaultStretch: go.GraphObject.Vertical },
    $("Button",
    $(go.TextBlock, "--D--",  // the Button content
      { font: "bold 8pt sans-serif" }),
      { click: function(e, button) {
        linkType = "-D-"
        console.log(linkType);
        var node = button.part.adornedPart;
        var tool = e.diagram.toolManager.linkingTool;
        tool.startObject = node.port;
        e.diagram.currentTool = tool;
        tool.doActivate();
      }}),
    $("Button",
    $(go.TextBlock, "----o",  // the Button content
      { font: "bold 8pt sans-serif" }),
      { click: function(e, button) {
        linkType = "--o"
        console.log(linkType);
        var node = button.part.adornedPart;
        var tool = e.diagram.toolManager.linkingTool;
        tool.startObject = node.port;
        e.diagram.currentTool = tool;
        tool.doActivate();
      }}),
    $("Button",
    $(go.TextBlock, "---->",  // the Button content
      { font: "bold 8pt sans-serif" }),
      { click: function(e, button) {
        linkType = "-->"
        console.log(linkType);
        var node = button.part.adornedPart;
        var tool = e.diagram.toolManager.linkingTool;
        tool.startObject = node.port;
        e.diagram.currentTool = tool;
        tool.doActivate();
      }}),
    $("Button",
    $(go.TextBlock, "----|>",  // the Button content
      { font: "bold 8pt sans-serif" }),
      { click: function(e, button) {
        linkType = "-|>"
        console.log(linkType);
        var node = button.part.adornedPart;
        var tool = e.diagram.toolManager.linkingTool;
        tool.startObject = node.port;
        e.diagram.currentTool = tool;
        tool.doActivate();
      }}),
    $("Button",
    $(go.TextBlock, "- - -",  // the Button content
      { font: "bold 8pt sans-serif" }),
      { click: function(e, button) {
        linkType = "-.-"
        console.log(linkType);
        var node = button.part.adornedPart;
        var tool = e.diagram.toolManager.linkingTool;
        tool.startObject = node.port;
        e.diagram.currentTool = tool;
        tool.doActivate();
      }}),
    $("Button",
    $(go.TextBlock, "----|-",  // the Button content
      { font: "bold 8pt sans-serif" }),
      { click: function(e, button) {
        linkType = "-|-"
        console.log(linkType);
        var node = button.part.adornedPart;
        var tool = e.diagram.toolManager.linkingTool;
        tool.startObject = node.port;
        e.diagram.currentTool = tool;
        tool.doActivate();
      }})
  )
);

  var tempfromnode =
  $(go.Node,
    { layerName: "Tool" },
    $(go.Shape, "RoundedRectangle",
    { stroke: "chartreuse", strokeWidth: 3, fill: null,
    portId: "", width: 1, height: 1 })
  );
  diagram.toolManager.linkingTool.temporaryFromNode = tempfromnode;
  diagram.toolManager.linkingTool.temporaryFromPort = tempfromnode.port;

  var temptonode =
  $(go.Node,
    { layerName: "Tool" },
    $(go.Shape, "RoundedRectangle",
    { stroke: "cyan", strokeWidth: 3, fill: null,
    portId: "", width: 1, height: 1 })
  );
  diagram.toolManager.linkingTool.temporaryToNode = temptonode;
  diagram.toolManager.linkingTool.temporaryToPort = temptonode.port;



    var quality =
      $(go.Node, "Spot",
      { resizable: true, resizeObjectName: "SHAPE",  // resize the Shape, not the Node
      selectionAdornmentTemplate: AdornmentDefault,
      selectionObjectName: "SHAPE",
      mouseEnter: function(e, obj, prev) {  // change group's background brush
           var shape = obj.part.findObject("SHAPE");
           if (shape) shape.fill = "green";
         },

       mouseLeave: function(e, obj, next) {  // restore to original brush
           var shape = obj.part.findObject("SHAPE");
           if (shape) shape.fill = "rgb(193,255,193)";
         }
      // end Adornment
      },
    $(go.Shape,
      { name: "SHAPE", geometryString: "F m8.621092,20.678718c-10.343776,27.647037 1.635785,60.588187 17.478679,61.176421c15.842894,0.588235 32.472693,-22.352924 83.203194,-5.882348c50.730502,16.470576 51.341988,-21.176453 51.341988,-30.588211c0,-9.411758 3.668189,-40.5882 -16.665717,-42.352906c-20.333906,-1.764706 -23.982374,14.117635 -71.540641,10.588226c-47.558267,-3.52941 -53.473727,-20.588219 -63.817503,7.058818z",
      strokeWidth: 1,
      portId: "",
      fromLinkable: true,
      fromLinkableSelfNode: true,
      fromLinkableDuplicates: true,
      toLinkable: true,
      toLinkableDuplicates: true,
      cursor: "pointer",
      fill: "rgb(193,255,193)",width: 80, height: 40, maxSize: new go.Size(110, 60), minSize: new go.Size(70, 30)}),
      $(go.TextBlock, {editable: true, stroke: "blue", wrap: go.TextBlock.WrapFit, font: "9pt serif",wrap: go.TextBlock.WrapFit, textAlign: "center", text: "Quality" })
    );


    var task =
      $(go.Node, "Spot",
      { resizable: true, resizeObjectName: "SHAPE",  // resize the Shape, not the Node
      selectionAdornmentTemplate: AdornmentDefault,
      selectionObjectName: "SHAPE",
      mouseEnter: function(e, obj, prev) {  // change group's background brush
           var shape = obj.part.findObject("SHAPE");
           if (shape) shape.fill = "green";
         },

       mouseLeave: function(e, obj, next) {  // restore to original brush
           var shape = obj.part.findObject("SHAPE");
           if (shape) shape.fill = "rgb(193,255,193)";
         }
      },
        $(go.Shape,
            { name: "SHAPE", geometryString: "F M0,0 L5,2 L20,2 L25,0 L20,-2 L5,-2z",
          strokeWidth: 1,
          portId: "",
          fromLinkable: true,
          fromLinkableSelfNode: true,
          fromLinkableDuplicates: true,
          toLinkable: true,
          toLinkableDuplicates: true,
          cursor: "pointer",
          fill: "rgb(193,255,193)",width: 80, height: 40, maxSize: new go.Size(110, 60), minSize: new go.Size(70, 30)}),
          $(go.TextBlock, {editable: true, stroke: "blue", wrap: go.TextBlock.WrapFit, font: "9pt serif", textAlign: "center", text: "Task" })
        );

      var goal =
        $(go.Node, "Spot",
        { resizable: true, resizeObjectName: "SHAPE",  // resize the Shape, not the Node
        selectionAdornmentTemplate: AdornmentDefault,
        selectionObjectName: "SHAPE",
        mouseEnter: function(e, obj, prev) {  // change group's background brush
             var shape = obj.part.findObject("SHAPE");
             if (shape) shape.fill = "green";
           },

         mouseLeave: function(e, obj, next) {  // restore to original brush
             var shape = obj.part.findObject("SHAPE");
             if (shape) shape.fill = "rgb(193,255,193)";
           }
             },
          $(go.Shape,
              { name: "SHAPE", geometryString: "F M 46.92 1 L 105.08 1 C 130.44 1 151 14.43 151 31 C 151 47.57 130.44 61 105.08 61 L 46.92 61 C 21.56 61 1 47.57 1 31 C 1 14.43 21.56 1 46.92 1 Z",
            strokeWidth: 1,
            portId: "",
            fromLinkable: true,
            fromLinkableSelfNode: true,
            fromLinkableDuplicates: true,
            toLinkable: true,

            toLinkableDuplicates: true,
            cursor: "pointer",
            fill: "rgb(193,255,193)",width: 80, height: 40, maxSize: new go.Size(110, 60), minSize: new go.Size(70, 30)}),
            $(go.TextBlock, {editable: true, stroke: "blue", wrap: go.TextBlock.WrapFit, font: "9pt serif", textAlign: "center", text: "Goal" })
          );

    var resource =
      $(go.Node, "Spot",
      { resizable: true, resizeObjectName: "SHAPE",  // resize the Shape, not the Node
      selectionAdornmentTemplate: AdornmentDefault,
      selectionObjectName: "SHAPE",
      mouseEnter: function(e, obj, prev) {  // change group's background brush
           var shape = obj.part.findObject("SHAPE");
           if (shape) shape.fill = "green";
         },

       mouseLeave: function(e, obj, next) {  // restore to original brush
           var shape = obj.part.findObject("SHAPE");
           if (shape) shape.fill = "rgb(193,255,193)";
         }
      },
        $(go.Shape, "Rectangle",
            { name: "SHAPE",
          strokeWidth: 1,
          portId: "",
          fromLinkable: true,
          fromLinkableSelfNode: true,
          fromLinkableDuplicates: true,
          toLinkable: true,
          toLinkableDuplicates: true,
          cursor: "pointer",
          fill: "rgb(193,255,193)",width: 70, height: 40, maxSize: new go.Size(80, 50), minSize: new go.Size(60, 30)}),
          $(go.TextBlock, {editable: true, stroke: "blue", wrap: go.TextBlock.WrapFit, font: "9pt serif", textAlign: "center", text: "Resource" })
        );


    diagram.linkTemplateMap.add("-D-",
      $(go.Link,
        { curve: go.Link.Bezier, reshapable: true  },
        $(go.Shape, {fill: "blue", stroke: "blue" }),                           // this is the link shape (the line)
            $(go.Shape,  // the label background, which becomes transparent around the edges
              { fill: $(go.Brush, "Radial", { 0: "rgb(240, 240, 240)", 0.1: "rgb(240, 240, 240)", 0.1: "rgba(240, 240, 240, 0)" }),
              stroke: null }),
              $(go.TextBlock, {stroke: "black", text: "D",font: "bold 10pt arial", segmentOffset: new go.Point(0, 0),
                segmentOrientation: go.Link.OrientAlong })
      )
    );

    diagram.linkTemplateMap.add("-->",
    $(go.Link,
      { curve: go.Link.Bezier, reshapable: true  },
      $(go.Shape, {fill: "blue", stroke: "blue" }),                           // this is the link shape (the line)
      $(go.Shape, { toArrow: "OpenTriangle", fill: "blue", stroke: "blue" }),  // this is an arrowhead
      $(go.Shape,  // the label background, which becomes transparent around the edges
        { fill: $(go.Brush, "Radial", { 0: "rgb(240, 240, 240)", 0.1: "rgb(240, 240, 240)", 0.5: "rgba(240, 240, 240, 0)" }),
        stroke: null }),
        $(go.TextBlock, {editable: true, stroke: "blue", text: "link", segmentOffset: new go.Point(0, 0),
            segmentOrientation: go.Link.OrientUpright })
      ));

    diagram.linkTemplateMap.add("--o",
    $(go.Link,
      { curve: go.Link.Bezier, reshapable: true  },
      $(go.Shape, {fill: "blue", stroke: "blue" }),                           // this is the link shape (the line)
      $(go.Shape, { toArrow: "Circle", fill: "blue", stroke: "blue" }),  // this is an arrowhead
      ));

    diagram.linkTemplateMap.add("-|>",
    $(go.Link,
      { curve: go.Link.Bezier, reshapable: true  },
      $(go.Shape, {fill: "blue", stroke: "blue" }),                           // this is the link shape (the line)
      $(go.Shape, { toArrow: "Triangle", fill: "blue", stroke: "blue" }),  // this is an arrowhead
      ));

    diagram.linkTemplateMap.add("-|-",
    $(go.Link,
      { curve: go.Link.Bezier, reshapable: true  },
      $(go.Shape, {fill: "blue", stroke: "blue" }),                           // this is the link shape (the line)
      $(go.Shape, { toArrow: "ForwardSlash", fill: "blue", stroke: "blue" }),  // this is an arrowhead
      ));

    diagram.linkTemplateMap.add("-.-",
    $(go.Link,
      { curve: go.Link.Bezier },
      $(go.Shape, {fill: "blue", stroke: "blue", strokeDashArray: [4,2]}),                           // this is the link shape (the line)
      ));


    diagram.groupTemplateMap.add("actor",
    $(go.Group, "Vertical", {
      resizable: true, resizeObjectName: "SHAPE", selectionObjectName: "SHAPE",
      selectionAdornmentTemplate: AdornmentDefault,
      handlesDragDropForMembers: true,
        // support highlighting of Groups when allowing a drop to add a member
        mouseDragEnter: function(e, grp, prev) {
          // this will call samePrefix; it is true if any node has the same key prefix
          if (grp.canAddMembers(grp.diagram.selection)) {
            var shape = grp.findObject("SHAPE");
            if (shape) shape.fill = "green";
            grp.diagram.currentCursor = "";
          } else {
            grp.diagram.currentCursor = "not-allowed";
          }
        },
        mouseDragLeave: function(e, grp, next) {
          var shape = grp.findObject("SHAPE");
          if (shape) shape.fill = "rgb(193,255,193)";
          grp.diagram.currentCursor = "";
        },
        // actually add permitted new members when a drop occurs
        mouseDrop: function(e, grp) {
          if (grp.canAddMembers(grp.diagram.selection)) {
            // this will only add nodes with the same key prefix
            grp.addMembers(grp.diagram.selection, true);
          } else {  // and otherwise cancel the drop
            grp.diagram.currentTool.doCancel();
          }
        }
    },
    $(go.Panel, "Spot",
    // { resizable: true, resizeObjectName: "SHAPE",  // resize the Shape, not the Node
    //       selectionObjectName: "SHAPE" },
      $(go.Shape,
        // { resizable: true },
          { name: "SHAPE", geometryString: "F M0,0 a30,30 0 1,0 60,5a30,30 0 1,0 -60,0z",
        alignment: go.Spot.Right,
        strokeWidth: 1,
        portId: "",
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,
        toLinkableDuplicates: true,
        cursor: "pointer",
        fill: "rgb(193,255,193)",width: 60, height: 60, maxSize: new go.Size(80, 80), minSize: new go.Size(50, 50)},
        new go.Binding("geometryString", "path")),
        $(go.TextBlock, {editable: true, stroke: "blue", wrap: go.TextBlock.WrapFit, font: "9pt serif", textAlign: "center"},
        new go.Binding("text", "text")
      ),
      {
        contextMenu:                            // define a context menu for each node
          $(go.Adornment, "Vertical",        // that has several buttons around
            $(go.Placeholder),  // a Placeholder object
            $("ContextMenuButton", $(go.TextBlock, "Actor"),
              { click: this.test }),
            $("ContextMenuButton", $(go.TextBlock, "Agent"),
            { click: this.test }),
            $("ContextMenuButton", $(go.TextBlock, "Role"),
              { click: this.test })
          )  // end Adornment
      },
    $("SubGraphExpanderButton", {alignment: go.Spot.TopRight })),
      $(go.Panel, "Auto",
      $(go.Shape, "Ellipse", {fill: "lightgray", cursor: "pointer", fromLinkable: true, toLinkable: true,
      fromLinkableDuplicates: true, toLinkableDuplicates: true, strokeWidth: 1,
                    strokeDashArray: [6, 6, 6, 6]}),
        $(go.Placeholder)
      ),
      { mouseEnter: function(e, obj, prev) {  // change group's background brush
            var shape = obj.part.findObject("SHAPE");
            if (shape) shape.fill = "green";
          },

        mouseLeave: function(e, obj, next) {  // restore to original brush
            var shape = obj.part.findObject("SHAPE");
            if (shape) shape.fill = "rgb(193,255,193)";
          } }));



          var templmap = new go.Map("string", go.Node);
          templmap.add("quality", quality);
          templmap.add("task", task);
          templmap.add("goal", goal);
          templmap.add("resource", resource);
          templmap.add("", diagram.nodeTemplate);
          diagram.nodeTemplateMap = templmap;

          var myPalette =
          $(go.Palette, "myPaletteDiv",  // must name or refer to the DIV HTML element
              {
                "animationManager.duration": 800, // slightly longer than default (600ms) animation
                nodeTemplateMap: diagram.nodeTemplateMap,  // share the templates used by myDiagram
                groupTemplateMap: diagram.groupTemplateMap,
                linkTemplateMap: diagram.linkTemplateMap,
                model: new go.GraphLinksModel([  // specify the contents of the Palette
                  { category: "resource", key: "resource"},
                  { category: "task", key: "task"},
                  { category: "quality", key: "quality"},
                  { category: "goal", key: "goal"},
                  { key: "actor", isGroup: true, category: "actor", text: "Actor"},
                  { key: "role", isGroup: true, category: "actor", text: "Role", path: "F M0,0 a30,30 0 1,0 60,0a30,30 0 1,0 -60,0z, M 0,0 C 0,25   60,25   60,0"},
                  { key: "agent", isGroup: true, category: "actor", text: "Agent", path: "F M0,0 a30,30 0 1,0 60,5a30,30 0 1,0 -60,0z, M 8,-15 L 52,-15 z"},
                ])
              });
              myPalette.scale = 0.7
              diagram.addDiagramListener("LinkDrawn", function(e) {
                var link = e.subject;
                diagram.startTransaction("add link data");
                diagram.model.setDataProperty(link.data, "category", linkType);
                diagram.commitTransaction("add link data");
                linkType = ""

              });

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
