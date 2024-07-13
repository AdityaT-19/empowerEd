from fastapi import FastAPI, UploadFile
from pydantic import BaseModel
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

from fileprocess import (
    prepareCieData,
    prepareGradeData,
    prepareStudentandParentData,
    readExcel,
)
from models.ctc_pred import Data

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model("./trained_models/model.v1.keras")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/predict")
async def predict(data: Data):
    ip = np.array(
        [
            data.no_of_dsa / 1000,
            data.cgpa,
            data.knows_ml,
            data.knows_python,
            data.knows_dsa,
            data.knows_js,
            data.knows_html,
            data.knows_css,
            data.was_coding_club,
            data.no_of_backlogs,
            data.branch,
        ]
    ).reshape(1, 11)
    y = model.predict(ip)
    y = y[0][0] * 0.9
    return {"ctc": y}


@app.post("/processStudentandParentData")
async def processStudentandParentData(file: UploadFile):
    df = readExcel(file)
    data = prepareStudentandParentData(df)
    return {"studentAndParents": data}


@app.post("/processGradeData")
async def processGradeData(file: UploadFile):
    df = readExcel(file)
    data = prepareGradeData(df)
    return {"usnGradeandCie": data}


@app.post("/processCieData")
async def processCieData(file: UploadFile):
    df = readExcel(file)
    data = prepareCieData(df)
    return {"allInOneFile": data}
