/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Sphere, Effects, useTexture } from "@react-three/drei";
import { pointsInner, pointsOuter } from "@/lib/particle";
import { Group, Vector3, DoubleSide } from "three";
import { FilmPass, WaterPass, UnrealBloomPass, LUTPass } from 'three-stdlib';
import { MainHero } from "./main-hero";
import gsap from "gsap";

// 扩展Three.js对象到R3F
extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass });

// 随机生成颜色函数 - 使用对比度更高的颜色组合降低饱和度
const getRandomColor = () => {
  const colors = [
    "#ff1a1a", // 亮红色色
    "#00cc00", // 亮绿色
    "#1a75ff", // 亮蓝色色
    "#ffff00", // 黄色绿色
    "#00ffff", // 青色绿色
    "#ff00ff", // 洋红色色
    "#ff6600", // 橙色黄色
    "#9900ff", // 紫色黄色
    "#00ff99", // 碧绿色
    "#ff0099", // 亮粉色
    "#33ccff", // 天蓝色
    "#ffcc00"  // 金色色
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 随机生成大小函数
const getRandomSize = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

// 背景图层组件
const GalaxyBackground = () => {
  const texture = useTexture('/galaxy.png');
  const meshRef = useRef<any>(null);
  
  useEffect(() => {
    if (meshRef.current) {
      // 初始设置为完全透明
      gsap.set(meshRef.current.material, { opacity: 0 });
      
      // 监听动画开始事件
      const handleStartAnimation = () => {
        gsap.to(meshRef.current.material, {
          opacity: 0.6,
          duration: 2,
          ease: "power2.inOut"
        });
      };
      
      document.addEventListener('startBackgroundAnimation', handleStartAnimation);
      
      return () => {
        document.removeEventListener('startBackgroundAnimation', handleStartAnimation);
      };
    }
  }, []);
  
  return (
    <mesh ref={meshRef} position={[10, -5, -10]} scale={[60, 60, 5]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        opacity={0}
        side={DoubleSide}
      />
    </mesh>
  );
};

const ParticleRing = () => {
  const [showScene, setShowScene] = useState(false);
  
  useEffect(() => {
    // 初始仅显示 PHYBench 文字，背景场景隐藏
    const handleStartAnimation = () => {
      setShowScene(true);
    };
    
    document.addEventListener('startBackgroundAnimation', handleStartAnimation);
    
    return () => {
      document.removeEventListener('startBackgroundAnimation', handleStartAnimation);
    };
  }, []);
  
  return (
    <div className="relative bg-black">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ 
          height: "100vh",
          opacity: showScene ? 1 : 0,
          transition: "opacity 2s ease-in-out"
        }}
        linear
        dpr={[1, 2]}
      >
        <fog attach="fog" args={['#070710', 5, 30]} />
        <ambientLight intensity={0.2} />
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight position={[0, 10, 5]} intensity={10} color="lightblue" />
        <pointLight position={[-30, 0, -30]} power={6.0} />
        <spotLight 
          intensity={2.5} 
          position={[10, 10, 10]} 
          angle={0.4} 
          penumbra={1} 
          color="lightblue" 
          castShadow 
        />
        <GalaxyBackground />
        <PointCircle showAnimation={showScene} />
        <Postpro />
      </Canvas>

      <MainHero />
    </div>
  );
};

const PointCircle = ({ showAnimation }: { showAnimation: boolean }) => {
  const ref = useRef<Group | null>(null);
  const light = useRef<any>(null);
  
  useEffect(() => {
    if (showAnimation && ref.current) {
      // 粒子群从缩放0到正常大小的动画
      gsap.fromTo(ref.current.scale, 
        { x: 0, y: 0, z: 0 }, 
        { x: 1, y: 1, z: 1, duration: 2, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, [showAnimation]);
  
  useFrame(({ clock, mouse, viewport }) => {
    const time = clock.getElapsedTime();
    
    if (ref.current?.rotation) {
      ref.current.rotation.z = time * 0.05;
    }

    // 移动光源跟随鼠标
    if (light.current) {
      light.current.position.x = (mouse.x * viewport.width) / 2;
      light.current.position.y = (mouse.y * viewport.height) / 2;
    }
  });

  return (
    <group ref={ref}>
      <pointLight 
        ref={light}
        distance={40} 
        intensity={10} 
        color="lightblue"
      >
        <mesh scale={[0.5, 0.5, 0.5]}>
          <dodecahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial 
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.7}
          />
        </mesh>
      </pointLight>
      
      {pointsInner.map((point) => (
        <Point 
          key={point.idx} 
          position={point.position} 
          color={point.color === "#ffffff" ? getRandomColor() : point.color} 
          size={getRandomSize(0.05, 0.18)}
        />
      ))}
      {pointsOuter.map((point) => (
        <Point 
          key={point.idx} 
          position={point.position} 
          color={point.color === "#ffffff" ? getRandomColor() : point.color} 
          size={getRandomSize(0.08, 0.25)}
        />
      ))}
    </group>
  );
};

const Point = ({ position, color, size = 0.1 }: { position: number[]; color: string; size?: number }) => {
  return (
    <Sphere position={position as unknown as Vector3} args={[size, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}  // 发光强度
        roughness={0.25}
        metalness={0.85}
        color={color}
      />
    </Sphere>
  );
};

// 后期处理效果
const Postpro = () => {
  const water = useRef<any>(null);
  
  useFrame((state) => {
    if (water.current) {
      water.current.time = state.clock.elapsedTime * 2;
    }
  });
  
  return (
    <Effects disableGamma>
      {/* @ts-expect-error threeD */}
      <waterPass ref={water} factor={0.8} />
      {/* @ts-expect-error threeD */}
      <unrealBloomPass args={[undefined, 0.5, 1, 0]} />
      {/* @ts-expect-error threeD */}
      <filmPass args={[0.15, 0.5, 1500, false]} />
    </Effects>
  );
};

export default ParticleRing;