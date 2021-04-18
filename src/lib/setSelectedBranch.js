export const isExpanded = t => t.expanded;
export const setSelectedBranch = selectedTitle => topic => {
  let _topic = topic;
  if (topic.title === selectedTitle) {
    _topic = {
      ..._topic,
      expanded: true
    }
  }
  if (_topic.children) {
    const children = _topic.children.map(setSelectedBranch(selectedTitle));
    _topic = {
      ..._topic,
      children,
      expanded: _topic.expanded || children.some(isExpanded)
    }
  }
  return _topic;
}

