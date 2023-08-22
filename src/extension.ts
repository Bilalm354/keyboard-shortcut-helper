import * as vscode from 'vscode';
import { getWebviewContent } from './functions/getWebviewContent';

export function activate(context: vscode.ExtensionContext) {

	const provider = new KeyboardShortcutViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(KeyboardShortcutViewProvider.viewType, provider));
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
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}