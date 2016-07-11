import 'fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {reposForUser} from './api';
import ReactDataGrid from 'react-data-grid';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.rowGetter = this.rowGetter.bind(this);
    this.state = {
      rows: [],
      columns: [
        {
          key: 'id',
          name: 'ID'
        },
        {
          key: 'name',
          name: 'Name'
        },
        {
          key: 'size',
          name: 'Size'
        },
        {
          key: 'updated_at',
          name: 'Updated'
        }
    ]};
  }

  rowGetter(i) {
    return this.state.rows[i];
  }

  componentDidMount() {
    reposForUser(this.props.user).then((repos) => {
      this.setState({ rows: repos });
    });
  }
  
  render() {
    return (
      <div>
        <h2>Github repos for {this.props.user}</h2>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          enableCellSelect={true}
          cellNavigationMode='changeRow'
        />
      </div>
    )
  }
}

ReactDOM.render(<Main user="mamersfo"/>, document.getElementById('app'));
