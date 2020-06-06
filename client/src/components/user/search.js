import React from 'react';
import Axios from '../../utils/ApiAxios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
    this.refs.search.focus();
  }

  getAllUsers() {
    Axios.get('/user/getAllUsers')
    .then((res) => {
      if(res.status === 200) {
        this.setState({
          users: res.data.response
        });  
      }
    })
    .catch(err => console.log('Error--->', err));
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }

  render() {
    let _users = this.state.users;
    let search = this.state.searchString.trim().toLowerCase();
    let userCount = _users.length;
    if (search.length > 0) {
      _users = _users.filter(function(user) {
        return user.name.toLowerCase().match(search);
      });
    }

    return (
      <div className='search'>
        <h3>Total number of users: {userCount}</h3>
        <div>
          <input
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="type name here"
            id='search'
          />

          <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Picture</th>
                    <th>Created Date</th>
                </tr>
            </thead>
            <tbody>
              {(_users) 
              ? _users.map((data, index) => {
                  const {name, mobile, picture, created_at} = data;
                  const img = process.env.PUBLIC_URL + '/uploads/' + picture;
                  return(
                      <tr key={index}>
                          <td>{name}</td>
                          <td>{mobile}</td>
                          <td><img style={{width: '50px'}} alt='user-pic' src={img}/></td>
                          <td>{created_at}</td>
                      </tr>
                  )
              })
              : <tr>
              <td colSpan="4">
                  No Record Found
              </td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Search;
