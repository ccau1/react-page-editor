/* @flow */

import React, {Component} from 'react';
import renderHTML from 'react-render-html';
import ReactPlayer from 'react-player';

const getSpecifyVideoType = url => {
  // todo more flexible
  const videoTypeReg = /youtu.be/g;
  if (videoTypeReg.exec(url)) {
    return 'video/youtube';
  }
  if (/vimeo/g.test(url)) {
    return 'video/vimeo';
  }
  return 'video';
};

export default class VideoView extends Component {
  render() {
    const {model: {val}} = this.props;
    const src = val.url || 'https://www.youtube.com/watch?v=oUFJJNQGwhk';
    const video = {
      src
    };
    const sources = [video];
    return (
      <ReactPlayer url={src} width="100%" height="400px" controls id="play1" />
    );
  }
}

class MediaElement extends Component {
  static propTypes = {};

  componentDidMount() {
    const {MediaElementPlayer} = global;

    if (!MediaElementPlayer) {
      return;
    }

    const options = Object.assign({}, this.props.options, {
      // Read the Notes below for more explanation about how to set up the path for shims
      pluginPath: './static/media/',
      success: (media, node, instance) => this.success(media, node, instance),
      error: (media, node) => this.error(media, node)
    });

    this.setState({player: new MediaElementPlayer(this.props.id, options)});
  }

  componentWillUnmount() {
    if (this.state.player) {
      this.state.player.remove();
      this.setState({player: null});
    }
  }
  state = {};

  success(media, node, instance) {
    // Your action when media was successfully loaded
  }

  error(media) {
    // Your action when media had an error loading
  }

  render() {
    const props = this.props,
      sources = props.sources,
      sourceTags = [];

    for (let i = 0, total = sources.length; i < total; i++) {
      const source = sources[i];
      sourceTags.push(`<source src="${source.src}" type="${source.type}">`);
    }

    const mediaBody = `${sourceTags.join('\n')}`;
    const mediaHtml = props.mediaType === 'video'
      ? `<video id="${props.id}" width="${props.width}" height="${props.height}"${props.poster
          ? ` poster=${props.poster}`
          : ''}
					${props.controls ? ' controls' : ''}${props.preload
          ? ` preload="${props.preload}"`
          : ''}>
					${mediaBody}
				</video>`
      : `<audio id="${props.id}" width="${props.width}" controls>
					${mediaBody}
				</audio>`;

    return (
      <div>
        {renderHTML(mediaHtml)}
      </div>
    );
  }
}
