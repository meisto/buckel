// author: meisto
// date: 2025-02-02 15:05:46

export function info(msg: string) {
  console.info(
    "%c INFO ",
    "background-color: gray; font-weight: bold; color: black",
    msg,
  );
}

export function warn(msg: string) {
  console.warn(
    "%c WARN ",
    "background-color: yellow; color: black; font-weight: bold;",
    msg,
  );
}

export function error(msg: string) {
  console.error("%c ERROR " + msg, "background-color: red");
}
