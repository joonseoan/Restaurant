import React, { Component } from "react";
import _ from "lodash";
import Slider from "react-slick";
import { insertSpaces } from "../../utils/uIControl";

function SetNextArrow(props) {
  const { className, style } = props;
  return (
    <div className={className} style={{ ...style, visibility: "hidden" }} />
  );
}

function SetPrevArrow(props) {
  const { className, style } = props;
  return (
    <div className={className} style={{ ...style, visibility: "hidden" }} />
  );
}

class MenuOrders extends Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0,
      isLastSlide: true,
      isFirstSlide: true,
      lastSlide: 0,
      showYourOrder: "hidden",
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

  menu_length = 0;

  componentDidUpdate(prevProps, prevState) {
    const { menuOrdered } = this.props;
    const {
      props: { responsive, slidesToShow, initialSlide }
    } = this.slider;
    const { windowWidth, currentSlide, lastSlide } = this.state;

    if (
      prevState.windowWidth !== windowWidth ||
      prevProps.menuOrdered.length !== menuOrdered.length ||
      menuOrdered.length < this.menu_length
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
      } else {
        this.setState({ isLastSlide: false });
      }
      if (currentSlide === initialSlide) {
        this.setState({ isFirstSlide: true });
      } else {
        this.setState({ isFirstSlide: false });
      }
    }
    this.menu_length = menuOrdered.length;
  }

  handleOrderList = menuOrdered => {
    let count = 0;

    return _.map(menuOrdered, orders => {
      const { name, number } = orders;
      return (
        <div key={count++} className="mt-3 text-center">
          <div className="justify-content-center">
            <div>
              <p>
                {count}. <strong>{insertSpaces(name)}</strong>
              </p>
            </div>
            <div>
              <img
                className="img img-fluid mx-auto d-inline"
                style={{
                  width: "80px",
                  height: "50px"
                }}
                alt={name}
                src={`./images/${name}.PNG`}
              />
              <img
                className="img img-fluid mx-auto rounded d-inline"
                style={{
                  width: "20px",
                  height: "50px"
                }}
                alt="spoonSticks"
                src={`./images/spoon.png`}
              />
            </div>
          </div>
          <div className="mt-2">
            <p>{number} orders(s)</p>
          </div>
        </div>
      );
    });
  };

  handleCart = () => {
    this.setState({
      showYourOrder:
        this.state.showYourOrder === "hidden" ? "visible" : "hidden",
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
    const newOrderButton = orderButton === "none" ? "hidden" : "visible";

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

    const prevDisplay = this.state.isFirstSlide ? "hidden" : "visible";
    const nextDisplay = this.state.isLastSlide ? "hidden" : "visible";

    const fixed_bottom =
      this.state.showYourOrder === "visible" && newOrderButton === "visible"
        ? "fixed-bottom"
        : "";

    let fixed_bottom_button;

    if (newOrderButton === "visible" && this.state.showYourOrder === "hidden") {
      fixed_bottom_button = "fixed-bottom";
    } else if (
      newOrderButton === "visible" &&
      this.state.showYourOrder === "visible"
    ) {
      fixed_bottom_button = "";
    } else {
      fixed_bottom_button = "";
    }

    if (this.slider) {
      const { slickGoTo } = this.slider;
      if (
        this.state.showYourOrder === "visible" &&
        newOrderButton === "visible"
      ) {
        slickGoTo(this.state.currentSlide);
      }
    }

    return (
      <div>
        <div
          className={`mt-3 text-center rounded ${fixed_bottom}`}
          style={{ visibility: newOrderButton }}
        >
          <div
            className={`container-fluid w-50 mb-2`}
            style={{
              visibility:
                newOrderButton === "visible"
                  ? this.state.showYourOrder
                  : newOrderButton,
              backgroundImage: "url(./images/table.PNG)"
            }}
          >
            <Slider ref={c => (this.slider = c)} {...settings}>
              {this.handleOrderList(menuOrdered)}
            </Slider>
            <div
              className="row text-center bg-success"
              style={{
                visibility:
                  this.state.showYourOrder === "visible" &&
                  newOrderButton === "visible"
                    ? "visible"
                    : "hidden"
              }}
            >
              <span
                className="col text-white mt-2"
                style={{
                  visibility:
                    this.state.showYourOrder === "visible" &&
                    newOrderButton === "visible"
                      ? prevDisplay
                      : "hidden"
                }}
                onClick={this.previous}
              >
                <label>
                  <i className="fa fa-caret-left" />
                </label>
              </span>
              <span className="mt-2">
                <strong className="align-items-top">
                  {this.state.currentSlide + 1} / {this.state.lastSlide + 1}
                </strong>
              </span>
              <span
                className="col text-white mt-2"
                style={{
                  visibility:
                    this.state.showYourOrder === "visible" &&
                    newOrderButton === "visible"
                      ? nextDisplay
                      : "hidden"
                }}
                onClick={this.next}
              >
                <label>
                  <i className="fa fa-caret-right" />
                </label>
              </span>
            </div>
          </div>
          <div className={`${fixed_bottom_button}`}>
            <button
              className="btn btn-sm btn-success"
              onClick={this.handleCart}
            >
              {this.state.showYourOrder === "hidden"
                ? "SHOW MY CART"
                : "HIDE MY CART"}
              <i className="fa fa-eye ml-2" />
            </button>
            <button
              id={this.props.id}
              className={`btn btn-sm text-white responsive ${
                this.state.windowWidth > 440 ? "ml-5" : "mt-2"
              }`}
              style={{ backgroundColor: "#CC0000", width: "300px" }}
              onClick={() => {
                const setShowControl = () => {
                  this.setState({ showYourOrder: "visible" });
                };
                const showControl = this.state.showYourOrder;
                this.props.setOrderStatus({ setShowControl, showControl });
                this.setState({ showYourOrder: "hidden" });
                this.props.openModalControl();
              }}
            >
              PLACE AN ORDER
              <i className="fa fa-shopping-cart ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuOrders;
