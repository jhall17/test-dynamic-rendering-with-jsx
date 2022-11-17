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

const storybookComponents = {
  Container,
  Child,
  AlternativeChild,
};

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

interface storybookComponentsType {
  [key: string]: (props: any) => ReactElement;
}

function App() {
  const mapJsonToReact = (json: jsonStructure) => {
    return Object.values(json).map((parent: itemStructure) => {
      const Component = (storybookComponents as storybookComponentsType)[parent.component];
      return (
        <Component {...parent?.props}>
          {parent.items && mapJsonToReact(parent.items)}
        </Component>
      );
    });
  };

  const OurCustomReactElement = mapJsonToReact(hardcodedJsonExample);
  console.log("element=", OurCustomReactElement);

  return <>{OurCustomReactElement};</>;
}

export default App;
