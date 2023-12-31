import * as vscode from 'vscode';
import { Shortcut, getWebviewContent } from './functions/getWebviewContent';

// there are more events - keep this in mind
const debugEvents = [
  vscode.debug.onDidStartDebugSession,
  vscode.debug.onDidChangeBreakpoints, 
  vscode.debug.onDidTerminateDebugSession,
  vscode.debug.onDidChangeActiveDebugSession,
  vscode.debug.onDidReceiveDebugSessionCustomEvent
];

const terminalEvents = [
  vscode.window.onDidOpenTerminal,
  vscode.window.onDidChangeActiveTerminal,
  vscode.window.onDidChangeTerminalState,
  vscode.window.onDidCloseTerminal
];

const tabGroupEvents = [
  vscode.window.tabGroups.onDidChangeTabGroups,
  vscode.window.tabGroups.onDidChangeTabs
];

const workspaceEvents = [
  vscode.workspace.onDidChangeConfiguration,
  vscode.workspace.onDidChangeTextDocument, 
  vscode.workspace.onDidChangeWorkspaceFolders,
  vscode.workspace.onDidCloseTextDocument,
  vscode.workspace.onDidCreateFiles,
  vscode.workspace.onDidDeleteFiles,
  vscode.workspace.onDidOpenTextDocument,
  vscode.workspace.onDidRenameFiles,
  vscode.workspace.onDidSaveTextDocument,
  vscode.workspace.onWillCreateFiles,
  vscode.workspace.onWillDeleteFiles,
  vscode.workspace.onWillRenameFiles,
  vscode.workspace.onWillSaveTextDocument,
  vscode.workspace.onDidChangeNotebookDocument,
  vscode.workspace.onDidCloseNotebookDocument
  // There are more
];

const eventsToRefreshWebviewFor = [
  vscode.window.onDidChangeTextEditorViewColumn,
  vscode.window.onDidChangeWindowState,
  vscode.window.onDidChangeActiveTextEditor,
  vscode.window.onDidChangeVisibleTextEditors,
  vscode.window.onDidChangeTextEditorSelection,
  ...workspaceEvents,
  ...terminalEvents,
  ...debugEvents,
  ...tabGroupEvents
];

export type Focus = 'editor' | 'terminal' | 'debug' | 'selection' | 'unknown';

export function activate(context: vscode.ExtensionContext) {
  const provider = new KeyboardShortcutViewProvider(context.extensionUri);

  // register provider for keyboard shortcuts view
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(KeyboardShortcutViewProvider.viewType, provider));

  vscode.window.onDidOpenTerminal(() => {
    provider.setFocus('terminal'); // it may not actually be in focus but if the person just opened it, it's probably what they're looking at
  });

  vscode.window.onDidChangeTerminalState((terminal) => {
    const { state } = terminal;
    const { isInteractedWith } = state;
    if (isInteractedWith) {
      provider.setFocus('terminal');
    } else {
      provider.setFocus('unknown');
    }
    vscode.commands.executeCommand('extension.onDidOpenTerminal', isInteractedWith); // rename onDidOpenTerminal to onDidChangeTerminalState or something
  });
  
  eventsToRefreshWebviewFor.forEach((event) => {
    event((event) => {
      if (event) {
        vscode.window.showInformationMessage(`event: ${JSON.stringify(event)}`);
      }
      provider.refreshWebviewAndUpdateState();
    });
  });

  vscode.workspace.onDidChangeTextDocument((_event) => {
    provider.setFocus('editor');
  });

  vscode.window.onDidChangeTextEditorSelection((_event) => {
    provider.setFocus('selection');
  });
}

class KeyboardShortcutViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = 'keyboardShortcutsView';

  private _view?: vscode.WebviewView;
  private focus: Focus = 'unknown';
  private pinnedShortcuts: Shortcut[] = [
    { description: 'Insert cursor above', keys: '⌥⌘↑' },
    { description: 'Insert cursor below', keys: '⌥⌘↓' }
  ];

  constructor(
		private readonly _extensionUri: vscode.Uri
  ) { }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [
        this._extensionUri
      ]
    };
    const focus = this.getFocus();
    webviewView.webview.html = getWebviewContent({ focus });

    webviewView.webview.onDidReceiveMessage(data => {
      console.log('onDidReceiveMessage', data);
    });
  }

  public refreshWebviewAndUpdateState() {
    if (this._view) {
      const focus = this.getFocus();
      this._view.webview.html = getWebviewContent({ focus, pinnedShortcuts: this.pinnedShortcuts });
    }
  }

  public setFocus(focus: Focus) {
    this.focus=focus;
  }

  public getFocus() {
    return this.focus;
  }
}

