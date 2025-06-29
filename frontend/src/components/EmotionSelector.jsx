/* EmotionSelector.jsx */
import { useState, useEffect } from "react";
import { emotionConfig } from '../emotionConfig';

const emotions = [
  { name: "슬픔", desc: "마음이 가라앉아요" },
  { name: "분노", desc: "속이 부글부글해요" },
  { name: "중립", desc: "그냥 그런 느낌이에요" },
  { name: "기쁨", desc: "기분이 좋아요!" },
  { name: "불안", desc: "왠지 불안해요" },
  { name: "행복", desc: "편안하고 좋아요" }
];

export default function EmotionSelector({ onEmotionSelect, currentEmotion }) {
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState({});

  // 감정 선택 시 애니메이션 트리거
  useEffect(() => {
    if (currentEmotion) {
      setAnimationTrigger(prev => ({ ...prev, [currentEmotion]: Date.now() }));
    }
  }, [currentEmotion]);

  const getEmotionGradient = (emotionName) => {
    const colors = {
      '슬픔': 'from-blue-400/30 to-blue-600/30',
      '기쁨': 'from-yellow-400/30 to-yellow-600/30', 
      '분노': 'from-red-400/30 to-red-600/30',
      '불안': 'from-purple-400/30 to-purple-600/30',
      '중립': 'from-gray-400/30 to-gray-600/30',
      '행복': 'from-green-400/30 to-green-600/30'
    };
    return colors[emotionName] || colors['중립'];
  };

  // 감정별 특별 효과 렌더링
  const renderEmotionEffects = (emotionName, isSelected, isHovered) => {
    const config = emotionConfig[emotionName];
    
    if (!isSelected && !isHovered) return null;

    const effects = {
      '슬픔': (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {/* 떨어지는 물방울 효과 */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-3 bg-blue-400 rounded-full opacity-60 animate-bounce"
              style={{
                left: `${20 + i * 20}%`,
                top: '10%',
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s',
                animationIterationCount: 'infinite'
              }}
            />
          ))}
        </div>
      ),
      '기쁨': (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {/* 반짝이는 별 효과 */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400 animate-ping"
              style={{
                left: `${10 + (i % 3) * 30}%`,
                top: `${10 + Math.floor(i / 3) * 40}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            >
              ✨
            </div>
          ))}
        </div>
      ),
      '분노': (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {/* 불꽃 튀는 효과 */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 30}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s',
                boxShadow: '0 0 10px #ef4444'
              }}
            />
          ))}
        </div>
      ),
      '불안': (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {/* 떨리는 파장 효과 */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-purple-400 rounded-xl animate-ping opacity-30"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s',
                animationIterationCount: 'infinite'
              }}
            />
          ))}
        </div>
      ),
      '행복': (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {/* 부드러운 빛 확산 효과 */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-green-400 rounded-full opacity-40 animate-bounce"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 20}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: '2s',
                filter: 'blur(3px)'
              }}
            />
          ))}
        </div>
      ),
      '중립': (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {/* 잔잔한 파형 효과 */}
          <div 
            className="absolute inset-0 rounded-xl opacity-20 animate-pulse"
            style={{
              background: `linear-gradient(45deg, ${config.accentColor}20, transparent)`,
              animationDuration: '3s'
            }}
          />
        </div>
      )
    };

    return effects[emotionName];
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            지금 어떤 기분이신가요?
          </h2>
          <p className="text-gray-600">
            감정을 선택하면 더 맞춤형 상담을 받을 수 있어요 ✨
          </p>
        </div>

        {/* 감정 그리드 */}
        <div className="grid grid-cols-3 gap-6 justify-items-center">
          {emotions.map(({ name, desc }) => {
            const config = emotionConfig[name];
            const isSelected = currentEmotion === name;
            const isHovered = hoveredEmotion === name;
            
            return (
              <button
                key={name}
                onClick={() => {
                  onEmotionSelect && onEmotionSelect(name);
                  // 클릭 시 강렬한 애니메이션 트리거
                  setAnimationTrigger(prev => ({ ...prev, [name]: Date.now() }));
                }}
                onMouseEnter={() => setHoveredEmotion(name)}
                onMouseLeave={() => setHoveredEmotion(null)}
                className={`
                  relative w-[200px] min-h-[120px] rounded-xl p-4 text-center
                  glass-container hover-lift transition-all duration-500 ease-out
                  ${isSelected ? 'glass-strong scale-105 animate-glow' : ''}
                  ${isHovered ? 'scale-[1.02]' : ''}
                  bg-gradient-to-br ${getEmotionGradient(name)}
                  group overflow-hidden
                `}
                style={{
                  boxShadow: isSelected 
                    ? `0 0 30px ${config.accentColor}50, 0 12px 40px rgba(0,0,0,0.15)`
                    : undefined,
                  transform: isSelected 
                    ? 'scale(1.05) translateY(-2px)' 
                    : undefined
                }}
              >
                {/* 배경 강도 효과 */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 rounded-xl opacity-30 animate-pulse"
                    style={{ 
                      background: `radial-gradient(circle at center, ${config.accentColor}40, transparent)`,
                      filter: 'blur(15px)',
                      animationDuration: name === '분노' ? '0.5s' : 
                                        name === '불안' ? '0.8s' : 
                                        name === '기쁨' ? '1.2s' : '2s'
                    }}
                  />
                )}

                {/* 감정 이모지 */}
                <div className={`
                  relative text-4xl mb-2 transition-all duration-300
                  ${isSelected ? 'animate-bounce-in scale-110' : ''}
                  ${isHovered ? 'animate-float' : ''}
                  ${name === '분노' && isSelected ? 'animate-pulse' : ''}
                  ${name === '불안' && isSelected ? 'animate-bounce' : ''}
                  ${name === '기쁨' && isSelected ? 'animate-spin' : ''}
                `}
                style={{
                  animationDuration: 
                    name === '기쁨' && isSelected ? '2s' :
                    name === '분노' && isSelected ? '0.3s' :
                    name === '불안' && isSelected ? '0.6s' : undefined,
                  filter: isSelected ? `drop-shadow(0 0 8px ${config.accentColor})` : undefined
                }}
                >
                  {config.emoji}
                </div>

                {/* 감정 이름 */}
                <div 
                  className={`
                    text-lg font-bold mb-1 transition-all duration-300
                    ${isSelected ? `${config.textColor} scale-105` : 
                      isHovered ? 'scale-110 font-extrabold' : 'text-gray-800'}
                  `}
                  style={{
                    color: isSelected ? undefined : 
                           isHovered ? '#000000' : undefined
                  }}
                >
                  {name}
                </div>

                {/* 감정 설명 */}
                <div 
                  className={`
                    text-sm transition-colors duration-300
                    ${isSelected ? 'text-gray-700 font-medium' : 
                      isHovered ? 'font-semibold' : 'text-gray-600'}
                  `}
                  style={{
                    color: isSelected ? undefined : 
                           isHovered ? '#000000' : undefined
                  }}
                >
                  {desc}
                </div>

                {/* 감정별 특별 효과 */}
                {renderEmotionEffects(name, isSelected, isHovered)}

                {/* 호버 시 글로우 효과 */}
                {isHovered && !isSelected && (
                  <div 
                    className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
                    style={{ 
                      background: `linear-gradient(45deg, ${config.accentColor}30, transparent)`,
                      filter: 'blur(15px)'
                    }}
                  />
                )}

                {/* 선택 표시 링 */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 rounded-xl border-2"
                    style={{ 
                      borderColor: config.accentColor,
                      animation: 'pulse 1.5s infinite'
                    }}
                  />
                )}

                {/* 강도 표시 파티클 */}
                {isSelected && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`${name}-${animationTrigger[name]}-${i}`}
                        className="particle absolute animate-bounce-in opacity-60"
                        style={{
                          left: `${10 + (i % 4) * 25}%`,
                          top: `${10 + Math.floor(i / 4) * 30}%`,
                          backgroundColor: config.accentColor,
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '2s',
                          boxShadow: `0 0 6px ${config.accentColor}`
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>


      </div>
    </div>
  );
} 