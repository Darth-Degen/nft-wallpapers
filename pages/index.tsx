import {
  PageLayout,
  StepContainer,
  Dropdown,
  NumberInput,
  DownloadView,
} from "@components";
import { collections } from "@constants";
import { Collection } from "@types";
import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
// import axios from "axios";

interface Steps {
  previous: number;
  current: number;
}
interface Labels {
  step: number;
  label: string;
}

const Home: NextPage = () => {
  const [steps, setSteps] = useState<Steps>({ previous: 0, current: 1 });
  const [didMount, setDidMount] = useState<boolean>(false);
  const [stepHover, setStepHover] = useState<number>(0);
  const [selected, setSelected] = useState<Collection>();
  const [tokenId, setTokenId] = useState<number>(0);
  const [collections, setCollections] = useState<Collection[]>();

  const [labels, setLabels] = useState<Labels[]>([
    { step: 1, label: "Select a Collection" },
    { step: 2, label: "" },
    { step: 3, label: "" },
  ]);

  const increment = (step: number): void => {
    if (step < steps.current || step === steps.current) return;
    setSteps((prevState) => ({
      previous: prevState.current,
      current: step,
    }));
  };

  const setCollection = (collection: Collection): void => {
    setLabels((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.step === 1) return { ...obj, label: collection.name };
        return obj;
      });
      return newState;
    });
    setStepHover(0);
    setSelected(collection);
    increment(2);
  };

  const enterId = (number: number): void => {
    setTokenId(number);
    if (number > 0) increment(3);
  };

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (tokenId < 1 || !selected?.url) return;
  }, [tokenId, selected]);

  // const getCollections = useCallback(async () => {
  //   const response = await axios.get("http://localhost:8000/api/collections");
  //   console.log("response.data ", response);
  //   setCollections(response.data);
  // }, []);

  // useEffect(() => {
  //   getCollections();
  // }, [getCollections]);

  return (
    <PageLayout>
      {didMount && (
        <>
          {/* step 1 - select collection */}
          <StepContainer
            step={1}
            current={steps.current}
            previous={steps.previous}
            zIndex={stepHover === 1 ? "z-50" : undefined}
          >
            <Dropdown
              handleClick={setCollection}
              handleHover={setStepHover}
              show={stepHover === 1}
              label={labels[0].label}
              collections={collections}
            />
          </StepContainer>
          {/* step 2 - enter id */}
          <StepContainer
            step={2}
            current={steps.current}
            previous={steps.previous}
          >
            {selected?.supply && (
              <NumberInput supply={selected?.supply} handleInput={enterId} />
            )}
          </StepContainer>
          {/* step 3 - download image */}
          <StepContainer
            step={3}
            current={steps.current}
            previous={steps.previous}
          >
            {selected && (
              <DownloadView collection={selected} tokenId={tokenId} />
            )}
          </StepContainer>
        </>
      )}
    </PageLayout>
  );
};

export default Home;
