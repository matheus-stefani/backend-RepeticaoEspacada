import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as deleteById from "./DeleteById";
import * as updateById from "./UpdateById";
import * as updateByDay from "./UpdateByDay";
export const ControllerTarefasIngles = {
    ...create,
    ...getAll,
    ...getById,
    ...deleteById,
    ...updateById,
    ...updateByDay,
};
