import React, { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Toast from '../components/utils/Toast'
import { useMemo } from 'react'

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

let toastId = 0

const positionClasses = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-12 right-5 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(
    (message, type = 'info', duration = 3000, position = 'bottom-right') => {
      const id = toastId++
      const newToast = { id, message, type, position }

      setToasts((prev) => [...prev, newToast])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    },
    [],
  )

  const groupedToasts = toasts.reduce((acc, toast) => {
    acc[toast.position] = acc[toast.position] || []
    acc[toast.position].push(toast)
    return acc
  }, {})

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {Object.entries(groupedToasts).map(([position, toasts]) => (
        <div
          key={position}
          className={`pointer-events-none fixed z-50 flex flex-col space-y-4 ${positionClasses[position] || positionClasses['bottom-right']}`}
        >
          <AnimatePresence>
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                message={toast.message}
                type={toast.type}
                position={toast.position}
              />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </ToastContext.Provider>
  )
}
