from selenium import webdriver
import scrapy
import json
from scrapy.selector import Selector
from scrapy.http import Request
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import re

class PhongVu_Laptop_Spider(scrapy.Spider):
    name = 'phongvu-shop-laptop'
    start_urls = [
        'https://phongvu.vn/c/laptop',
        'https://phongvu.vn/c/laptop?page=2',
        'https://phongvu.vn/c/laptop?page=3',
        'https://phongvu.vn/c/laptop?page=4',
        'https://phongvu.vn/c/laptop?page=5',
        'https://phongvu.vn/c/laptop?page=6',
        'https://phongvu.vn/c/laptop?page=7',
        'https://phongvu.vn/c/laptop?page=8',
        'https://phongvu.vn/c/laptop?page=9',
        'https://phongvu.vn/c/laptop?page=10',
        'https://phongvu.vn/c/laptop?page=11',
        'https://phongvu.vn/c/laptop?page=12',
        'https://phongvu.vn/c/laptop?page=13',
        'https://phongvu.vn/c/laptop?page=14',
        'https://phongvu.vn/c/laptop?page=15',
        'https://phongvu.vn/c/laptop?page=16',
        'https://phongvu.vn/c/laptop?page=17',
        'https://phongvu.vn/c/laptop?page=18',
        'https://phongvu.vn/c/laptop?page=19',
        'https://phongvu.vn/c/laptop?page=20',
        'https://phongvu.vn/c/laptop?page=21',
    ]
    def __init__(self):
        scrapy.Spider.__init__(self)
        self.driver = webdriver.Chrome(executable_path='<path_to_chromedriver>')

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url = url,
                callback = self.parse,
            )
            # time.sleep(5)

    def parse(self, response):
        for product in response.css('.css-pxdb0j'):
            product_link = product.css('a::attr(href)').get()
            product_name = product.css('div > div.css-1ybkowq > div > h3::text').get()
            product_price = product.css('div > div.css-kgkvir > div > div::text').get()
            product_thumbnail = product.css('div > div.css-1v97aik > div.css-798fc > div > img::attr(src)').get()

            yield scrapy.Request(
                url = response.urljoin(product_link),
                callback = self.parse_product,
                meta=dict(
                    product_url = product_link,
                    product_name = product_name,
                    product_price = product_price,
                    product_thumbnail = product_thumbnail,
                )
            )
            # time.sleep(2)
    
    def parse_product(self, response):

        product_urls = response.meta.get("product_url")
        product_name = response.meta.get("product_name")
        product_price = response.meta.get("product_price")
        product_thumbnail = response.meta.get("product_thumbnail")

        self.driver.get(response.url)
        response_obj = Selector(text=self.driver.page_source)

        product_info = response_obj.css('#__next > div > div > div > div > div:nth-child(4) > div > div > div:nth-child(2) > div.css-1hwtax5 > div > div > div.css-1i1dodm > div.css-17aam1::text').getall()
        product_cpu = product_info[0].replace('cpu: ', '')
        product_screen = product_info[1].replace('screen: ', '')
        product_ram = product_info[2].replace('ram: ', '')
        product_disk = product_info[4].replace('disk: ', '')
        product_card = product_info[3].replace('card: ', '')
        time.sleep(2)

        dict={
            "name" : product_name,
            "price" : product_price,
            "url": 'https://phongvu.vn/' + product_urls,
            "screen": product_screen,
            "cpu": product_cpu,
            "ram": product_ram,
            "disk": product_disk,
            "card": product_card,
        }
        yield {
            'category': 'Laptop',
            'image_urls': product_thumbnail,
            'product_info': dict,
            'website': 'Phongvushop',
        }

