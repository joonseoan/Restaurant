import React, { Component } from "react";
import _ from "lodash";
import Slider from "react-slick";
import { insertSpaces } from "../../utils/uIControl";

function SetNextArrow(props) {
  const { className, style } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

function SetPrevArrow(props) {
  const { className, style } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

class MenuOrders extends Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0,
      isLastSlide: true,
      isFirstSlide: true,
      lastSlide: 0,
      showYourOrder: "none",
      windowWidth: 0,
      slidesToShow: 0
    };

    window.addEventListener("resize", this.update);
  }

  update = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps, prevState) {
    const { menuOrdered } = this.props;
    const {
      props: { responsive, slidesToShow, initialSlide }
    } = this.slider;
    const { windowWidth, currentSlide, lastSlide } = this.state;

    if (
      prevState.windowWidth !== this.state.windowWidth ||
      prevProps.menuOrdered.length !== this.props.menuOrdered.length
    ) {
      const setLastSlide = (menuLength, slidesToDisplay) => {
        this.setState({ slidesToShow: slidesToDisplay });
        if (menuLength > slidesToDisplay) {
          this.setState({ lastSlide: menuLength - slidesToDisplay });
        } else {
          this.setState({ lastSlide: 0 });
        }
      };

      if (windowWidth > 1024) {
        setLastSlide(menuOrdered.length, slidesToShow);
      } else if (windowWidth > 600 && window.innerWidth <= 1024) {
        setLastSlide(menuOrdered.length, responsive[0].settings.slidesToShow);
      } else if (windowWidth > 480 && window.innerWidth <= 600) {
        setLastSlide(menuOrdered.length, responsive[1].settings.slidesToShow);
      } else {
        setLastSlide(menuOrdered.length, responsive[2].settings.slidesToShow);
      }

      if (menuOrdered.length > this.state.slidesToShow) {
        this.setState({ isLastSlide: false });
      } else {
        this.setState({ isLastSlide: true });
      }
    }

    if (prevState.slidesToShow < this.state.slidesToShow) {
      if (currentSlide > 0 && currentSlide > this.state.slidesToShow) {
        this.setState({
          currentSlide: currentSlide - 1
        });
      }
    }

    if (prevState.slidesToShow > this.state.slidesToShow) {
      if (currentSlide >= this.state.slidesToShow) {
        this.setState({
          currentSlide: currentSlide + 1
        });
      }
    }

    if (
      this.props.orderButton !== prevProps.orderButton &&
      this.props.orderButton === "none"
    ) {
      this.setState({ currentSlide: 0 });
    }

    if (this.state.currentSlide !== prevState.currentSlide) {
      if (currentSlide === lastSlide) {
        this.setState({ isLastSlide: true });
      }

      if (currentSlide === initialSlide) {
        this.setState({ isFirstSlide: true });
      }
    }
  }

  handleOrderList = menuOrdered => {
    let count = 0;

    return _.map(menuOrdered, orders => {
      const { name, number } = orders;
      return (
        <div key={count++} className="text-center mt-3">
          <div>
            <div>
              {count}. <strong>{insertSpaces(name)}</strong>
            </div>
            <div>
              <img
                className="img img-fluid img-thumbnail mx-auto mt-2 d-inline"
                style={{ width: "80px", height: "50px" }}
                alt={name}
                src={`./images/${name}.PNG`}
              />
              <img
                className="img img-fluid mx-auto mt-2 rounded d-inline"
                style={{ width: "20px", height: "50px" }}
                alt="spoonSticks"
                src={`./images/spoon.png`}
              />
            </div>
          </div>
          <div className="mt-2">{number} orders(s)</div>
        </div>
      );
    });
  };

  handleCart = () => {
    this.setState({
      showYourOrder: this.state.showYourOrder === "none" ? "block" : "none",
      currentSlide: 0
    });
  };

  next = () => {
    const { lastSlide, currentSlide } = this.state;

    if (lastSlide > currentSlide) {
      this.slider.slickNext();
    }

    this.setState({ isFirstSlide: false });
  };

  previous = () => {
    this.slider.slickPrev();
    this.setState({ isLastSlide: false });
  };

  render() {
    if (!this.props) return <div />;

    const { menuOrdered, orderButton } = this.props;

    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: false
          }
        }
      ],
      nextArrow: <SetNextArrow />,
      prevArrow: <SetPrevArrow />,
      afterChange: currentSlide => {
        this.setState({ currentSlide });
      }
    };

    if (this.slider) {
      const { slickGoTo } = this.slider;
      if (
        this.state.showYourOrder === "block" &&
        this.props.orderButton === "block"
      ) {
        slickGoTo(this.state.currentSlide);
      }
    }

    const prevDisplay = this.state.isFirstSlide ? "hidden" : "visible";
    const nextDisplay = this.state.isLastSlide ? "hidden" : "visible";

    return (
      <div className="fixed-bottom">
        <div
          style={{
            display:
              orderButton === "block" ? this.state.showYourOrder : orderButton,
            backgroundImage: "url(./images/table.PNG)"
          }}
          className="container-fluid w-50 mx-auto rounded"
        >
          <Slider ref={c => (this.slider = c)} {...settings}>
            {this.handleOrderList(menuOrdered)}
          </Slider>
          <div className="row text-center bg-success">
            <i
              className="col fa fa-caret-left text-white d-inline"
              style={{ visibility: prevDisplay }}
              onClick={this.previous}
            />
            <strong className="align-items-top">
              {this.state.currentSlide + 1} / {this.state.lastSlide + 1}
            </strong>
            <i
              className="col fa fa-caret-right text-white d-inline"
              style={{ visibility: nextDisplay }}
              onClick={this.next}
            />
          </div>
        </div>
        <div
          className="mt-3 text-center rounded"
          style={{ display: orderButton }}
        >
          <button
            className="btn btn-sm btn-success mr-5"
            onClick={this.handleCart}
          >
            {this.state.showYourOrder === "none"
              ? "SHOW YOUR CART"
              : "HIDE YOUR CART"}
          </button>
          <button
            id={this.props.id}
            className="btn btn-sm btn-danger"
            onClick={this.props.openModalControl}
          >
            PLACE AN ORDER
          </button>
        </div>
      </div>
    );
  }
}

export default MenuOrders;
