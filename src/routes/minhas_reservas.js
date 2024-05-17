const { Router } = require("express");
const router = Router()
const {getMinhasReservas,getReservasUsuario} = require ("../controllers/minhas_reservas");

router.get('/',getMinhasReservas);
router.get('/:idUsuario',getReservasUsuario);

module.exports = router