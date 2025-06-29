import { emotionConfig } from '../emotionConfig';

// Header 컴포넌트
const Header = ({ currentEmotion }) => {
  const config = emotionConfig[currentEmotion] || emotionConfig['중립']
  
  return (
    <div className="text-center py-8 px-4">
      <div className="mb-6">
        <div
          key={currentEmotion}
          className="text-8xl mb-4 animate-bounce-in transition-transform duration-500 hover:scale-110"
        >
          {config.emoji}
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">
          EmoPT
        </h1>
        <p className="text-gray-600 text-sm text-center">
          감정 기반 GPT 상담 챗봇
        </p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 max-w-lg mx-auto">
        <p className="text-gray-600 text-sm text-center">
          지금 느끼는 감정을 자유롭게 표현해보세요. 
          <br />
          따뜻한 위로와 공감을 드릴게요. 💙
        </p>
      </div>
    </div>
  )
}

export default Header; 