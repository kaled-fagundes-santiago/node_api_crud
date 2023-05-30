const express = require('express');
const multer = require('multer');
const subscriberController = require('../controllers/subscriberController');

const router = express.Router();
const upload = multer();

router.post('/subscribers', upload.single('imagemPerfil'), subscriberController.cadastrar);
router.put('/subscribers/:id', upload.single('imagemPerfil'), subscriberController.editar);
router.get('/subscribers', subscriberController.listarTodos);
router.get('/subscribers/:codigo', subscriberController.listarPorCodigo);
router.get('/subscribers/filter', subscriberController.listarPorFiltros);
router.delete('/subscribers/:id', subscriberController.excluir);

module.exports = router;
