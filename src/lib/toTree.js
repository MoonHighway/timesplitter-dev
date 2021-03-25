export function toTree(o) {
  if (o.agenda) {
    const { agenda, ...fields } = o;
    return {
      ...fields,
      children: agenda.map(toTree),
    };
  }
  return o;
}
