import { Timer } from ".";

export function TimeDisplay({ time, size = 12, ...props }) {
  if (time >= 60) {
    let h = Math.floor(time / 60);
    let m = time % 60;
    const message = `${h} hour${h > 1 ? "s" : ""} ${
      m > 0 ? `${m} minutes` : ""
    }`;

    return (
      <>
        <Timer size={size} />
        {message}
      </>
    );
  }

  if (time) {
    return (
      <>
        <Timer size={size} {...props} />
        <span>{time} minutes</span>
      </>
    );
  }

  return null;
}
