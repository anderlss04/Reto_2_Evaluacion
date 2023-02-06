from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from datetime import date
from datetime import datetime
import pymysql
from selenium.common.exceptions import TimeoutException


miConexion = pymysql.connect(
    host='localhost', user='root', passwd='', db='ibex35', port=3336)

urls = [
    'https://finance.yahoo.com/quote/CLNX.MC/history?p=CLNX.MC',
    'https://finance.yahoo.com/quote/REP.MC/history?p=REP.MC',
    'https://finance.yahoo.com/quote/ITX.MC/history?p=ITX.MC',
    'https://finance.yahoo.com/quote/IBE.MC/history?p=IBE.MC',
    'https://finance.yahoo.com/quote/BBVA.MC/history?p=BBVA.MC',
    'https://finance.yahoo.com/quote/FER.MC/history?p=FER.MC',
    'https://finance.yahoo.com/quote/SAN.MC/history?p=SAN.MC',
    'https://finance.yahoo.com/quote/CABK.MC/history?p=CABK.MC',
    'https://finance.yahoo.com/quote/NTGY.MC/history?p=NTGY.MC'
]

empresas = [
    'telefonica', 'cellnex', 'repsol', 'inditex', 'iberdrola', 'bbva', 'ferrovial', 'santander', 'caixabank', 'naturgy'
]


def writeBBDDFull(fecha, abrir, maxi, mini, cierre, volumen, empresa):
    cursor = miConexion.cursor()
    cursor.execute("INSERT INTO empresas (fecha, abrir, max, min, cierre, volumen, empresa) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                   (fecha, abrir, maxi, mini, cierre, volumen, empresa))
    miConexion.commit()
    print('insertado correctamente a la bbdd la empresa - ' + empresa +' ; y fecha - ' + fecha)
    cursor.close()



def getFullData():
    driver = webdriver.Firefox()

    driver.get('https://finance.yahoo.com/quote/tef.MC/history?p=tef.MC')

    coockies = driver.find_element(
        By.XPATH, "//*[@id='consent-page']/div/div/div/form/div[2]/div[2]/button")

    coockies.click()

    time.sleep(5)

    otro = driver.find_element(By.CSS_SELECTOR, ".Fill\(\$iconColor\)")
    otro.click()

    filtro = driver.find_element(
        By.CSS_SELECTOR, "#Col1-1-HistoricalDataTable-Proxy > section > div.Pt\(15px\) > div.Bgc\(\$lv1BgColor\).Bdrs\(3px\).P\(10px\) > div:nth-child(1) > div > div > div > span")

    filtro.click()

    agnos = driver.find_element(
            By.CSS_SELECTOR, "ul.P\(0\):nth-child(2) > li:nth-child(3) > button:nth-child(1)")

    agnos.click()

    aplicar = driver.find_element(
        By.CSS_SELECTOR, '#Col1-1-HistoricalDataTable-Proxy > section > div.Pt\(15px\) > div.Bgc\(\$lv1BgColor\).Bdrs\(3px\).P\(10px\) > button')

    aplicar.click()


    for i in range(0, 14):
        html = driver.find_element(By.TAG_NAME, 'html')
        html.send_keys(Keys.END)
        time.sleep(0.8)

    tabla = driver.find_element(By.CSS_SELECTOR, "table[class='W(100%) M(0)']")

    filas = tabla.find_elements(By.CSS_SELECTOR, "tbody tr")

    for fila in filas:
        celdas = fila.find_elements(By.TAG_NAME, "td")
        if len(celdas) > 4:
            fecha = celdas[0].text
            fecha_dt = datetime.strptime(fecha, "%b %d, %Y")
            fecha = fecha_dt.strftime('%Y-%m-%d')
            abrir = celdas[1].text
            maxi = celdas[2].text
            mini = celdas[3].text
            cierre = celdas[4].text
            volumen = celdas[5].text
            # print(fecha, abrir, maxi, mini, cierre, volumen, empresas[0])
            writeBBDDFull(fecha, abrir, maxi, mini, cierre, volumen, empresas[0])

    for url in urls:
        driver.execute_script("window.open('');")
        driver.switch_to.window(driver.window_handles[-1])
        driver.get(url)

        time.sleep(2.5)

        filtro = driver.find_element(
            By.CSS_SELECTOR, "div.C\(\$linkColor\) > span:nth-child(1)")

        filtro.click()

        time.sleep(2.5)

        agnos = driver.find_element(
            By.CSS_SELECTOR, "ul.P\(0\):nth-child(2) > li:nth-child(3) > button:nth-child(1)")

        agnos.click()

        aplicar = driver.find_element(
            By.CSS_SELECTOR, '#Col1-1-HistoricalDataTable-Proxy > section > div.Pt\(15px\) > div.Bgc\(\$lv1BgColor\).Bdrs\(3px\).P\(10px\) > button')

        aplicar.click()

        for i in range(0, 14):
            html = driver.find_element(By.TAG_NAME, 'html')
            html.send_keys(Keys.END)
            time.sleep(0.8)


        tabla = driver.find_element(By.CSS_SELECTOR, "table[class='W(100%) M(0)']")
        filas = tabla.find_elements(By.CSS_SELECTOR, "tbody tr")

        for fila in filas:
            celdas = fila.find_elements(By.TAG_NAME, "td")
            if len(celdas) > 4:
                fecha = celdas[0].text
                fecha_dt = datetime.strptime(fecha, "%b %d, %Y")
                fecha = fecha_dt.strftime('%Y-%m-%d')
                abrir = celdas[1].text
                maxi = celdas[2].text
                mini = celdas[3].text
                cierre = celdas[4].text
                volumen = celdas[5].text
                writeBBDDFull(fecha, abrir, maxi, mini, cierre, volumen, empresas[urls.index(url)+1])

    driver.close()
    driver.quit()

def writeBBDDDaily(fecha, precio, hora, empresa):
    cursor = miConexion.cursor()
    cursor.execute("INSERT INTO empresas_diario (fecha, hora, precio, empresa) VALUES (%s, %s, %s, %s)", (fecha, hora, precio, empresa))
    miConexion.commit()
    print('insertado correctamente a la bbdd')
    cursor.close()


def getDataDaily():
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
            

getFullData()

getDataDaily()




