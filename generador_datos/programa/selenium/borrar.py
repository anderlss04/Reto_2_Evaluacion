import pymysql
import time


miConexion = pymysql.connect( host='localhost', user= 'root', passwd='', db='ibex35', port=3336 )
cursor = miConexion.cursor()
cursor.execute("SELECT COUNT(*) FROM empresas")
filas = int(cursor.fetchone()[0])
print(filas)

while(True):
    miConexion = pymysql.connect( host='localhost', user= 'root', passwd='', db='ibex35', port=3336 )
    cursor = miConexion.cursor()
    cursor.execute("SELECT COUNT(*) FROM empresas")
    nuevoFilas = int(cursor.fetchone()[0])
    print(nuevoFilas)
    if(filas < nuevoFilas):
        filas = nuevoFilas
        cursor.execute("SELECT Fecha FROM empresas WHERE ID = (SELECT MAX(ID) FROM EMPRESAS);")
        fechaUltimo = cursor.fetchone()[0]
        cursor.execute("SELECT empresa FROM EMPRESAS WHERE ID = (SELECT MAX(ID) FROM EMPRESAS)")
        empresaUltimo = cursor.fetchone()[0]
        cursor.execute(f"DELETE FROM empresas_diario WHERE EMPRESA = '{empresaUltimo}' AND FECHA = '{fechaUltimo}'")
        print('Borrado filas de la tabla empresas_diario    correctamente')
        miConexion.commit()
        
    time.sleep(11.3)
