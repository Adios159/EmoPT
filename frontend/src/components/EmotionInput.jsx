import { emotionConfig } from '../emotionConfig';

// EmotionInput 컴포넌트 - 감성적 리디자인
const EmotionInput = ({ message, setMessage, onSubmit, isLoading, currentEmotion }) => {
  const config = emotionConfig[currentEmotion] || emotionConfig['중립']
  
  return (
    <div className="px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm text-gray-500 text-center italic mb-3">
              지금 기분을 자유롭게 표현해보세요...
            </label>
            
            {/* 입력창과 버튼을 한 줄로 배치 */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="지금 기분을 자유롭게 표현해보세요..."
                rows={2}
                className="flex-1 border p-3 rounded-md shadow focus:ring-2 focus:ring-blue-300 focus:border-blue-400 resize-none text-base bg-white/95 backdrop-blur-sm transition-all duration-300 hover:shadow-md border-gray-200 hover:border-gray-300"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    onSubmit(e)
                  }
                }}
                style={{
                  borderColor: isLoading ? config.accentColor + '80' : undefined,
                  focusRingColor: config.accentColor + '50'
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg min-w-[80px]"
                style={{
                  backgroundColor: !isLoading && message.trim() ? config.accentColor : undefined
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <span className="font-semibold">전송</span>
                )}
              </button>
            </div>
            
            <div className="flex justify-end items-center mt-4 space-x-4">
              <p className="text-sm text-gray-500">
                Enter 키로 전송 • Shift + Enter로 줄바꿈
              </p>
              <button
                type="button"
                onClick={() => {
                  setMessage('')
                  window.location.reload()
                }}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center space-x-1 hover:scale-105 transform"
              >
                <span>🔄</span>
                <span>새로시작</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmotionInput; 