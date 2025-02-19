import React from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
const Backdrop = () => {
    const shadowref = useRef()
  return (
    <AccumulativeShadows position={[0,0,-0.14]} ref={shadowref} temporal frames={60} alphaTest={0.50} scale={10} rotation={[Math.PI/2,0,0]}>
        <RandomizedLight amount={4} radius={10} intensity={0.55} ambient={0.90} position={[-5,5,-10]}/>
        <RandomizedLight amount={5} radius={10}  intensity={0.35} ambient={0.90} position={[-10,5,-9]}/>
    </AccumulativeShadows>
  )
}

export default Backdrop