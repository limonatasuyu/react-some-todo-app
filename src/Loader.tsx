export default function Loader({className}: {className?: string}) {
  return (
    <div className={className ? "flex space-x-2 justify-center " + className: "flex space-x-2 justify-center"}>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-beat"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-beat animation-delay-200"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-beat animation-delay-400"></div>
    </div>
  );
};
