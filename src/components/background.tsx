'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-screen h-screen fixed inset-0 -z-10 bg-background">
      {/* 简约的几何图形背景 */}
      <div className="absolute w-full h-full inset-0 overflow-hidden">
        {/* 淡色圆形装饰 */}
        <div className={`absolute -top-40 -right-40 w-full h-full rounded-full opacity-20 ${
          theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
        } blur-3xl`} />
        
        <div className={`absolute -bottom-40 -left-40 w-full h-full rounded-full opacity-20 ${
          theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'
        } blur-3xl`} />
      </div>
    </div>
  );
}