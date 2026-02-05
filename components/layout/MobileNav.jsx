'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Shield, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Ana Sayfa', icon: Home },
  { href: '/dilekce-olusturucu', label: 'Dilekçe', icon: FileText },
  { href: '/risk-analizi', label: 'Risk', icon: Shield },
  { href: '/tuketici-hakem', label: 'THH', icon: Scale },
];

/**
 * Mobile Bottom Navigation Component
 * Fixed navigation bar for mobile devices
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50">
      <div className="flex justify-around items-center py-2 px-4 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-all active:scale-95",
                isActive 
                  ? "text-primary" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 mb-1 transition-transform",
                  isActive && "scale-110"
                )} 
                fill={isActive ? "currentColor" : "none"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-0.5 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;
