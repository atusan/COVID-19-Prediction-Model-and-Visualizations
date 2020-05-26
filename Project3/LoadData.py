import requests

def getData():
    url = "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson"
        # Retrieve page with the requests module
    response = requests.get(url).json()

    return response