import os
from fastapi import UploadFile
import pandas as pd


def getFile(file: UploadFile):
    file_location = f"{file.filename}"
    f = open(file_location, "wb")
    f.write(file.file.read())
    f.close()
    return file_location


def readExcel(file: UploadFile):
    file_location = getFile(file)
    df = pd.read_excel(file_location)
    os.remove(file_location)
    return df


# name	usn	email	dept	cgpa	section	achievements	counsel_rep	parent_name	parent_phNo	parent_email


def prepareStudentandParentData(df):
    data = []
    for i in range(len(df.head())):
        student = {
            "usn": df["usn"][i],
            "name": df["name"][i],
            "sem": df["sem"][i].item(),
            "email": df["email"][i],
            "dept": df["dept"][i],
            "cgpa": df["cgpa"][i].item(),
            "section": df["section"][i],
            "achievements": df["achievements"][i].split(","),
            "counsel_rep": df["counsel_rep"][i].split(","),
        }
        parent = {
            "name": df["parent_name"][i],
            "usn": df["usn"][i],
            "phNo": df["parent_phNo"][i].astype(str),
            "email": df["parent_email"][i],
        }
        data.append({"student": student, "parent": parent})
    print("comp")
    return data


def prepareGradeData(df):
    data = []
    for i in range(len(df.head())):
        grade = {
            "usn": df["usn"][i],
            "cid": df["cid"][i],
            "grade": df["grade"][i],
        }
        data.append(grade)
    return data


def prepareCieData(df):
    data = []
    cols = df.columns
    cols = cols[cols.str.contains("ia")]
    print(cols)
    for i in range(len(df.head())):
        for ia in cols:
            cie = {
                "usn": df["usn"][i],
                "cid": df["cid"][i],
                ia: df[ia][i].item(),
            }
            data.append(cie)
    return data
