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

  // Listen for mode change events
  vscode.window.onDidChangeActiveTextEditor(() => {
    executeCommandRefreshWebview();
  });

  vscode.debug.onDidChangeActiveDebugSession(() => {
    executeCommandRefreshWebview();
  });

  vscode.window.onDidChangeVisibleTextEditors(() => {
    executeCommandRefreshWebview();
  });

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