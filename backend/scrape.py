from bs4 import BeautifulSoup
import urllib3
import urllib.request
import json

print("imported!")

base_url = 'http://menus.tufts.edu/foodpro/longmenu.asp?sName=TUFTS+DINING&locationNum=09&locationName=Carmichael+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&dtdate=03%2F28%2F2015&mealName=Lunch'
food_dict = {}
def getFoodNames(url):
    html = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(html)
    data = soup.find_all("div", "longmenucoldispname")#.string
    for div in data:
#        print(div.string)
        food_dict[div.string] = 0 
print("running scraper")
getFoodNames(base_url)
with open ("food_scores.json","w") as f:
    json.dump(food_dict, f, sort_keys = True, indent = 4, ensure_ascii = False)
