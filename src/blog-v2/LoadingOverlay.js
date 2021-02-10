import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

class LoadingOverlay extends React.Component {
  render() {
    return (
      <Dimmer active={this.props.active} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
  }
}

export default LoadingOverlay;