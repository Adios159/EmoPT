/* App.jsx */
import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import EmotionSelector from './components/EmotionSelector'
import EmotionResult from './components/EmotionResult'
import EmotionInput from './components/EmotionInput'

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [emotion, setEmotion] = useState('중립') 
  const [isLoading, setIsLoading] = useState(false)
  
  const parseResponse = (responseText) => {
    try {
      const lines = responseText.split('\n');
      let detectedEmotion = '중립';
      let responseMessage = responseText;
      
      const emotionLine = lines.find(line => line.includes('감정:'));
      if (emotionLine) {
        const emotionText = emotionLine.replace('감정:', '').trim();
        detectedEmotion = ['기쁨', '슬픔', '분노', '불안', '행복', '중립'].find(e => emotionText.includes(e)) || '중립';
      }
      
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Header currentEmotion={emotion} />
        
        <div className="space-y-8">
          <EmotionSelector onEmotionSelect={handleEmotionSelect} currentEmotion={emotion} />
          
          <EmotionInput 
            message={message}
            setMessage={setMessage}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            currentEmotion={emotion}
          />
          
          {(response || isLoading) && (
            <EmotionResult response={response} emotion={emotion} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App