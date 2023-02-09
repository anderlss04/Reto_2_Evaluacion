import yfinance as yf
import pymysql
import schedule
import time
from datetime import date
import datetime


def principal():

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
        stock_prices = yf.download(
            empresas[i], start="2015-01-01", end=date.today())
        datos_empresas = []
        for index, row in stock_prices.iterrows():
            fecha = index.strftime("%Y-%m-%d")
            abrir = row["Open"]
            maxi = row["High"]
            mini = row["Low"]
            cierre = row["Close"]
            volumen = row["Volume"]

            datos_empresas.append(
                (fecha, abrir, maxi, mini, cierre, volumen, nombreEmpresas[i]))

        cursor = miConexion.cursor()
        try:
            cursor.executemany(
                "INSERT INTO empresas (fecha, abrir, max, min, cierre, volumen, empresa) VALUES (%s, %s, %s, %s, %s, %s, %s)", datos_empresas)
            miConexion.commit()
            print("Datos insertados correctamente.")
        except pymysql.Error as e:
            print("Error al insertar los datos: ", e)
        finally:
            cursor.close()

    miConexion.close()

    pass


def diario():

    try:
        # Crear conexión con la base de datos
        miConexion = pymysql.connect(
            host='db', user='root', passwd='123@Nder', db='ibex35', port=3306)
    except pymysql.Error as e:
        print("Error en la conexión a la base de datos: ", e)
        exit()

    empresas = ["CLNX.MC", "REP.MC", "ITX.MC", "IBE.MC", "BBVA.MC",
                "FER.MC", "SAN.MC", "CABK.MC", "NTGY.MC", "TEF.MC"]

    nombreEmpresas = [
        "cellnex", "repsol", "inditex", "iberdrola", "bbva", "ferrovial",
        "santander", "caixabank", "naturgy", "telefonica"
    ]

    # Borrar todos los datos de la tabla antes de insertar nuevos
    cursor = miConexion.cursor()
    try:
        cursor.execute("DELETE FROM empresas_diario")
        miConexion.commit()
        print("Datos borrados correctamente.")
    except pymysql.Error as e:
        print("Error al borrar los datos: ", e)
    finally:
        cursor.close()

    # Obtener precios históricos de las acciones de las empresas
    for i in range(len(empresas)):
        ticker = yf.Ticker(empresas[i])
        df = ticker.history(period="7d", interval="1m")

        # Crear lista de tuplas para almacenar los datos de la empresa
        datos_empresas = []
        for index, row in df.iterrows():
            fecha = index.strftime("%Y-%m-%d")
            hora = index.strftime("%H:%M:%S")
            abrir = row["Open"]
            maxi = row["High"]
            mini = row["Low"]
            cierre = row["Close"]
            volumen = row["Volume"]

            datos_empresas.append(
                (fecha, hora, abrir, maxi, mini, cierre, volumen, nombreEmpresas[i]))

        cursor = miConexion.cursor()

        try:
            # Insertar los datos de la empresa en un solo query
            cursor.executemany(
                "INSERT INTO empresas_diario (fecha, hora, abrir, max, min, cierre, volumen, empresa) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", datos_empresas)
            miConexion.commit()
            print(
                f'Datos insertados correctamente para la empresa {nombreEmpresas[i]}.')
        except pymysql.Error as e:
            print(
                f"Error al insertar datos para la empresa {nombreEmpresas[i]}: {e}")
        finally:
            cursor.close()

    miConexion.close()

    pass


principal()

diario()


# Programación de un trabajo para que se ejecute todos los días a las 08:30.
schedule.every().day.at("08:30").do(principal)

# Define el intervalo de horas en el que se ejecutará el programa
start_time = datetime.time(9, 10)
end_time = datetime.time(17, 50)

while True:
    now = datetime.datetime.now().time()
    hoy = datetime.datetime.today().weekday()
    if (start_time <= now and now <= end_time) and (hoy != 5 and hoy != 6):
        diario()
    if hoy != 5 and hoy != 6:
        schedule.run_pending()
    time.sleep(8)
