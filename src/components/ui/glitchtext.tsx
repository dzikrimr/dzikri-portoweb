import { cn } from '@/lib/utils';

type Props = {
  children: string;
  className?: string;
  active?: boolean;   
  speed?: number;      
};

const GlitchText = ({ 
  children, 
  className = '', 
  active = false,
  speed = 0.6 
}: Props) => {
  return (
    <div
      className={cn(
        "glitch relative inline-block",
        active && "glitching", 
        className
      )}
      data-text={children}
      style={{ '--speed': speed } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default GlitchText;