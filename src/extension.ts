import * as vscode from 'vscode';
import { getWebviewContent } from './functions/getWebviewContent';

export function activate(context: vscode.ExtensionContext) {

  const provider = new KeyboardShortcutViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(KeyboardShortcutViewProvider.viewType, provider));

  // Register a command to refresh the webview
  context.subscriptions.push(vscode.commands.registerCommand('extension.refreshWebview', () => {
    provider.refreshWebview(); // Call a method to refresh the webview
  }));

  const eventsToRefreshWebviewFor = [
    vscode.window.onDidChangeActiveTextEditor,
    vscode.debug.onDidChangeActiveDebugSession,
    vscode.window.onDidChangeVisibleTextEditors,
    vscode.window.onDidOpenTerminal,
    vscode.workspace.onDidChangeTextDocument, // Editor content changes
    vscode.window.onDidChangeTextEditorSelection, // Editor selection changes
    vscode.workspace.onDidChangeWorkspaceFolders, // Workspace folder changes
    vscode.window.onDidChangeActiveTerminal, // Active terminal changes
    // Debug ones below could be used to change mode - would then need to implement a function to set mode instead getting mode the current way	
    vscode.debug.onDidStartDebugSession, // Debug session starts
    vscode.debug.onDidChangeBreakpoints, // Breakpoints change
    vscode.debug.onDidTerminateDebugSession, // Debug session terminates
  ];
  
  
  // Register the event handlers
  eventsToRefreshWebviewFor.forEach((event) => {
    event(() => {
      executeCommandRefreshWebview();
    });
  });
  
  // Initial call to refresh the webview
  executeCommandRefreshWebview();
}

class KeyboardShortcutViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = 'keyboardShortcutsView';

  private _view?: vscode.WebviewView;

  constructor(
		private readonly _extensionUri: vscode.Uri,
  ) { }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    vscode.window.showInformationMessage('resolveWebviewView');

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
      this._view.webview.html = getWebviewContent(); // Replace with your updated content
    }
  }
}

function executeCommandRefreshWebview() {
  // Emit a custom event to indicate the mode change
  vscode.commands.executeCommand('extension.refreshWebview');
}