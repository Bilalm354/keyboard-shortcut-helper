import { Shortcuts } from '../types/types';

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