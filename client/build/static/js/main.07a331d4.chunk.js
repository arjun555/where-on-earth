(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,n,t){e.exports=t(17)},16:function(e,n,t){},17:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),o=t(8),i=t.n(o),c=(t(16),t(2)),s=t(3),d=t(5),l=t(4),u=t(6),h=t(0),w=t(9),m=function(e){function n(){var e;return Object(c.a)(this,n),(e=Object(d.a)(this,Object(l.a)(n).call(this))).createScene=function(){e.rendererInit(),e.renderSphere(),e.camera.position.z=5,e.animate(),e.addDot(),e.axis()},e.animate=function(){e.controls.autoRotate=!0,e.controls.autoRotateSpeed=-1,e.controls.enablePan=!0,requestAnimationFrame(e.animate),e.controls.update(),e.renderer.render(e.scene,e.camera)},e.addCircle=function(){var n=new h.LineBasicMaterial({color:16776960}),t=new h.CircleGeometry(e.radius,400,0,1.2*Math.PI);t.vertices.shift();var a=new h.Line(t,n);a.rotation.x=Math.PI/4,e.scene.add(a)},e.addDot=function(){var n=e.sphereToCartesian(e.radius,51.507222,-.1275),t=new h.Geometry;t.vertices.push(new h.Vector3(n.x,n.z,n.y));var a=new h.PointsMaterial({size:10,sizeAttenuation:!1}),r=new h.Points(t,a);e.scene.add(r)},e.axis=function(){var n=new h.AxesHelper(5);e.scene.add(n)},e.sphereToCartesian=function(n,t,a){var r=e.degToRad(t),o=e.degToRad(a),i=n*Math.cos(r)*Math.cos(o),c=n*Math.cos(r)*Math.sin(o),s=n*Math.sin(r);return console.log("x: ".concat(i,", y: ").concat(c,", z: ").concat(s)),{x:i,y:c,z:s}},e.renderSphere=function(){var n=new h.SphereGeometry(e.radius,200,200),t=(new h.TextureLoader).load("https://s3-eu-west-2.amazonaws.com/bckld/lab/textures/earth_latlon.jpg"),a=new h.MeshBasicMaterial({wireframe:!1,map:t}),r=new h.Mesh(n,a);e.scene.add(r)},e.scene=new h.Scene,e.camera=new h.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),e.renderer=new h.WebGLRenderer,e.controls=new w(e.camera,e.renderer.domElement),e.radius=2,e}return Object(u.a)(n,e),Object(s.a)(n,[{key:"rendererInit",value:function(){this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement)}},{key:"degToRad",value:function(e){return e*Math.PI/180}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Where on Earth"),this.createScene())}}]),n}(r.a.Component),p=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(t=Object(d.a)(this,(e=Object(l.a)(n)).call.apply(e,[this].concat(r)))).state={},t}return Object(u.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(m,null))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.07a331d4.chunk.js.map