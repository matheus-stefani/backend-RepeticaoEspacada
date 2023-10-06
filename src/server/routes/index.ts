import { Router } from "express";
import { ControllerTarefasIngles } from "../controller";

const router = Router();

router.get(
    "/tarefas-ingles",
    ControllerTarefasIngles.getAllValidation,
    ControllerTarefasIngles.getAll
);
router.get(
    "/tarefas-ingles/:id",
    ControllerTarefasIngles.getByIdValidation,
    ControllerTarefasIngles.getById
);

router.post(
    "/tarefas-ingles",
    ControllerTarefasIngles.createValidation,
    ControllerTarefasIngles.create
);
router.delete(
    "/tarefas-ingles/:id",
    ControllerTarefasIngles.deleteByIdValidation,
    ControllerTarefasIngles.deleteById
);
router.put(
    "/tarefas-ingles/:id",
    ControllerTarefasIngles.updateByIdValidation,
    ControllerTarefasIngles.updateById
);

export { router };
