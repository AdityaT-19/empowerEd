from fastapi import FastAPI
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import numpy as np

from models.ctc_pred import Data

app = FastAPI()
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
