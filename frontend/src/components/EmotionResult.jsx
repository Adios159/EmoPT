import { emotionConfig } from '../emotionConfig';

// EmotionResult 컴포넌트
const EmotionResult = ({ response, emotion, isLoading }) => {
  if (!response && !isLoading) return null
  
  const config = emotionConfig[emotion] || emotionConfig['중립']
  
  return (
    <div className="px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {isLoading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 text-center animate-pulse">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="text-gray-600">AI가 당신의 감정을 분석하고 있어요...</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 animate-fade-in">
            <div className="flex items-center justify-center space-x-3 mb-4 pb-4 border-b border-gray-200">
              <div className="text-3xl">{config.emoji}</div>
              <div>
                <span className={`text-lg font-medium mt-4 text-center ${config.textColor}`}>
                  {emotion} 감정이 감지되었어요
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow text-center text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
              {response}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                감정 분석 완료 • {new Date().toLocaleTimeString('ko-KR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmotionResult; 