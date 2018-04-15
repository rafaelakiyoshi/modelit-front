<template>
  <div id="diagram_list">
    <h1 v-if="noneDiagram" >Nenhum Diagrama encontrado...</h1>
     <Spin fix v-if="loading"><Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon><div>Loading</div></Spin>
        <div hidden style="border: solid 0px black; width: 0%; height: 0px; margin-top: 3px" id="myDiagram">
        </div>
    <Row type="flex" style="text-align:center vertical-align: middle;">
      <Col align="center" v-for="(diagram, index) in my_Diagrams" :key="index" span="6" style="text-align:center vertical-align: middle;">
        <a @click="acessDiagram(diagram)"><Card  align="center" style="width:400px; margin-bottom: 25px; margin-top: 25px;">
          <h2 style="color:black;" align="left" slot="title">{{diagram.title}}</h2>
          <a style="color:red;" href="#" slot="extra" @click.prevent="excludeDiagram(diagram)">
            <Icon type="trash-a"></Icon>
            Excluir
        </a>
          <img :src="svg[index]">
        </Card></a>
      </Col>
    </Row>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>


<script>
import oboe from 'oboe'
import * as go from 'gojs'
export default {
  name: "diagram_list",
  data (){
    return {
      noneDiagram: false,
      loading: true,
      svg: [],
      $: null,
      spinShow: false,
      diagram: null,
      my_Diagrams: null,
      formItem: {
        json: '',
      },
    }
  },
vuex: {
    getters: {
      user: store => store.user
    },
    actions: {
      clearUser ({dispatch}) {
        dispatch('CLEAR_USER')
      }
    }
  },
  methods: {
    instance () {
      const title = 'Nenhum Diagrama encontrado...';
      const content = '<p>Deseja prosseguir para criar seu primeiro diagrama?</p>';
      this.$Modal.confirm({
        title: title,
        content: content,
        okText: 'Criar Diagrama',
        cancelText: 'Cancel',
        onOk: () => {
          this.$router.push('/iStar');
        },
        onCancel: () => {
          
        }
      })
    },
    acessDiagram(diagram){
      this.$router.push({name: 'istar', params: {propDiagram:diagram}})
    },
    excludeDiagram(diagram){
      alert('deleting ',diagram)
    }
  },
  mounted() {
    
    this.$ = go.GraphObject.make
    this.diagram = new go.Diagram('myDiagram')
    this.diagram.initialContentAlignment = go.Spot.Center
    this.diagram.undoManager.isEnabled = true
    this.diagram.allowDrop = true
    this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom
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
    oboe({
        url: `/api/listdiagrams/${this.$store.state.user.email}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .done((res) => {
        this.my_Diagrams = res
        this.loading = false
        for(var index in this.my_Diagrams){
          this.diagram.model = go.Model.fromJson(this.my_Diagrams[index].json)
          this.formItem.json = ''
          this.diagram.isEnabled = false
          this.svg[index] = this.diagram.makeImage({size: new go.Size(350,100)}).getAttribute("src")
          console.log('HAHAH', this.svg)
        }
        if(this.svg.length == 0){
          this.instance('warning')
        }
      })
      .fail((errorReport) => {
        console.log('fail')
        this.loading = false
        console.log(errorReport)
      })
  }
};
</script>


<style>
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