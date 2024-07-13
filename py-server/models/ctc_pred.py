from pydantic import BaseModel


class Data(BaseModel):
    no_of_dsa: int
    cgpa: float
    knows_ml: int
    knows_python: int
    knows_dsa: int
    knows_js: int
    knows_html: int
    knows_css: int
    was_coding_club: int
    no_of_backlogs: int
    branch: int
