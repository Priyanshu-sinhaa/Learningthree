'use client'
import React from 'react'
import { useEffect, useRef } from 'react';
import * as THREE from  'three'
import GLTFLoader from 'three-gltf-loader';

function Chaptertwo() {
  const sceneRef = useRef(null)
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Load the model using GLTFLoader
    const loader = new GLTFLoader();
    loader.load('/demomodel.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return( 
  <div ref={sceneRef} />
  )
}

export default Chaptertwo
