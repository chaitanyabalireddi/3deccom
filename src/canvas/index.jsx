import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Center } from '@react-three/drei'
import Shirt from './Shirt'
import Backdrop from './Backdrop'
import Camera from './Camera'

const canvasModel = () => {
  return (
    <Canvas shadows
    camera={{position : [0,0,0], fov : 25}}
    gl={{preserveDrawingBuffer : true}}
    className='w-full max-w-full h-full transition-all ease-in'>
        <ambientLight intensity={0.5}/>
        <Environment preset='city'/>
        <Camera>
            <Backdrop />
                <Center>
                    <Shirt />
                </Center>
            
        </Camera>

    </Canvas>
  )
}

export default canvasModel