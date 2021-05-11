import { urlFriendly } from ".";

export function parentTime(topic, selectedTitle, parent) {
  let _time = null;
  if (urlFriendly(topic.title) === urlFriendly(selectedTitle)) {
    _time = parent.length / parent.agenda.length;
  }

  if (topic.agenda) {
    _time = topic.agenda
      .map((t) => parentTime(t, selectedTitle, topic))
      .filter((x) => x)[0];
  }

  return _time;
}
