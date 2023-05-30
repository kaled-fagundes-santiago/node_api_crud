const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    sobrenome: String,
    dataNascimento: Date,
    telefone: String,
    endereco: String,
    cidade: String,
    estado: String,
    status: {
        type: String,
        enum: ['Ativo', 'Inativo']
    },
    imagemPerfil: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
