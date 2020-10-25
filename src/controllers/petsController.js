const pets = require('../models/pets.json');
const fs = require('fs');

const getAllPets = (req, res) => {
    console.log(req.url)
    res.status(200).send(pets)
};

const getPetById = (req, res) => {
    const id = req.params.id;
    try {
        const petFound = pets.find(pet => pet.id == id)
        if (petFound) {
        res.status(200).send(petFound)
        } else {
        res.status(404).send({ message: "PetShop não encontrado" })
        }
    } catch(err) {
        res.status(424).send({ message: 'Erro interno no servidor' })
    }
};

const updatePet = (req, res) => {
    const id = req.params.id;
    const petToUpdate = req.body;

    const petFound = pets.find(pet => pet.id == id) 
    const petIndex = pets.indexOf(petFound) 
    if (petIndex >= 0) { 
        pets.splice(petIndex, 1, petToUpdate) 
        fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err }) 
            } else {
                console.log("Arquivo de PetShop atualizado com sucesso!")
                const petUpdated = pets.find(pet => pet.id == id)
                res.status(200).send(petUpdated)
            }
        })
    } else {
        
        res.status(404).send({ message: "PetShop não encontrado para ser atualizado!" })
    }
};

const createNewPet = (req, res) => {
    const { id, nomeFantasia, endereco, telefone, atende, precoConsulta } = req.body
    pets.push({ id, nomeFantasia, endereco, telefone, atende, precoConsulta }) 
    fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err }) 
        } else {
            console.log("PetShop gravado no arquivo com sucesso!")
            const petFound = pets.find(pet => pet.id == id) 
            res.status(200).send(petFound)
        }
    })
};

module.exports = {
    getAllPets,
    getPetById,
    updatePet,
    createNewPet
}