'use strict'
let app = angular.module('sheet2tab', []);
let VF = Vex.Flow;

const defaultVisualOptions = {
  width: 800,
  height: 1200,
  marginLeft: 20,
  marginTop: 50,
  marginRight: 20,
  marginBottom: 80,
}

class VisualOptions {
  constructor(options) {
    options = options || {}
    this.width = options.width || defaultVisualOptions.width;
    this.height = options.height || defaultVisualOptions.height;
    this.marginLeft = options.marginLeft || defaultVisualOptions.marginLeft;
    this.marginRight = options.marginRight || defaultVisualOptions.marginRight;
    this.marginTop = options.marginTop || defaultVisualOptions.marginTop;
    this.marginBottom = options.marginBottom || defaultVisualOptions.marginBottom;
  }
}

class MainCtrl {
  constructor() {
    this.music = "mmmmm";
    this.visopts = new VisualOptions();
  }
}

function render(elem, visopts, music) {
  console.log('render');
  elem.empty();
  let rawElem = elem[0];
  let renderer = new VF.Renderer(rawElem, VF.Renderer.Backends.SVG);
  renderer.resize(visopts.width, visopts.height);
  let ctx = renderer.getContext();
  ctx.setFont("Arial", 10, "");
  let stave = new VF.Stave(visopts.marginLeft, visopts.marginTop, 400);
  stave.addClef("treble").addTimeSignature("4/4");

  // VF.Formatter.FormatAndDraw(ctx, stave, notes);
  stave.setContext(ctx).draw();
}

app.controller("MainCtrl", MainCtrl);
app.directive("vfCanvas", function() {
  return {
    restrict: "E",
    replace: true,
    template: '<div class="vf-canvas" id="{{id}}"></div>',
    scope: {
      id: "@",
      music: "=",
      visopts: "=",
    },
    link: function(scope, elem, attrs) {
      function watchTarget() {
        return {music: scope.music, visopts: scope.visopts};
      };
      function refresh() {
        render(elem, scope.visopts, scope.music);
      };
      scope.$watch(watchTarget, refresh, true);
    },
  };
});
