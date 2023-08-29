import { Shortcut } from '../types/types';
import { getModes } from './getModes';
import * as vscode from 'vscode';
import * as defaultKeybindingsVscode from '../data/defaultKeybindingsVscode.json' ;
import { convertToWords } from './caseConverter';
import { Focus } from '../extension';

const createShortcutsTableHtml = (shortcuts: Shortcut[]) => {
  const shortcutRows = shortcuts.map((shortcut) => `
    <tr>
      <td>${shortcut.description}</td>
      <td>${shortcut.keys}</td>
    </tr>
  `).join('');

  return `
    <table border="1">
      ${shortcutRows}
    </table>
  `;
};

function mapJsonWhensToFocuses(jsonWhens: string[]) {}

const createSectionTableHtmlWithHeading = (sectionHeading: string, shortcuts: Shortcut[]) => {
  const shortcutTable = createShortcutsTableHtml(shortcuts);

  return `
    <h2>${sectionHeading}</h2>
    ${shortcutTable}
  `;
};

function getDefaultKeybindingsVscodeAsShortcuts() {
  return (defaultKeybindingsVscode as {command: string, key: string, when?: string}[]).map(({ command, key, when }) => ({ description: convertToWords(command), keys: key, when })) as Shortcut[];
}

function filterShortcutsWithWhensRepeatedMoreThanTenTimes(shortcuts: Shortcut[]) {
  const whens = shortcuts.map(({ when }) => when);
  const whensRepeatedMoreThanTenTimes = getWhensRepeatedMoreThanTenTimesAndSortByNumberOfOccurrences(whens);
  console.log({ whensRepeatedMoreThanTenTimes });
  console.log('hmmm');
  return shortcuts.filter(({ when }) => when && whensRepeatedMoreThanTenTimes.includes(when));
}

function getWhensRepeatedMoreThanTenTimesAndSortByNumberOfOccurrences(whens: (string | undefined)[]) {
  const whenAndNumberOfOccurences: Record<string, number> = {};
  for (const when of whens) {
    if (when) {
      whenAndNumberOfOccurences[when] = whenAndNumberOfOccurences[when] ? whenAndNumberOfOccurences[when] + 1 : 1;
    }
  }

  const whensOccurringMoreThanTenTimes = Object.entries(whenAndNumberOfOccurences).filter(([, numberOfOccurences]) => numberOfOccurences > 10);
  const sortedWhensOccurringMoreThanTenTimes = whensOccurringMoreThanTenTimes.sort(([, numberOfOccurencesA], [, numberOfOccurencesB]) => numberOfOccurencesB - numberOfOccurencesA);
  return sortedWhensOccurringMoreThanTenTimes.map(([when, _numberOfOccurences]) => when);
}

export function getWebviewContent({ focus }: {focus?: Focus}) {
  const modes = getModes();
  const numberOfTabGroups = vscode.window.tabGroups.all.length;
  const defaultKeybindingsVscodeAsShortcuts = getDefaultKeybindingsVscodeAsShortcuts();
  const filteredShortcuts = filterShortcutsWithWhensRepeatedMoreThanTenTimes(defaultKeybindingsVscodeAsShortcuts);
  const filteredShortcutsAndHeading: Record<string, Shortcut[]> = {};
  
  for(const shortcut of filteredShortcuts) {
    filteredShortcutsAndHeading[shortcut.when!] = filteredShortcutsAndHeading[shortcut.when!] ? [...filteredShortcutsAndHeading[shortcut.when!], shortcut] : [shortcut];
  }

  const currentWhens = { // tells us current focuses
    textInputFocus: !!vscode.window.activeTextEditor,
    'editorTextFocus && !editorReadonly': !!vscode.window.activeTextEditor,
    editorFocus: !!vscode.window.activeTextEditor,
    editorHoverFocused: !!vscode.window.activeTextEditor,
    editorTextFocus: !!vscode.window.activeTextEditor

  };

  console.log({ currentWhens });
  
  const shortcutsToDisplayHtml = Object.entries(filteredShortcutsAndHeading).map(([when, shortcuts]) => {
    // const whenIsInCurrentWhens = currentWhens[when as keyof typeof currentWhens];
    // console.log(currentWhens[when as keyof typeof currentWhens], 'currentWhens[when]');
    // if (!whenIsInCurrentWhens) {
    //   return '';
    // }

    const sectionHeading = `${convertToWords(when)}: ${when}`;
    return createSectionTableHtmlWithHeading(sectionHeading, shortcuts);
  });





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
              font-size: 15px;
            }
          </style>
        </head>
        <body>
          <h1>VSCode Keyboard Shortcuts</h1>
          <h3>Focus: ${focus}</h3>
          <h3>Number of Tab Groups: ${numberOfTabGroups}</h3>
          ${shortcutsToDisplayHtml}
          Modes: ${modes.join(', ')}
        </body>
      </html>
    `;
}
