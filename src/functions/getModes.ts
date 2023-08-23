import * as vscode from 'vscode';

export function getModes() {
  const modeChecks = [
    {
      name: 'isDebugging',
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
      name: 'hasTerminalOpen',
      condition: () => vscode.window.terminals.length > 0,
    },
    {
      name: 'isGitExtensionActive',
      condition: () => vscode.extensions.getExtension('vscode.git')?.isActive,
    },
    {
      name: 'isTaskRunning',
      condition: () => vscode.tasks.taskExecutions.length > 0,
    },
  ];

  const activeModes = modeChecks.filter((modeCheck) => modeCheck.condition());

  if (activeModes.length > 0) {
    const modeNames = activeModes.map((mode) => mode.name);
    console.log({ [modeNames.join(', ')]: true });
    return modeNames;
  }

  return ['unknownMode'];
}
