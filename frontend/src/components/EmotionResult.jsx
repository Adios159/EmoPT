import { useState, useEffect } from 'react';
import { emotionConfig } from '../emotionConfig';

// EmotionResult 컴포넌트
const EmotionResult = ({ response, emotion, isLoading }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    if (response && !isLoading) {
      setIsTyping(true);
      setDisplayedText('');
      
      let index = 0;
      const timer = setInterval(() => {
        if (index < response.length) {
          setDisplayedText(response.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 30);
      
      return () => clearInterval(timer);
    }
  }, [response, isLoading]);
  
  if (!response && !isLoading) return null;
  
  const config = emotionConfig[emotion] || emotionConfig['중립'];
  
  return (
    <section className="px-3 sm:px-4 py-4 sm:py-6" aria-live="polite" role="region" aria-label="AI 감정 분석 결과">
      <div className="max-w-2xl mx-auto">
        {isLoading ? (
          <div className="relative">
            {/* 로딩 상태 - 반응형 최적화 */}
            <div 
              className="rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 text-center backdrop-blur-sm border"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: config.accentColor + '20'
              }}
              role="status"
              aria-label="AI가 감정을 분석하고 있습니다"
            >
              <div className="flex items-center justify-center space-x-1 mb-4 sm:mb-6">
                <div 
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-bounce"
                  style={{ backgroundColor: config.accentColor, animationDelay: '0s' }}
                  aria-hidden="true"
                />
                <div 
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-bounce"
                  style={{ backgroundColor: config.accentColor, animationDelay: '0.1s' }}
                  aria-hidden="true"
                />
                <div 
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-bounce"
                  style={{ backgroundColor: config.accentColor, animationDelay: '0.2s' }}
                  aria-hidden="true"
                />
              </div>
              
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 animate-pulse" aria-hidden="true">
                {config.emoji}
              </div>
              <p className="text-gray-700 font-medium mb-2 text-sm sm:text-base">
                AI가 당신의 마음을 이해하고 있어요
              </p>
              <p className="text-xs sm:text-sm text-gray-500">잠시만 기다려주세요...</p>
              
              {/* 진행 바 애니메이션 - 반응형 */}
              <div className="mt-4 sm:mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <div 
                  className="h-1 rounded-full animate-pulse"
                  style={{ 
                    backgroundColor: config.accentColor,
                    width: '60%',
                    animation: 'progress 2s ease-in-out infinite'
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        ) : (
          <article className="animate-fade-in">
            {/* 감정 헤더 - 반응형 최적화 */}
            <header 
              className="rounded-t-xl sm:rounded-t-2xl p-4 sm:p-6 border-b backdrop-blur-sm"
              style={{ 
                backgroundColor: config.bgColor,
                borderColor: config.accentColor + '20'
              }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="text-3xl sm:text-4xl animate-bounce-in" aria-hidden="true">
                  {config.emoji}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className={`text-lg sm:text-xl font-bold ${config.textColor} mb-1`}>
                    {emotion} 감정
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">AI 분석 완료</p>
                </div>
              </div>
            </header>
            
            {/* 응답 내용 - 반응형 최적화 */}
            <div className="bg-white rounded-b-xl sm:rounded-b-2xl shadow-lg p-4 sm:p-6 border-l-4" style={{ borderColor: config.accentColor }}>
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-4 sm:h-5 bg-gray-400 ml-1 animate-pulse" aria-hidden="true" />
                  )}
                </div>
              </div>
              
              {/* 하단 메타 정보 - 반응형 최적화 */}
              <footer className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.accentColor }} aria-hidden="true" />
                  <span className="text-xs sm:text-sm text-gray-500">
                    {new Date().toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}에 분석됨
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end">
                  <button 
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-50 ripple-effect"
                    aria-label="분석 결과 공유하기"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>공유</span>
                  </button>
                  
                  <button 
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-50 ripple-effect"
                    aria-label="분석 결과 저장하기"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>저장</span>
                  </button>
                </div>
              </footer>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default EmotionResult; 