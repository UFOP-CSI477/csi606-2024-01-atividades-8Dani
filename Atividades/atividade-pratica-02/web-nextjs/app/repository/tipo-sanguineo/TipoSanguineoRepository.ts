const getAllTiposSanguineos = async () => {

    const response = await fetch('http://localhost:5000/tipo-sanguineo', {
        cache: 'no-cache'
    });

    return response.json();
};

const getByIdTipoSanguineo = async (id: string) => {

    const response = await fetch(`http://localhost:5000/tipo-sanguineo/${id}`, {
        cache: 'no-cache'
    });
    
    return response.json();
};

export { getAllTiposSanguineos, getByIdTipoSanguineo };
