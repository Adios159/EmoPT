from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

app = FastAPI(title="EmoPT API", description="감정 기반 GPT 챗봇 API")

# CORS 설정 (프론트엔드와 통신 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Vite 기본 포트 포함
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI API 키 설정
openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.get("/")
async def root():
    return {"message": "EmoPT API Server is running!"}

@app.post("/emotion-chat", response_model=ChatResponse)
async def emotion_chat(request: ChatRequest):
    try:
        # API 키 확인
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="OpenAI API key not found")
        
        print(f"API Key length: {len(api_key) if api_key else 0}")
        
        # OpenAI API 호출 (system role 없이 user message만 사용)
        from openai import OpenAI
        client = OpenAI(api_key=api_key)
        
        # 감정 분석과 공감 메시지 생성을 위한 프롬프트
        prompt = f"""
다음 메시지에 대해 감정을 분석하고 공감하는 답변을 해주세요.
형식은 정확히 다음과 같이 해주세요:

감정: [슬픔/기쁨/분노/불안/중립 중 하나]
메시지: [공감하는 따뜻한 한 줄 메시지]

사용자 메시지: {request.message}
"""
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        gpt_response = response.choices[0].message.content.strip()
        
        return ChatResponse(response=gpt_response)
        
    except openai.AuthenticationError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI Authentication Error: {str(e)}")
    except openai.RateLimitError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI Rate Limit Error: {str(e)}")
    except Exception as e:
        print(f"Detailed error: {type(e).__name__}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 