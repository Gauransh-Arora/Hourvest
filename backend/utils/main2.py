from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv(dotenv_path=".env")

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # allow your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Groq API key from environment variables
api_key = os.getenv("GROQ_API_KEY")

# print("GROQ KEY:", api_key)

# Test route for Postman sanity check
@app.get("/")
def root():
    return {"message": "FastAPI server is working, Vansh 🚀"}

# Model for input
class UserInput(BaseModel):
    prompt: str

# Call Groq API function
def call_groq(prompt: str):
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "messages": [
            {"role": "system", "content": "you are acting like Ronaldo"},
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

# Main POST route to interact with Groq
@app.post("/ask")
async def ask_ai(user_input: UserInput):
    prompt = user_input.prompt
    output = call_groq(prompt)
    return {"agent_used": "groq", "response": output}
