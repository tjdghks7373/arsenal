import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 설정 (Next.js에서 접근 가능하게)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/players")
def get_players():
    url = "https://www.transfermarkt.com/arsenal-fc/kader/verein/11"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")
    plyers = soup.find("table", class_="items").find("tbody").find_all("tr", recursive=False)

    all_plyers = []
    for player in plyers:
        number = player.find("div", class_="rn_nummer")
        name = player.find("td", class_="hauptlink").find("a").text.strip()
        age = player.find_all("td", class_="zentriert")[1].text.strip()
        nation = player.find_all("td", class_="zentriert")[2].find("img")["alt"].strip()
        position = player.find("td", class_="posrela").find_all("tr")[1].find("td").text.strip()

        if number:
            back_number = number.text.strip()

        data = {
            "back_number": back_number,
            "name": name,
            "age": age,
            "nation": nation,
            "position": position
        }
        all_plyers.append(data)

    return {"players": all_plyers}