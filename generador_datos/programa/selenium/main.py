from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import time
from datetime import date
from datetime import datetime
import pymysql



miConexion = pymysql.connect( host='localhost', user= 'root', passwd='', db='ibex35', port=3336 )

urls = [
  'https://es.finance.yahoo.com/quote/CLNX.MC'
  ,'https://es.finance.yahoo.com/quote/REP.MC'
  ,'https://es.finance.yahoo.com/quote/ITX-U.TI'
  ,'https://es.finance.yahoo.com/quote/IBE.MC'
  ,'https://es.finance.yahoo.com/quote/BBVA.MC'
  ,'https://es.finance.yahoo.com/quote/FER.MC'
  ,'https://es.finance.yahoo.com/quote/SAN.MC'
  ,'https://es.finance.yahoo.com/quote/CABK.MC'
  ,'https://es.finance.yahoo.com/quote/NTGY.MC'
]

empresas = [
  'telefonica'
  ,'cellnex'
  ,'repsol'
  ,'inditex'
  ,'iberdrola'
  ,'bbva'
  ,'ferrovial'
  ,'santander'
  ,'caixabank'
  ,'naturgy'
]

def writeBBDDDaily(fecha, precio, hora, empresa):
    cursor = miConexion.cursor()
    cursor.execute("INSERT INTO empresas_diario (fecha, hora, precio, empresa) VALUES (%s, %s, %s, %s)", (fecha, hora, precio, empresa))
    miConexion.commit()
    print('insertado correctamente a la bbdd')
    cursor.close()

driver = webdriver.Firefox()

driver.get('https://es.finance.yahoo.com/quote/tef.MC')

coockies = driver.find_element(By.XPATH,"//*[@id='consent-page']/div/div/div/form/div[2]/div[2]/button")

coockies.click()

precio = driver.find_element(By.CSS_SELECTOR, 'fin-streamer.Fw\(b\):nth-child(1)')

writeBBDDDaily(date.today(), precio.text, datetime.now().strftime('%H:%M:%S'), empresas[0])

for url in urls:
  driver.execute_script("window.open('');")
  driver.switch_to.window(driver.window_handles[-1])
  driver.get(url)
  precio = driver.find_element(By.CSS_SELECTOR, 'fin-streamer.Fw\(b\):nth-child(1)')

indice = 1

while (True):
  if( int(time.strftime('%H'))<=17 and int(time.strftime('%H'))>=9 and int(time.strftime('%M'))!=30):
    driver.switch_to.window(driver.window_handles[indice])
    precio = driver.find_element(By.CSS_SELECTOR, 'fin-streamer.Fw\(b\):nth-child(1)')
    print(precio.text, empresas[indice])
    writeBBDDDaily(date.today(), precio.text, datetime.now().strftime('%H:%M:%S'), empresas[indice])
    
    if (indice == 9):
      indice = 0
    else:
      indice = indice + 1

    time.sleep(11.5)
  
    

