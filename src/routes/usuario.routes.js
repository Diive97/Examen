import { Router } from 'express';
import {getUsuarios,getUsuarioxId,postUsuario,putUsuario,patchUsuario,deleteUsuario,login} from '../controladores/usuarioCtrl.js';

const router = Router();

router.get('/usuario', getUsuarios);
router.get('/usuario/:id', getUsuarioxId);
router.post('/usuario', postUsuario);
router.put('/usuario/:id', putUsuario);
router.patch('/usuario/:id', patchUsuario);
router.delete('/usuario/:id', deleteUsuario);
router.post('/usuario/login', login);

export default router;
