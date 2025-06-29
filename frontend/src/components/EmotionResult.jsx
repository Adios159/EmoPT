import { useState, useEffect } from 'react';
import { emotionConfig } from '../emotionConfig';

// EmotionResult 컴포넌트
const EmotionResult = ({ response, emotion, isLoading }) => {
  if (!response && !isLoading) return null;
  
  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="flex items-center justify-center space-x-1 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="text-gray-600">AI가 당신의 마음을 이해하고 있어요...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* 감정 헤더 */}
            <div className="p-4 border-b border-gray-100 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {emotion} 감정
              </h3>
              <p className="text-sm text-gray-500">AI 분석 완료</p>
            </div>
            
            {/* 응답 내용 */}
            <div className="p-6">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {response}
              </div>
            </div>
            
            {/* 하단 정보 */}
            <div className="px-6 py-4 border-t border-gray-100 text-center">
              <span className="text-xs text-gray-500">
                {new Date().toLocaleTimeString('ko-KR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}에 분석됨
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionResult; 