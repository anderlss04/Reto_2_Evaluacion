BEGIN
   
    SET @MINIMO = (
        SELECT
            MIN(FECHA)
        FROM
            EMPRESAS_DIARIO
        WHERE
            EMPRESA = NEW.EMPRESA 
    );
    
    SET @DEVULETO = (
        SELECT Abrir FROM empresas  WHERE FECHA = @MINIMO
        );
    
    SET @ESNULL = (
        SELECT ISNULL(@DEVULETO);
        );
   
     IF @MINIMO = NEW.FECHA THEN
   		
         DELETE FROM EMPRESAS_DIARIO
        WHERE
            EMPRESA = NEW.EMPRESA
            AND FECHA = NEW.FECHA;
   
   END IF;
    
    
END