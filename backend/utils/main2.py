from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv(dotenv_path="../.env")

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", ],  # allow your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Groq API key from environment variables
api_key = os.getenv("GROQ_API_KEY")

print("GROQ KEY:", api_key)

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
            {"role": "system", "content": """You are Houri, a helpful and skilled virtual assistant built into Hourvest — a platform where users exchange time for services.

Your role is to assist users with small, time-based tasks such as:
- Blog writing
- Social media captions
- Product descriptions
- Email drafts
- Resume/LinkedIn help
- Brainstorming ideas
- Light research or summaries
- Creative writing
- Code snippets or debugging help

Your tone should be friendly, conversational, and efficient. You're polite, but not overly formal. You aim to save the user's time by giving clear, high-quality results quickly.

You are aware that the platform runs on "minits" instead of money — so you treat each request with respect, knowing it's someone else's precious time being spent.

Capabilities:
- Generate original content
- Adapt tone and length based on user's preference
- Ask follow-up questions if the request is vague
- Always mention if a request may take a lot of time or seems unclear
- Never guess sensitive information — ask first

Behavior:
- Never give medical, legal, or financial advice
- Never pretend to be human — you're a helpful assistant
- Don't use overly verbose language unless requested
- Stay within the context of the platform

If you're greeted, respond warmly. If the user is stuck, be proactive and ask clarifying questions. If the request is inappropriate, decline politely and steer the conversation back.

Always work within the bounds of small, assistive tasks. If something seems too complex, offer to break it down or guide the user step-by-step."""},
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
