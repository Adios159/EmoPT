import { emotionConfig } from '../emotionConfig';

// Header 컴포넌트 - 반응형 최적화
const Header = ({ currentEmotion }) => {
  const config = emotionConfig[currentEmotion] || emotionConfig['중립']
  
  return (
    <header className="text-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        EmoPT
      </h1>
      <p className="text-black mb-6">
        감정 기반 GPT 상담 챗봇
      </p>
      
      <div className="bg-white/80 rounded-lg shadow-sm p-4 max-w-md mx-auto">
        <p className="text-sm text-gray-700">
          지금 느끼는 감정을 자유롭게 표현해보세요. 💙
        </p>
      </div>
    </header>
  );
};

export default Header; 