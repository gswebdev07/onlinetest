import React, { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
// import { Message } from "../static/common";
// Redux

import { get_generals } from "../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Styles/home_page.css";
import Logo from "../assets/logo-white.png";
import LogoBlack from "../assets/logo.png";
import background from "../assets/backgroudn image.jpg";
import icon1 from "../assets/icons/Icon (1).png";
import icon2 from "../assets/icons/Icon (2).png";
import icon3 from "../assets/icons/Icon (3).png";
import icon4 from "../assets/icons/Icon (4).png";
import imageq from "../assets/attempted-question.png";
import imaget from "../assets/doubts-answered.png";
import imagea from "../assets/doubts-done.png";
import fblogo from "../assets/icons/facebook.png";
import gpluslogo from "../assets/icons/gpluslogo.png";
import inlogo from "../assets/icons/inlogo.png";
import instalogo from "../assets/icons/instalogo.png";
import ytlogo from "../assets/icons/youtubelogo.png";

const home_page = (props) => {
  const { get_generals, results } = props;
  const [nav, setNav] = useState(false);
  useEffect(() => {
    get_generals();
  }, []);

  return (
    <div className="main-div">
      {nav ? (
        <nav className="sticky" style={nav ? { opacity: "1" } : null}>
          <div className="row">
            <a href="#head">
              <img
                src={LogoBlack}
                alt="testpencil logo"
                className="logo-black"
              />
            </a>

            {/* <a href="#head"
            ><img
              src="resources/Css/imgs/logo.png"
              alt="Omnifood Logo"
              classNameName="logo-black"
      /></a> */}
            <ul className="main-nav">
              <li>
                <a href="#feature" className="delivery">
                  Features
                </a>
              </li>
              <li>
                <a href="#steps" className="scroll-to-contact">
                  Contact
                </a>
              </li>
              <li>
                <a href="#about" className="scroll-to-cities">
                  About
                </a>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/login",
                  }}
                >
                  Login
                </NavLink>
              </li>
            </ul>
            <a className="nav-icon">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </a>
          </div>
        </nav>
      ) : null}
      <header
        id="head"
        style={{
          backgroundImage: `linear-gradient(to left ,rgba(33, 88, 155, 0.5), rgba(0, 0, 0, 0.7)),
    url(${background})`,
        }}
      >
        <nav>
          <div className="row">
            <img src={Logo} alt="testpencil logo" className="logo" />
            {/* <a href="#head"
            ><img
              src="resources/Css/imgs/logo.png"
              alt="Omnifood Logo"
              classNameName="logo-black"
      /></a> */}
            <ul className="main-nav">
              <li>
                <a href="#feature" className="delivery">
                  Features
                </a>
              </li>
              <li>
                <a href="#steps" className="scroll-to-contact">
                  Contact
                </a>
              </li>
              <li>
                <a href="#about" className="scroll-to-cities">
                  About
                </a>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/register",
                    login: true,
                  }}
                >
                  Login
                </NavLink>
              </li>
            </ul>
            <a className="nav-icon">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </a>
          </div>
        </nav>
        <div className="hero-text-box">
          <h1>
            Just Reading is not enough,
            <br />
            Testing is Essential.
          </h1>
          <NavLink
            to={{
              pathname: "/register",
              signup: true,
            }}
            className="btn btn-full"
          >
            Sign Up Now
          </NavLink>
          <a className="btn btn-ghost" href="#feature">
            Show me more
          </a>
        </div>
      </header>
      <InView
        as="div"
        onChange={(inView, entry) => {
          setNav(inView);
        }}
      >
        <section className="secfeatures" id="feature">
          <div className="columns">
            <div className="col-2">
              <h2>
                India's most <p className="highlight">innovative</p> testing
                platform.
              </h2>
            </div>
            <div className="col-1">
              <div className="features">
                <div className="feature">
                  <div className="feature__icon">
                    <img src={icon4} alt="icon" className="icon" />
                  </div>
                  <h4 className="heading-4">Built for all boards</h4>
                  <p className="feature__text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="feature">
                  <div className="feature__icon">
                    <img src={icon2} alt="icon" className="icon" />
                  </div>
                  <h4 className="heading-4">Super Virtual Support</h4>
                  <p className="feature__text">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem
                  </p>
                </div>
              </div>

              <div className="features">
                <div className="feature">
                  <div className="feature__icon">
                    <img src={icon1} alt="icon" className="icon" />
                  </div>
                  <h4 className="heading-4">MCQ based test papers</h4>
                  <p className="feature__text">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour,
                  </p>
                </div>
                <div className="feature">
                  <div className="feature__icon">
                    <img src={icon3} alt="icon" className="icon" />
                  </div>
                  <h4 className="heading-4">Time your performance</h4>
                  <p className="feature__text">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="description">
          <div className="columnsf">
            <div className="col-1 col-des">
              <h2>
                Regular testing of knowledge builds{" "}
                <p className="highlight">confidence</p> for formal exams.
              </h2>
            </div>
            <div className="col-2 col-des">
              <h4 className="heading-4">
                Give your child the benefit of regular informal testing in the
                form of multiple choice questions
              </h4>
              <p className="feature__text">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32.
              </p>
            </div>
          </div>
        </section>

        <div className="width">
          <div className="video">
            <iframe
              width="1120"
              height="630"
              src="https://www.youtube.com/embed/uQi4HI10d40"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <section className="stats">
          <div className="ctabox">
            <div className="ctatext">
              <h2 className="ctaheading">
                Join testpencil now and get early bird offers
              </h2>
              <p className="feature__text cta__paragraph">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia
              </p>
              <a className="button button-full" href="#">
                Book demo now &rarr;
              </a>
              <NavLink
                to={{
                  pathname: "/register",
                  signup: true,
                }}
                className="button button-ghost"
                href="#"
              >
                Signup Now
              </NavLink>
            </div>
          </div>
          <div className="statsst">
            <div className="stats-1">
              <h2 className="stats-heading">Students love using Testpencil.</h2>
              <p className="studno">745</p>
              <p className="studtext">Happy Students</p>
            </div>
            <div className="stats-2">
              <div className="stat">
                <div className="stat__box">
                  <img src={imageq} alt="Question" className="stat-icon"></img>
                  <div>
                    <h2 className="stats-heading">3741 </h2>
                    <p className="stat-text">Questions Practiced</p>
                  </div>
                </div>
              </div>
              <div className="stat">
                <div className="stat__box">
                  <img src={imaget} alt="Question" className="stat-icon"></img>
                  <div>
                    <h2 className="stats-heading">2683</h2>
                    <p className="stat-text">Questions Practiced</p>
                  </div>
                </div>
              </div>
              <div className="stat">
                <div className="stat__box">
                  <img src={imagea} alt="Question" className="stat-icon"></img>
                  <div>
                    <h2 className="stats-heading">1759</h2>
                    <p className="stat-text">Questions Practiced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="info">
            <div className="info-box info-box-1">
              <h2>III & IV</h2>
              <p className="info-label">Classes</p>
            </div>
            <div className="info-box info-box-2">
              <h2>22</h2>
              <p className="info-label">Boards</p>
            </div>
            <div className="info-box info-box-3">
              <h2>58</h2>
              <p className="info-label">Exams</p>
            </div>
          </div>
        </section>
        <div className="footer-wrapper">
          <hr />
          <div className="footer">
            <div className="footer-row ">
              <ul className="links">
                <li className="link">About us</li>
                <li className="link">Disclaimer</li>
                <li className="link">Contact us</li>
                <li className="link">Terms of use</li>
              </ul>
            </div>

            <div className="footer-row  ">
              <ul className="links">
                <li className="link">About us</li>
                <li className="link">Disclaimer</li>
                <li className="link">Contact us</li>
                <li className="link">Terms of use</li>
              </ul>
            </div>
          </div>
          <div className="footer-end">
            <div className="social">
              <a href="#">
                <img className="socialLink" src={fblogo} alt="sociallink" />
              </a>
              <a href="#">
                <img className="socialLink" src={gpluslogo} alt="sociallink" />
              </a>
              <a href="#">
                <img className="socialLink" src={inlogo} alt="sociallink" />
              </a>
              <a href="#">
                <img className="socialLink" src={ytlogo} alt="sociallink" />
              </a>
              <a href="#">
                <img className="socialLink" src={instalogo} alt="sociallink" />
              </a>
            </div>
            <p> &#169; 2020 Testpencil. All rights reserved.</p>
          </div>
        </div>
      </InView>
    </div>
  );
};

home_page.propTypes = {
  get_generals: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_generals: () => dispatch(get_generals()),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(home_page);
