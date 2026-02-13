import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type HeaderContainerProps = {
  children: ReactNode
  width?: 'content' | 'full'
  className?: string
}

/**
 * HeaderContainer - Generic header wrapper
 * 
 * Responsibilities:
 * - Renders semantic <header> tag
 * - Controls width (content-width or full-width)
 * - Theme-agnostic
 * - Provides consistent spacing
 */
export const HeaderContainer = ({ 
  children, 
  width = 'content',
  className 
}: HeaderContainerProps) => {
  return (
    <header className={cn('py-8', className)}>
      {width === 'full' ? (
        children
      ) : (
        <div className="max-w-[1400px] mx-auto px-10">
          {children}
        </div>
      )}
    </header>
  )
}

export default HeaderContainer
