import ReactDOM from "react-dom";
import { SpaceComponent } from "../../../src/components/spaces/SpaceComponent";
import { fireEvent } from "@testing-library/react";

describe("Space component test suite", () => {
  let container: HTMLDivElement;
  const reserveSpaceMock = jest.fn();

  function cleanUpTests() {
    document.body.removeChild(container);
    container.remove();
    jest.clearAllMocks();
  }

  function setUpTests(element: React.FunctionComponentElement<any>) {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(element, container);
  }

  describe("tests with photo URL", () => {
    beforeEach(() => {
      setUpTests(
        <SpaceComponent
          location={"someLocation"}
          name={"someName"}
          reserveSpace={reserveSpaceMock}
          spaceId={"123"}
          photoUrl={"some.url"}
        />
      );
    });

    test("show image correctly", () => {
      const image = container.querySelector("img");
      expect(image!).toBeInTheDocument();
      expect(image!.src).toBe("http://localhost/some.url");
    });

    test("show labels correctly", () => {
      const label = container.querySelectorAll("label");
      expect(label[0]).toHaveTextContent("someName");
      expect(label[1]).toHaveTextContent("123");
      expect(label[2]).toHaveTextContent("someLocation");
    });

    test("reserve spaces", () => {
      const button = container.querySelector("button");
      fireEvent.click(button!);
      expect(reserveSpaceMock).toBeCalledWith("123");
    });

    afterEach(() => {
      cleanUpTests();
    });
  });

  describe("tests without photo URL", () => {
    beforeEach(() => {
      setUpTests(
        <SpaceComponent
          location={"someLocation"}
          name={"someName"}
          reserveSpace={reserveSpaceMock}
          spaceId={"123"}
        />
      );
    });

    test("show image correctly", () => {
      const image = container.querySelector("img");
      expect(image!).toBeInTheDocument();
      expect(image!.src).toBeFalsy();
    });

    afterEach(() => {
      cleanUpTests();
    });
  });
});
