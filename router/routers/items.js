import {Router} from 'express';
import ItemController from '../../controller/ItemController';

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOneById);
router.post('/', itemCtrl.addItem);
router.delete('/:id', itemCtrl.deleteItem);
router.put('/:id', itemCtrl.updateItem);

export default router;