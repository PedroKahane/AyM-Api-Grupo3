import { Router } from "express";
const userRoutes=Router();
import UserController from "../controllers/UserController.js";

const userController = new UserController()
 
userRoutes.get("/:dni", userController.getUserByDni);
userRoutes.get("/:dni/:saldo", userController.getSaldoByDni);
userRoutes.put("/:dni/:saldo", userController.DescontarSaldoByDni);
userRoutes.post("/", userController.crearUsuario);

export default userRoutes;