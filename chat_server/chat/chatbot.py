import dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    PromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
)

from langchain_core.output_parsers import StrOutputParser

dotenv.load_dotenv()

review_template_str = """You are a bot that takes in a user's question and returns python code
for the same. The python code should be optimal, modular and with appropriate docstrings, pytest
test functions. Only answer questions about generating python codes to achieve a specific task and
about the built in python libraries. If you don't know about a library say you don't know.

{question}
"""

human_prompt = HumanMessagePromptTemplate(
    prompt=PromptTemplate(
        input_variables=["question"],
        template=review_template_str,
    )
)

messages = [human_prompt]

prompt_template = ChatPromptTemplate(
    input_variables = ["question"],
    messages=messages
)

chat_model = ChatOpenAI(model="gpt-3.5-turbo-0125", temperature=0)
output_parser = StrOutputParser()

chain = prompt_template | chat_model | output_parser
