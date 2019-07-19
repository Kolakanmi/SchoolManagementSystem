import React from 'react';

function HelloWorld(props) {
  var letterStyle = {
    border: "2px solid blue"
  };
  return(
    <div style = {{...letterStyle, backgroundColor: "teal", color: "white", margin: "0px"}}>
        Kola
    </div>
  );
}

export default HelloWorld;