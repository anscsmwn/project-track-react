import React from 'react'

const Toast = ({ description, isError = false }) => {
  const bgColor = isError ? 'bg-red-100' : 'bg-teal-100'
  const borderColor = isError ? 'border-red-500' : 'border-teal-500'
  const textColor = isError ? 'text-red-900' : 'text-teal-900'
  const iconColor = isError ? 'text-red-500' : 'text-teal-500'

  return (
    <div
      className={`${bgColor} border-t-4 ${borderColor} rounded-b ${textColor} px-4 py-3 shadow-md`}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className={`fill-current h-6 w-6 ${iconColor} mr-4`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="text-sm max-w-xs">
            {description || 'Make sure you know how these changes affect you.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Toast
