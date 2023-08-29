export type SectionTags =
  | 'General'
  | 'Basic Editing'
  | 'Multi-Cursor and Selection'
  | 'Search and Replace'
  | 'Rich Languages Editing'
  | 'Navigation'
  | 'Editor Management'
  | 'File Management'
  | 'Display'
  | 'Debug'
  | 'Integrated Terminal';

export type Shortcuts = Record<SectionTags, Shortcut[]>;

export type Shortcut = {
    description: string;
    keys: string;
    when?: string;
};