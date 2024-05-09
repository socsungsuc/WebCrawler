from selenium import webdriver
import scrapy
from scrapy.selector import Selector
from scrapy.http import Request
from Fpt.items import ProductItem
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time

class Fpt_Phone_Spider(scrapy.Spider):
    name = 'fpt-shop-phone'
    start_urls = [
        'https://fptshop.com.vn',
    ]
    category_urls = [
        'https://fptshop.com.vn/dien-thoai?sort=ban-chay-nhat&trang=12',
    ]

    def __init__(self):
        scrapy.Spider.__init__(self)
        self.driver = webdriver.Chrome(executable_path='<path_to_chromedriver>') # đường dẫn tới ChromeDriver

    def start_requests(self):
        for url in self.start_urls:
            yield Request(
                url = url,
                callback = self.parse,
            )
    
    def parse(self, response):
        for category in self.category_urls:
            category_link = category
            yield Request(
                url = response.urljoin(category_link),
                callback = self.parse_category,
            )
    
    def parse_category(self, response):
        self.driver.get(response.url)
        response_obj = Selector(text=self.driver.page_source)
        for product in response_obj.css('#root > main > div > div.row.fspdbox > div.col-9.p-0 > div.card.fplistbox > div > div.cdt-product-wrapper.m-b-20 > div > div.cdt-product__img'):
            product_link = product.css('a::attr(href)').get()
            
            yield scrapy.Request(
                url = response.urljoin(product_link),
                callback = self.parse_product,
                meta=dict(
                    product_url = product_link,
                )
            )
            time.sleep(2)
    
    def parse_product(self, response):
        
        self.driver.get(response.url)
        response_obj = Selector(text=self.driver.page_source)

        image_urls = response_obj.xpath('//*[@id="root"]/main/div/div[1]/div[2]/div[2]/div[1]/div[1]/div/div[1]/div[1]/img/@src').get()
        product_urls = response.meta.get("product_url")
        price = response_obj.xpath('//*[@id="root"]/main/div/div[1]/div[2]/div[2]/div[2]/div[1]/div[1]/div/text()').get()
        product_name = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-top > h1::text').get()
        product_disk = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-row.clearfix > div.l-pd-left > div.st-param > ul > li:nth-child(5) > p::text').get()
        product_chip = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-row.clearfix > div.l-pd-left > div.st-param > ul > li:nth-child(4) > p::text').get()
        product_screen = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-row.clearfix > div.l-pd-left > div.st-param > ul > li:nth-child(1) > p::text').get()
        dict={
            "name" : product_name,
            "price" : price,
            "url": 'https://fptshop.com.vn/' + product_urls,
            "disk": product_disk,
            "chip": product_chip,
            "screen": product_screen,
        }
        yield {
            'category': 'Phone',
            'image_urls': image_urls,
            'product_info': dict,
            'website': 'Fptshop',
        }

    def closed(self, reason):
        self.driver.quit()

class Fpt_Laptop_Spider(scrapy.Spider):
    name = 'fpt-shop-laptop'
    start_urls = [
        'https://fptshop.com.vn',
    ]
    category_urls = [
        'https://fptshop.com.vn/may-tinh-xach-tay?sort=ban-chay-nhat&trang=9',
    ]

    def __init__(self):
        scrapy.Spider.__init__(self)
        self.driver = webdriver.Chrome(executable_path='<path_to_chromedriver>') # đường dẫn tới ChromeDriver

    def start_requests(self):
        for url in self.start_urls:
            yield Request(
                url = url,
                callback = self.parse,
            )
    
    def parse(self, response):
        for category in self.category_urls:
            category_link = category
            yield Request(
                url = response.urljoin(category_link),
                callback = self.parse_category,
            )
    
    def parse_category(self, response):
        self.driver.get(response.url)
        response_obj = Selector(text=self.driver.page_source)
        for product in response_obj.css('#root > main > div > div.row.fspdbox > div.col-9.p-0 > div.card.fplistbox > div > div.cdt-product-wrapper.m-b-20 > div > div.cdt-product__img'):
            product_link = product.css('a::attr(href)').get()
            
            yield scrapy.Request(
                url = response.urljoin(product_link),
                callback = self.parse_product,
                meta=dict(
                    product_url = product_link,
                )
            )
            time.sleep(2)
    
    def parse_product(self, response):
        
        self.driver.get(response.url)
        response_obj = Selector(text=self.driver.page_source)

        image_urls = response_obj.xpath('//*[@id="root"]/main/div/div[1]/div[2]/div[2]/div[1]/div[1]/div/div[1]/div[1]/img/@src').get()
        product_urls = response.meta.get("product_url")
        price = response_obj.xpath('//*[@id="root"]/main/div/div[1]/div[2]/div[2]/div[2]/div[1]/div[1]/div/text()').get()
        product_name = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-top > h1::text').get()
        product_disk = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-row.clearfix > div.l-pd-left > div.st-param > ul > li:nth-child(4) > p::text').get()
        product_card = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-row.clearfix > div.l-pd-left > div.st-param > ul > li:nth-child(5) > p::text').get()
        product_screen = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-row.clearfix > div.l-pd-left > div.st-param > ul > li:nth-child(1) > p::text').get()
        product_cpu = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-row.clearfix > div.l-pd-left > div.st-param > ul > li:nth-child(2) > p::text').get()
        product_ram = response_obj.css('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-row.clearfix > div.l-pd-left > div.st-param > ul > li:nth-child(3) > p::text').get()
        # category_table = get_category_table(product_name)
        dict={
            "name" : product_name,
            "price" : price,
            "url": 'https://fptshop.com.vn/' + product_urls,
            "screen": product_screen,
            "cpu": product_cpu,
            "ram": product_ram,
            "disk": product_disk,
            "card": product_card,
        }
        yield {
            'category': 'Laptop',
            'image_urls': image_urls,
            'product_info': dict,
            'website': 'Fptshop',
        }

    def closed(self, reason):
        self.driver.quit()

