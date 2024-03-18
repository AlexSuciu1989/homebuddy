import React from 'react';
import { Button } from 'antd'; // Import the Button component from Ant Design

class Buttons extends React.Component {
  render() {
    return (
      <div>
        <Button type="primary">Primary Button</Button>
        <Button type="default">Default Button</Button>
        <Button type="danger">Danger Button</Button>
      </div>
    );
  }
}

export default Buttons;
