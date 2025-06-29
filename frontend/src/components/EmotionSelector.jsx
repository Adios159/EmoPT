/* EmotionSelector.jsx */
import { useState } from "react";

const emotions = [
  { name: "슬픔", emoji: "😢", desc: "마음이 가라앉아요", color: "#dbeafe" },
  { name: "분노", emoji: "😡", desc: "속이 부글부글해요", color: "#fee2e2" },
  { name: "중립", emoji: "😐", desc: "그냥 그런 느낌이에요", color: "#f3f4f6" },
  { name: "기쁨", emoji: "😊", desc: "기분이 좋아요!", color: "#fef9c3" },
  { name: "불안", emoji: "😨", desc: "왠지 불안해요", color: "#e0e7ff" },
  { name: "행복", emoji: "😌", desc: "편안하고 좋아요", color: "#dcfce7" }
];

export default function EmotionSelector({ onEmotionSelect, currentEmotion }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="grid grid-cols-3 gap-6 justify-items-center">
      {emotions.map(({ name, emoji, desc, color }) => (
        <button
          key={name}
          onClick={() => {
            setSelected(name);
            onEmotionSelect && onEmotionSelect(name);
          }}
          className={`w-[160px] min-h-[120px] rounded-xl p-4 shadow-md text-center transition
                      hover:scale-105 active:scale-100
                      ${(selected === name || currentEmotion === name) ? "ring-2 ring-blue-500" : ""}`}
          style={{ backgroundColor: color }}
        >
          <div className="text-4xl mb-1">{emoji}</div>
          <div className="text-base font-semibold text-black">{name}</div>
          <div className="text-xs mt-1 text-black">{desc}</div>
        </button>
      ))}
    </div>
  );
} 