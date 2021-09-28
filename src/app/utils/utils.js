//function utilities

const pluralize = (num, noun) => {
  if (num === "1") {
    if (noun === "hour") {
      return "an hour ago";
    }
    return `1 ${noun} ago`;
  }
  return `${num} ${noun}s ago`;
};

const monthMatch = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const utils = {
  relativeCount: (num) => {
    let units = ["K", "M", "B"];
    let converted = num;
    let count = 0;
    while (num >= 1000) {
      num = Math.floor(num / 1000);
      converted = Math.floor(num).toString() + units[count].toString();
      count += 1;
    }
    return converted;
  },

  getDuration: (duration) => {
    let formatedDuration = "";
    for (let i = 2; i < duration.length - 1; i++) {
      formatedDuration += /\d/g.test(duration[i]) ? duration[i] : ":";
    }

    formatedDuration = formatedDuration
      .split(":")
      .map((num, i, arr) =>
        i + 1 === arr.length ? ("0" + num).slice(-2) : num
      )
      .join(":");

    if (formatedDuration.length === 2) {
      formatedDuration = "0:" + formatedDuration;
    }
    return formatedDuration == "0" ? "LIVE" : formatedDuration;
  },

  getRelativeDateCreated: (val) => {
    val = new Date(val).getTime() / 1000;

    let sec = Date.now() / 1000 - val;
    if (sec < 60) {
      return pluralize(Math.floor(sec).toString(), "second");
    } else if (sec < 3600) {
      return pluralize(Math.floor(sec / 60).toString(), "minute");
    } else if (sec < 86400) {
      return pluralize(Math.floor(sec / 3600).toString(), "hour");
    } else if (sec < 604800) {
      return pluralize(Math.floor(sec / 86400).toString(), "day");
    } else if (sec < 2419200) {
      return pluralize(Math.floor(sec / 604800).toString(), "week");
    } else if (sec < 31536000) {
      return pluralize(Math.floor(sec / 2419200).toString(), "month");
    } else {
      return pluralize(Math.floor(sec / 31536000).toString(), "year");
    }
  },

  truncate: (text, num) => {
    return text.length > num ? text.substring(0, num) + "..." : text;
  },

  addComma: (num) => {
    return new Intl.NumberFormat("en-US").format(parseInt(num));
  },

  formatDateCreated: (date) => {
    date = date.split("-");
    let newDate = [date[2].substring(0, 2), monthMatch[date[1]], date[0]];

    return newDate.join(" ");
  },

  setCookie: (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },

  getCookie: (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },

  cookieExists: (name) => {
    let user = utils.getCookie(name);
    return user != "";
  },
};

export default utils;
