import { useState, useRef, useEffect } from 'react';
import { emotionConfig } from '../emotionConfig';

// EmotionInput 컴포넌트 - 감성적 리디자인
const EmotionInput = ({ message, setMessage, onSubmit, isLoading, currentEmotion }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const textareaRef = useRef(null);
  const config = emotionConfig[currentEmotion] || emotionConfig['중립'];
  const maxChars = 500;
  
  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  // 텍스트 영역 자동 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        handleSubmitWithAnimation(e);
      }
    }
  };

  const handleSubmitWithAnimation = (e) => {
    setIsSubmitClicked(true);
    setTimeout(() => setIsSubmitClicked(false), 300);
    onSubmit(e);
  };

  const suggestions = [
    "오늘 하루 어떠셨나요?",
    "지금 무슨 생각을 하고 계신가요?",
    "어떤 일이 있으셨나요?",
    "현재 기분에 대해 말씀해주세요"
  ];

  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* 제안 메시지 */}
        {!message && !isFocused && (
          <div className="mb-6 flex flex-wrap gap-2 justify-center animate-slide-in">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setMessage(suggestion)}
                className="text-xs bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white/30 ripple-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmitWithAnimation} className="space-y-4">
          <div className="relative group">
            {/* 입력창 컨테이너 */}
            <div 
              className={`relative rounded-2xl transition-all duration-500 transform ${
                isFocused 
                  ? 'ring-2 ring-offset-2 shadow-2xl scale-[1.02] -translate-y-1' 
                  : 'shadow-lg hover:shadow-xl hover:-translate-y-1'
              } ${isSubmitClicked ? 'animate-pulse-glow' : ''}`}
              style={{
                ringColor: isFocused ? config.accentColor + '40' : 'transparent',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: isFocused 
                  ? `0 20px 40px ${config.accentColor}20, 0 0 0 4px ${config.accentColor}20`
                  : '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setMessage(e.target.value);
                  }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="마음 편히 이야기해주세요... 어떤 감정이든 좋아요."
                className="w-full bg-transparent border-none p-6 pr-16 rounded-2xl resize-none text-gray-800 placeholder-gray-500 focus:outline-none text-base leading-relaxed transition-all duration-300"
                style={{ minHeight: '70px' }}
                disabled={isLoading}
              />
              
              {/* 전송 버튼 */}
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className={`absolute right-3 bottom-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform ripple-effect btn-ripple ${
                  message.trim() && !isLoading
                    ? 'hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl'
                    : 'cursor-not-allowed opacity-50'
                }`}
                style={{
                  backgroundColor: message.trim() && !isLoading ? config.accentColor : '#9CA3AF'
                }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-6 h-6 text-white transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>

              {/* 포커스 시 글로우 효과 */}
              {isFocused && (
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse-glow"
                  style={{
                    background: `linear-gradient(45deg, ${config.accentColor}10, transparent, ${config.accentColor}10)`
                  }}
                />
              )}
            </div>

            {/* 하단 정보 */}
            <div className="flex justify-between items-center mt-4 px-2 transition-all duration-300">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded border">Enter</kbd>
                  <span>전송</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded border">Shift</kbd>
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded border">Enter</kbd>
                  <span>줄바꿈</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: charCount > maxChars * 0.8 ? '#F59E0B' : config.accentColor 
                    }}
                  />
                  <span className={`text-sm transition-colors duration-300 ${
                    charCount > maxChars * 0.8 ? 'text-orange-500 font-medium' : 'text-gray-500'
                  }`}>
                    {charCount}/{maxChars}
                  </span>
                </div>
                
                {message && (
                  <button
                    type="button"
                    onClick={() => setMessage('')}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-all duration-200 flex items-center space-x-1 hover:scale-105 ripple-effect"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>지우기</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmotionInput; 