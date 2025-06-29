import { useState } from 'react'
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
  
  const parseResponse = (responseText) => {
    try {
      const parts = responseText.split('감정 분석 결과:');
      if (parts.length < 2) {
        return { emotion: '중립', message: responseText };
      }
      
      const emotionText = parts[1].split(',')[0].trim();
      
      const responseMessage = parts[0]
        .replace("응답:", "")
        .trim();

      const detectedEmotion = ['기쁨', '슬픔', '분노', '불안', '행복', '중립'].find(e => emotionText.includes(e)) || '중립';
      
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
      const result = await axios.post('http://127.0.0.1:8000/chat', {
        message: message,
        emotion: emotion,
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

  return (
    <div 
      className="font-sans min-h-screen transition-colors duration-500"
      style={{ backgroundColor: emotionColors[emotion] || '#f9fafb' }}
    >
      <main className="container mx-auto max-w-3xl flex flex-col min-h-screen justify-between p-4">
        
        {/* 상단: 헤더 */}
        <Header currentEmotion={emotion} />

        {/* 중단: 감정 선택 */}
        <EmotionSelector onEmotionSelect={handleEmotionSelect} currentEmotion={emotion} />
        
        {/* GPT 분석 결과 */}
        <EmotionResult response={response} emotion={emotion} isLoading={isLoading} />
        
        {/* 하단: 입력창 */}
        <EmotionInput 
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          currentEmotion={emotion}
        />
      </main>
    </div>
  )
}

export default App