import yfinance as yf
import pymysql
import schedule
import time
from datetime import date

def job():

    # Crear conexión con la base de datos
    miConexion = pymysql.connect(
        host='db', user='root', passwd='123@Nder', db='ibex35', port=3306)


    # Define las empresas a obtener los precios
    empresas = ["CLNX.MC", "REP.MC", "ITX.MC", "IBE.MC", "BBVA.MC",
                "FER.MC", "SAN.MC", "CABK.MC", "NTGY.MC", "TEF.MC"]

    nombreEmpresas = [
        "cellnex", "repsol", "inditex", "iberdrola", "bbva", "ferrovial",
        "santander", "caixabank", "naturgy", "telefonica"
    ]

    # Borrar todos los datos de la tabla antes de insertar nuevos
    cursor = miConexion.cursor()
    try:
        cursor.execute("DELETE FROM empresas")
        miConexion.commit()
        print("Datos borrados correctamente.")
    except pymysql.Error as e:
        print("Error al borrar los datos: ", e)
    finally:
        cursor.close()

    # Obtener precios históricos de las acciones de las empresas
    for i in range(len(empresas)):
        stock_prices = yf.download( empresas[i], start="2015-01-01", end=date.today())
        datos_empresas = []
        for index, row in stock_prices.iterrows():
            fecha = index.strftime("%Y-%m-%d")
            abrir = row["Open"]
            maxi = row["High"]
            mini = row["Low"]
            cierre = row["Close"]
            volumen = row["Volume"]

            datos_empresas.append((fecha, abrir, maxi, mini, cierre, volumen, nombreEmpresas[i]))

        cursor = miConexion.cursor()
        try:
            cursor.executemany("INSERT INTO empresas (fecha, abrir, max, min, cierre, volumen, empresa) VALUES (%s, %s, %s, %s, %s, %s, %s)", datos_empresas)
            miConexion.commit()
            print("Datos insertados correctamente.")
        except pymysql.Error as e:
            print("Error al insertar los datos: ", e)
        finally:
            cursor.close()

    miConexion.close()

    pass

job()

schedule.every().day.at("08:30").do(job)

while True:
    schedule.run_pending()
    time.sleep(60) # check every minute
