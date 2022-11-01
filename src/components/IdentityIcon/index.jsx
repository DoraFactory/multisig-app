// Copyright 2017-2022 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import type { IdentityProps } from '@polkadot/react-identicon/types';
// import type { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';

import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

// import { getSystemIcon } from '@polkadot/apps-config';
// import { getSystemIcon } from '@polkadot/apps-config';
// import { ThemeProps } from '@polkadot/react-components/types';
// import { useApi } from '@polkadot/react-hooks';

// import { settings } from '@polkadot/ui-settings';
import RoboHash from './RoboHash';

import { useTranslation as useTranslationBase } from 'react-i18next';


function isCodec (value){
  return !!(value && (value).toHuman);
}

// export function getIdentityTheme (systemName, specName) {
//   return ((settings.icon === 'default' && getSystemIcon(systemName, specName)) || settings.icon);
// }



function useTranslation (){
  return useTranslationBase('apps');
}
const defaultState = {
  stqueue: [],
  txqueue: []
};

const StatusContext = React.createContext(defaultState);

function IdentityIcon ({className, prefix, size, value}) {
  // const { isEthereum, specName, systemName } = useApi();
  const { t } = useTranslation();
  const { queueAction } = useContext(StatusContext);
  // const thisTheme = theme || getIdentityTheme(systemName, specName);
  const Custom = RoboHash;

  const _onCopy = useCallback(
    (account) => queueAction({
      account,
      action: ('clipboard'),
      message: ('address copied'),
      status: 'queued'
    }),
    [queueAction, t]
  );

  return (
      <Custom
        className={className}
        publicKey={value}
        size={size}
      />
  );
}

export default React.memo(styled(IdentityIcon)(({ theme }) => `
  ${theme.theme === 'dark'
    ? `circle:first-child {
      fill: #282829;
    }`
    : ''}

  border: 1px solid ${theme.theme === 'dark' ? 'transparent' : '#ddd'};
  border-radius: 50%;
  display: inline-block;
  overflow: hidden;
`));
