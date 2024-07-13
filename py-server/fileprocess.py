import os
from fastapi import UploadFile
import pandas as pd


def getFile(file: UploadFile, category: str):
    file_location = f"{category}/{file.filename}"
    f = open(file_location, "wb")
    f.write(file.file.read())
    f.close()
    return file_location


def readExcel(file: UploadFile, category: str):
    file_location = getFile(file, category)
    df = pd.read_excel(file_location)
    df
    os.remove(file_location)
    return df
