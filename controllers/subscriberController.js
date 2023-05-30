const express = require('express');
const multer = require('multer'); 
const upload = multer(); 
const subscriberModel = require('../models/subscriberModel');

class SubscriberController {
    async cadastrar(req, res) {
        try {
            const subscriber = JSON.parse(req.body.teste);
            const image = req.file;
            console.log(subscriber);
            console.log(image);
            subscriber.imagemPerfil = {
                data: image.buffer,
                contentType: image.mimetype
            };
            const resultado = await subscriberModel.create(subscriber);
            res.status(201).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cadastrar o assinante' });
        }
    }
      

    async editar(req, res) {
        try {
            const id = req.params.id;
            await subscriberModel.findByIdAndUpdate(id, req.body);
            res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao editar o assinante' });
        }
    }

    async listarTodos(req, res) {
        try {
            const resultado = await subscriberModel.find({});
            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar todos os assinantes' });
        }
    }

    async listarPorCodigo(req, res) {
        try {
            const codigo = req.params.codigo;
            const resultado = await subscriberModel.findOne({ codigo: codigo });
            if (resultado) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ error: 'Assinante não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o assinante por código' });
        }
    }

    async listarPorFiltros(req, res) {
        try {
            const { nome, sobrenome, cidade, estado, status } = req.query;
            const filtros = {};

            if (nome) filtros.nome = nome;
            if (sobrenome) filtros.sobrenome = sobrenome;
            if (cidade) filtros.cidade = cidade;
            if (estado) filtros.estado = estado;
            if (status) filtros.status = status;

            const resultado = await subscriberModel.find(filtros);
            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar os assinantes por filtros' });
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;
            const resultado = await subscriberModel.findByIdAndRemove(id);
            if (resultado) {
                res.status(200).send();
            } else {
                res.status(404).json({ error: 'Assinante não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o assinante' });
        }
    }
}

module.exports = new SubscriberController();
