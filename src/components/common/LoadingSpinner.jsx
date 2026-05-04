const LoadingSpinner = ({ size = 'md', label = 'Loading…' }) => {
  const sizes = {
    sm: 'w-4 h-4 border',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-2',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-label={label}>
      <div
        className={`${sizes[size]} rounded-full border-gray-200 dark:border-gray-800 border-t-gray-900 dark:border-t-gray-100 animate-spin`}
      />
      {label && (
        <span className="text-xs text-gray-400 dark:text-gray-500 font-display tracking-wide">
          {label}
        </span>
      )}
    </div>
  )
}

export default LoadingSpinner
