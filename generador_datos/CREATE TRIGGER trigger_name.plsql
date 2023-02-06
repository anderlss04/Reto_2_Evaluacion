import yfinance as yf
import pymysql
import datetime
import time


def job():

    try:
        # Crear conexión con la base de datos
        miConexion = pymysql.connect(
            host='localhost', user='root', passwd='', db='ibex35', port=3336)
    except pymysql.Error as e:
        print("Error en la conexión a la base de datos: ", e)
        exit()

    empresas = ["CLNX.MC", "REP.MC", "ITX.MC", "IBE.MC", "BBVA.MC",
                "FER.MC", "SAN.MC", "CABK.MC", "NTGY.MC", "TEF.MC"]

    nombreEmpresas = [
        "cellnex", "repsol", "inditex", "iberdrola", "bbva", "ferrovial",
        "santander", "caixabank", "naturgy", "telefonica"
    ]

    # Obtener precios históricos de las acciones de las empresas
    for i in range(len(empresas)):
        ticker = yf.Ticker(empresas[i])
        df = ticker.history(period="min", interval="1m")

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

        datos_empresas = datos_empresas.pop()
        cursor = miConexion.cursor()
        print(datos_empresas)
        try:
            cursor.execute("SELECT * FROM empresas_diario")
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

# Define el intervalo de horas en el que se ejecutará el programa
start_time = datetime.time(9, 10)
end_time = datetime.time(17, 50)

while True:
    now = datetime.datetime.now().time()
    if start_time <= now and now <= end_time:
        job()
    time.sleep(10)
