import { useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [emotion, setEmotion] = useState('')
  const [emotionMessage, setEmotionMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 감정별 배경색 매핑
  const emotionColors = {
    '슬픔': '#a3c4f3',
    '기쁨': '#fff6a5', 
    '분노': '#f3a3a3',
    '불안': '#c3bce6',
    '중립': '#e6e6e6',
    '': '#e6e6e6' // 기본값
  }

  // 감정과 메시지 파싱 함수
  const parseResponse = (responseText) => {
    const lines = responseText.split('\n')
    let parsedEmotion = ''
    let parsedMessage = ''

    lines.forEach(line => {
      if (line.startsWith('감정:')) {
        parsedEmotion = line.replace('감정:', '').trim()
      } else if (line.startsWith('메시지:')) {
        parsedMessage = line.replace('메시지:', '').trim()
      }
    })

    return { emotion: parsedEmotion, message: parsedMessage }
  }

  // 메시지 전송 함수
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/emotion-chat', {
        message: message.trim()
      })

      const { emotion: parsedEmotion, message: parsedMessage } = parseResponse(response.data.response)
      
      setResponse(response.data.response)
      setEmotion(parsedEmotion)
      setEmotionMessage(parsedMessage)
    } catch (error) {
      console.error('Error:', error)
      setResponse('죄송합니다. 서버와의 연결에 문제가 있습니다.')
      setEmotion('중립')
      setEmotionMessage('다시 시도해 주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  // 현재 감정에 따른 배경색
  const backgroundColor = emotionColors[emotion] || emotionColors['']

  return (
    <div 
      className="min-h-screen transition-colors duration-500 flex flex-col items-center justify-center p-4"
      style={{ backgroundColor }}
    >
      <div className="max-w-2xl w-full">
        {/* 제목 */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          EmoPT 🤗
        </h1>
        <p className="text-gray-600 text-center mb-8">
          당신의 감정을 털어놓아 보세요. 따뜻한 위로를 드릴게요.
        </p>

        {/* 응답 카드 */}
        {response && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-gray-400">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  🤗
                </div>
              </div>
              <div className="flex-1">
                {emotion && (
                  <div className="text-sm text-gray-500 mb-2">
                    감정: <span className="font-semibold text-gray-700">{emotion}</span>
                  </div>
                )}
                <p className="text-gray-800 text-lg leading-relaxed">
                  {emotionMessage || response}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              지금 기분이 어떠신가요?
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="예: 요즘 너무 지쳐서 힘들어요..."
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '분석 중...' : '마음 털어놓기'}
          </button>
        </form>

        {/* 설명 */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>배경색이 당신의 감정에 따라 변합니다</p>
          <div className="flex justify-center space-x-4 mt-2 text-xs">
            <span>😢 슬픔 - 파랑</span>
            <span>😊 기쁨 - 노랑</span>
            <span>😠 분노 - 빨강</span>
            <span>😰 불안 - 보라</span>
            <span>😐 중립 - 회색</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
