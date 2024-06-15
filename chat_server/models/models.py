from pydantic import BaseModel


class QueryInput(BaseModel):
    text: str


class QueryOutput(BaseModel):
    output: str
