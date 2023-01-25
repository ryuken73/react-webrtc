import './App.css';
import React from 'react';
import styled from 'styled-components';
import SelectMediaDevices from './SelectMediaDevices';
import useVideoPlayer from './hooks/useVideoPlayer';

const CustomVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const SelectContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  background: black;
  color: white;
  opacity: 0.5;
  
`

function App() {
  const playerRef = React.useRef(null);
  // useVideoPlayer(playerRef, '')
  return (
    <div className="App">
      <CustomVideo autoPlay ref={playerRef}></CustomVideo>
      <SelectContainer>
        <SelectMediaDevices player={playerRef}></SelectMediaDevices>
      </SelectContainer>
    </div>
  );
}

export default App;
