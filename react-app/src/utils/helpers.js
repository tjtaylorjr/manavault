// async custom hooks

const { useEffect } = require("react")

export const useAsync = (asyncFn, onSuccess) => {
  useEffect(() => {
    let isMounted = true;
    asyncFn().then(data => {
      if (isMounted) onSuccess(data);
    });
    return () => { isMounted = false };
  }, [asyncFn, onSuccess]);
}


export const convertTimeStamp = (timestamp) => {
  const localTimeStamp = new Date(timestamp).toString()
  const postDate = localTimeStamp.slice(0, 3) + ", " + localTimeStamp.slice(4, 15);
  const postTime = (() => {
    let time = localTimeStamp.slice(16, 24);

    time = time.split(':');

    const hours = Number(time[0]);
    const minutes = Number(time[1]);
    // const seconds = Number(time[2]);

    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours === 0) {
      timeValue = "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    // timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;
    timeValue += (hours >= 12) ? " PM" : " AM";

    return timeValue;
  })()

  return "on " + postDate + " at " + postTime;
}
