import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uGlowColor;
  uniform float uBorderRadius;
  uniform float uBorderWidth;
  uniform float uIntensity;
  uniform float uSpeed;

  float sdRoundedBox(vec2 p, vec2 halfSize, float radius) {
    vec2 q = abs(p) - halfSize + radius;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
  }

  void main() {
    vec2 fragCoord = vUv * uResolution;
    vec2 center = uResolution * 0.5;
    vec2 p = fragCoord - center;
    vec2 halfSize = center - uBorderWidth * 1.5;

    float dist = sdRoundedBox(p, halfSize, uBorderRadius);
    float border = 1.0 - smoothstep(0.0, uBorderWidth * 1.5, abs(dist));

    float angle = atan(p.y, p.x);
    float sweep = mod(angle - uTime * uSpeed + 6.28318, 6.28318);
    float beam = smoothstep(1.8, 0.0, abs(sweep - 0.8));

    float glow = border * beam * uIntensity;
    gl_FragColor = vec4(uGlowColor * glow, glow);
  }
`

interface GlowPlaneProps {
  width: number
  height: number
  glowColor: THREE.Color
  borderRadius: number
  borderWidth: number
  intensity: number
  speed: number
  animate: boolean
}

function GlowPlane({
  width,
  height,
  glowColor,
  borderRadius,
  borderWidth,
  intensity,
  speed,
  animate,
}: GlowPlaneProps): React.JSX.Element {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (!(camera instanceof THREE.OrthographicCamera)) return

    const halfW = width / 2
    const halfH = height / 2
    camera.left = -halfW
    camera.right = halfW
    camera.top = halfH
    camera.bottom = -halfH
    camera.position.set(0, 0, 1)
    camera.updateProjectionMatrix()
  }, [camera, width, height])

  useEffect(() => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uResolution.value.set(width, height)
    materialRef.current.uniforms.uBorderRadius.value = borderRadius
    materialRef.current.uniforms.uBorderWidth.value = borderWidth
    materialRef.current.uniforms.uIntensity.value = intensity
    materialRef.current.uniforms.uSpeed.value = speed
    materialRef.current.uniforms.uGlowColor.value.copy(glowColor)
  }, [width, height, borderRadius, borderWidth, intensity, speed, glowColor])

  useFrame((state) => {
    if (!materialRef.current || !animate) return
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uGlowColor: { value: glowColor },
          uBorderRadius: { value: borderRadius },
          uBorderWidth: { value: borderWidth },
          uIntensity: { value: intensity },
          uSpeed: { value: speed },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export interface CardEdgeGlowProps {
  children: ReactNode
  className?: string
  glowColor?: string
  borderRadius?: number
  borderWidth?: number
  intensity?: number
  speed?: number
}

export function CardEdgeGlow({
  children,
  className,
  glowColor = '#cbd5e1',
  borderRadius = 12,
  borderWidth = 1.5,
  intensity = 0.7,
  speed = 1.57,
}: CardEdgeGlowProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = (): void => {
      setReducedMotion(mediaQuery.matches)
    }

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const showGlow = !reducedMotion && size.width > 0 && size.height > 0
  const color = useMemo(() => new THREE.Color(glowColor), [glowColor])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative z-10">{children}</div>
      {showGlow ? (
        <div className="pointer-events-none absolute -inset-px z-20" aria-hidden>
          <Canvas
            orthographic
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
            className="pointer-events-none"
          >
            <GlowPlane
              width={size.width}
              height={size.height}
              glowColor={color}
              borderRadius={borderRadius}
              borderWidth={borderWidth}
              intensity={intensity}
              speed={speed}
              animate={!reducedMotion}
            />
          </Canvas>
        </div>
      ) : null}
    </div>
  )
}
