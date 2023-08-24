import * as vscode from 'vscode';
import { getWebviewContent } from './functions/getWebviewContent';

export type Focus = 'editor' | 'terminal' | 'debug' | 'unknown';

export function activate(context: vscode.ExtensionContext) {
  const provider = new KeyboardShortcutViewProvider(context.extensionUri);

  // register provider for keyboard shortcuts view
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(KeyboardShortcutViewProvider.viewType, provider));

  // register commands
  context.subscriptions.push(vscode.commands.registerCommand('extension.refreshWebview', () => {
    provider.refreshWebview(); // Call a method to refresh the webview
  }));
  context.subscriptions.push(vscode.commands.registerCommand('extension.onDidOpenTerminal', (isInteractedWith) => {
    provider.setFocus('terminal');
    vscode.window.showInformationMessage('onDidOpenTerminal');
    vscode.window.showInformationMessage(`isInteractedWith: ${isInteractedWith}`);
  }));
  context.subscriptions.push(vscode.commands.registerCommand('extension.onDidChangeTextDocument', () => {
    provider.setFocus('editor');
    vscode.window.showInformationMessage('onDidChangeTextDocument');
    vscode.window.showInformationMessage('Show text editing shortcuts');
  }));


  const eventsToRefreshWebviewFor = [
    vscode.window.onDidChangeActiveTextEditor,
    vscode.debug.onDidChangeActiveDebugSession,
    vscode.window.onDidChangeVisibleTextEditors,
    vscode.window.onDidOpenTerminal,
    vscode.workspace.onDidChangeTextDocument, 
    vscode.window.onDidChangeTextEditorSelection,
    vscode.workspace.onDidChangeWorkspaceFolders, 
    vscode.window.onDidChangeActiveTerminal,
    // Debug ones below could be used to change mode - would then need to implement a function to set mode instead getting mode the current way	
    vscode.debug.onDidStartDebugSession,
    vscode.debug.onDidChangeBreakpoints, 
    vscode.debug.onDidTerminateDebugSession,
  ];
  
  
  // Register the event handlers
  eventsToRefreshWebviewFor.forEach((event) => {
    event(() => {
      vscode.commands.executeCommand('extension.refreshWebview');
      
    });
  });

  vscode.window.onDidOpenTerminal((terminal) => {
    const {state} = terminal;
    const {isInteractedWith} = state;
    vscode.commands.executeCommand('extension.onDidOpenTerminal', isInteractedWith);
  });

  vscode.workspace.onDidChangeTextDocument((_event) => {
    vscode.commands.executeCommand('extension.onDidChangeTextDocument');
  });
  
  // Initial call to refresh the webview
  vscode.commands.executeCommand('extension.refreshWebview');
}

class KeyboardShortcutViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = 'keyboardShortcutsView';

  private _view?: vscode.WebviewView;
  private focus: Focus = 'unknown';

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
    vscode.window.showInformationMessage('refreshWebview');
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

