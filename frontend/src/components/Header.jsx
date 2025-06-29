import { emotionConfig } from '../emotionConfig';

// Header 컴포넌트 - 반응형 최적화
const Header = ({ currentEmotion }) => {
  const config = emotionConfig[currentEmotion] || emotionConfig['중립']
  
  return (
    <header className="text-center py-4 sm:py-6 lg:py-8 px-4" role="banner">
      <div className="mb-4 sm:mb-6">
        <div
          key={currentEmotion}
          className="text-4xl sm:text-6xl lg:text-8xl mb-3 sm:mb-4 animate-bounce-in transition-transform duration-500 hover:scale-110 focus:scale-110 focus:outline-none"
          tabIndex="0"
          role="img"
          aria-label={`현재 감정: ${currentEmotion}`}
        >
          {config.emoji}
        </div>
        
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 text-gray-800">
          <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            EmoPT
          </span>
        </h1>
        
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center max-w-xs sm:max-w-sm mx-auto">
          감정 기반 GPT 상담 챗봇
        </p>
      </div>
      
      <div className="bg-white/60 sm:bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md p-3 sm:p-4 lg:p-6 max-w-xs sm:max-w-lg lg:max-w-xl mx-auto transition-all duration-300 hover:bg-white/70 hover:shadow-lg">
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center leading-relaxed">
          <span className="block sm:inline">지금 느끼는 감정을 자유롭게 표현해보세요.</span>
          {' '}
          <span className="block sm:inline mt-1 sm:mt-0">
            따뜻한 위로와 공감을 드릴게요. 💙
          </span>
        </p>
      </div>
      
      {/* 모바일용 현재 감정 표시 - 작은 화면에서만 표시 */}
      {currentEmotion && currentEmotion !== '중립' && (
        <div className="mt-4 sm:hidden">
          <div 
            className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md text-xs"
            style={{ color: config.accentColor }}
          >
            <span>{config.emoji}</span>
            <span className="font-medium">{currentEmotion}</span>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header; 