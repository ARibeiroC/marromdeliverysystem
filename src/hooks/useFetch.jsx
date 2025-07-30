import { useState, useEffect } from 'react'; // Importar useEffect também

export class MyRequest {
    static loadingCallbacks = [];

    static registerLoadingCallback(callback) {
        MyRequest.loadingCallbacks.push(callback);
        return () => {
            MyRequest.loadingCallbacks = MyRequest.loadingCallbacks.filter(cb => cb !== callback);
        };
    }

    static setLoading(isLoading) {
        MyRequest.loadingCallbacks.forEach(callback => callback(isLoading));
    }

    async getAll(uri, token) {
        MyRequest.setLoading(true); // Inicia o carregamento
        // NOVO: Atraso artificial para teste - REMOVA EM PRODUÇÃO!
        await new Promise(resolve => setTimeout(resolve, 500)); // Atraso de 500ms

        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const res = await fetch(uri, {
                method: 'GET',
                headers: headers
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw { status: res.status, message: errorData.message || `Erro na requisição GET: ${res.status}` };
            }

            const json = await res.json();
            return json;
        } finally {
            MyRequest.setLoading(false); // Finaliza o carregamento (sucesso ou erro)
        }
    }

    async post(uri, data, token = null) {
        MyRequest.setLoading(true); // Inicia o carregamento
        // NOVO: Atraso artificial para teste - REMOVA EM PRODUÇÃO!
        await new Promise(resolve => setTimeout(resolve, 2000)); // Atraso de 500ms

        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const res = await fetch(uri, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw { status: res.status, message: errorData.message || `Erro na requisição POST: ${res.status}` };
            }

            const json = await res.json();
            return json;
        } finally {
            MyRequest.setLoading(false); // Finaliza o carregamento (sucesso ou erro)
        }
    }
}

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const cleanup = MyRequest.registerLoadingCallback(setIsLoading);
        return cleanup;
    }, []);

    return isLoading;
};
