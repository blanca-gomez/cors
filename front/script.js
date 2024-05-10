function getCharacterInfo() {
    const characterNameInput = document.getElementById('characterName');
    const characterInfo = document.getElementById('characterInfo');
    const name = characterNameInput.value.toLowerCase();

    fetch(`http://localhost:3000/characters/${name}`)
        .then(res => res.json())
        .then(data => {
            const {  name, status, species, gender, image , origin: {name:originName} } = data;
            characterInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="${image}" alt="${name}"/>
                <ul>
                    <li>${status}</li>
                    <li>${species}</li>
                    <li>${gender}</li>
                    <li>${originName}</li>
                
                
                </ul>
            `
        })
        .catch(err => characterInfo.innerHTML = `<p>Personaje no encontrado</p>`)

}



        