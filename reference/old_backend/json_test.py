import json

with open("testdata_food+scores.json") as f:
    data = json.load(f)
    for key in data:
        print(key + " " + str(data[key]))