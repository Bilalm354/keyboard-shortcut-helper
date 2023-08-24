import { Focus } from '../extension';
import { getModes } from './getModes';

type Shortcut = {
  description: string;
  keys: string;
};

type Sections = Record<string, Shortcut[]>;

const sections: Sections = {
  'General': [
    { description: 'Show Command Palette', keys: '⇧⌘P, F1' },
    { description: 'Quick Open, Go to File…', keys: '⌘P' },
    { description: 'New window/instance', keys: '⇧⌘N' },
    { description: 'Close window/instance', keys: '⌘W' },
    { description: 'User Settings', keys: '⌘,' },
    { description: 'Keyboard Shortcuts', keys: '⌘K ⌘S' }
  ],
  'Basic Editing': [
    { description: 'Cut line (empty selection)', keys: '⌘X' },
    { description: 'Copy line (empty selection)', keys: '⌘C' },
    { description: 'Move line down/up', keys: '⌥↓ / ⌥↑' },
    { description: 'Copy line down/up', keys: '⇧⌥↓ / ⇧⌥↑' }
    // ... other shortcuts in this section ...
  ],
  'Multi-Cursor and Selection': [
    { description: 'Insert cursor', keys: '⌥ + click' },
    { description: 'Insert cursor above', keys: '⌥⌘↑' },
    { description: 'Insert cursor below', keys: '⌥⌘↓' },
    { description: 'Undo last cursor operation', keys: '⌘U' }
    // ... other shortcuts in this section ...
  ],
  'Search and Replace': [
    { description: 'Find', keys: '⌘F' },
    { description: 'Replace', keys: '⌥⌘F' },
    { description: 'Find next/previous', keys: '⌘G / ⇧⌘G' },
    { description: 'Select all occurrences of Find match', keys: '⌥Enter' }
    // ... other shortcuts in this section ...
  ],
  'Rich Languages Editing': [
    { description: 'Trigger suggestion', keys: '⌃Space, ⌘I' },
    { description: 'Trigger parameter hints', keys: '⇧⌘Space' },
    { description: 'Format document', keys: '⇧⌥F' },
    { description: 'Format selection', keys: '⌘K ⌘F' }
    // ... other shortcuts in this section ...
  ],
  'Navigation': [
    { description: 'Show all Symbols', keys: '⌘T' },
    { description: 'Go to Line...', keys: '⌃G' },
    { description: 'Go to File...', keys: '⌘P' },
    { description: 'Go to Symbol...', keys: '⇧⌘O' }
    // ... other shortcuts in this section ...
  ],
  'Editor Management': [
    { description: 'Close editor', keys: '⌘W' },
    { description: 'Close folder', keys: '⌘K F' },
    { description: 'Split editor', keys: '⌘\\' },
    { description: 'Focus into 1st, 2nd, 3rd editor group', keys: '⌘1 / ⌘2 / ⌘3' }
    // ... other shortcuts in this section ...
  ],
  'File Management': [
    { description: 'New File', keys: '⌘N' },
    { description: 'Open File...', keys: '⌘O' },
    { description: 'Save', keys: '⌘S' },
    { description: 'Save As...', keys: '⇧⌘S' }
    // ... other shortcuts in this section ...
  ],
  'Display': [
    { description: 'Toggle full screen', keys: '⌃⌘F' },
    { description: 'Toggle editor layout (horizontal/vertical)', keys: '⌥⌘0' },
    { description: 'Zoom in/out', keys: '⌘= / ⇧⌘-' },
    { description: 'Toggle Sidebar visibility', keys: '⌘B' }
    // ... other shortcuts in this section ...
  ],
  'Debug': [
    { description: 'Toggle breakpoint', keys: 'F9' },
    { description: 'Start/Continue', keys: 'F5' },
    { description: 'Step into/out', keys: 'F11 / ⇧F11' },
    { description: 'Step over', keys: 'F10' }
    // ... other shortcuts in this section ...
  ],
  'Integrated Terminal': [
    { description: 'Show integrated terminal', keys: '⌃`' },
    { description: 'Create new terminal', keys: '⌃⇧`' },
    { description: 'Copy selection', keys: '⌘C' },
    { description: 'Scroll up/down', keys: '⌘↑ / ↓' }
    // ... other shortcuts in this section ...
  ]
};

export function mapFocusToSections(focus: Focus) {
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
    return Object.keys(sections);
  }
}


export function generateSectionsHtml(focus?: Focus) {
  const focusedSections = focus ? mapFocusToSections(focus) : Object.keys(sections);
  
  const sectionsHtml = focusedSections.map((title) => {
    const shortcuts = sections[title];
    const shortcutRows = shortcuts.map((shortcut) => `
      <tr>
        <td>${shortcut.description}</td>
        <td>${shortcut.keys}</td>
      </tr>
    `).join('');

    return `
      <h2>${title}</h2>
      <table border="1">
        ${shortcutRows}
      </table>
    `;
  }).join('');

  return sectionsHtml;
}

export function getWebviewContent(focus?: Focus) {
  const modes = getModes();

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
          ${sectionsHtml}
          Modes: ${modes.join(', ')}
        </body>
      </html>
    `;
}
