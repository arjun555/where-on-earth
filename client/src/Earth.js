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

        this.state = {
            location: {
                geometry:{
                    lat: 0,
                    lng: 0
                },
                name: ''
            }
        }
    }

    createScene = (props) => {
        let element = this.rendererInit();
        this.renderSphere();
        this.camera.position.z = 5;
        this.animate();
        // Add Markers onto Earth Sphere
        if(this.props.origin.name){
            this.addMarker(this.props.origin.geometry.lat, this.props.origin.geometry.lng);
        }
        if(this.props.destinations.length > 0){
            this.props.destinations.forEach((city) => {
                this.addMarker(city.geometry.lat, city.geometry.lng);
            })
        }
        this.scene.background = new THREE.Color( 'white' );
        // console.log(element)
        // return element
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
        dotGeometry.vertices.push(new THREE.Vector3( points.x, points.y, points.z));
        let dotMaterial = new THREE.PointsMaterial( {color: 0xE06C9F, size: 10, sizeAttenuation: false } );
        let dot = new THREE.Points( dotGeometry, dotMaterial );
        return dot;
    }

    addMarker = (lat, lng) => {
        let dot = this.createDotMarker(lat, lng)
        this.scene.add( dot );
    }

    axis = () => {
        // The X axis is red. The Y axis is green. The Z axis is blue.
        var axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
    }

    sphereToCartesian = (radius, lat, lon) => {
        
        let latRad = this.degToRad(lat);
        let lonRad = this.degToRad(-lon);

        return (
            {
                x: radius * Math.cos(latRad) * Math.cos(lonRad), 
                y: radius * Math.sin(latRad), 
                z: radius * Math.cos(latRad) * Math.sin(lonRad)
            })

    }

    renderSphere = () => {
        let geometry = new THREE.SphereGeometry( this.radius, 300, 300 );
        let texture = new THREE.TextureLoader().load("https://s3-eu-west-2.amazonaws.com/bckld/lab/textures/earth_latlon.jpg")
        let material = new THREE.MeshBasicMaterial({wireframe: false, map: texture});
        let sphere = new THREE.Mesh( geometry, material );
        this.scene.add( sphere );
    }

    rendererInit(){
        this.renderer.setSize( window.innerWidth*0.8 , window.innerHeight*0.8);
        document.body.appendChild( this.renderer.domElement );
        return (this.renderer.domElement)
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