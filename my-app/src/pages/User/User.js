import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Row, Table, Col, Accordion } from 'react-bootstrap'
import { Pagination } from 'react-bootstrap'
import './User.scss'
const Users = [
  { id: 'AK1', fullname: 'CAO QUA', age: '10' },
  { id: 'BA2', fullname: 'TRAN VAN ME', age: '20' },
  { id: 'AF3', fullname: ' VAN AN TOAN', age: '14' },
  { id: 'FA4', fullname: 'TINH ANH', age: '16' },
  { id: 'RA5', fullname: 'LUONG TRI VI ', age: '17' },
  { id: 'FA7', fullname: 'XAM VAN LUOC', age: '19' },
  { id: 'NA8', fullname: 'Minh Nguyet', age: '19' },
  { id: 'FA9', fullname: 'TRANH PHI HO', age: '32' },
  { id: 'ZA10', fullname: 'Thanh CU', age: '14' },
  { id: 'LF0', fullname: 'AN ', age: '18' },
  { id: 'OP8', fullname: 'Minh kIEN', age: '19' },
  { id: 'MA9', fullname: 'TRANH  HO', age: '32' },
  { id: 'PA0', fullname: 'Thanh CU', age: '14' },
  { id: 'OK10', fullname: ' NIEN', age: '18' },

]
const User = () => {

  const [listUser, setListUser] = useState([])
  const [listUserToShow, setListUserToShow] = useState([])
  const [tab, settab] = useState(1);
  const [isTag, setisTag] = useState(false);
  const [idEdit, setidEdit] = useState('');
  const [indexPage, setindexPage] = useState(0);
  const [searchID, setSearchId] = useState(1)
  const [strSearch, setstrSearch] = useState('');


  const navigate = useNavigate();
  const numPage = Number.parseInt((listUser?.length / 10))


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {

      //SAVE LISTUSER FOR LOCAL
      localStorage.setItem('listUser', JSON.stringify(Users))
      setListUser(Users)
      setListUserToShow(Users)
    } else {
      navigate("/");
    }

  }, [])

  const ToolbarLeft = () => {
    return (
      <Accordion className='toolbar'  >
        <Accordion.Item eventKey="0">
          <Accordion.Header>User</Accordion.Header>
          <Accordion.Body>
            <ul >
              <li onClick={() => settab(1)}>List</li>
              <li onClick={() => settab(2)}>Add</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    )
  }
  const AddNewUser = () => {
    const [fullname, setfullname] = useState();
    const [age, setage] = useState();
    const [messErr, setmessErr] = useState();
    //GET AGE
    function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    //random id
    function makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      return result;
    }
    const checkEmptyFiled = (fullname, age) => {
      const messErr = {}
      if (fullname === '' || fullname === undefined) {
        messErr.fullname = 'This file is required !'
      }

      if (age === '' || age === undefined) {
        messErr.age = 'This file is required !'
      }

      if (messErr
        && Object.keys(messErr).length === 0
        && Object.getPrototypeOf(messErr) === Object.prototype) {
        return true
      }
      return messErr

    }

    const handelOnSubmit = () => {
      const arrMessCheckEmpty = checkEmptyFiled(fullname, age)
      setmessErr({})
      if (arrMessCheckEmpty !== true) {
        setmessErr(arrMessCheckEmpty)
      } else {
        if (age <= 6) {

          setmessErr({ ...messErr, age: 'Enter on age older than 6!' })
        } else {
          let results = [];
          results = JSON.parse(localStorage.getItem('listUser'));
          const obj = { id: makeid(2).toUpperCase() + Date.now().toString().slice(0, 2), fullname: fullname, age: age }
          results.push(obj)
          localStorage.setItem('listUser', JSON.stringify(results));
          setListUserToShow(results)
          alert('congratulations! added user successfully!')

        }
      }

      return
    }

    return (
      <section className="add-user" >
        <div className="mask d-flex align-items-center  gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-8">
                <div className="card" style={{ borderRadius: '3px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase ">New user</h2>
                    <form>

                      <div className="form-outline ">
                        <label className="form-label" htmlFor="form3Example3cg">Your Full Name</label>
                        <input type="email" id="form3Example3cg" className="form-control form-control-md"
                          onChange={e => setfullname(e.target.value)}
                          value={fullname}
                        />
                        <p>{messErr?.fullname}</p>
                      </div>

                      <div className="form-outline">
                        <input type="date" id="birthday" name="birthday"
                          onChange={e => setage(getAge(e.target.value))}

                        />
                        <p>{messErr?.age}</p>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button type="button" className=""
                          onClick={() => handelOnSubmit()}
                        >Register</button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
  }

  const RenderUser = ({ item, index }) => {
    const [nameEdit, setnameEdit] = useState();
    const [ageEdit, setageEdit] = useState();

    const handelEditUser = (id) => {
      setidEdit(id)
      setisTag(!isTag)
      //find and compare
      let item = listUser.find((value, idx) => value?.id == id)

      if (nameEdit !== undefined || ageEdit !== undefined) {
        if (Number.parseInt(ageEdit) < 6) {
          alert('Please enter number than 6 !')
        } else {
          if (nameEdit !== undefined) {
            item = { ...item, fullname: nameEdit }
          }
          if (ageEdit !== undefined) {
            item = { ...item, age: ageEdit }
          }
          //process array
          let arr = listUser.map(value => {
            if (value.id === id) {
              return item
            }
            return value
          })
          //set Location
          localStorage.setItem('listUser', JSON.stringify(arr))
          setListUser(arr)
          setListUserToShow(arr)
        }
      }
    }
    function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    if (item.id === idEdit && isTag) {
      return (
        <tr  >
          <td>{index + 1}</td>
          <td >{item.id}</td>
          <td>
            <input
              type='text'
              name='' placeholder={item.fullname}
              value={nameEdit}
              onChange={(e) => setnameEdit(e.target.value)}
            />
          </td>
          <td>
            <input
              type='date'
              name=''

              onChange={(e) => setageEdit(getAge(e.target.value))}
            />
          </td>
          <td className={'pen id_' + item.id}
            style={{ cursor: 'pointer' }}

          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16"
              onClick={(e) => handelEditUser(item.id)}
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </td>
        </tr>
      )
    }
    //render default
    return (
      <tr  >
        <td>{index + 1}</td>
        <td >{item.id}</td>
        <td>{item.fullname}</td>
        <td>{item.age}</td>
        <td className={'pen id_' + item.id}
          style={{ cursor: 'pointer' }}
          onClick={(e) => handelEditUser(item.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        </td>
      </tr>
    )
  }
  const handelOnSearch = (str) => {
    setstrSearch(str)
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
  return (
    <div className='user-page'>
      <Container>
        <Row>
          <Col md={3}>
            <ToolbarLeft />
          </Col>
          <Col md={9}>
            {
              tab !== 1 ? <AddNewUser /> :
                (
                  <Row>
                    <div className='search-form'>
                      <form action='' method=''>
                        <div className='search-form__input'>
                          <input type='text' name='search' placeholder='Search...'
                            value={strSearch}
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
                    {
                      listUserToShow?.length > 0 ?
                        (<>
                          <Table striped>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>FULL NAME</th>
                                <th>AGE</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody className='mytable'>
                              {
                                listUserToShow?.slice(indexPage * 10, (indexPage * 10) + 10).map((item, idx) => <RenderUser key={idx} item={item} index={idx} />)
                              }
                            </tbody>
                          </Table>
                          <Pagination className='my-pagination'>

                            {
                              Array(listUserToShow?.length<
                                10?numPage:numPage+1).fill().map((value, idx) =>
                                <Pagination.Item
                                  key={idx}
                                  onClick={() => setindexPage(idx)}
                                >
                                  {idx + 1}
                                </Pagination.Item>)
                            }


                          </Pagination>
                        </>) : <div className="alert alert-warning mt-2" role="alert">
                          No results were found!
                        </div>

                    }
                  </Row>
                )
            }

          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default User