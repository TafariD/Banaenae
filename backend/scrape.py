from bs4 import BeautifulSoup
import urllib3
import urllib.request
import json

print("imported!")

base_url = 'http://menus.tufts.edu/foodpro/longmenu.asp?sName=TUFTS+DINING&locationNum=09&locationName=Carmichael+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&dtdate=03%2F28%2F2015&mealName=Lunch'

#return dictionary containting all foodnames as keys with 0s as vals (for daily)
def getFoodNames(url):
	food_dict = {}
    html = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(html)
    data = soup.find_all("div", "longmenucoldispname")#.string
    for div in data:
#        print(div.string)
        food_dict[div.string] = 0 
    return food_dict

def updateAllTime(daily_dict):
	with open ("alltime.json", "w") as f:
			alltime = json.load(f)
			for item in daily_dict:
				if (item in alltime):
					continue
				else:
					alltime[item] = 0
	return alltime				

def main():
	print("running scraper")
	
	food_dict = getFoodNames(base_url)
	with open ("daily_all.json","w") as f:
	    json.dump(food_dict, f, sort_keys = True, indent = 4, ensure_ascii = False)

	alltime = updateAllTime(food_dict)    
	with open ("alltime.json","w") as f:
	    json.dump(alltime, f, sort_keys = True, indent = 4, ensure_ascii = False)

main()