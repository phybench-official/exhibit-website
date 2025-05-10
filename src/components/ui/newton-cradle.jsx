import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { RefreshCw } from 'lucide-react';

const NewtonCradle = ({ height = 600 }) => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const cradleRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);
  const [showButton, setShowButton] = useState(true);
  
  useEffect(() => {
    // 处理滚动事件
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Matter.js模块
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Body = Matter.Body;
    const Composite = Matter.Composite;
    const Constraint = Matter.Constraint;
    const Bodies = Matter.Bodies;
    const MouseConstraint = Matter.MouseConstraint;
    const Mouse = Matter.Mouse;
    
    // 创建引擎
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    
    // 动态获取容器宽度
    const containerWidth = sceneRef.current.clientWidth;
    
    // 创建渲染器
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: containerWidth,
        height: height,
        wireframes: false,
        background: 'transparent',
        showVelocity: false,
        pixelRatio: window.devicePixelRatio // 确保高清显示
      }
    });
    renderRef.current = render;
    
    Render.run(render);
    
    // 创建运行器
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    
    // 响应式计算球体大小
    const calculateBallSize = (width) => {
      // 基础球体大小
      const baseBallSize = 30;
      // 最小球体大小
      const minBallSize = 20;
      // 基准宽度 (桌面尺寸)
      const baseWidth = 1024;
      
      return Math.max(baseBallSize * (width / baseWidth), minBallSize);
    };
    
    // 使用函数计算当前球体大小
    const ballSize = calculateBallSize(containerWidth);
    
    // 球体数量
    const numBalls = 6;
    // 计算居中所需的偏移量
    const centerOffset = (numBalls * ballSize * 2.1) / 2;
    // 悬挂长度，也根据球体大小进行缩放
    const pendulumLength = ballSize * 5;
    
    const cradle = createNewtonsCradle(
      containerWidth / 2 - centerOffset + ballSize, // 调整起始位置使整体居中
      80, // 抬高悬挂点位置
      numBalls, 
      ballSize, 
      pendulumLength, 
      ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']
    );
    Composite.add(world, cradle);
    
    // 保存到ref中以便重置时访问
    cradleRef.current = cradle;
    
    // 初始时提高第一个球的位置，增加初始势能 (根据球体大小调整)
    Body.translate(cradle.bodies[0], { x: -ballSize * 4.5, y: -ballSize * 3.75 });
    
    // 添加鼠标控制
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    
    Composite.add(world, mouseConstraint);
    
    // 保持鼠标与渲染同步
    render.mouse = mouse;
    
    // 调整视图
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: containerWidth, y: height }
    });
    
    // 创建彩色牛顿摆的函数
    function createNewtonsCradle(xx, yy, number, size, length, colors) {
      const newtonsCradle = Composite.create({ label: 'Newtons Cradle' });
      
      for (let i = 0; i < number; i++) {
        const separation = 2.1; // 增加球体间距
        const circle = Bodies.circle(
          xx + i * (size * separation), 
          yy + length, 
          size, 
          { 
            inertia: Infinity, 
            restitution: 0.98, // 增加弹性系数，让摆动时间更长
            friction: 0, 
            frictionAir: 0.0002, // 进一步减小空气阻力，让摆动时间更长
            slop: size * 0.01,
            render: {
              fillStyle: colors[i % colors.length],
              strokeStyle: '#222',
              lineWidth: 2,
              shadowColor: 'rgba(0,0,0,0.2)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        );
        
        const constraint = Constraint.create({ 
          pointA: { x: xx + i * (size * separation), y: yy }, 
          bodyB: circle,
          length: length,
          stiffness: 0.9,
          render: {
            strokeStyle: '#555',
            lineWidth: 2
          }
        });
        
        Composite.addBody(newtonsCradle, circle);
        Composite.addConstraint(newtonsCradle, constraint);
      }
      
      return newtonsCradle;
    }
    
    // 窗口大小变化时重新调整
    const handleResize = () => {
      if (!sceneRef.current || !render) return;
      
      const newWidth = sceneRef.current.clientWidth;
      
      // 重新计算球体大小
      const newBallSize = calculateBallSize(newWidth);
      const pendulumLength = newBallSize * 5;
      
      // 重新定位牛顿摆以保持居中
      const newCenterOffset = (numBalls * newBallSize * 2.1) / 2;
      const centerX = newWidth / 2 - newCenterOffset + newBallSize;
      
      // 更新所有球体和约束的位置
      cradle.bodies.forEach((body, i) => {
        const separation = 2.1;
        const originalX = centerX + i * (newBallSize * separation);
        
        // 计算需要调整的X轴位移
        const offsetX = originalX - body.position.x;
        
        // 调整球体大小和位置
        Body.scale(body, newBallSize / body.circleRadius, newBallSize / body.circleRadius);
        Body.translate(body, { x: offsetX, y: 0 });
        
        // 更新对应约束的锚点和长度
        cradle.constraints[i].pointA.x = originalX;
        cradle.constraints[i].length = pendulumLength;
      });
      
      Render.setPixelRatio(render, window.devicePixelRatio);
      Render.setSize(render, newWidth, height);
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: newWidth, y: height }
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // 确保canvas撑满容器
    render.canvas.style.width = '100%';
    render.canvas.style.height = '100%';
    
    // 清理函数
    return () => {
      // 取消渲染和运行
      Render.stop(render);
      Runner.stop(runner);
      
      // 销毁引擎
      if (render && render.canvas) {
        render.canvas.remove();
      }
      
      // 清除引用
      engineRef.current = null;
      renderRef.current = null;
      runnerRef.current = null;
      window.removeEventListener('resize', handleResize);
    };
  }, [height, isResetting]);
  
  // 重置牛顿摆的函数
  const resetCradle = () => {
    setIsResetting(true);
    setTimeout(() => setIsResetting(false), 100);
  };
  
  return (
    <>
      {/* 背景光源 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 主聚光灯 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-transparent via-pink-800/10 to-transparent dark:from-pink-500/15 dark:via-pink-300/20 dark:to-pink-500/15 blur-3xl"></div>
        
        {/* 左侧 */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[25rem] h-[25rem] rounded-full bg-gradient-to-br from-purple-800/50 via-transparent to-transparent dark:from-purple-600/55 dark:via-transparent dark:to-transparent blur-3xl z-20"></div>
        
        {/* 右侧 */}
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full bg-gradient-to-br from-transparent via-transparent to-lime-500/50 dark:from-transparent dark:via-transparent dark:to-lime-500/55 blur-3xl"></div>
      </div>
      <div 
        ref={sceneRef} 
        style={{ 
          width: '100%',
          height: height, 
          overflow: 'hidden',
        }} 
      />
      {showButton && (
        <button
          onClick={resetCradle}
          className='rounded-full md:fixed md:block hidden top-24 left-36 bg-slate-800 dark:bg-slate-50 text-white dark:text-black p-2 mt-4 transition-opacity duration-300 z-50 cursor-pointer'
        >
          <RefreshCw className='w-6 h-6' />
        </button>
      )}
    </>
  );
};

export default NewtonCradle;
