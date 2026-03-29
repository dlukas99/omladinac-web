import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime

URL_CLUB = "https://semafor.hns.family/klubovi/660/nk-omladinac-caglin/"
URL_COMPETITION = "https://semafor.hns.family/natjecanja/100677350/2-znl-2526/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}

def clean_text(text):
    return " ".join(text.strip().split()) if text else ""

def osvjezi_podatke():
    try:
        now = datetime.now()
        podaci = {
            "zadnje_azurirano": now.strftime("%d.%m.%Y. %H:%M"),
            "ljestvica": [],
            "zadnji_rezultati": [],
            "raspored": [],
            "igraci": []
        }

        # 1. Ljestvica (s URL_COMPETITION)
        resp_comp = requests.get(URL_COMPETITION, headers=HEADERS, timeout=15)
        resp_comp.raise_for_status()
        soup_comp = BeautifulSoup(resp_comp.content, "html.parser")
        
        standings_rows = soup_comp.select(".competition_table li.row")
        for row in standings_rows:
            pos = row.select_one(".position")
            club = row.select_one(".club")
            played = row.select_one(".played")
            wins = row.select_one(".wins")
            draws = row.select_one(".draws")
            losses = row.select_one(".losses")
            gplus = row.select_one(".gplus")
            gminus = row.select_one(".gminus")
            gdiff = row.select_one(".gdiff")
            points = row.select_one(".points")
            
            if pos and club and played and points:
                podaci["ljestvica"].append({
                    "pozicija": clean_text(pos.text).replace(".", ""),
                    "klub": clean_text(club.text),
                    "utakmice": clean_text(played.text),
                    "pobjede": clean_text(wins.text) if wins else "0",
                    "nerijeseno": clean_text(draws.text) if draws else "0",
                    "porazi": clean_text(losses.text) if losses else "0",
                    "gol_plus": clean_text(gplus.text) if gplus else "0",
                    "gol_minus": clean_text(gminus.text) if gminus else "0",
                    "gol_razlika": clean_text(gdiff.text) if gdiff else "0",
                    "bodovi": clean_text(points.text)
                })

        # 2. Rezultati, Raspored i Igrači (s URL_CLUB)
        resp_club = requests.get(URL_CLUB, headers=HEADERS, timeout=15)
        resp_club.raise_for_status()
        soup_club = BeautifulSoup(resp_club.content, "html.parser")

        # Utakmice (Tab 1)
        matches_rows = soup_club.select("#tabContent_1_1 .matchlist ul li.row")
        for row in matches_rows:
            date_node = row.select_one(".date")
            club1 = row.select_one(".club1")
            club2 = row.select_one(".club2")
            score_node = row.select_one(".result .resRegular")
            round_node = row.select_one(".competitionround")

            if date_node and club1 and club2:
                match_text = clean_text(date_node.text)
                # Primjer formata: "29.03.2026. 16:00"
                date_parts = match_text.split()
                date_str = date_parts[0] if len(date_parts) > 0 else ""
                time_str = date_parts[1] if len(date_parts) > 1 else "00:00"
                
                match_info = {
                    "datum": date_str,
                    "vrijeme": time_str,
                    "domacin": clean_text(club1.text),
                    "gost": clean_text(club2.text),
                    "rezultat": clean_text(score_node.text) if score_node else "-:-",
                    "kolo": clean_text(round_node.text) if round_node else ""
                }
                
                # Odredi je li utakmica u prošlosti ili budućnosti
                try:
                    match_dt = datetime.strptime(f"{date_str} {time_str}", "%d.%m.%Y. %H:%M")
                    # Ako je utakmica u budućnosti (ili traje), ide u raspored
                    if match_dt > now:
                        podaci["raspored"].append(match_info)
                    else:
                        podaci["zadnji_rezultati"].append(match_info)
                except:
                    # Fallback ako parsiranje datuma ne uspije
                    if match_info["rezultat"] == "-:-" or not any(char.isdigit() for char in match_info["rezultat"]):
                        podaci["raspored"].append(match_info)
                    else:
                        podaci["zadnji_rezultati"].append(match_info)

        # Igrači (Tab 3)
        players_rows = soup_club.select("#tabContent_1_3 .playerslist ul li.row")
        if not players_rows:
             players_rows = soup_club.select(".playerslist ul li.row")

        for row in players_rows:
            number = row.select_one(".shirtNumber")
            name_a = row.select_one(".playerName h3 a")
            position_div = row.select_one(".playerName")
            stats_goals = row.select_one(".goals")

            if name_a:
                podaci["igraci"].append({
                    "broj": clean_text(number.text) if number else "",
                    "ime": clean_text(name_a.text),
                    "pozicija": clean_text(position_div.contents[-1]) if position_div and len(position_div.contents) > 1 else "Igrač",
                    "golovi": int(clean_text(stats_goals.text)) if stats_goals and clean_text(stats_goals.text).isdigit() else 0
                })
        
        # Sortiraj zadnje rezultate da najnoviji budu prvi
        podaci["zadnji_rezultati"].reverse()

        # Spremanje u JSON
        with open("podaci.json", "w", encoding="utf-8") as f:
            json.dump(podaci, f, ensure_ascii=False, indent=4)
        
        print("Uspješno osvježeni podaci!")

    except Exception as e:
        print(f"Pogreška pri dohvaćanju podataka: {e}")

if __name__ == "__main__":
    osvjezi_podatke()
