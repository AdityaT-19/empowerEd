from pydantic import BaseModel


class Student(BaseModel):
    usn: str
    name: str
    sem: int
    email: str
    dept: str
    cgpa: float
    section: str
    achievements: list[str]
    counsel_rep: list[str]


class Parent(BaseModel):
    name: str
    usn: str
    phNo: str
    email: str
