import { Toolbar } from "@/components/toolbar";
import { ExcursionDocument } from "@/components/excursion-document";
import { useDesignSystem } from "@/hooks/use-design-system";

function App() {
  const [design, setDesign] = useDesignSystem();

  return (
    <>
      <Toolbar design={design} onDesignChange={setDesign} />
      <ExcursionDocument />
    </>
  );
}

export default App;
