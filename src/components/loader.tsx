import { motion } from 'framer-motion';
import { FC } from 'react';

const Loader: FC = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center justify-center">
        {/* 外轨道 */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full border border-blue-500/30"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        
        {/* 中轨道 */}
        <motion.div 
          className="absolute w-28 h-28 rounded-full border border-purple-500/40"
          animate={{ rotate: -360 }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        
        {/* 内轨道 */}
        <motion.div 
          className="absolute w-16 h-16 rounded-full border border-teal-500/50"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
        
        {/* 星球1 */}
        <motion.div
          className="absolute w-40 h-40"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transform: "rotate(30deg)" }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 absolute"
            style={{ 
              top: "30%", 
              right: "-2px",
              transform: "translateY(-30%)"
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
        
        {/* 星球2 */}
        <motion.div
          className="absolute w-28 h-28"
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transform: "rotate(120deg)" }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 absolute"
            style={{ 
              top: "28%", 
              right: "-1.5px",
              transform: "translateY(-28%)"
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
        
        {/* 星球3 */}
        <motion.div
          className="absolute w-16 h-16"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transform: "rotate(210deg)" }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-teal-500 shadow-lg shadow-teal-500/50 absolute"
            style={{ 
              top: "28%", 
              right: "-1px",
              transform: "translateY(-28%)"
            }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
        
        {/* 中心星球 */}
        <motion.div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg shadow-orange-500/50 z-10"
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* 加载文字 */}
        <div className="absolute -bottom-12 text-white text-lg font-light tracking-widest">
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            LOADING
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
