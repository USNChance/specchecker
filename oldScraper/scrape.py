import json

import requests
from bs4 import BeautifulSoup

import config


game = input('Enter game you want search: ')
game = game.replace(" ","+") #url bar replaces space with +, so we need to do the same

def scrape_all_app_id(page):  
    """Scrape all appid of Steam game to a text file based on game name""" 
    app_id_list = []
    url = ("https://store.steampowered.com/search/results?\
        sort_by=Released_DESC&term="+ game +"&category1=998&os=win&page=%s") % page
    r = requests.get(url,headers=config.HEADERS)
    if r.ok:
        response = r.text
        soup = BeautifulSoup(response,"html.parser")
        apps = soup.findAll("a",{"class":"search_result_row ds_collapse_flag"})
        for app in apps:
            app_id = app["data-ds-appid"]
            app_id_list.append(app_id)
    return app_id_list      

def parse(data):

    data_table = {}
    title = data["title"]
    type_ = {}

    for sys in data["SYSREQs"]:
        type = sys.ul.find("strong",recursive=False)#.text.strip().upper()
        if type == None:
            type = "SYSTEM REQUIREMENTS"
        else:
            type = type.text.strip().upper()

        bb_ul = sys.find("ul",{"class":"bb_ul"})
        type_[type] = {}

        for child in bb_ul.children:
            try:
                key = child.text.split(":")[0].strip()
                value = child.text.split(":")[1].strip()
                type_[type].setdefault(key,value)
            except:
                type_[type].setdefault("addition",child.text.strip())

    data_table.setdefault(title,type_)
    print("%s :Done" % title)
    return data_table



def write_missing_data(app_id,message):
    '''Write missing data to a text file''' 
    with open("miss.txt","a") as miss:
        miss.write(app_id+" "+message+"\n")

def scrapesysreq(app_id):
    url = config.APP_URL + app_id   
    r = requests.get(url,headers=config.HEADERS)

    if r.ok == False:
        message = "Requests Not Ok %s" % app_id
        print(message)
        write_missing_data(app_id,message)
        return False

    response = r.text
    soup = BeautifulSoup(response,"html.parser")

    #Game title:
    data = {}
    g_title = soup.find("div",{"class":"apphub_AppName"})#.text.strip()
    if g_title == None:
        g_title = app_id
    else:
        g_title = g_title.text.strip()

    #sysreq_contents container
    sysreq_contents = soup.find("div",{"class":"sysreq_contents"})
    if sysreq_contents:

        #Win System:
        win_os = sysreq_contents.find("div",{"data-os":"win"})

        if win_os == None:
            message = "%s Have no <div data-os=\"win\"" % g_title
            print(message)
            write_missing_data(app_id,message)
            return False

        else:
            sysreqcontainer = []
            full = win_os.find("div",{"class":"game_area_sys_req_full"})
            if full == None:
                left = win_os.find("div",{"class":"game_area_sys_req_leftCol"}) #left column: Minimum System Requirements
                sysreqcontainer.append(left)
                right = win_os.find("div",{"class":"game_area_sys_req_rightCol"}) #right column: Recommended System Requirements
                sysreqcontainer.append(right)
            else:
                sysreqcontainer.append(full)
            data.setdefault("title",g_title)
            data.setdefault("SYSREQs",sysreqcontainer)
            return data

    elif sysreq_contents == None:
        message = "%s Have no <div class=\"sysreq_contents\"> " % g_title
        print(message)
        write_missing_data(app_id,message)
        return False

def main():
    app_id_list = []
    for i in range(1,10):
        app_id_list += scrape_all_app_id(i)
    
    
    with open("data.json", "w", encoding='utf-8') as f:
        list = []
        for app in app_id_list:
            try:
                sysreqcontainer = scrapesysreq(app)
                if sysreqcontainer:
                    data = parse(sysreqcontainer)
                    list.append(data)
                else:
                    continue
            except:
                pass
        json.dump(list, f, ensure_ascii=False, indent=4)
        
if __name__ == "__main__":
    main()

