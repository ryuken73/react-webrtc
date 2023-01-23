import React from 'react';

export default function useVideoPlayer(mediaElementRef, src) {
  const handleLoadedMetadata = React.useCallback(
    (event) => {
      console.log(
        'in usePlayerSource: loadedMetadata',
        mediaElementRef.current.duration
      );
      if (!isNaN(mediaElementRef.current.duration)) {
        const durationSec = parseInt(mediaElementRef.current.duration, 10);
        console.log(
          `in usePlayerSource : durationSec: ${durationSec}`
        );
        const isLive = durationSec === 0;
        if (isLive) {
          mediaElementRef.current.play();
        }
      }
    },
    [mediaElementRef]
  );

  const handleCanPlay = React.useCallback(() => {
    console.log('can play')
  }, []);

  React.useEffect(() => {
    console.log('### src changed!:', src, mediaElementRef.current);
    // fast return if src not ready or mediaElement is null
    if (src === '') {
      return;
    }
    if (mediaElementRef === undefined || mediaElementRef.current === null) {
      return;
    }
    //
    console.log(
      '!! attach loadedmetadata event handler to media element(not hls) and set media source'
    );
    mediaElementRef.current.src = null;
    mediaElementRef.current.addEventListener(
      'loadedmetadata',
      handleLoadedMetadata
    );
    mediaElementRef.current.addEventListener('canplaythrough', handleCanPlay);
    mediaElementRef.current.src = src;

    return () => {
      console.log(
        'src change. usePlayerSource umount:',
        mediaElementRef.current
      );
      if (mediaElementRef.current) {
        mediaElementRef.current.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
        mediaElementRef.current.removeEventListener(
          'canplaythrough',
          handleCanPlay
        );
      }
    };
  }, [mediaElementRef, handleLoadedMetadata, handleCanPlay, src]);

  return { };
}
