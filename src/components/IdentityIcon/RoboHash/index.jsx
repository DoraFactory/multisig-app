import React, { useMemo } from 'react';
import styled from 'styled-components';

import { blake2AsU8a } from '@polkadot/util-crypto';

import backgrounds from './backgrounds';
import sets from './sets';

function getIndex(list, hash) {
  let value = 0;

  // grab 48 bits worth of data (last increment before max int)
  // (6 also doesn't divide into 32, so we have a rolling window)
  for (let i = 0; i < 6; i++) {
    value = (value * 256) + hash.hash[hash.index];
    hash.index++;

    if (hash.index === 32) {
      hash.index = 0;
    }
  }

  return list[value % list.length];
}

function createInfo (value) {
  const hash = {
    hash: blake2AsU8a(value),
    index: 0
  };
  const result = [getIndex(backgrounds, hash)];

  getIndex(sets, hash).forEach((section) => {
    result.push(getIndex(section, hash));
  });

  return result;
}

function RoboHash ({className, publicKey, size}) {
  const info = useMemo(
    () => createInfo(publicKey),
    [publicKey]
  );
  const style = useMemo(
    () => ({ height: `${size}px`, width: `${size}px` }),
    [size]
  );
  return (
    <div
      className={className}
      style={style}
    >
      {info.map((src, index) =>
        <img
          key={index}
          src={src}
        />
      )}
    </div>
  );
}

export default React.memo(styled(RoboHash)`
  background: var(--bg-page);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  img {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    &:first-child {
      opacity: 0.35;
    }
  }
`);