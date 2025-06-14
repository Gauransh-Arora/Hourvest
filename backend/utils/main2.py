from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests

# Load environment variables from .env file
load_dotenv(dotenv_path=".env")

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # <== let your React app in
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Get Groq API key from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

class UserInput(BaseModel):
    prompt: str

def call_groq(prompt: str):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "messages": [
            {"role": "system", "content": "you are acting like Ronaldo"
},
            {"role": "user", "content": prompt}
        ],
        "model": "llama3-70b-8192"
    }

    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers=headers,
        json=payload
    )

    try:
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error parsing response: {e} | Full response: {response.text}"

@app.post("/ask")
async def ask_ai(user_input: UserInput):
    prompt = user_input.prompt
    output = call_groq(prompt)
    return {"agent_used": "groq", "response": output}
