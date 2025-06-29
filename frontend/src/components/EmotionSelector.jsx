import { emotionConfig } from '../emotionConfig';

// 감정 데이터 - 설명 추가
const emotions = [
  { name: "슬픔", emoji: "😢", description: "마음이 가라앉아요", color: "#dbeafe" },
  { name: "분노", emoji: "😠", description: "속이 부글부글해요", color: "#fee2e2" },
  { name: "중립", emoji: "😐", description: "그냥 그런 느낌이에요", color: "#f3f4f6" },
  { name: "기쁨", emoji: "😊", description: "기분이 좋아요!", color: "#fef9c3" },
  { name: "불안", emoji: "😰", description: "왠지 불안해요", color: "#e0e7ff" },
  { name: "행복", emoji: "😄", description: "편안하고 좋아요", color: "#dcfce7" }
];

// EmotionSelector 컴포넌트 - 카드형 리디자인
const EmotionSelector = ({ onEmotionSelect, currentEmotion }) => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-8">
        감정을 선택해보세요
      </h2>
      <div className="grid grid-cols-3 gap-6 justify-items-center max-w-2xl mx-auto">
        {emotions.map(({ name, emoji, description, color }) => (
          <div
            key={name}
            onClick={() => onEmotionSelect(name)}
            className={`bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform duration-200 cursor-pointer text-center ${
              currentEmotion === name ? "ring-2 ring-blue-500" : ""
            }`}
            style={{ 
              backgroundColor: color,
              width: '160px',
              minHeight: '120px'
            }}
          >
            <div className="text-4xl mb-2">{emoji}</div>
            <div className="text-md font-semibold mb-1 text-gray-800">{name}</div>
            <div className="text-sm text-gray-700 leading-tight">{description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmotionSelector; 