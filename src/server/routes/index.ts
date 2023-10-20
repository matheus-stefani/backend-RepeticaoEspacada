import { Router } from "express";
import {
    ControllerTarefasIngles,
    ControllerTarefasLeetCode,
    ControllerUsuarios,
} from "../controller";
import { ensureAuthenticated } from "../shared/middleware";

const router = Router();

router.get(
    "/tarefas-ingles",
    ensureAuthenticated,
    ControllerTarefasIngles.getAllValidation,
    ControllerTarefasIngles.getAll
);
router.get(
    "/tarefas-ingles/:id",
    ensureAuthenticated,
    ControllerTarefasIngles.getByIdValidation,
    ControllerTarefasIngles.getById
);

router.post(
    "/tarefas-ingles",
    ensureAuthenticated,
    ControllerTarefasIngles.createValidation,
    ControllerTarefasIngles.createReqValidation,
    ControllerTarefasIngles.create
);
router.delete(
    "/tarefas-ingles/:id",
    ensureAuthenticated,
    ControllerTarefasIngles.deleteByIdValidation,
    ControllerTarefasIngles.deleteById
);
router.put(
    "/tarefas-ingles/:id",
    ensureAuthenticated,
    ControllerTarefasIngles.updateByIdValidation,
    ControllerTarefasIngles.updateById
);
router.put(
    "/tarefas-ingles-atualizar-dias",
    ensureAuthenticated,
    ControllerTarefasIngles.updateByDay
);

router.get(
    "/tarefas-leet-code",
    ensureAuthenticated,
    ControllerTarefasLeetCode.getAllValidation,
    ControllerTarefasLeetCode.getAll
);
router.get(
    "/tarefas-leet-code/:id",
    ensureAuthenticated,
    ControllerTarefasLeetCode.getByIdValidation,
    ControllerTarefasLeetCode.getById
);

router.post(
    "/tarefas-leet-code",
    ensureAuthenticated,
    ControllerTarefasLeetCode.createValidation,
    ControllerTarefasLeetCode.createReqValidation,
    ControllerTarefasLeetCode.create
);
router.delete(
    "/tarefas-leet-code/:id",
    ensureAuthenticated,
    ControllerTarefasLeetCode.deleteByIdValidation,
    ControllerTarefasLeetCode.deleteById
);
router.put(
    "/tarefas-leet-code/:id",
    ensureAuthenticated,
    ControllerTarefasLeetCode.updateByIdValidation,
    ControllerTarefasLeetCode.updateById
);
router.put(
    "/tarefas-leet-code-atualizar-dias",
    ensureAuthenticated,
    ControllerTarefasLeetCode.updateByDay
);

router.post(
    "/cadastrar",
    ensureAuthenticated,
    ControllerUsuarios.signUpValidation,
    ControllerUsuarios.signUp
);
router.post(
    "/entrar",
    ensureAuthenticated,
    ControllerUsuarios.signInValidation,
    ControllerUsuarios.signIn
);

export { router };
