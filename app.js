const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors')
const port = 3000;


app.use(cors());

app.get('/characters', async (req,res) => {
    const url = 'https://rickandmortyapi.com/api/character'
    try{
        const response = await axios.get(url);
        const characters = response.data.results;
        res.json(characters)
    }
    catch (err) {
        res.status(402).json({message:'No se pudo obtener los personajes'})
    }
})

app.get('/characters/:name', async (req,res) => {
    const name = req.params.name;
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
    try{
        const response = await axios.get(url);
        const character = response.data.results[0];
        if (character) {
            const { name, status, species, gender, image , origin: {name:originName} } = character;
            res.json({ name, status, species, gender, image , origin: { name: originName }});

        } else {
            res.status(404).json({ message: 'Personaje no encontrado' });
        }
    }
    catch (err){
        res.status(400).json({message : 'No se pudo obtener los personajes'})
    }
})

app.listen(port, () => {
    console.log(`Server is listen on port: ${port}`)
})