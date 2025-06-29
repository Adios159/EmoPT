import { emotionConfig } from '../emotionConfig';

// EmotionSelector 컴포넌트 - 카드형 리디자인
const EmotionSelector = ({ onEmotionSelect, currentEmotion }) => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
        감정을 선택해보세요
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto">
        {Object.entries(emotionConfig).map(([emotion, config]) => (
          <div
            key={emotion}
            onClick={() => onEmotionSelect(emotion)}
            className={`
              bg-white p-4 rounded-xl shadow text-center 
              hover:bg-blue-50 hover:scale-105 transition-all duration-300 cursor-pointer select-none
              transform hover:shadow-lg active:scale-95
              border-2 backdrop-blur-sm
              ${currentEmotion === emotion 
                ? `${config.borderColor} ring-2 ring-offset-1 shadow-lg` 
                : 'border-gray-100 hover:border-gray-200'
              }
            `}
            style={currentEmotion === emotion ? { backgroundColor: `${config.bgColor}30` } : undefined}
          >
            <div className="text-4xl mb-1 transform transition-transform duration-200 hover:scale-110">
              {config.emoji}
            </div>
            <div className={`text-xs font-medium ${config.textColor} transition-colors`}>
              {emotion}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmotionSelector; 