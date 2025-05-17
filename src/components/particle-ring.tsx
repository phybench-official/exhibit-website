/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Sphere, Effects, useTexture } from "@react-three/drei";
import { pointsInner, pointsOuter } from "@/lib/particle";
import { Group, Vector3, DoubleSide } from "three";
import { FilmPass, WaterPass, UnrealBloomPass, LUTPass } from 'three-stdlib';
import { MainHero } from "./main-hero";
import gsap from "gsap";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Settings } from "lucide-react"
import { useTranslation } from "react-i18next";

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
  const [lowPerformanceMode, setLowPerformanceMode] = useState(() => {
    // 从localStorage读取性能模式设置
    const savedMode = localStorage.getItem('phybench-low-performance-mode');
    return savedMode === 'true';
  });

  const { t } = useTranslation("common");
  
  useEffect(() => {
    // 初始仅显示 PHYBench 文字，背景场景隐藏
    const handleStartAnimation = () => {
      setShowScene(true);
    };
    
    document.addEventListener('startBackgroundAnimation', handleStartAnimation);
    
    // 只在第一次访问时显示性能提示toast
    const hasVisited = localStorage.getItem('phybench-visited');
    if (!hasVisited) {
      setTimeout(() => {
        toast(t("performance.welcome"), {
          description: t("performance.hint"),
          action: {
            label: t("performance.switchToLow"),
            onClick: () => {
              togglePerformanceMode(true);
            },
          },
        });
      }, 3000); // 延迟3秒显示toast
      
      // 标记用户已访问
      localStorage.setItem('phybench-visited', 'true');
    }
    
    // 初始化时也要存储默认性能模式设置
    if (!localStorage.getItem('phybench-low-performance-mode')) {
      localStorage.setItem('phybench-low-performance-mode', String(lowPerformanceMode));
    }
    
    return () => {
      document.removeEventListener('startBackgroundAnimation', handleStartAnimation);
    };
  }, [lowPerformanceMode, t]);
  
  // 切换性能模式的函数
  const togglePerformanceMode = useCallback((newMode?: boolean) => {
    // 如果传入具体值就使用，否则切换当前值
    const updatedMode = newMode !== undefined ? newMode : !lowPerformanceMode;
    setLowPerformanceMode(updatedMode);
    localStorage.setItem('phybench-low-performance-mode', String(updatedMode));
    
    toast(updatedMode ? t("performance.lowMode") : t("performance.highMode"), {
      description: updatedMode ? t("performance.lowDesc") : t("performance.highDesc"),
    });
  }, [lowPerformanceMode, t]);
  
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
        dpr={lowPerformanceMode ? 1 : [1, 2]}
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
        <PointCircle showAnimation={showScene} lowPerformanceMode={lowPerformanceMode} />
        {!lowPerformanceMode && <Postpro />}
      </Canvas>

      <MainHero lowPerformanceMode={lowPerformanceMode} />
      <Toaster />
      
      {/* 悬浮设置按钮 */}
      <button 
        onClick={() => {
          toast(t("performance.settings"), {
            description: lowPerformanceMode ? t("performance.currentLow") : t("performance.currentHigh"),
            action: {
              label: lowPerformanceMode ? t("performance.switchToHigh") : t("performance.switchToLow"),
              onClick: () => togglePerformanceMode(),
            },
          });
        }}
        className="fixed bottom-6 right-6 bg-black/50 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-black/70 transition-all z-50 border border-gray-700"
        aria-label={t("performance.settings")}
      >
        <Settings className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

const PointCircle = ({ showAnimation, lowPerformanceMode }: { showAnimation: boolean, lowPerformanceMode: boolean }) => {
  const ref = useRef<Group | null>(null);
  const light = useRef<any>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  // 记录上次更新时间以实现帧率控制
  const lastUpdateTime = useRef<number>(0);
  // 定义更新间隔 (毫秒)，低性能模式下降低更新频率
  const updateInterval = useRef<number>(lowPerformanceMode ? 50 : 16);
  
  // 使用 useEffect 更新 updateInterval
  useEffect(() => {
    updateInterval.current = lowPerformanceMode ? 50 : 16;
  }, [lowPerformanceMode]);
  
  useEffect(() => {
    if (showAnimation && ref.current) {
      // 粒子群从缩放0到正常大小的动画
      animationRef.current = gsap.fromTo(ref.current.scale, 
        { x: 0, y: 0, z: 0 }, 
        { x: 1, y: 1, z: 1, duration: 2, ease: "elastic.out(1, 0.5)" }
      );
    }
    
    // 组件卸载时清理动画
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [showAnimation]);
  
  // 优化的渲染函数
  const updateRotation = useCallback((time: number) => {
    if (ref.current?.rotation) {
      // 低性能模式下减慢旋转速度
      ref.current.rotation.z = time * (lowPerformanceMode ? 0.02 : 0.05);
    }
  }, [lowPerformanceMode]);
  
  const updateLightPosition = useCallback((mouse: { x: number, y: number }, viewport: { width: number, height: number }) => {
    if (light.current && !lowPerformanceMode) {
      light.current.position.x = (mouse.x * viewport.width) / 2;
      light.current.position.y = (mouse.y * viewport.height) / 2;
    }
  }, [lowPerformanceMode]);
  
  useFrame(({ clock, mouse, viewport }) => {
    const time = clock.getElapsedTime();
    const now = Date.now();
    
    // 实现帧率控制，仅在达到更新间隔时执行更新
    if (now - lastUpdateTime.current >= updateInterval.current) {
      updateRotation(time);
      updateLightPosition(mouse, viewport);
      lastUpdateTime.current = now;
    }
  });

  return (
    <group ref={ref}>
      <pointLight 
        ref={light}
        distance={40} 
        intensity={lowPerformanceMode ? 5 : 10} 
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
      
      {/* 低性能模式下减少渲染的粒子数量 */}
      {(lowPerformanceMode ? pointsInner.filter((_, i) => i % 2 === 0) : pointsInner).map((point) => (
        <Point 
          key={point.idx} 
          position={point.position} 
          color={point.color === "#ffffff" ? getRandomColor() : point.color} 
          size={getRandomSize(0.05, 0.18)}
        />
      ))}
      {(lowPerformanceMode ? pointsOuter.filter((_, i) => i % 2 === 0) : pointsOuter).map((point) => (
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

// 优化Point组件以避免不必要的重渲染
const Point = ({ position, color, size = 0.1 }: { position: number[]; color: string; size?: number }) => {
  // 创建一个缓存的Vector3对象以避免每次渲染时创建新对象
  const positionVector = useRef(new Vector3(position[0], position[1], position[2])).current;
  
  return (
    <Sphere position={positionVector} args={[size, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.25}
        metalness={0.85}
        color={color}
      />
    </Sphere>
  );
};

// 优化后期处理效果组件
const Postpro = () => {
  const water = useRef<any>(null);
  const lastUpdateTime = useRef<number>(0);
  const updateInterval = useRef<number>(30); // 降低后期处理的更新频率
  
  useFrame((state) => {
    const now = Date.now();
    
    // 降低后期处理的更新频率
    if (now - lastUpdateTime.current >= updateInterval.current) {
      if (water.current) {
        water.current.time = state.clock.elapsedTime * 2;
      }
      lastUpdateTime.current = now;
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