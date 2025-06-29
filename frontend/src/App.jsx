import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import EmotionSelector from './components/EmotionSelector'
import EmotionResult from './components/EmotionResult'
import EmotionInput from './components/EmotionInput'
import { emotionConfig, emotionColors } from './emotionConfig'

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [emotion, setEmotion] = useState('중립') 
  const [isLoading, setIsLoading] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)
  const [screenSize, setScreenSize] = useState('mobile')
  
  // 화면 크기 및 방향 감지
  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const landscape = width > height
      
      setIsLandscape(landscape)
      
      if (width >= 1024) {
        setScreenSize('desktop')
      } else if (width >= 768) {
        setScreenSize('tablet')
      } else {
        setScreenSize('mobile')
      }
    }
    
    updateScreenInfo()
    window.addEventListener('resize', updateScreenInfo)
    window.addEventListener('orientationchange', updateScreenInfo)
    
    return () => {
      window.removeEventListener('resize', updateScreenInfo)
      window.removeEventListener('orientationchange', updateScreenInfo)
    }
  }, [])
  
  const parseResponse = (responseText) => {
    try {
      // 백엔드 응답 형식: "감정: [감정명]\n메시지: [메시지]"
      const lines = responseText.split('\n');
      let detectedEmotion = '중립';
      let responseMessage = responseText;
      
      // 감정 파싱
      const emotionLine = lines.find(line => line.includes('감정:'));
      if (emotionLine) {
        const emotionText = emotionLine.replace('감정:', '').trim();
        detectedEmotion = ['기쁨', '슬픔', '분노', '불안', '행복', '중립'].find(e => emotionText.includes(e)) || '중립';
      }
      
      // 메시지 파싱
      const messageLine = lines.find(line => line.includes('메시지:'));
      if (messageLine) {
        responseMessage = messageLine.replace('메시지:', '').trim();
      }
      
      return { emotion: detectedEmotion, message: responseMessage };
    } catch (error) {
      console.error("응답 분석 오류:", error);
      return { emotion: '중립', message: responseText };
    }
  };

  const handleEmotionSelect = (emotion) => {
    setEmotion(emotion)
    console.log("선택된 감정:", emotion)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsLoading(true)
    setResponse('')

    try {
      const result = await axios.post('http://127.0.0.1:8000/emotion-chat', {
        message: message
      })

      const { emotion: detectedEmotion, message: responseMessage } = parseResponse(result.data.response);
      
      setResponse(responseMessage)
      setEmotion(detectedEmotion)

    } catch (error) {
      console.error('오류 발생!', error)
      setResponse('이런, 지금은 서버와 연결이 어려운 것 같아요. 나중에 다시 시도해주세요.')
      setEmotion('불안')
    } finally {
      setIsLoading(false)
    }
  }

  const config = emotionConfig[emotion] || emotionConfig['중립'];

  return (
    <div 
      className={`font-sans min-h-screen transition-all duration-700 relative overflow-hidden ${
        isLandscape && screenSize === 'mobile' ? 'landscape-mobile' : ''
      }`}
      style={{
        touchAction: 'manipulation', // 더블탭 줌 방지
        WebkitTapHighlightColor: 'transparent' // 터치 하이라이트 제거
      }}
    >
      {/* 그라데이션 배경 */}
      <div 
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `linear-gradient(135deg, ${config.bgColor}40 0%, ${config.accentColor}20 50%, ${config.bgColor}60 100%)`
        }}
      />
      
      {/* 애니메이션 파티클 - 성능 최적화 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="floating-particles">
          {[...Array(screenSize === 'mobile' ? 4 : 6)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                backgroundColor: config.accentColor + '20'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* 메인 컨테이너 */}
      <div className="relative z-10">
        <main className={`container mx-auto min-h-screen backdrop-blur-sm ${
          screenSize === 'mobile' 
            ? 'px-3 py-2' 
            : screenSize === 'tablet'
            ? 'px-6 py-4 max-w-4xl'
            : 'px-4 py-4 max-w-5xl'
        } ${isLandscape && screenSize === 'mobile' ? 'landscape-layout' : ''}`}>
          
          {/* 가로 모드 레이아웃 (모바일) */}
          {isLandscape && screenSize === 'mobile' ? (
            <div className="grid grid-cols-2 gap-4 h-screen">
              {/* 왼쪽 패널 */}
              <div className="flex flex-col space-y-2 overflow-y-auto">
                <div className="glass-container">
                  <Header currentEmotion={emotion} />
                </div>
                <div className="glass-container flex-1">
                  <EmotionSelector onEmotionSelect={handleEmotionSelect} currentEmotion={emotion} />
                </div>
              </div>
              
              {/* 오른쪽 패널 */}
              <div className="flex flex-col space-y-2 overflow-y-auto">
                {(response || isLoading) && (
                  <div className="glass-container flex-1">
                    <EmotionResult response={response} emotion={emotion} isLoading={isLoading} />
                  </div>
                )}
                <div className="glass-container">
                  <EmotionInput 
                    message={message}
                    setMessage={setMessage}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    currentEmotion={emotion}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* 일반 세로 레이아웃 */
            <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
              {/* 상단: 헤더 */}
              <div className="glass-container">
                <Header currentEmotion={emotion} />
              </div>

              {/* 중단: 감정 선택 */}
              <div className="glass-container">
                <EmotionSelector onEmotionSelect={handleEmotionSelect} currentEmotion={emotion} />
              </div>
              
              {/* GPT 분석 결과 */}
              {(response || isLoading) && (
                <div className="glass-container">
                  <EmotionResult response={response} emotion={emotion} isLoading={isLoading} />
                </div>
              )}
              
              {/* 하단: 입력창 */}
              <div className="glass-container">
                <EmotionInput 
                  message={message}
                  setMessage={setMessage}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  currentEmotion={emotion}
                />
              </div>
            </div>
          )}
          
        </main>
      </div>
      

    </div>
  )
}

export default App