'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Users, 
  Search, 
  Library, 
  Calendar, 
  UserCircle,
  Home
} from 'lucide-react'
import { HavrutaLogo } from '@/components/ui/HavrutaLogo'

const navigation = [
  { name: 'בית', href: '/', icon: Home },
  { name: 'גילוי', href: '/(main)/discovery', icon: Search },
  { name: 'בית מדרש', href: '/(main)/library', icon: Library },
  { name: 'יומן', href: '/(main)/schedule', icon: Calendar },
  { name: 'פרופיל', href: '/(main)/profile', icon: UserCircle },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Bottom Navigation (Floating Glassmorphism) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md md:hidden">
        <div className="bg-glass-light backdrop-blur-xl rounded-full px-2 py-3 shadow-glass border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-around gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'relative flex flex-col items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-300',
                    isActive 
                      ? 'text-primary scale-110' 
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  )}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl -z-10 animate-pulse-glow" />
                  )}
                  <item.icon className={cn("w-5 h-5 transition-transform duration-300", isActive && "scale-110 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]")} />
                  <span className={cn("text-[10px] font-semibold transition-all duration-300", isActive ? "opacity-100" : "opacity-70")}>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar Navigation (Glassmorphism & Gradients) */}
      <aside className="hidden md:fixed md:right-0 md:top-0 md:h-full md:w-72 bg-glass-light backdrop-blur-2xl shadow-glass-lg border-l border-white/20 dark:border-white/10 z-40 transition-all duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-glow" />
            <div className="flex items-center gap-4">
              <HavrutaLogo size="lg" animated={true} />
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
                  חברותא-קונקט
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  חיבור לומדי תורה בעולם הדיגיטלי
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <ul className="space-y-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href))
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden',
                        isActive
                          ? 'bg-primary text-white shadow-glow'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                      )}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      )}
                      <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive && "drop-shadow-md")} />
                      <span className="font-semibold text-base">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/20">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
              <p>© 2024 חברותא-קונקט</p>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(217,70,239,0.5)]" title="מערכת פעילה" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Spacer (Account for safe areas) */}
      <div className="h-28 md:hidden safe-area-bottom" />
      
      {/* Desktop Spacer */}
      <div className="hidden md:block w-72 transition-all duration-300" />
    </>
  )
}
