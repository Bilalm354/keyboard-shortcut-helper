import { defaultMacShortcuts } from '../data/defaultShortcut';
import { Focus } from '../extension';
import { getModes } from './getModes';
import * as vscode from 'vscode';

// comments below show for which focuses the section is shown -- remove them when implementing
export type SectionTags =
  | 'General' // always
  | 'Basic Editing' // editor
  | 'Multi-Cursor and Selection' // editor
  | 'Search and Replace' // editor
  | 'Rich Languages Editing' // editor
  | 'Navigation' // always
  | 'Editor Management' // editor group
  | 'File Management' // after file changes for a few seconds // when focus is on file explorer
  | 'Display' // always
  | 'Debug' // debug
  | 'Integrated Terminal'; // terminal


export type Shortcut = {
  description: string;
  keys: string;
};

export function mapFocusToSections(focus: Focus): SectionTags[] {
  switch (focus) {
  case 'editor':
    return ['General', 'Basic Editing', 'Multi-Cursor and Selection', 'Search and Replace', 'Rich Languages Editing', 'Navigation', 'Editor Management', 'File Management', 'Display'];
  case 'terminal':
    return ['Integrated Terminal'];
  case 'debug':
    return ['Debug'];
  case 'selection':
    return ['Multi-Cursor and Selection'];
  default:
    return Object.keys(defaultMacShortcuts) as SectionTags[];
  }
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function handlePlusClick() {
  vscode.window.showInformationMessage('aaa');
}

function generateShortcutRowsHtml(shortcuts: Shortcut[]) {
  return shortcuts.map((shortcut) => `
    <tr>
      <td>${shortcut.description}</td>
      <td>${shortcut.keys}</td>
      <td><span class="plus-button" onclick="handlePlusClick()">+</span></td>
    </tr>
  `).join('');
}

function generateShortcutTableHtml(title: string, shortcuts: Shortcut[]) {
  const shortcutRows = generateShortcutRowsHtml(shortcuts);

  return `
    <h2>${title}</h2>
    <table border="1">
      ${shortcutRows}
    </table>
  `;
}

export function generateSectionsHtml(focus?: Focus) {
  const focusedSectionTags: SectionTags[] = focus ? mapFocusToSections(focus) : Object.keys(defaultMacShortcuts) as SectionTags[];
  if (vscode.window.tabGroups.all.length > 1) { focusedSectionTags.unshift('Editor Management'); }
  const focusedSectionsSet = new Set(focusedSectionTags);
  const sectionsHtml = [...focusedSectionsSet].map((title) => generateShortcutTableHtml(title, defaultMacShortcuts[title])).join('');

  return sectionsHtml;
}

export function getWebviewContent({ focus, pinnedShortcuts }: {focus?: Focus, pinnedShortcuts?: Shortcut[]}) {
  const modes = getModes();
  const numberOfTabGroups = vscode.window.tabGroups.all.length;
  const pinnedShortcutsHtml = pinnedShortcuts ? generateShortcutTableHtml('Pinned Shortcuts', pinnedShortcuts) : '';
  const sectionsHtml = generateSectionsHtml(focus);

  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>VSCode Keyboard Shortcuts</title>
		  <style>
            /* Add your custom styles here */
            table {
              width: 100%;
              border-collapse: collapse;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
            td {
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <h1>VSCode Keyboard Shortcuts</h1>
          <h2>Focus: ${focus}</h2>
          <h2>Number of Tab Groups: ${numberOfTabGroups}</h2>
          ${pinnedShortcutsHtml}
          ${sectionsHtml}
          Modes: ${modes.join(', ')}
        </body>
      </html>
    `;
}
