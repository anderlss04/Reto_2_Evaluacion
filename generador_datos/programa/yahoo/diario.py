import yfinance as yf
import pymysql
import schedule
import time

def job():

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

            datos_empresas.append((fecha, hora, abrir, maxi, mini, cierre, volumen, nombreEmpresas[i]))

        cursor = miConexion.cursor()
        try:
            cursor.execute("SELECT * FROM empresas_diario")
            # Insertar los datos de la empresa en un solo query
            cursor.executemany(
                "INSERT INTO empresas_diario (fecha, hora, abrir, max, min, cierre, volumen, empresa) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", datos_empresas)
            miConexion.commit()
            print(f'Datos insertados correctamente para la empresa {nombreEmpresas[i]}.')
        except pymysql.Error as e:
            print(f"Error al insertar datos para la empresa {nombreEmpresas[i]}: {e}")
        finally:
            cursor.close()


    miConexion.close()

    pass


job()

schedule.every().day.at("08:40").do(job)

while True:
    schedule.run_pending()
    time.sleep(60) # verificar todos los minutos