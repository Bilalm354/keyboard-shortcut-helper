import * as vscode from 'vscode';
import { getWebviewContent } from './functions/getWebviewContent';

// there are more event - keep this in mind
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

const eventsToRefreshWebviewFor = [
  vscode.window.onDidChangeWindowState,
  vscode.window.onDidChangeActiveTextEditor,
  vscode.window.onDidChangeVisibleTextEditors,
  vscode.window.onDidChangeTextEditorSelection,
  vscode.workspace.onDidChangeTextDocument, 
  vscode.workspace.onDidChangeWorkspaceFolders, 
  ...debugEvents,
  ...terminalEvents
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
      provider.refreshWebview();
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

  constructor(
		private readonly _extensionUri: vscode.Uri
  ) { }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    console.log('resolveWebviewView');

    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [
        this._extensionUri
      ]
    };

    webviewView.webview.html = getWebviewContent();

    webviewView.webview.onDidReceiveMessage(data => {
      console.log('onDidReceiveMessage', data);
    });
  }

  public refreshWebview() {
    if (this._view) {
      const focus = this.getFocus();
      console.log('focus', focus);
      this._view.webview.html = getWebviewContent(focus);
    }
  }

  public setFocus(focus: Focus) {
    this.focus=focus;
  }

  public getFocus() {
    return this.focus;
  }
}

