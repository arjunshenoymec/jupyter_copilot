import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTools, INotebookTracker
} from '@jupyterlab/notebook';

// import {
//  Panel, Widget
// } from '@lumino/widgets';

import {
  codeIcon
} from '@jupyterlab/ui-components';

import { ReactWidget } from './ReactWidget';

import '../style/index.css';


// Create a simple panel


/**
 * Initialization data for the my-extension extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'my-extension',
  autoStart: true,
  requires: [INotebookTracker, INotebookTools],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker, tools: INotebookTools) => {
    console.log('JupyterLab extension my-extension is activated!');
    // const panel = new MyPanel();
    // app.shell.add(panel, 'right');
    // app.shell.activateById(panel.id);
    const panel = new ReactWidget();
    panel.title.icon = codeIcon;
    panel.title.closable = true;
    app.shell.add(panel, 'right');
    app.shell.activateById(panel.id);
  }
};

export default extension;
