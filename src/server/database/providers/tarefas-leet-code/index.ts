import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as deleteById from "./DeleteById";
import * as updateById from "./UpdateById";
import * as count from "./Count";
import * as updateByDay from "./UpdateByDay";
import * as getAllRegisters from "./GetAllRegisters";
export const ProvidersTarefasLeetCode = {
    ...create,
    ...getAll,
    ...getById,
    ...deleteById,
    ...updateById,
    ...count,
    ...updateByDay,
    ...getAllRegisters,
};
