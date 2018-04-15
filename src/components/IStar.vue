<template>
  <div class="istar">
    <Spin v-if="saving" fix><Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon><div>{{loadingMessage}}</div></Spin>
    <Button @click="handleRender" type="ghost" long><h1>{{titulo}}</h1></Button>
<div id="SVGArea"></div>
  <div style="width:100%; white-space:nowrap;">
    <div id="myPaletteDiv" style="border: solid 1px black; width: 100%; height: 90px"></div>
   
  <div id="description">
  </div>
  </div>

  <div :class="classGrid" v-if="show" disabled>
    <div class="grid-item2" @click="autoUpdate()" id="myDiagramDiv"></div>
      <div class="grid-item">
        <div class="grid-container2">
          <div class="grid-item3"><button @click="changeShowCode(false)" style="height: 100%; width:100%;">{{showCode}}</button></div>
          <div class="grid-item">
            <div class="CodeMirror">

              <h4>Modelos</h4>
              <codemirror class="CodeMirror" v-if="true" style="height: auto; width:100%;" align="left" v-model="codeModels" :options="cmOptions"></codemirror>
              <h4>Controladoras</h4>
              <codemirror class="CodeMirror" v-if="true" style="height: auto; width:100%;" align="left" v-model="codeControllers" :options="cmOptions"></codemirror>
              <Button @click="saveDiagram(true, true)" type="ghost" style="margin-top:6px" small long >Gerar Código</Button>
            </div>
            <!-- <codemirror v-if="true" style="height: auto; width:100%;" align="left" v-model="code" :options="cmOptions"></codemirror> -->
        </div> 
      </div>  
    </div>
</div>

  <div :class="classGrid" v-if="!show">
   <div class="grid-item" @click="autoUpdate()" id="myDiagramDiv"></div>
    <div class="grid-item3">
      <button @click="changeShowCode(true)" style="height: 100%; width:100%;">{{showCode}}</button>
      </div>
  </div>
<Button @click="saveDiagram()" type="ghost" long>Salvar</Button>
        <!-- <Col span="6" offset="4"><Button @click="saveDiagram(true)" type="success" long >Gerar Código</Button></Col> -->

      <Spin size="large" fix v-if="spinShow"></Spin>
      
  </div>
</template>

<script>
import oboe from "oboe";
/*eslint-disable */
import Vue from 'vue'
import * as go from "gojs";
import debounce from 'debounce'
import { codemirror } from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
// language js
import 'codemirror/mode/python/python.js'
// theme css
import 'codemirror/theme/base16-light.css'
export default {
  name: "istar",
  props: ["propDiagram"],
  data() {
    return {
      diagramCanvas: '',
      saving: false,
      show: false,
      showCode: '<',
      codeModels: '',
      codeControllers: '',
      classGrid: 'grid-container-not-show',
      cmOptions: {
        // codemirror option
        height: '800px',
        tabSize: 4,
        mode: 'text/x-python',
        lineNumbers: true,
        line: true,
        viewportMargin: Infinity
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      diagramID: null,
      titleEdit: false,
      descEdit: false,
      spinShow: false,
      formItem: {
        json: ""
      },
      image: "",
      json: "",
      msg: "Welcome to Your Vue.js App",
      $: null,
      diagram: null,
      linkType: null,
      modal6: false,
      modalExport: false,
      loading: true,
      titulo: "titulo...",
    };
  },
  components: {
    codemirror
  },
  methods: {
    handleRender () {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.titulo,
              autofocus: true,
              placeholder: this.titulo,
            },
            on: {
              input: (val) => {
                  this.titulo = val;
              }
            }
          })
        }
      })
    },
    autoUpdate: debounce(function (e) {
      console.log('aee')
      var diagram = {
        json: this.diagram.model.toJson(),
      };
      oboe({
        url: `https://modelit-db.herokuapp.com/codetoview`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          diagram: diagram
        }
      })
        .done(res => {
          this.codeModels = res.models
          this.codeControllers = res.controllers
          console.log('HOHOHO ',res);
          
        })
        .fail(errorReport => {
          console.log(errorReport);
        });
      // this.saveDiagram(true, false)
    },2000),
    changeShowCode(show){
      if(show == true){
        this.classGrid = 'grid-container-show'
        this.showCode = '>'
        this.show = true
      } else {
        this.classGrid = 'grid-container-not-show'
        this.showCode = '<'
        this.show = false
      }
    },
    generateCode(id, download, url='code') {
      console.log('SAVEDIgenerateCodeAGRAM: ', id, download, url)
      console.log("ID AQUI", id);
      oboe({
        url: `https://modelit-db.herokuapp.com/${url}/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .done(res => {
          if(download==true){
            let link = document.createElement('a')
            link.href = (`https://modelit-db.herokuapp.com/code/${id}`)
            link.download = 'code'
            link.click()
          } else {
            this.codeModels = res.message
            console.log(res)
          }
          
        })
        .fail(errorReport => {
          console.log("OIA O ERRO: ,", errorReport);
        });
    },
    saveDiagram(generate=false, download) {
      if(download){
        this.loadingMessage = 'Gerando o Código...'
      } else {
        this.loadingMessage = 'Salvando...'
      }
      this.saving = true
      console.log('SAVEDIAGRAM: ', generate, download)
      var diagramID;
      let diagram = {
        title: this.titulo,
        json: this.diagram.model.toJson(),
        emailOwner: this.$store.getters.returnUser.email
      };
      console.log(this.$store.getters.returnUser, diagram);
      oboe({
        url: `https://modelit-db.herokuapp.com/diagram`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          user: this.$store.getters.returnUser,
          diagram: diagram
        }
      })
        .done(res => {
          console.log(res);
          this.diagramID = res._id;
          if(generate==true){
            if(download==false){
              this.generateCode(this.diagramID, download, 'codetoview')
            }else{
              this.generateCode(this.diagramID, download)
            }
            
          }
          this.saving = false
        })
        .fail(errorReport => {
          console.log(errorReport);
        });
    },
    test() {
      this.diagram.linkTemplate = alert("oi");
    },
    asyncOK() {
      console.log("oi");
      this.diagram.model = go.Model.fromJson(this.formItem.json);
      this.formItem.json = "";
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    },
    close() {
      this.json = "";
      this.modalExport = false;
    },
    exportSVG() {
      var x = this.diagram.makeSvg();
      console.log(x);
      this.image = x;
      var obj = document.getElementById("SVGArea");
      obj.appendChild(x);
      if (obj.children.length > 0) {
        obj.replaceChild(x, obj.children[0]);
      }
      // document.location = this.diagram.makeImage()
    },
    loadExport() {
      this.json = this.diagram.model.toJson();
      this.modalExport = true;
    }
  },
  mounted() {
    this.autoUpdate()
    this.$ = go.GraphObject.make;
    this.diagram = new go.Diagram("myDiagramDiv");
    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.undoManager.isEnabled = true;
    this.diagram.allowDrop = true;
    this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
    // this.diagram.linkReshapingTool= new CurvedLinkReshapingTool()
    var diagram = this.diagram;
    var $ = this.$;
    var linkType = this.linkType;
    diagram.initialContentAlignment = go.Spot.Center;

    var AdornmentDefault = $(
      go.Adornment,
      "Vertical",
      $(
        go.Panel,
        "Auto",
        $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 2 }),
        $(go.Placeholder)
      ),
      $(
        go.Panel,
        "Horizontal",
        { defaultStretch: go.GraphObject.Vertical },
        $(
          "Button",
          $(
            go.TextBlock,
            "--D--", // the Button content
            { font: "bold 8pt sans-serif" }
          ),
          {
            click: function(e, button) {
              linkType = "-D-";
              console.log(linkType);
              var node = button.part.adornedPart;
              var tool = e.diagram.toolManager.linkingTool;
              tool.startObject = node.port;
              e.diagram.currentTool = tool;
              tool.doActivate();
            }
          }
        ),
        $(
          "Button",
          $(
            go.TextBlock,
            "----o", // the Button content
            { font: "bold 8pt sans-serif" }
          ),
          {
            click: function(e, button) {
              linkType = "--o";
              console.log(linkType);
              var node = button.part.adornedPart;
              var tool = e.diagram.toolManager.linkingTool;
              tool.startObject = node.port;
              e.diagram.currentTool = tool;
              tool.doActivate();
            }
          }
        ),
        $(
          "Button",
          $(
            go.TextBlock,
            "---->", // the Button content
            { font: "bold 8pt sans-serif" }
          ),
          {
            click: function(e, button) {
              linkType = "-->";
              console.log(linkType);
              var node = button.part.adornedPart;
              var tool = e.diagram.toolManager.linkingTool;
              tool.startObject = node.port;
              e.diagram.currentTool = tool;
              tool.doActivate();
            }
          }
        ),
        $(
          "Button",
          $(
            go.TextBlock,
            "----|>", // the Button content
            { font: "bold 8pt sans-serif" }
          ),
          {
            click: function(e, button) {
              linkType = "-|>";
              console.log(linkType);
              var node = button.part.adornedPart;
              var tool = e.diagram.toolManager.linkingTool;
              tool.startObject = node.port;
              e.diagram.currentTool = tool;
              tool.doActivate();
            }
          }
        ),
        $(
          "Button",
          $(
            go.TextBlock,
            "- - -", // the Button content
            { font: "bold 8pt sans-serif" }
          ),
          {
            click: function(e, button) {
              linkType = "-.-";
              console.log(linkType);
              var node = button.part.adornedPart;
              var tool = e.diagram.toolManager.linkingTool;
              tool.startObject = node.port;
              e.diagram.currentTool = tool;
              tool.doActivate();
            }
          }
        ),
        $(
          "Button",
          $(
            go.TextBlock,
            "----|-", // the Button content
            { font: "bold 8pt sans-serif" }
          ),
          {
            click: function(e, button) {
              linkType = "-|-";
              console.log(linkType);
              var node = button.part.adornedPart;
              var tool = e.diagram.toolManager.linkingTool;
              tool.startObject = node.port;
              e.diagram.currentTool = tool;
              tool.doActivate();
            }
          }
        )
      )
    );

    var quality = $(
      go.Node,
      "Spot",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        resizable: true,
        resizeObjectName: "SHAPE", // resize the Shape, not the Node
        selectionAdornmentTemplate: AdornmentDefault,
        selectionObjectName: "SHAPE",
        mouseEnter: function(e, obj, prev) {
          // change group's background brush
          var shape = obj.part.findObject("SHAPE");
          if (shape) shape.fill = "green";
        },

        mouseLeave: function(e, obj, next) {
          // restore to original brush
          var shape = obj.part.findObject("SHAPE");
          if (shape) shape.fill = "rgb(193,255,193)";
        }
        // end Adornment
      },
      $(go.Shape, {
        name: "SHAPE",
        geometryString:
          "F m8.621092,20.678718c-10.343776,27.647037 1.635785,60.588187 17.478679,61.176421c15.842894,0.588235 32.472693,-22.352924 83.203194,-5.882348c50.730502,16.470576 51.341988,-21.176453 51.341988,-30.588211c0,-9.411758 3.668189,-40.5882 -16.665717,-42.352906c-20.333906,-1.764706 -23.982374,14.117635 -71.540641,10.588226c-47.558267,-3.52941 -53.473727,-20.588219 -63.817503,7.058818z",
        strokeWidth: 1,
        portId: "",
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,
        toLinkableDuplicates: true,
        cursor: "pointer",
        fill: "rgb(193,255,193)",
        width: 80,
        height: 40,
        maxSize: new go.Size(110, 60),
        minSize: new go.Size(70, 30)
      }),
      $(
        go.TextBlock,
        {
          editable: true,
          stroke: "blue",
          wrap: go.TextBlock.WrapFit,
          font: "9pt serif",
          wrap: go.TextBlock.WrapFit,
          textAlign: "center",
          text: "Quality"
        },
        new go.Binding("text").makeTwoWay()
      )
    );

    var task = $(
      go.Node,
      "Spot",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        resizable: true,
        resizeObjectName: "SHAPE", // resize the Shape, not the Node
        selectionAdornmentTemplate: AdornmentDefault,
        selectionObjectName: "SHAPE",
        mouseEnter: function(e, obj, prev) {
          // change group's background brush
          var shape = obj.part.findObject("SHAPE");
          if (shape) shape.fill = "green";
        },

        mouseLeave: function(e, obj, next) {
          // restore to original brush
          var shape = obj.part.findObject("SHAPE");
          if (shape) shape.fill = "rgb(193,255,193)";
        }
      },
      $(go.Shape, {
        name: "SHAPE",
        geometryString: "F M0,0 L5,2 L20,2 L25,0 L20,-2 L5,-2z",
        strokeWidth: 1,
        portId: "",
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,
        toLinkableDuplicates: true,
        cursor: "pointer",
        fill: "rgb(193,255,193)",
        width: 80,
        height: 40,
        maxSize: new go.Size(110, 60),
        minSize: new go.Size(70, 30)
      }),
      $(
        go.TextBlock,
        {
          editable: true,
          stroke: "blue",
          wrap: go.TextBlock.WrapFit,
          font: "9pt serif",
          textAlign: "center",
          text: "Task"
        },
        new go.Binding("text").makeTwoWay()
      )
    );

    var goal = $(
      go.Node,
      "Spot",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        resizable: true,
        resizeObjectName: "SHAPE", // resize the Shape, not the Node
        selectionAdornmentTemplate: AdornmentDefault,
        selectionObjectName: "SHAPE",
        mouseEnter: function(e, obj, prev) {
          // change group's background brush
          var shape = obj.part.findObject("SHAPE");
          if (shape) shape.fill = "green";
        },

        mouseLeave: function(e, obj, next) {
          // restore to original brush
          var shape = obj.part.findObject("SHAPE");
          if (shape) shape.fill = "rgb(193,255,193)";
        }
      },
      $(go.Shape, {
        name: "SHAPE",
        geometryString:
          "F M 46.92 1 L 105.08 1 C 130.44 1 151 14.43 151 31 C 151 47.57 130.44 61 105.08 61 L 46.92 61 C 21.56 61 1 47.57 1 31 C 1 14.43 21.56 1 46.92 1 Z",
        strokeWidth: 1,
        portId: "",
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,

        toLinkableDuplicates: true,
        cursor: "pointer",
        fill: "rgb(193,255,193)",
        width: 80,
        height: 40,
        maxSize: new go.Size(110, 60),
        minSize: new go.Size(70, 30)
      }),
      $(
        go.TextBlock,
        {
          editable: true,
          stroke: "blue",
          wrap: go.TextBlock.WrapFit,
          font: "9pt serif",
          textAlign: "center",
          text: "Goal"
        },
        new go.Binding("text").makeTwoWay()
      )
    );

    var resource = $(
      go.Node,
      "Spot",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        resizable: true,
        resizeObjectName: "SHAPE", // resize the Shape, not the Node
        selectionAdornmentTemplate: AdornmentDefault,
        selectionObjectName: "SHAPE",
        mouseEnter: function(e, obj, prev) {
          // change group's background brush
          var shape = obj.part.findObject("SHAPE");
          if (shape) shape.fill = "green";
        },

        mouseLeave: function(e, obj, next) {
          // restore to original brush
          var shape = obj.part.findObject("SHAPE");
          if (shape) shape.fill = "rgb(193,255,193)";
        }
      },
      $(go.Shape, "Rectangle", {
        name: "SHAPE",
        strokeWidth: 1,
        portId: "",
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,
        toLinkableDuplicates: true,
        cursor: "pointer",
        fill: "rgb(193,255,193)",
        width: 70,
        height: 40,
        maxSize: new go.Size(80, 50),
        minSize: new go.Size(60, 30)
      }),
      $(
        go.TextBlock,
        {
          editable: true,
          stroke: "blue",
          wrap: go.TextBlock.WrapFit,
          font: "9pt serif",
          textAlign: "center",
          text: "Resource"
        },
        new go.Binding("text").makeTwoWay()
      )
    );

    diagram.linkTemplateMap.add(
      "-D-",
      $(
        go.Link,
        { curve: go.Link.Bezier, reshapable: true },
        $(go.Shape, { fill: "blue", stroke: "blue" }), // this is the link shape (the line)
        $(
          go.Shape, // the label background, which becomes transparent around the edges
          {
            fill: $(go.Brush, "Radial", {
              0: "rgb(240, 240, 240)",
              0.1: "rgb(240, 240, 240)",
              0.1: "rgba(240, 240, 240, 0)"
            }),
            stroke: null
          }
        ),
        $(go.TextBlock, {
          stroke: "black",
          text: "D",
          font: "bold 10pt arial",
          segmentOffset: new go.Point(0, 0),
          segmentOrientation: go.Link.OrientAlong
        })
      )
    );

    diagram.linkTemplateMap.add(
      "-->",
      $(
        go.Link,
        { curve: go.Link.Bezier, reshapable: true },
        $(go.Shape, { fill: "blue", stroke: "blue" }), // this is the link shape (the line)
        $(go.Shape, { toArrow: "OpenTriangle", fill: "blue", stroke: "blue" }), // this is an arrowhead
        $(
          go.Shape, // the label background, which becomes transparent around the edges
          {
            fill: $(go.Brush, "Radial", {
              0: "rgb(240, 240, 240)",
              0.1: "rgb(240, 240, 240)",
              0.5: "rgba(240, 240, 240, 0)"
            }),
            stroke: null
          }
        ),
        $(
          go.TextBlock,
          {
            editable: true,
            stroke: "blue",
            text: "link",
            segmentOffset: new go.Point(0, 0),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding("text").makeTwoWay()
        )
      )
    );

    diagram.linkTemplateMap.add(
      "--o",
      $(
        go.Link,
        { curve: go.Link.Bezier, reshapable: true },
        $(go.Shape, { fill: "blue", stroke: "blue" }), // this is the link shape (the line)
        $(go.Shape, { toArrow: "Circle", fill: "blue", stroke: "blue" }) // this is an arrowhead
      )
    );

    diagram.linkTemplateMap.add(
      "-|>",
      $(
        go.Link,
        { curve: go.Link.Bezier, reshapable: true },
        $(go.Shape, { fill: "blue", stroke: "blue" }), // this is the link shape (the line)
        $(go.Shape, { toArrow: "Triangle", fill: "blue", stroke: "blue" }) // this is an arrowhead
      )
    );

    diagram.linkTemplateMap.add(
      "-|-",
      $(
        go.Link,
        { curve: go.Link.Bezier, reshapable: true },
        $(go.Shape, { fill: "blue", stroke: "blue" }), // this is the link shape (the line)
        $(go.Shape, { toArrow: "ForwardSlash", fill: "blue", stroke: "blue" }) // this is an arrowhead
      )
    );

    diagram.linkTemplateMap.add(
      "-.-",
      $(
        go.Link,
        { curve: go.Link.Bezier },
        $(go.Shape, { fill: "blue", stroke: "blue", strokeDashArray: [4, 2] }) // this is the link shape (the line)
      )
    );

    diagram.groupTemplateMap.add(
      "actor",
      $(
        go.Group,
        "Vertical",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          resizable: true,
          resizeObjectName: "SHAPE",
          selectionObjectName: "SHAPE",
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
            } else {
              // and otherwise cancel the drop
              grp.diagram.currentTool.doCancel();
            }
          }
        },
        $(
          go.Panel,
          "Spot",
          $(
            go.Shape,
            {
              name: "SHAPE",
              geometryString: "F M0,0 a30,30 0 1,0 60,5a30,30 0 1,0 -60,0z",
              strokeWidth: 1,
              portId: "",
              fromLinkable: true,
              fromLinkableSelfNode: true,
              fromLinkableDuplicates: true,
              toLinkable: true,
              toLinkableDuplicates: true,
              cursor: "pointer",
              fill: "rgb(193,255,193)",
              width: 60,
              height: 60,
              maxSize: new go.Size(80, 80),
              minSize: new go.Size(50, 50)
            },
            new go.Binding("geometryString", "path")
          ),
          $(
            go.TextBlock,
            {
              editable: true,
              stroke: "blue",
              wrap: go.TextBlock.WrapFit,
              font: "9pt serif",
              textAlign: "center"
            },
            new go.Binding("text", "text").makeTwoWay()
          ),
          $("SubGraphExpanderButton", { alignment: go.Spot.TopRight })
        ),
        $(
          go.Panel,
          "Auto",
          { alignment: go.Spot.Bottom },
          $(go.Shape, "Ellipse", {
            fill: "lightgray",
            cursor: "pointer",
            fromLinkable: true,
            toLinkable: true,
            fromLinkableDuplicates: true,
            toLinkableDuplicates: true,
            strokeWidth: 1,
            strokeDashArray: [6, 6, 6, 6]
          }),
          $(go.Placeholder)
        ),
        {
          mouseEnter: function(e, obj, prev) {
            // change group's background brush
            var shape = obj.part.findObject("SHAPE");
            if (shape) shape.fill = "green";
          },

          mouseLeave: function(e, obj, next) {
            // restore to original brush
            var shape = obj.part.findObject("SHAPE");
            if (shape) shape.fill = "rgb(193,255,193)";
          }
        }
      )
    );

    var templmap = new go.Map("string", go.Node);
    templmap.add("quality", quality);
    templmap.add("task", task);
    templmap.add("goal", goal);
    templmap.add("resource", resource);
    templmap.add("", diagram.nodeTemplate);
    diagram.nodeTemplateMap = templmap;

    var myPalette = $(
      go.Palette,
      "myPaletteDiv", // must name or refer to the DIV HTML element
      {
        layout: $(go.GridLayout, { alignment: go.GridLayout.LeftToRight }),
        "animationManager.duration": 800, // slightly longer than default (600ms) animation
        nodeTemplateMap: diagram.nodeTemplateMap, // share the templates used by myDiagram
        groupTemplateMap: diagram.groupTemplateMap,
        linkTemplateMap: diagram.linkTemplateMap,
        model: new go.GraphLinksModel([
          // specify the contents of the Palette
          { category: "resource", key: "resource", text: "Resource"},
          { category: "task", key: "task", text: "Task"},
          { category: "quality", key: "quality", text: "Quality" },
          { category: "goal", key: "goal", text: "Goal" },
          { key: "actor", isGroup: true, category: "actor", text: "Actor" },
          {
            key: "role",
            isGroup: true,
            category: "actor",
            text: "Role",
            path:
              "F M0,0 a30,30 0 1,0 60,0a30,30 0 1,0 -60,0z, M 0,0 C 0,25   60,25   60,0"
          },
          {
            key: "agent",
            isGroup: true,
            category: "actor",
            text: "Agent",
            path:
              "F M0,0 a30,30 0 1,0 60,5a30,30 0 1,0 -60,0z, M 8,-15 L 52,-15 z"
          }
        ])
      }
    );
    myPalette.scale = 0.7;
    diagram.addDiagramListener("LinkDrawn", function(e) {
      var link = e.subject;
      diagram.startTransaction("add link data");
      diagram.model.setDataProperty(link.data, "category", linkType);
      diagram.commitTransaction("add link data");
      linkType = "";
    });
    var x = this
    diagram.addDiagramListener("ChangedSelection", (x) => {
      console.log(x)
    });

    if (this.propDiagram) {
      console.log(this.propDiagram.diagram);
      this.titulo = this.propDiagram.title;
      this.diagram.model = go.Model.fromJson(this.propDiagram.json);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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

.grid-container-not-show{
  height: 700px;
  display: grid;
  grid-template-columns: 99% 1%;
}

.grid-container-show {
  height: 700px;
  display: grid;
  grid-template-columns: 60% 40%;
}

.grid-container2 {
  height: 700px;
  display: grid;
  grid-template-columns: 3% 97%;
}

.grid-item {
  height: 700px;
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-size: 14px;
  text-align: center;
}
.grid-item2 {
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-size: 30px;
  text-align: center;
}

.grid-item3 {
  font-size: 10px;
}
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
