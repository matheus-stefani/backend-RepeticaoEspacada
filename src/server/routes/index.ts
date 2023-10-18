import { Router } from "express";
import {
    ControllerTarefasIngles,
    ControllerTarefasLeetCode,
    ControllerUsuarios,
} from "../controller";

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
    ControllerTarefasLeetCode.getAllValidation,
    ControllerTarefasLeetCode.getAll
);
router.get(
    "/tarefas-leet-code/:id",
    ControllerTarefasLeetCode.getByIdValidation,
    ControllerTarefasLeetCode.getById
);

router.post(
    "/tarefas-leet-code",
    ControllerTarefasLeetCode.createValidation,
    ControllerTarefasLeetCode.createReqValidation,
    ControllerTarefasLeetCode.create
);
router.delete(
    "/tarefas-leet-code/:id",
    ControllerTarefasLeetCode.deleteByIdValidation,
    ControllerTarefasLeetCode.deleteById
);
router.put(
    "/tarefas-leet-code/:id",
    ControllerTarefasLeetCode.updateByIdValidation,
    ControllerTarefasLeetCode.updateById
);
router.put(
    "/tarefas-leet-code-atualizar-dias",
    ControllerTarefasLeetCode.updateByDay
);

router.post(
    "/cadastrar",
    ControllerUsuarios.signUpValidation,
    ControllerUsuarios.signUp
);
router.post(
    "/entrar",
    ControllerUsuarios.signInValidation,
    ControllerUsuarios.signIn
);

export { router };
