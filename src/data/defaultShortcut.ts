import { SectionTags, Shortcut } from '../functions/getWebviewContent';

export type Shortcuts = Record<SectionTags, Shortcut[]>;

export const defaultMacShortcuts: Shortcuts = {
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
    { description: 'Copy line down/up', keys: '⇧⌥↓ / ⇧⌥↑' },
    { description: 'Delete line', keys: '⇧⌘K' },
    { description: 'Insert line below/above', keys: '⌘Enter / ⇧⌘Enter' },
    { description: 'Jump to matching bracket', keys: '⇧⌘\\' },
    { description: 'Indent/outdent line', keys: '⌘] / ⌘[' },
    { description: 'Go to beginning/end of line', keys: 'Home / End' },
    { description: 'Go to beginning/end of file', keys: '⌘↑ / ⌘↓' },
    { description: 'Scroll line up/down', keys: '⌃PgUp / ⌃PgDn' },
    { description: 'Scroll page up/down', keys: '⌘PgUp /⌘PgDn' },
    { description: 'Fold/unfold region', keys: '⌥⌘[ / ⌥⌘]' },
    { description: 'Fold/unfold all subregions', keys: '⌘K ⌘[ / ⌘K ⌘]' },
    { description: 'Fold/unfold all regions', keys: '⌘K ⌘0 / ⌘K ⌘J' },
    { description: 'Add line comment', keys: '⌘K ⌘C' },
    { description: 'Remove line comment', keys: '⌘K ⌘U' },
    { description: 'Toggle line comment', keys: '⌘/' },
    { description: 'Toggle block comment', keys: '⇧⌥A' },
    { description: 'Toggle word wrap', keys: '⌥Z' }
  ],
  'Multi-Cursor and Selection': [
    { description: 'Insert cursor', keys: '⌥ + click' },
    { description: 'Insert cursor above', keys: '⌥⌘↑' },
    { description: 'Insert cursor below', keys: '⌥⌘↓' },
    { description: 'Undo last cursor operation', keys: '⌘U' },
    { description: 'Insert cursor at end of each line selected', keys: '⇧⌥I' },
    { description: 'Select current line', keys: '⌘L' },
    { description: 'Select all occurrences of current selection', keys: '⇧⌘L' },
    { description: 'Select all occurrences of current word', keys: '⌘F2' },
    { description: 'Expand / shrink selection', keys: '⌃⇧⌘→ / ←' },
    { description: 'Column (box) selection', keys: '⇧⌥ + drag mouse' },
    { description: 'Column (box) selection up/down', keys: '⇧⌥⌘↑ / ↓' },
    { description: 'Column (box) selection left/right', keys: '⇧⌥⌘← / →' },
    { description: 'Column (box) selection page up', keys: '⇧⌥⌘PgUp' },
    { description: 'Column (box) selection page down', keys: '⇧⌥⌘PgDn' }
  ],
  'Search and Replace': [
    { description: 'Find', keys: '⌘F' },
    { description: 'Replace', keys: '⌥⌘F' },
    { description: 'Find next/previous', keys: '⌘G / ⇧⌘G' },
    { description: 'Select all occurrences of Find match', keys: '⌥Enter' },
    { description: 'Add selection to next Find match', keys: '⌘D' },
    { description: 'Move last selection to next Find match', keys: '⌘K ⌘D' }
  ],
  'Rich Languages Editing': [
    { description: 'Trigger suggestion', keys: '⌃Space, ⌘I' },
    { description: 'Trigger parameter hints', keys: '⇧⌘Space' },
    { description: 'Format document', keys: '⇧⌥F' },
    { description: 'Format selection', keys: '⌘K ⌘F' },
    { description: 'Go to Definition', keys: 'F12' },
    { description: 'Peek Definition', keys: '⌥F12' },
    { description: 'Open Definition to the side', keys: '⌘K F12' },
    { description: 'Quick Fix', keys: '⌘.' },
    { description: 'Show References', keys: '⇧F12' },
    { description: 'Rename Symbol', keys: 'F2' },
    { description: 'Trim trailing whitespace', keys: '⌘K ⌘X' },
    { description: 'Change file language', keys: '⌘K M' }
  ],
  'Navigation': [
    { description: 'Show all Symbols', keys: '⌘T' },
    { description: 'Go to Line...', keys: '⌃G' },
    { description: 'Go to File...', keys: '⌘P' },
    { description: 'Go to Symbol...', keys: '⇧⌘O' },
    { description: 'Show Problems panel', keys: '⇧⌘M' },
    { description: 'Go to next/previous error or warning', keys: 'F8 / ⇧F8' },
    { description: 'Navigate editor group history', keys: '⌃Tab / ⌃⇧Tab' },
    { description: 'Go back/forward', keys: '⌃- / ⌃⇧-' },
    { description: 'Toggle Tab moves focus', keys: '⌃⇧M' }
  ],
  'Editor Management': [
    { description: 'Close editor', keys: '⌘W' },
    { description: 'Close folder', keys: '⌘K F' },
    { description: 'Split editor', keys: '⌘\\' },
    { description: 'Focus into 1st, 2nd, 3rd editor group', keys: '⌘1 / ⌘2 / ⌘3' },
    { description: 'Focus into previous/next editor group', keys: '⌘K ⌘← / ⌘K ⌘→' },
    { description: 'Move editor left/right', keys: '⌘K ⇧⌘← / ⌘K ⇧⌘→' },
    { description: 'Move active editor group', keys: '⌘K ← / ⌘K →' }
  ],
  'File Management': [
    { description: 'New File', keys: '⌘N' },
    { description: 'Open File...', keys: '⌘O' },
    { description: 'Save', keys: '⌘S' },
    { description: 'Save As...', keys: '⇧⌘S' },
    { description: 'Save All', keys: '⌥⌘S' },
    { description: 'Close', keys: '⌘W' },
    { description: 'Close All', keys: '⌘K ⌘W' },
    { description: 'Reopen closed editor', keys: '⇧⌘T' },
    { description: 'Keep preview mode editor open', keys: '⌘K Enter' },
    { description: 'Open next / previous', keys: '⌃Tab / ⌃⇧Tab' },
    { description: 'Copy path of active file', keys: '⌘K P' },
    { description: 'Reveal active file in Finder', keys: '⌘K R' },
    { description: 'Show active file in new window/instance', keys: '⌘K O' }
  ],
  'Display': [
    { description: 'Toggle full screen', keys: '⌃⌘F' },
    { description: 'Toggle editor layout (horizontal/vertical)', keys: '⌥⌘0' },
    { description: 'Zoom in/out', keys: '⌘= / ⇧⌘-' },
    { description: 'Toggle Sidebar visibility', keys: '⌘B' },
    { description: 'Show Explorer / Toggle focus', keys: '⇧⌘E' },
    { description: 'Show Search', keys: '⇧⌘F' },
    { description: 'Show Source Control', keys: '⌃⇧G' },
    { description: 'Show Debug', keys: '⇧⌘D' },
    { description: 'Show Extensions', keys: '⇧⌘X' },
    { description: 'Replace in files', keys: '⇧⌘H' },
    { description: 'Toggle Search details', keys: '⇧⌘J' },
    { description: 'Show Output panel', keys: '⇧⌘U' },
    { description: 'Open Markdown preview', keys: '⇧⌘V' },
    { description: 'Open Markdown preview to the side', keys: '⌘K V' },
    { description: 'Zen Mode (Esc Esc to exit)', keys: '⌘K Z' }
  ],
  'Debug': [
    { description: 'Toggle breakpoint', keys: 'F9' },
    { description: 'Start/Continue', keys: 'F5' },
    { description: 'Step into/out', keys: 'F11 / ⇧F11' },
    { description: 'Step over', keys: 'F10' },
    { description: 'Stop', keys: '⇧F5' },
    { description: 'Show hover', keys: '⌘K ⌘I' }
  ],
  'Integrated Terminal': [
    { description: 'Show integrated terminal', keys: '⌃`' },
    { description: 'Create new terminal', keys: '⌃⇧`' },
    { description: 'Copy selection', keys: '⌘C' },
    { description: 'Scroll up/down', keys: '⌘↑ / ↓' },
    { description: 'Scroll page up/down', keys: 'PgUp / PgDn' },
    { description: 'Scroll to top/bottom', keys: '⌘Home / End' }
  ]
};
