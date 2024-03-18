import React, { Component } from 'react';

// Define types for props and state if needed
interface HeaderProps {}

interface HeaderState {
  user: string;
  member: string;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      user: '',
      member: ''
    };
  }

  render() {
    const { user, member } = this.state;

    return (
      <header>
        <img src="./resources/Logo.png" alt="logo" />

        <ul className="navigation">
          <li className="active"><a href="account.html">Account</a></li>
          {/* <li><a href="budget-buddy.html">Budget Buddy</a></li> */}
          <li><a href="food-buddy.html">Food Buddy</a></li>
          <li><a href="agenda-buddy.html">Agenda Buddy</a></li>
          {/* <li><a href="car-buddy.html">Car Buddy</a></li> */}
        </ul>

        <div className="user-header-display">
          <p>
            Welcome <span className="header-user">{user}</span>, you are signed in as
            <span className="header-member">{member}</span>
          </p>
          <input type="button" className="logout" value="Logout" />
        </div>
      </header>
    );
  }
}

export default Header;
