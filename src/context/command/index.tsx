import { createContext, type FC, useMemo } from 'react';

import { type ICommand, TYPE_COMMAND } from './command.interface';

const allCommands = [
  TYPE_COMMAND.CREATESESSION,
  TYPE_COMMAND.ENDSESSION,
  TYPE_COMMAND.OPENSHUTTER,
  TYPE_COMMAND.CLOSESHUTTER,
  TYPE_COMMAND.WITHDRAW,
  TYPE_COMMAND.CHECK,
  TYPE_COMMAND.COUNT,
  TYPE_COMMAND.PREPAREDEPOSIT,
  TYPE_COMMAND.DEPOSIT,
  TYPE_COMMAND.CANCELDEPOSIT,
  TYPE_COMMAND.THERMALPRINT,
  TYPE_COMMAND.VTMINFO,
  TYPE_COMMAND.TURN_IN_LED,
  TYPE_COMMAND.VIDEOCALL,
  TYPE_COMMAND.SCANNER,
  TYPE_COMMAND.LASERPRINT,
  TYPE_COMMAND.UPSRC_COMMAND,
  TYPE_COMMAND.FINGERPRINT,
];

const initialCommandContext: ICommand = {
  typeCommand: TYPE_COMMAND.CREATESESSION,
};

export const CommandContext = createContext<ICommand>(initialCommandContext);

export const CommandContextProvider: FC = ({ children }) => {
  const commandContextValue = useMemo(
    () => ({
      typeCommand: TYPE_COMMAND.CREATESESSION,
      commandTypes: allCommands,
    }),
    [],
  );

  return <CommandContext.Provider value={commandContextValue}>{children}</CommandContext.Provider>;
};
