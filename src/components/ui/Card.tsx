import { FC, ReactNode, HTMLAttributes } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  hover?: boolean
}

export const Card: FC<CardProps> = ({
                                      children,
                                      className,
                                      hover = true,
                                      ...rest
                                    }) => (
    <div
        {...rest} /* Spread all other div attributes, including onClick */
        className={clsx(
            'rounded-xl bg-dark1/80 border border-dark-overlay p-6 text-gray-100 shadow-card-lg',
            hover &&
            'transform transition-all duration-200 hover:-translate-y-1 hover:ring-2 hover:ring-primary/50',
            className
        )}
    >
      {children}
    </div>
)
