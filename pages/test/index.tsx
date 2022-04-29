import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/editor/index.js"),
  { ssr: false }
);

const Test = () => {
  return (
    <div>
      <DynamicComponentWithNoSSR />
    </div>
  );
};

export default Test;
