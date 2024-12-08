export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
        <span className="text-white font-bold text-xl transform -rotate-12">L</span>
        <span className="text-white font-bold text-xl transform rotate-12">G</span>
      </div>
      <span className="text-white font-bold text-xl">LoL Guide</span>
    </div>
  );
} 