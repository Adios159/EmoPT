# EmoPT - 감정 기반 GPT 챗봇

사용자의 감정을 분석하고 공감하는 메시지를 전달하는 AI 챗봇입니다. 감정에 따라 배경색이 자동으로 변경되며, 따뜻한 위로의 메시지를 제공합니다.

## ✨ 주요 기능

- 🤖 **OpenAI GPT-3.5를 활용한 감정 분석**: 사용자의 메시지에서 감정을 분석하고 공감 메시지 생성
- 🎨 **감정별 배경색 변경**: 슬픔(파랑), 기쁨(노랑), 분노(빨강), 불안(보라), 중립(회색)
- 💬 **직관적인 채팅 UI**: 말풍선 형태의 응답과 깔끔한 입력 폼
- ⚡ **실시간 응답**: FastAPI 백엔드를 통한 빠른 API 통신

## 🛠️ 기술 스택

### 백엔드
- **FastAPI**: 고성능 비동기 웹 프레임워크
- **OpenAI API**: GPT-3.5-turbo 모델 사용
- **Python-dotenv**: 환경변수 관리

### 프론트엔드
- **React**: 사용자 인터페이스 구축
- **Vite**: 빠른 번들링 및 개발 서버
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Axios**: HTTP 클라이언트

## 🚀 시작하기

### 1. 저장소 클론 및 이동
```bash
git clone <repository-url>
cd EmoPT
```

### 2. 백엔드 설정

#### 가상환경 생성 및 활성화
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

#### 패키지 설치
```bash
pip install -r requirements.txt
```

#### 환경변수 설정
`backend` 폴더에 `.env` 파일을 생성하고 OpenAI API 키를 설정하세요:
```
OPENAI_API_KEY=your_openai_api_key_here
```

#### 백엔드 서버 실행
```bash
python main.py
```
서버는 `http://localhost:8000`에서 실행됩니다.

### 3. 프론트엔드 설정

새 터미널에서 프론트엔드 디렉토리로 이동:
```bash
cd frontend
```

#### 패키지 설치
```bash
npm install
```

#### 개발 서버 실행
```bash
npm run dev
```
프론트엔드는 `http://localhost:5173`에서 실행됩니다.

## 📝 사용법

1. **백엔드와 프론트엔드 서버를 모두 실행**합니다.
2. 브라우저에서 `http://localhost:5173`에 접속합니다.
3. 텍스트 상자에 현재 기분이나 감정을 입력합니다.
   - 예: "요즘 너무 지쳐서 힘들어요"
4. "마음 털어놓기" 버튼을 클릭합니다.
5. AI가 감정을 분석하고 공감 메시지를 제공하며, 배경색이 감정에 따라 변경됩니다.

## 🎨 감정별 배경색

| 감정 | 색상 | 배경색 코드 |
|------|------|------------|
| 😢 슬픔 | 파랑 | `#a3c4f3` |
| 😊 기쁨 | 노랑 | `#fff6a5` |
| 😠 분노 | 빨강 | `#f3a3a3` |
| 😰 불안 | 보라 | `#c3bce6` |
| 😐 중립/기타 | 회색 | `#e6e6e6` |

## 🔧 API 엔드포인트

### POST /emotion-chat
사용자의 감정 메시지를 분석하고 공감 응답을 생성합니다.

**요청:**
```json
{
  "message": "요즘 너무 지쳐"
}
```

**응답:**
```json
{
  "response": "감정: 슬픔\n메시지: 많이 지쳤겠다. 푹 쉬어야 해."
}
```

## 🔮 향후 계획

- [ ] 감정별 이모지 및 애니메이션 추가
- [ ] 감정 기록 차트 및 통계
- [ ] 하루 한 번 감정 일기 저장 기능
- [ ] 사용자 프로필 및 감정 히스토리
- [ ] 모바일 반응형 UI 개선

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## ⚠️ 주의사항

- OpenAI API 키가 필요합니다. [OpenAI 웹사이트](https://openai.com/api/)에서 발급받으세요.
- API 사용량에 따른 요금이 발생할 수 있습니다.
- `.env` 파일은 절대 Git에 커밋하지 마세요. 