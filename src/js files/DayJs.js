import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isSameOrBefore);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

export default dayjs;