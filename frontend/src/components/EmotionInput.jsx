import { useState } from 'react';

// EmotionInput 컴포넌트 - 감성적 리디자인
const EmotionInput = ({ message, setMessage, onSubmit, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(e);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="마음 편히 이야기해주세요..."
            className="w-full resize-none border-none outline-none text-gray-800 placeholder-gray-400"
            style={{ 
              fontFamily: "'Nanum Gothic', sans-serif",
              fontSize: '24px',
              lineHeight: '1.2'
            }}
            rows="4"
            disabled={isLoading}
          />
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              {message.length}/500
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '전송 중...' : '전송'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmotionInput; 