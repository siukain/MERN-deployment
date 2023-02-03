const { Schema, model } = require('mongoose');

const petsSchema = new Schema({
    name: {
        type: String,
        unique: true,
        minLength: [3, 'El nombre debe tener mínimo 3 caracteres'],
        required: [true, 'Debe ingresar un nombre'],
    },
    type: {
        type: String,
        minLength: [3, 'El tipo debe tener mínimo 3 caracteres'],
        required: [true, 'Debe ingresar un tipo'],
    },
    description: {
        type: String,
        minLength: [3, 'La descripción debe tener mínimo 3 caracteres'],
        required: [true, 'Debe ingresar una descripción'],
    },
    skillOne: {
        type: String
    },
    skillTwo: {
        type: String
    },
    skillThree: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const PetsModel = model('Pets', petsSchema);

module.exports = PetsModel;