import scrapy 
from selenium import webdriver
from scrapy.selector import Selector
import json
from selenium.webdriver.common.by import By
import time

product_list = []


# def run_driver_1():
baseUrl = 'https://www.thegioididong.com/laptop'
tailUrl = [
    '#c=44&o=17&pi=11', 
]


for tail in tailUrl:
    driver_path = 'chromedriver.exe'
    driver = webdriver.Chrome(executable_path=driver_path)
    _url = baseUrl + tail
    driver.get(_url)
    time.sleep(4)

    elements = driver.find_elements(By.CLASS_NAME, "__cate_44")
    
    for element in elements:
        element_child = element.find_elements(By.TAG_NAME, 'a')[0]
        element_link = element_child.get_attribute('href')
        product_list.append(element_link)

driver.quit()

class TGDD_Laptop_Spider(scrapy.Spider):
    name = 'tgdd-laptop'

    start_urls = product_list
   
    def parse(self, response):
        for url in self.start_urls:
            product_link = url
            product_link = response.urljoin(product_link)

            yield scrapy.Request(
                url = response.urljoin(product_link),
                callback = self.parse_product,
                meta=dict(
                    product_url = product_link
                )
            )
    
    def parse_product(self, response):
        
        image_urls = 'https://cdn.tgdd.vn/Products/Images/44/231255/TimerThumb/apple-macbook-pro-2020-z11c-(63).jpg'
        product_urls = response.meta.get("product_url")
        price = response.css('body > section.detail > div.box_main > div.box_right > div.box04.box_normal > div.price-one > div > p.box-price-present::text').get()
        if price == None:
            price = response.css('body > section.detail > div.box_main > div.box_right > div.box04__main > div.price-two > div.box-price.red.jsClick.active > p.box-price-present::text').get()
        product_name = response.css('body > section.detail > h1::text').get()
        product_disk = response.css('body > section.detail > div.box_main > div.box_right > div.parameter > ul > li:nth-child(3) > div > span::text').get()
        product_chip = response.css('body > section.detail > div.box_main > div.box_right > div.parameter > ul > li:nth-child(1) > div > span::text').get()
        product_screen = response.css('body > section.detail > div.box_main > div.box_right > div.parameter > ul > li:nth-child(4) > div > span.comma::text').get()
        product_card = response.css('body > section.detail > div.box_main > div.box_right > div.parameter > ul > li:nth-child(5) > div > span:nth-child(2)::text').get()
        product_ram = response.css('body > section.detail > div.box_main > div.box_right > div.parameter > ul > li:nth-child(2) > div > span::text').get()

        dict={
            "name" : product_name,
            "price" : price,
            "url": product_urls,
            "screen": product_screen,
            "cpu": product_chip,
            "ram": product_ram,
            "disk": product_disk,
            "card": product_card,
        }
        yield {
            'category': 'Laptop',
            'image_urls': image_urls,
            'product_info': dict,
            'website': 'TGDD',
        }