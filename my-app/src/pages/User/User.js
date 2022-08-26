import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Table, Form, Dropdown } from 'react-bootstrap'
import './User.scss'
const User = () => {
  const [infoUser, setUser] = useState({})
  const [listUser, setListUser] = useState([])
  const [ListUserToShow, setListUserToShow] = useState([])
  const [searchID, setSearchId] = useState(1)
  const [txtSearch, setTxtsearch] = useState('')
  const navigate = useNavigate();
  const Users = [
    { id: 'a1', fullname: 'CAO QUA', age: '10' },
    { id: 'a2', fullname: 'TRAN VAN ME', age: '20' },
    { id: 'c3', fullname: ' VAN AN TOAN', age: '14' },
    { id: 'd34', fullname: 'TINH ANH', age: '16' },
    { id: 'a5', fullname: 'LUONG TRI VI ', age: '17' },
    { id: 'd7', fullname: 'XAM VAN LUOC', age: '19' },
    { id: 'ff8', fullname: 'Minh Nguyet', age: '19' },
    { id: 'a9', fullname: 'TRANH PHI HO', age: '32' },
    { id: 'a10', fullname: 'Thanh CU', age: '14' },
    { id: 'ff11', fullname: 'VUA VAN VET', age: '29' },
  ]
  useEffect(() => {
    const infoUser = JSON.parse(localStorage.getItem('user'))
    if (infoUser) {
      setUser(infoUser)
      //SAVE LISTUSER FOR LOCAL
      localStorage.setItem('listUser', JSON.stringify(Users))
      setListUser(Users)
      setListUserToShow(Users)
    } else {
      navigate("/");
    }

  }, [])
  const handelOnSearch = (str) => {
    let results = []
    if (searchID == '1') {

      results = listUser.filter((item, idx) => item.id.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) > -1)
    } else if (searchID == '2') {
      results = listUser.filter((item, idx) => item.fullname.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) > -1)

    } else {
      results = listUser.filter((item, idx) => item.age.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) > -1)

    }
    setListUserToShow(results)
  }
  const Emptycomponent = () => <div class="alert alert-warning" role="alert">
    A simple warning alert—check it out!
  </div>
  return (
    <div className='user-page'>
      <Container>

        <Row>
          <div className='search-form'>
            <form action='' method=''>
              <div className='search-form__input'>
                <input type='text' name='search' placeholder='Search...'
                  onChange={(e) => handelOnSearch(e.target.value)}
                />
              </div>
              <select onChange={(e) => setSearchId(e.target.value)} >
                <option value={1}>ID</option>
                <option value={2}>FULL NAME</option>
                <option value={3}>AGE</option>
              </select>
            </form>
          </div>
        </Row>
        <Row>

          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>FULL NAME</th>
                <th>AGE</th>
              </tr>
            </thead>
            <tbody>
              {
                ListUserToShow?.slice(0, 10).map((item, idx) => {
                   
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td >{item.id}</td>
                      <td >{item.fullname}</td>
                      <td >{item.age}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  )
}

export default User