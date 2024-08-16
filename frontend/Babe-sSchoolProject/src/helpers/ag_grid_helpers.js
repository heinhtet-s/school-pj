import { format, parseISO } from "date-fns";
import {
  getDifferenceInHourAndMin,
  getDifferenceInHourMinAndSec,
  getDifferenceInMinAndSec,
} from "./date_helpers";
import { formatMoney } from "./number_helper";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export const dateFormatter = (params) => {
  if (params && params.value) {
    const d = new Date(params.value);
    if (isNaN(d)) return "-";
    return format(d, "dd/MM/yyyy HH:mm");
  }
  return "-";
};

export const timeOnlyFormatter = (params) => {
  if (params && params.value) {
    const d = toZonedTime(params.value);
    if (isNaN(d)) return "-";
    return format(d, "hh:mm a");
  }
  return "-";
};

export const timeFormatterDetail = (params) => {
  if (params && params.value) {
    const dd = new Date(params.value);
    const formattedTime = format(dd, "h:mm a");
    return formattedTime;
    // const d = toZonedTime(params.value);
    // if (isNaN(d)) return "-";
    // return format(d, "hh:mm a");
  }
  return "-";
};

export const dateOnlyFormatter = (params) => {
  if (params && params.value) {
    const d = toZonedTime(params.value);
    if (isNaN(d)) return "-";
    return format(d, "dd/MM/yyyy");
  }
  return "-";
};

export const durationFormatter = (params) => {
  try {
    const duration = params.value;
    //return `${duration.totalSec}`;
    if (duration.hour >= 1) {
      return `${duration.hour}hour ${duration.min}min ${duration.sec}sec`;
    } else {
      return `${duration.min}min ${duration.sec}sec`;
    }
  } catch (err) {
    console.log(err);
  }
  return "-";
};

export const stringChangeFormatter = (params) => {
  if (params.value) {
    const d = String(params.value);
    return d;
  }

  return "0";
};

export const vehicleClassFormatter = (params) => {
  if (params.value) {
    const d = `Class ${params.value}`;
    return d;
  }

  return "0";
};

export const durationGetter = (params) => {
  console.log("In duration");
  try {
    if (params.data.entry_time) {
      if (params.data.exit_time) {
        const entry_at = new Date(params.data.entry_time);
        const exit_at = new Date(params.data.exit_time);
        const diff = getDifferenceInHourMinAndSec(entry_at, exit_at);
        return diff;
      } else {
        const entry_at = new Date(params.data.entry_time);
        const exit_at = new Date();
        const diff = getDifferenceInHourMinAndSec(entry_at, exit_at);
        return diff;
      }
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const entryOnlyDurationGetter = (params) => {
  console.log("In Entry Only");
  try {
    if (params.data.entry_time) {
      const entry_at = new Date(params.data.entry_time);
      const exit_at = new Date();
      const diff = getDifferenceInHourMinAndSec(entry_at, exit_at);
      return diff;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const durationComparator = (du1, du2) => {
  if (du1 === null && du2 === null) {
    return 0;
  }
  if (du1 === null) {
    return -1;
  }
  if (du2 === null) {
    return 1;
  }

  return du1.totalSec - du2.totalSec;
};

export const statusFormatter = (params) => {
  console.log(params);
  if (params.value) {
    return "ACTIVE";
  } else {
    return "INACTIVE";
  }
};

export const gridFormatMoney = (params) => {
  if (params && params.value) {
    let amount = formatMoney(params.value);
    return amount;
  }
  return "0";
};

export const thousandsSeparator = (params) => {
  if (params && params.value) {
    const d = params.value.toLocaleString();
    return d;
  }
  return "0";
};
