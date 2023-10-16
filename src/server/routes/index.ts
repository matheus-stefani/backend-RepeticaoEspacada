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
    ControllerTarefasIngles.createReqValidation,
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
router.put(
    "/tarefas-ingles-atualizar-dias",
    ControllerTarefasIngles.updateByDay
);

router.get(
    "/tarefas-leet-code",
    ControllerTarefasIngles.getAllValidation,
    ControllerTarefasIngles.getAll
);
router.get(
    "/tarefas-leet-code/:id",
    ControllerTarefasIngles.getByIdValidation,
    ControllerTarefasIngles.getById
);

router.post(
    "/tarefas-leet-code",
    ControllerTarefasIngles.createValidation,
    ControllerTarefasIngles.createReqValidation,
    ControllerTarefasIngles.create
);
router.delete(
    "/tarefas-leet-code/:id",
    ControllerTarefasIngles.deleteByIdValidation,
    ControllerTarefasIngles.deleteById
);
router.put(
    "/tarefas-leet-code/:id",
    ControllerTarefasIngles.updateByIdValidation,
    ControllerTarefasIngles.updateById
);
router.put(
    "/tarefas-leet-code-atualizar-dias",
    ControllerTarefasIngles.updateByDay
);

export { router };
