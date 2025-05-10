import React, { useState, useEffect, ImgHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// 定义 Portal 容器组件
const Portal: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  return mounted ? createPortal(children, document.body) : null;
};

// 主组件
export default function Zmage({
  src,
  alt,
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [isZoomed, setIsZoomed] = useState(false);
  
  // 处理键盘 ESC 事件
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomed(false);
    };
    
    if (isZoomed) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isZoomed]);
  
  return (
    <>
      <img
        src={src}
        alt={alt || "Image"}
        className={className}
        onClick={() => setIsZoomed(true)}
        style={{ cursor: 'zoom-in' }}
        {...props}
      />
      
      <AnimatePresence>
        {isZoomed && (
          <Portal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
              }}
              onClick={() => setIsZoomed(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position: 'relative',
                  maxWidth: '90%',
                  maxHeight: '90%',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  src={src}
                  alt={alt || "Zoomed image"}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                  }}
                  whileHover={{ scale: 1.02 }}
                />
                <motion.button
                  onClick={() => setIsZoomed(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    padding: '8px',
                  }}
                >
                  <X size={24} />
                </motion.button>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
