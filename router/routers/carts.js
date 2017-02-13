import {Router} from 'express';
import CartController from '../../controller/CartController';

const router = Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAllCarts);
router.get('/:cartNumber', cartCtrl.getOneCartById);
router.post('/', cartCtrl.addCart);
router.post('/:cartNumber/item/:itemId', cartCtrl.addItemForCart);
router.delete('/:cartNumber', cartCtrl.deleteCart);
router.delete('/:cartNumber/item/:itemId', cartCtrl.deleteItemFromCart);

export default router;