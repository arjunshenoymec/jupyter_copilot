import { Widget } from '@lumino/widgets';
import React from 'react';
import ReactDOM from 'react-dom';
import ChatComponent from './ChatComponent';

export class ReactWidget extends Widget {
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
    this.node.id = 'react-widget';
  }

  onAfterAttach() {
    ReactDOM.render(<ChatComponent />, this.node);
  }

  onBeforeDetach() {
    ReactDOM.unmountComponentAtNode(this.node);
  }
}
