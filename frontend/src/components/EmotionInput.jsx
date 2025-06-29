import { useState, useEffect } from 'react';
import { emotionConfig } from '../emotionConfig';

// EmotionInput 컴포넌트 - 인터렉티브 디자인
const EmotionInput = ({ message, setMessage, onSubmit, isLoading, currentEmotion = '중립' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  const config = emotionConfig[currentEmotion] || emotionConfig['중립'];
  
  useEffect(() => {
    setWordCount(message.length);
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(e);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const getEmotionGradient = () => {
    const colors = {
      '슬픔': 'from-blue-400/20 to-blue-600/20',
      '기쁨': 'from-yellow-400/20 to-yellow-600/20', 
      '분노': 'from-red-400/20 to-red-600/20',
      '불안': 'from-purple-400/20 to-purple-600/20',
      '중립': 'from-gray-400/20 to-gray-600/20',
      '행복': 'from-green-400/20 to-green-600/20'
    };
    return colors[currentEmotion] || colors['중립'];
  };

  return (
    <div className="p-6 mt-[30px] animate-fade-in">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-20">
        {/* 메인 입력 컨테이너 */}
                 <div className={`
           relative glass-container hover-lift transition-all duration-500 ease-out
           ${isFocused ? 'glass-strong scale-[1.02] animate-glow' : ''}
           bg-gradient-to-br ${getEmotionGradient()}
         `}>
                     {/* 감정 표시 헤더 */}
           <div className="flex items-center justify-between p-4 border-b border-white/20">
             <div className="flex items-center space-x-3">
               <span className="text-2xl animate-float">{config.emoji}</span>
               <div>
                 <h3 className="font-semibold text-gray-800">{currentEmotion} 상태</h3>
                 <p className="text-xs text-gray-600">자유롭게 마음을 표현해보세요</p>
               </div>
             </div>
           </div>

                     {/* 텍스트 영역 */}
           <div className="p-4 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="마음 편히 이야기해주세요... 💭"
              className={`
                w-full resize-none border-none outline-none bg-transparent
                text-gray-800 placeholder-gray-500
                transition-all duration-300 ease-out
                ${isFocused ? 'transform scale-[1.01]' : ''}
              `}
                             style={{ 
                 fontFamily: "'Nanum Gothic', sans-serif",
                 fontSize: '16px',
                 lineHeight: '1.5'
               }}
              rows="3"
              maxLength={500}
              disabled={isLoading}
            />
            
            {/* 포커스 시 글로우 효과 */}
            {isFocused && (
              <div 
                className="absolute inset-0 rounded-lg opacity-30 animate-glow pointer-events-none"
                style={{ 
                  background: `linear-gradient(45deg, ${config.accentColor}40, transparent)`,
                  filter: 'blur(20px)'
                }}
              />
            )}
          </div>
          
                     {/* 하단 컨트롤 */}
           <div className="flex justify-between items-center px-4 py-3 border-t border-white/20 bg-white/10 backdrop-blur-sm">
                         {/* 글자 수 카운터 */}
             <div className="flex items-center space-x-4 ml-[40px]">
              <div className={`
                text-sm transition-colors duration-300
                ${wordCount > 450 ? 'text-red-500 animate-pulse' : 
                  wordCount > 350 ? 'text-yellow-600' : 'text-gray-500'}
              `}>
                <span className="font-mono">{wordCount}</span>
                <span className="text-gray-400">/500</span>
              </div>
              
              {/* 진행 바 */}
              <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300 ease-out rounded-full"
                  style={{ 
                    width: `${(wordCount / 500) * 100}%`,
                    backgroundColor: config.accentColor,
                    boxShadow: `0 0 8px ${config.accentColor}60`
                  }}
                />
              </div>
            </div>
            
            {/* 전송 버튼 */}
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
                             className={`
                 relative px-5 py-2.5 rounded-xl font-semibold text-white
                transition-all duration-300 ease-out
                ripple-effect hover-lift focus-ring
                ${!isLoading && message.trim() 
                  ? 'hover:scale-105 active:scale-95 hover:shadow-lg animate-pulse-glow' 
                  : 'opacity-50 cursor-not-allowed'
                }
              `}
              style={{
                background: message.trim() && !isLoading 
                  ? `linear-gradient(135deg, ${config.accentColor}, ${config.accentColor}dd)`
                  : '#9CA3AF'
              }}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>전송 중...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>전송</span>
                  <span className="text-lg">✨</span>
                </div>
              )}
            </button>
          </div>
          
          {/* 감정별 파티클 효과 */}
          {isFocused && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="particle absolute animate-bounce-in"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                    backgroundColor: config.accentColor,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 힌트 메시지 */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 animate-slide-in">
            💡 <span className="font-medium">팁:</span> 
            {currentEmotion === '중립' 
              ? '감정을 선택하면 더 개인화된 응답을 받을 수 있어요'
              : `${currentEmotion} 감정에 맞는 맞춤형 상담을 제공해드릴게요`
            }
          </p>
        </div>
      </form>
    </div>
  );
};

export default EmotionInput; 