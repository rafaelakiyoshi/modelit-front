<template>
  <div class="istar">
  <Button-group size="large">
    <Button @click="exportSVG" type="ghost" disabled>Exportar SVG</Button>
    <Button @click="loadExport" type="ghost">Exportar JSON</Button>
    <Button @click="modal6 = true" type="ghost">Importar JSON</Button>
  </Button-group>
  <Row>
        <Col span="18" push="6">
          <Input v-model="desc" size="large" placeholder="Descrição do Diagrama"></Input>
        </Col>
        <Col span="6" pull="18">
          <Input v-model="titulo" size="large" placeholder="Título do Diagrama"></Input>
        </Col>
    </Row>
  <Modal
        v-model="modal6"
        title="Importar JSON"
        :loading="loading"
        @on-ok="asyncOK">
        <Form :model="formItem">
          <Form-item>
            <Input v-model="formItem.json" type="textarea" :autosize="{minRows: 8,maxRows: 15}" placeholder="Cole aqui o seu JSON..."></Input>
          </Form-item>
        </Form>
    </Modal>

    <Modal
          v-model="modalExport"
          title="JSON"
          @on-cancel="close"
          @on-ok="close">
          <Form :model="formItem">
            <Form-item>
              <Input v-model="json" type="textarea" :autosize="{minRows: 8,maxRows: 15}" readonly></Input>
            </Form-item>
          </Form>
      </Modal>
<div id="SVGArea"></div>
  <div style="width:100%; white-space:nowrap;">
    <div id="myPaletteDiv" style="border: solid 1px black; width: 100%; height: 90px"></div>
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 600px; margin-top: 3px"></div>
  <div id="description">
  </div>
  </div></center>
   <Row>
        <Col span="6" offset="4"><Button @click="saveDiagram()" type="success" long>Salvar</Button></Col>
        <Col span="6" offset="4"><Button type="success" long>Gerar Código</Button></Col>
    </Row>
  
  </div>
</template>

<script>
/*eslint-disable */
import * as go from 'gojs'
export default {
  name: 'istar',
  data () {
    return {
      formItem: {
        json: '',
      },
      image: '',
      json: '',
      msg: 'Welcome to Your Vue.js App',
      $: null,
      diagram: null,
      linkType: null,
      modal6: false,
      modalExport: false,
      loading: true,
      titulo: '',
      desc: ''
    }
  },
  methods: {
    saveDiagram() {
      let diagram = {
        title: this.titulo,
        desc: this.desc,
        diagram: this.diagram.model.toJson()
      }
      console.log(this.$store.getters.returnUser, diagram)
    },
    test () {
      this.diagram.linkTemplate =
      alert('oi')
    },
    asyncOK () {
      console.log('oi');
      this.diagram.model =go.Model.fromJson(this.formItem.json)
      this.formItem.json = ''
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    },
    close () {
      this.json = ''
      this.modalExport = false;
    },
    exportSVG () {
      var x = this.diagram.makeSvg()
      console.log(x);
      this.image = x
      var obj = document.getElementById("SVGArea");
      obj.appendChild(x);
      if (obj.children.length > 0) {
        obj.replaceChild(x, obj.children[0]);
      }
      // document.location = this.diagram.makeImage()
    },
    loadExport () {
      this.json = this.diagram.model.toJson()
      this.modalExport = true;
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

    var quality =
      $(go.Node, "Spot",
       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
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
      $(go.TextBlock, {editable: true, stroke: "blue", wrap: go.TextBlock.WrapFit, font: "9pt serif",wrap: go.TextBlock.WrapFit, textAlign: "center", text: "Quality" },
      new go.Binding("text").makeTwoWay()
      )
      );


    var task =
      $(go.Node, "Spot",
       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
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
          $(go.TextBlock, {editable: true, stroke: "blue", wrap: go.TextBlock.WrapFit, font: "9pt serif", textAlign: "center", text: "Task" },
          new go.Binding("text").makeTwoWay()
        )
        );

      var goal =
        $(go.Node, "Spot",
         new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
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
            $(go.TextBlock, {editable: true, stroke: "blue", wrap: go.TextBlock.WrapFit, font: "9pt serif", textAlign: "center", text: "Goal" },
            new go.Binding("text").makeTwoWay()
          )
          );

    var resource =
      $(go.Node, "Spot",
       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
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
          $(go.TextBlock, {editable: true, stroke: "blue", wrap: go.TextBlock.WrapFit, font: "9pt serif", textAlign: "center", text: "Resource" },
          new go.Binding("text").makeTwoWay()
        )
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
            segmentOrientation: go.Link.OrientUpright }, new go.Binding("text").makeTwoWay())
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
    $(go.Group, "Vertical",
     new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    {
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
      $(go.Shape,
          { name: "SHAPE", geometryString: "F M0,0 a30,30 0 1,0 60,5a30,30 0 1,0 -60,0z",
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
        new go.Binding("text", "text").makeTwoWay()
      ),
    $("SubGraphExpanderButton", {alignment: go.Spot.TopRight })),
      $(go.Panel, "Auto", {alignment: go.Spot.Bottom },
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
                layout: $(go.GridLayout, { alignment: go.GridLayout.LeftToRight }),
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
