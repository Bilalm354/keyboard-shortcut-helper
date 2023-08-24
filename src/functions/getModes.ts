import * as vscode from 'vscode';

export function getModes() {
  const modeChecks = [
    {
      name: 'activeDebugSession',
      condition: () => !!vscode.debug.activeDebugSession,
    },
    {
      name: 'hasMultipleTabGroups',
      condition: () => vscode.window.visibleTextEditors.length > 1,
    },
    {
      name: 'activeEditor',
      condition: () => vscode.window.activeTextEditor !== undefined,
    },
    {
      name: 'activeTerminal',
      condition: () => vscode.window.activeTerminal !== undefined,
    },
    {
      name: 'hasOneOrMoreTerminals',
      condition: () => vscode.window.terminals.length > 0,
    },
    {
      name: 'isGitExtensionActive',
      condition: () => vscode.extensions.getExtension('vscode.git')?.isActive,
    }
  ];

  const activeModes = modeChecks.filter((modeCheck) => modeCheck.condition());

  if (activeModes.length > 0) {
    const modeNames = activeModes.map((mode) => mode.name);
    console.log({ [modeNames.join(', ')]: true });
    return modeNames;
  }

  return ['unknownMode'];
}
