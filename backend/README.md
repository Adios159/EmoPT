# EmoPT Backend

감정 기반 GPT 챗봇의 FastAPI 백엔드입니다.

## 설정 방법

1. **가상환경 생성 및 활성화**
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. **필요 패키지 설치**
```bash
pip install -r requirements.txt
```

3. **환경변수 파일 생성**
`backend` 폴더에 `.env` 파일을 생성하고 다음 내용을 추가하세요:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. **서버 실행**
```bash
python main.py
```

서버는 `http://localhost:8000`에서 실행됩니다.

## API 엔드포인트

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