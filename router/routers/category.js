import {Router} from 'express';
import CategoryController from '../../controller/CategoryController';

const router = Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAllCategories);
router.get('/:categoryId', categoryCtrl.getCategoryById);
router.post('/', categoryCtrl.addCategory);
router.post('/:categoryId/item/:itemId', categoryCtrl.addItemForCategory);
router.delete('/:categoryId', categoryCtrl.deleteCategory);
router.put('/:categoryId', categoryCtrl.updateCategory);
router.delete('/:categoryId/item/:itemId', categoryCtrl.deleteItemForCategory);

export default router;