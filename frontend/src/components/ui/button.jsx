// src/components/ui/button.jsx
export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium focus:outline-none transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
