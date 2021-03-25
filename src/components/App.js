import Page from "./Page";
import Menu from "./Menu";
import { TimeDisplay, totalTime } from "../lib";
import { useTreeContent } from "../hooks";

export default function App() {
  const { title, children, data, setTree } = useTreeContent();
  if (data) {
    return (
      <Page>
        <h1>{title}</h1>
        <p>
          <TimeDisplay size={25} time={totalTime({ children })} />
        </p>
        <Menu data={data} onChange={setTree} />
      </Page>
    );
  }

  return null;
}
