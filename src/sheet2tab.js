'use strict'
let app = angular.module('sheet2tab', []);
let VF = Vex.Flow;

class MainCtrl {
  constructor() {
    this.music = "mmmmm";
  }
}

function render(elem, music, width, height) {
  let rawElem = elem[0];
  width = parseInt(width);
  height = parseInt(height);
  let renderer = new VF.Renderer(rawElem, VF.Renderer.Backends.SVG);
  renderer.resize(width, height);
  let ctx = renderer.getContext();
  ctx.setFont("Arial", 10, "");
  let stave = new VF.Stave(10, 10, 400);
  stave.addClef("treble").addTimeSignature("4/4");
  stave.setContext(ctx).draw();
}

app.controller("MainCtrl", MainCtrl);
app.directive("vfCanvas", function() {
  return {
    restrict: "E",
    replace: true,
    template: '<div class="vf-canvas" id="{{id}}"></div>',
    scope: {
      width: "@",
      height: "@",
      id: "@",
      music: "=",
    },
    link: function(scope, elem, attrs) {
      scope.$watch('music', function() {
        render(elem, scope.music, scope.width, scope.height);
      });
    },
  };
});
