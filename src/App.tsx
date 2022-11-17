import "./App.css";
import React, { Component, ReactElement } from "react";

interface ContainerProps {
  children?: React.ReactNode[];
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div>
      <h1>Container</h1>
      {children}
    </div>
  );
};

interface ChildProps {
  text: string;
}

const Child = ({ text }: ChildProps) => {
  return (
    <div>
      <h4>Child</h4>
      <p>{text}</p>
    </div>
  );
};

const AlternativeChild = ({ text }: ChildProps) => {
  return (
    <div>
      <h4>AlternativeChild</h4>
      <p>{text}</p>
    </div>
  );
};

const storybookComponents: storybookComponentsType = {
  Container,
  Child,
  AlternativeChild,
};

interface storybookComponentsType {
  [key: string]: (props: any) => ReactElement;
}

const hardcodedJsonExample = {
  testContainer: {
    name: "Status",
    component: "Container",
    items: {
      first_child: {
        name: "first_child",
        component: "Child",
        props: {
          text: "Classic Rock",
        },
      },
      second_child: {
        name: "second_child",
        component: "Child",
        props: {
          text: "Classical",
        },
      },
      third_child: {
        name: "third_child",
        component: "Child",
        props: {
          text: "Country",
        },
      },
      fourth_child: {
        name: "fourth_child",
        component: "AlternativeChild",
        props: {
          text: "Punk Rock",
        },
      },
      fifth_child: {
        name: "fifth_child",
        component: "AlternativeChild",
        props: {
          text: "Rap",
        },
      },
    },
  },
};

interface itemStructure {
  name: string;
  component: string;
  props?: any;
  items?: jsonStructure;
}

interface jsonStructure {
  [key: string]: itemStructure;
}

function App() {
  const mapJsonToReactJsx = (json: jsonStructure): JSX.Element[] => {
    return Object.values(json).map((parent: itemStructure) => {
      const Component = storybookComponents[parent.component];

      return (
        <Component {...parent?.props}>
          {parent.items && mapJsonToReactJsx(parent.items)}
        </Component>
      );
    });
  };

  const mapJsonToReactCreateElement = (json: jsonStructure): JSX.Element[] => {
    return Object.values(json).map((parent: itemStructure) => {
      const Component = storybookComponents[parent.component];
      
      return React.createElement(
        Component,
        parent?.props,
        parent.items && mapJsonToReactCreateElement(parent.items)
      );
    });
  };

  const mappedViaJsx = mapJsonToReactJsx(hardcodedJsonExample);
  const mappedViaCreateElement =
    mapJsonToReactCreateElement(hardcodedJsonExample);

  return (
    <>
      <h1>mappedViaJsx</h1>
      {mappedViaJsx}
      <h1>mappedViaCreateElement</h1>
      {mappedViaCreateElement}
    </>
  );
}

export default App;
