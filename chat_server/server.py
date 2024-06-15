#!/usr/bin/env python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain.chat_models import ChatOpenAI
from models.models import QueryInput, QueryOutput
from langserve import add_routes
from chat.chatbot import chain
import dotenv

dotenv.load_dotenv()

app = FastAPI(
    title="LangChain Server",
    version="1.0",
    description="A simple api server using Langchain's Runnable interfaces",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

add_routes(
    app,
    ChatOpenAI(),
    path="/openai",
)

# model = ChatOpenAI()
model = chain


@app.get("/")
async def get_status():
    return {'Status': 'Running'}


@app.post("/invoke")
async def query_ai(inp: QueryInput) -> QueryOutput:
    # response = model.invoke(inp.text)
    response = model.invoke({'question': inp.text})
    return {'output': response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
