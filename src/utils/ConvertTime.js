import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale";

const ConvertTime = time => {
    return formatDistanceToNowStrict(new Date(time), {
      locale: vi,
      addSuffix: true,
    });
  };
  export default ConvertTime;