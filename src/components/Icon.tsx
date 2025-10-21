import { Bolt, Wrench, Settings, Monitor } from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = "w-6 h-6" }: IconProps) {
  const iconMap = {
    bolt: Bolt,
    wrench: Wrench,
    tool: Settings,
    monitor: Monitor,
  };

  const IconComponent = iconMap[name as keyof typeof iconMap];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
}
