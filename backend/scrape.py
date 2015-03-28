from bs4 import BeautifulSoup
import urllib3
import urllib.request

print("imported!")

base_url = 'http://menus.tufts.edu/foodpro/longmenu.asp?sName=TUFTS+DINING&locationNum=09&locationName=Carmichael+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&dtdate=03%2F28%2F2015&mealName=Lunch'

def getFoodNames(url):
    html = urllib.request.urlopen(url).read()
    print(html)

print("running scraper")
getFoodNames(base_url)