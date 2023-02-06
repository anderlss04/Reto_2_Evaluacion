CREATE TRIGGER trigger_name
AFTER INSERT 
   ON empresas_diario FOR EACH ROW

DECLARE
    maximo DATE := SELECT MAX(FECHA) FROM empresas_diario WHERE 'EMPRESA' = NEW.EMPRESA;
    minimo DATE := SELECT MIN(FECHA) FROM empresas_diario WHERE 'EMPRESA' = NEW.EMPRESA;
    hora TIME := SELECT MAX(HORA) FROM empresas_diario WHERE 'EMPRESA' = NEW.EMPRESA;
    

BEGIN

    IF maximo-minimo > 6 THEN
        INSERT INTO empresas_historial (FECHA, CIERRE, EMPRESA) VALUES (maximo, (SELECT PRECIO FROM empresas_diario WHERE 'EMPRESA' = NEW.EMPRESA AND 'FECHA' = maximo AND 'HORA' = hora), NEW.EMPRESA);
        
        DELETE FROM empresas_diario WHERE EMPRESA = NEW.EMPRESA AND FECHA = @minimo;
    END IF;

    SELECT FECHA FROM EMPRESAS WHERE 'ID' = (SELECT MAX(ID) FROM EMPRESAS)
     
END