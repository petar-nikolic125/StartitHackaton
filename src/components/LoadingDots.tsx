export function LoadingDots() {
  return (
    <span className="inline-flex space-x-1">
      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse" />
      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse delay-150" />
      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse delay-300" />
    </span>
  );
}
