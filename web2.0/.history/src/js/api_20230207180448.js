async function apiRegistro() {
    try {
        var pass = document.querySelector('#pass').value;
        var pass2 = document.querySelector('#pass2').value;
        var email = document.querySelector('#email').value;
        var nombre = document.querySelector('#name').value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", nombre);
        urlencoded.append("email", email);
        urlencoded.append("password", pass);
        urlencoded.append("password_confirmation", pass2);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            signal: AbortSignal.timeout(4000)
        };

        const response = await fetch("http://localhost/api/register", requestOptions);
        if (response.status === 200) {
            alert("Usuario creado exitosamente");
            router('login')
        } else {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        alert('Error, verifica tus datos e intenta nuevamente');
    }
}

async function apiLogin() {
    try {
        var pass = document.querySelector('#pass').value;
        var email = document.querySelector('#email').value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", pass);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            signal: AbortSignal.timeout(4000)
        };

        const response = await fetch("http://localhost/api/login", requestOptions)
        if (response.status === 200) {
            const json = await response.json();
            setCookie('token', json.token, 20);
            location.reload()
        } else {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        // alert('Error, verifica tus datos e intenta nuevamente');
    }
}

async function apiLogout() {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + getCookie('token'));


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            signal: AbortSignal.timeout(4000)
        };

        const response = await fetch("http://localhost/api/logout", requestOptions);
        if (response.status === 200) {
            borrarCoockie('token');
            console.log('Sesión cerrada exitosamente');
            location.reload();
        } else {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

async function apiPeticiones(empresas, fecha, hora) {

    let query = '';

    empresas.map((empresa) => {
        query += `empresa[]=${empresa}&`
    });

    if (fecha) {
        query += `fecha=${fecha}`;
    }

    if (hora != null || hora != undefined) {
        query += `&hora=${hora}`;
    }

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getCookie('token')}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        signal: AbortSignal.timeout(4000),
    };

    try {
        const response = await fetch(`http://localhost/api/empresas?${query}`, requestOptions);
        if (response.status !== 200) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const json = await response.json();

        return json;
        // return data;
    } catch (error) {
        // throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        console.error("ERROR: Ha ocurrido un error al realizar la petición. "+error);
        // console.error(error);
    }
}
