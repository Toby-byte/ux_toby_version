import requests
import json

# Correct the URL by including the scheme
url = "https://www.themealdb.com/api/json/v1/1/search.php?s=mac"

# Empty payload and headers as you're only making a GET request
payload = {}
headers = {}

response = requests.get(url, headers=headers, data=payload)

data = response.json()

print(data['meals'][0]["strMealThumb"])
print(data['meals'][0]["strMeal"])
print(data['meals'][0]["strCategory"])
