import {useState} from 'react';

function useCollapseState(){
  const [isCollapse, setCollapse] = useState(false);
  const [isClosed, setClosed] = useState(false);
  const collapseButton = () => {
    return setCollapse(!isCollapse);
  };
  const closeButton = () => {
    return setClosed(!isClosed);
  };

  const collapsableStyle = {
    display: isCollapse ? 'none': 'block'
  };

  const closeStyle = {
    display: isClosed ? 'none': 'block'
  };

  return [isCollapse, collapseButton, isClosed, closeButton, collapsableStyle, closeStyle];
}

export default useCollapseState;