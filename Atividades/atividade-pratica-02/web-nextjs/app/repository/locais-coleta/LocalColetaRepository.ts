const getAllLocaisColeta = async () => {

    const response = await fetch('http://localhost:5000/locais-coleta', {
        cache: 'no-cache'
    });

    return response.json();
};

const getByIdLocalColeta = async (id: string) => {

    const response = await fetch(`http://localhost:5000/locais-coleta/${id}`, {
        cache: 'no-cache'
    });
    
    return response.json();
};

export { getAllLocaisColeta, getByIdLocalColeta };
