import requests
from lxml import etree
from bs4 import BeautifulSoup
from scripts.common.base_parse import craw_html, map_request_img


def get_book_banner(url):
    image_urls = []
    html = craw_html(url)
    tree = etree.HTML(html)
    li_list = tree.xpath('//div[@class="flash-box"]/ul/li')
    print(li_list)
    # soup = BeautifulSoup(html, "html.parser")
    # result = soup.find_all(name='div', attrs={"class": "flash-list"})
    # for img in result.find_all('img'):
    #     image_urls.append(img.attrs['src'])
    # for e in res:
    #     print(etree.tostring(e,encoding='UTF-8').decode('UTF-8'))
    for i in li_list:
        try:
            image_url = i.xpath('./a/img/@data-original')
            image_name = i.xpath('./a/img/@alt')
        except:
            continue
        image_urls.append((image_url, image_name))
    print(image_urls)
    return image_urls

if __name__ == "__main__":
    url = "https://book.sfacg.com"
    image_urls = get_book_banner(url)
    map_request_img(image_urls)