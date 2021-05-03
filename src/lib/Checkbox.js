import Check from "react-simple-checkbox";
import { fonts, colors } from "../theme";
import styled from "styled-components";

export function Checkbox({
  checked = false,
  checkedLabel = "selected",
  uncheckedLabel = "not selected",
  checkedColor = colors.beginner,
  uncheckedColor = colors.bland,
  icon,
  onChange = (f) => f,
  ...props
}) {
  return (
    <Container>
      <Check
        className="checkbox"
        color={checked ? checkedColor : uncheckedColor}
        size={3}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {icon}
      <Label
        checked={checked}
        checkedColor={checkedColor}
        uncheckedColor={uncheckedColor}
        {...props}
      >
        {checked ? checkedLabel : uncheckedLabel}
      </Label>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  .checkbox {
    position: relative;
    top: 0;
    margin-right: 8px;
  }
`;

const Label = styled.span`
  font-family: ${fonts.subtitle};
  font-size: 1.2em;
  color: ${(props) =>
    props.checked ? props.checkedColor : props.uncheckedColor};
  margin-left: 8px;
`;
