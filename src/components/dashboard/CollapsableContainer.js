import React, {useState} from 'react';

/* function ChildComponent(props) {
  return(
    <div>
      {props.children}
    </div>
  );
} */

function CollapsableContainer(props){

  const [isCollapse, setCollapse] = useState(false);
  const collapseButton = () => {
    setCollapse(!isCollapse);
  };

  const propschildren = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      isCollapse,
      toggleCollapse: collapseButton  
    });
  });
  return(
    <div>
      {propschildren}
    </div>
  );

}

export default CollapsableContainer;