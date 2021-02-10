import React from "react";
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

class GlideJS extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef()
  }

  componentDidMount() {
    this.slider = new Glide(this.wrapperRef.current, this.props.options).mount()
  }

  componentDidUpdate(prevProps) {
    if (this.props.options !== prevProps.options) {
      this.slider.update(this.props.options)
    }
  }

  componentWillUnmount() {
    this.slider.destroy()
  }

  render() {
    const { children } = this.props;
    return (
      <div ref={this.wrapperRef} className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {children.map((img, i) => <li className="glide__slide" key={i}>{img}</li>)}
          </ul>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
          <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
        </div>
      </div>
    )
  }
}

export default GlideJS;