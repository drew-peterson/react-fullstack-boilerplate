import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <a href="/login">Login</a>
          </li>,
          <li key="2">
            <a href="/signup">Signup</a>
          </li>
        ];
      default:
        return [
          <li key="3">
            {/*full http redirect / refresh
						if ajax then we need to handle auth redux*/}
            <a href="/api/logout">logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper blue accent-2">
          {/*if user is logged in then home icon redirects to dashboard else lander*/}
          <Link className="left brand-logo" to={this.props.auth ? "/" : "/"}>
            Host Legality
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps)(Header);
