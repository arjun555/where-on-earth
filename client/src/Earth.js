import React from 'react';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols'

export default class Earth extends React.Component {

    constructor(){
        super()
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.radius = 2;
    }

    createScene = () => {
        let location = {
            lat: 51.507222,
            lon: -0.1275,
            name: 'London'
        }
        this.rendererInit();
        this.renderSphere();
        this.camera.position.z = 5;
        this.animate();
        this.addMarker(location);
        this.axis();
        this.scene.background = new THREE.Color( 'mistyrose' );
    }

    animate = () => {
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = -1.0;
        this.controls.enablePan = true;
        requestAnimationFrame( this.animate );
        
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }

    addCircle = () => {
        let material = new THREE.LineBasicMaterial( { color: 0xffff00} )
        let geometry = new THREE.CircleGeometry( this.radius, 400, 0, 1.2*Math.PI)    
        geometry.vertices.shift();
        let circle = new THREE.Line( geometry, material );
        circle.rotation.x = Math.PI/4;
        this.scene.add( circle );
    }

    createDotMarker = (lat, lon) => {
        let surfaceOffset = 0.05;
        let points = this.sphereToCartesian(this.radius + surfaceOffset, lat, lon)
        let dotGeometry = new THREE.Geometry();
        dotGeometry.vertices.push(new THREE.Vector3( points.x, points.z, points.y));
        let dotMaterial = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false } );
        let dot = new THREE.Points( dotGeometry, dotMaterial );
        return dot;
    }

    addMarker = (location) => {
        let dot = this.createDotMarker(location.lat, location.lon)
        this.scene.add( dot );
    }

    axis = () => {
        var axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
    }

    sphereToCartesian = (radius, lat, lon) => {
        
        let latRad = this.degToRad(lat);
        let lonRad = this.degToRad(lon);


        let x = radius*Math.cos(latRad)*Math.cos(lonRad)
        let y = radius*Math.cos(latRad)*Math.sin(lonRad)
        let z = radius*Math.sin(latRad)

        console.log(`x: ${x}, y: ${y}, z: ${z}`)
        return {x: x, y: y, z: z}
    }

    renderSphere = () => {
        let geometry = new THREE.SphereGeometry( this.radius, 200, 200 );
        let texture = new THREE.TextureLoader().load("https://s3-eu-west-2.amazonaws.com/bckld/lab/textures/earth_latlon.jpg")
        let material = new THREE.MeshBasicMaterial({wireframe: false, map: texture});
        let sphere = new THREE.Mesh( geometry, material );
        this.scene.add( sphere );
    }

    rendererInit(){
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
    }

    degToRad(degrees){
        return degrees * Math.PI/180;
    }

    render(){
        return(
        <section>
            {this.createScene()}
        </section> 
        )
    }


}