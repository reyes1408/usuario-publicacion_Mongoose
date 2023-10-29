import { Router } from "express";
import { registerUser, updateUser, deleteUser, findUser } from "../controllers/user.controller.js";
import { registerPublication, updatePublication, deletePublication, findPublication } from "../controllers/publication.controller.js";
import { registerComment, updateComment, deleteComment, findComment } from "../controllers/comment.controller.js";

const router = Router();

router.post('/user/register', registerUser);
router.put('/user/update/:id', updateUser);
router.delete('/user/delete/:id', deleteUser);
router.post('/user/find/:id', findUser);

router.post('/publication/register/:id', registerPublication);
router.put('/publication/update/:id', updatePublication);
router.delete('/publication/delete/:id', deletePublication);
router.post('/publication/find/:id', findPublication);

router.post('/comment/register/', registerComment);
router.put('/comment/update/:id', updateComment);
router.delete('/comment/delete/:id', deleteComment);
router.post('/comment/find/:id', findComment);

export default router;
