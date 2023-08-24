'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from  'three'

function Intro() {

  const SceneRef = useRef(null);

  const a = useRef(0);


  useEffect(() => {

     //creating a scene 
     const scene = new THREE.Scene();
 
     //creating a renderer
     const renderer = new THREE.WebGLRenderer();
     renderer.setSize(window.innerWidth,window.innerHeight);
   
     //creating a camera
     const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1,2000);
     camera.position.z = 5;
    

     //creating a ball
     const geometry = new THREE.SphereGeometry(1.2,10,10);
     const material = new THREE.MeshBasicMaterial({ color: 0x610c04 });
     const ball = new THREE.Mesh(geometry, material);

     scene.add(ball,camera)

     //creating a floor
    //  const sheetgeo = new THREE.PlaneGeometry(10,10);
    //  const sheetmat = new THREE.MeshBasicMaterial({color: 0x00ff00 });
    //  const sheet = new THREE.Mesh(sheetgeo,sheetmat);
    //  sheet.rotation.x = Math.PI/2;
    //  sheet.position.x = 0;
    //  sheet.position.y = 0;
    //  sheet.position.z = 0;

     
     //adding the renderer's DOM element to the sceneRef container
     SceneRef.current.appendChild(renderer.domElement);

     // animation loop function

     const translate = () => {
      
      if(ball.position.x >= -5 && ball.position.x <= 5){
          if(a.current===0){
            console.log(ball.position.x)
            ball.position.x += 0.05;
            if(ball.position.x>4.9){
              console.log("a changed to 1")
              a.current = 1
            }
          }
          else if(a.current===1){
            ball.position.x -= 0.05;
            if(ball.position.x < -4.9){
              a.current = 0
            }
          }
      }
      
     };

     const animate = () => {
      
      requestAnimationFrame(animate);
      renderer.render(scene,camera);
      ball.rotateX(0.009);
      ball.rotateY(0.006);
      ball.rotateZ(0.008);

      translate()

     }

     //start animation loop
     animate();
     
     
     //cleanup 
     return() => {
      SceneRef.current.removeChild(renderer.domElement);
      renderer.dispose()
     };
     

  },[]);
   
  return (
    <div ref={SceneRef} />
  )
}

export default Intro
