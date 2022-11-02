import queue
import re
import threading

import requests
from bs4 import BeautifulSoup


def craw_html(url, headers=None):
    if not headers:
        headers = {
            'content-type': 'application/json;charset=utf-8',
            'accept-language': 'zh-CN,zh;q=0.9',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
        }
    result = requests.get(url, headers=headers)
    result.encoding = result.apparent_encoding
    result_text = result.text
    return result_text

def craw_img(url, name):
    with open(f"../../public/static/banner/book_image/{name}.jpg", "wb") as f:
        f.write(requests.get(url).content)

def map_request_img(urls_and_name):
    for url in urls_and_name:
        try:
            name = url[1][0]
        except:
            name = "无"
        t = threading.Thread(
            target=craw_img, args=(url[0][0], name), name=f"craw{name}"
        )
        t.start()
        t.join()
    print('uel_queue has empty >>> craw_queue end')