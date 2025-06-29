// 감정별 테마 컬러 시스템
export const emotionColors = {
  슬픔: "#bfdbfe",
  기쁨: "#fef3c7",
  분노: "#fecaca",
  불안: "#c7d2fe",
  중립: "#e5e7eb",
  행복: "#bbf7d0"
};

export const emotionConfig = {
  '슬픔': { 
    emoji: '😢', 
    bgColor: emotionColors.슬픔,
    textColor: 'text-blue-800',
    borderColor: 'border-blue-400',
    hoverColor: 'hover:bg-blue-200',
    accentColor: '#3B82F6'
  },
  '기쁨': { 
    emoji: '😊', 
    bgColor: emotionColors.기쁨,
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-400',
    hoverColor: 'hover:bg-yellow-200',
    accentColor: '#F59E0B'
  },
  '분노': { 
    emoji: '😠', 
    bgColor: emotionColors.분노,
    textColor: 'text-red-800',
    borderColor: 'border-red-400',
    hoverColor: 'hover:bg-red-200',
    accentColor: '#EF4444'
  },
  '불안': { 
    emoji: '😰', 
    bgColor: emotionColors.불안,
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-400',
    hoverColor: 'hover:bg-indigo-200',
    accentColor: '#8B5CF6'
  },
  '중립': { 
    emoji: '😐', 
    bgColor: emotionColors.중립,
    textColor: 'text-gray-800',
    borderColor: 'border-gray-400',
    hoverColor: 'hover:bg-gray-200',
    accentColor: '#6B7280'
  },
  '행복': { 
    emoji: '😄', 
    bgColor: emotionColors.행복,
    textColor: 'text-green-800',
    borderColor: 'border-green-400',
    hoverColor: 'hover:bg-green-200',
    accentColor: '#10B981'
  }
} 