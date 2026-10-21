'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const PALETTE = ['#1f6f8b', '#c0492f', '#2f5fa5', '#8a3b36', '#1d7f7a', '#d9822b', '#5a2f4f', '#b8c4c2']
const SLOT = 6.6   // container length plus gap along the road
const PER = 8      // the stack pattern repeats every 8 slots, so the loop is seamless
const REP = 4
const SPEED = 5    // world units per second
const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

function Yard() {
  const world = useRef(), boxes = useRef(), dashes = useRef()
  const list = useMemo(() => {
    const a = []
    for (const side of [-1, 1]) for (let c = 0; c < 3; c++) for (let s = 0; s < PER * REP; s++) {
      const key = (side + 1) * 50 + c * 10 + (s % PER)
      const h = 1 + Math.floor(rnd(key) * 4)
      for (let l = 0; l < h; l++) {
        a.push({ x: side * (3.8 + c * 2.6), y: 1.3 + l * 2.6, z: -150 + s * SLOT, col: PALETTE[Math.floor(rnd(key * 7 + l) * PALETTE.length)] })
      }
    }
    return a
  }, [])
  useLayoutEffect(() => {
    const o = new THREE.Object3D(), c = new THREE.Color()
    list.forEach((d, i) => {
      o.position.set(d.x, d.y, d.z); o.updateMatrix()
      boxes.current.setMatrixAt(i, o.matrix)
      boxes.current.setColorAt(i, c.set(d.col))
    })
    boxes.current.instanceMatrix.needsUpdate = true
    boxes.current.instanceColor.needsUpdate = true
    for (let i = 0; i < 40; i++) { o.position.set(0, 0.02, -110 + i * 3); o.updateMatrix(); dashes.current.setMatrixAt(i, o.matrix) }
    dashes.current.instanceMatrix.needsUpdate = true
  }, [list])
  // The truck stays put; the yard slides past it.
  useFrame(({ clock }) => {
    const d = clock.getElapsedTime() * SPEED
    world.current.position.z = d % (SLOT * PER)
    dashes.current.position.z = d % 3
  })
  return (
    <>
      <group ref={world}>
        <instancedMesh ref={boxes} args={[null, null, list.length]}>
          <boxGeometry args={[2.4, 2.6, 6.2]} />
          <meshStandardMaterial roughness={0.75} metalness={0.15} />
        </instancedMesh>
      </group>
      <instancedMesh ref={dashes} args={[null, null, 40]}>
        <boxGeometry args={[0.14, 0.02, 1.4]} />
        <meshStandardMaterial color="#E0900A" emissive="#E0900A" emissiveIntensity={0.6} />
      </instancedMesh>
    </>
  )
}

function Truck() {
  return (
    <group position={[0, 0, -2]}>
      <mesh position={[0, 1.9, 1]}><boxGeometry args={[2.3, 2.8, 8]} /><meshStandardMaterial color="#dfe6e3" roughness={0.5} /></mesh>
      <mesh position={[0, 1.35, -4.3]}><boxGeometry args={[2.2, 2.2, 2.4]} /><meshStandardMaterial color="#f4f6f4" roughness={0.45} /></mesh>
      <mesh position={[0, 1.7, -5.52]}><boxGeometry args={[1.9, 0.8, 0.05]} /><meshStandardMaterial color="#10181a" /></mesh>
      {[-0.8, 0.8].map((x) => (
        <mesh key={x} position={[x, 0.9, 5.02]}><boxGeometry args={[0.3, 0.2, 0.05]} /><meshStandardMaterial color="#ff2a1a" emissive="#ff2a1a" emissiveIntensity={2} /></mesh>
      ))}
    </group>
  )
}

function Rig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    camera.position.set(Math.sin(t * 0.25) * 1.6, 13 + Math.sin(t * 0.17) * 0.8, 12)
    camera.lookAt(0, 0, -8)
  })
  return null
}

export default function Scene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 13, 12], fov: 42 }} style={{ position: 'absolute', inset: 0 }}>
      <color attach="background" args={['#05080A']} />
      <fog attach="fog" args={['#05080A', 28, 95]} />
      <hemisphereLight args={['#9db8c4', '#1a1208', 0.9]} />
      <directionalLight position={[6, 14, 8]} intensity={1.6} />
      <pointLight position={[0, 2, -8]} color="#ffd48a" intensity={160} distance={26} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[400, 400]} /><meshStandardMaterial color="#0b1113" roughness={1} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -40]}><planeGeometry args={[5, 300]} /><meshStandardMaterial color="#141d20" roughness={0.9} /></mesh>
      <Yard />
      <Truck />
      <Rig />
    </Canvas>
  )
}
