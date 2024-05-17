const { Router } = require("express");
const router = Router()
const { getUsuarios, getUsuario} = require("../controllers/usuarios");

router.get('/', getUsuarios);
router.get('/:id', getUsuario);

module.exports = router