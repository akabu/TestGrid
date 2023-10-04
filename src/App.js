import React from "react";

import DataGrid, { Column, MasterDetail } from "devextreme-react/data-grid";
import Button from "devextreme-react/button";

import DetailTemplate from "./DetailTemplate.js";

import service from "./data.js";

const employees = service.getEmployees();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedRowKey: null
    };
    this.myRef = React.createRef();
    this.onClick = this.onClick.bind(this);
    this.onFocusedRowChanged = this.onFocusedRowChanged.bind(this);
  }
  onClick(e) {
    this.setState({
      focusedRowKey: 5
    });

    this.myRef.current.instance.expandRow(5);
  }
  onFocusedRowChanged(e) {
    this.setState({
      focusedRowKey: e.row.key
    });
  }
  render() {
    return (
      <>
        <Button text="Focus and expand row" onClick={this.onClick} />
        <DataGrid
          id="grid-container"
          ref={this.myRef}
          dataSource={employees}
          keyExpr="ID"
          showBorders={true}
          focusedRowEnabled={true}
          focusedRowKey={this.state.focusedRowKey}
          onFocusedRowChanged={this.onFocusedRowChanged}
        >
          <Column dataField="Prefix" width={70} caption="Title" />
          <Column dataField="FirstName" />
          <Column dataField="LastName" />
          <Column dataField="Position" width={170} />
          <Column dataField="State" width={125} />
          <Column dataField="BirthDate" dataType="date" />
          <MasterDetail enabled={true} component={DetailTemplate} />
        </DataGrid>
      </>
    );
  }
}

export default App;
