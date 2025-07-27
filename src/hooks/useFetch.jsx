export class MyRequest{

    async getAll(uri, token){
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(uri, {
            method: 'GET',
            headers: headers
        });

        if (!res.ok) {
            const errorData = await res.json();
            // Lança um objeto de erro com status e mensagem
            throw { status: res.status, message: errorData.message || `Erro na requisição GET: ${res.status}` };
        }

        const json = await res.json();
        return json;
    }

    async post(uri, data, token = null){
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(uri, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const errorData = await res.json();
            // Lança um objeto de erro com status e mensagem
            throw { status: res.status, message: errorData.message || `Erro na requisição POST: ${res.status}` };
        }

        const json = await res.json();
        return json;
    }
}
