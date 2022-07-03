import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Nav, Card } from "react-bootstrap";
import { listStaff, deleteUser } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/loader/Loader";
import { Link, Route } from "react-router-dom";
import Searchbox from "../../components/SearchBox/Searchbox";
import Paginate from "../../components/Pagination/Paginate";

const StaffScreen = ({ history, match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const staffList = useSelector((state) => state.staffList);
  const { loading, error, users, page, pages } = staffList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listStaff(keyword, pageNumber));
    } else {
      history.push("/login");
    }
    
  }, [dispatch, history, keyword, successDelete, userInfo, pageNumber ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Card>
          <Fragment>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <Nav className="me-auto d-flex align-items-center">
                  <Nav.Item style={{ marginRight: "10px", lineHeight: "50px" }}>
                    <h3 style={{ paddingTop: "8px" }}>Staff Members</h3>
                  </Nav.Item>
                  {userInfo && userInfo.isAdmin && (
                    <Nav.Item>
                      <Link to="/staff/add" className="btn btn-info">
                        Add Staff Member
                      </Link>
                      {keyword !== undefined ? (
                        <Link to="/staff" className="btn btn-info">
                        GO Back
                      </Link>
                      ) : ('')}
                    </Nav.Item>
                  )}
                </Nav>
                <Route render={({ history }) => <Searchbox history={history} />} />
              </div>
            </Card.Header>
            <Card.Body>
              {users.length === 0 ? (
                <p>No Users Found</p>

              ) : (
                <Fragment>
                  <p>Total number of users: {users.length}</p>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>
                            <Link to={`/staffprofile/${user._id}`}>{user.name}</Link>
                          </td>
                          <td>{user.role}</td>
                          <td>{user.email}</td>
                          <td>{user.isAdmin ? <i className="fas fa-check" style={{ color: "green" }}></i> : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                          <td>
                            <Link to={`/staff/edit/${user._id}`} className="btn-sm btn btn-info" style={{ marginRight: "10px" }}>
                              Edit
                            </Link>
                            {user._id !== userInfo._id ? (
                              <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                              DELETE
                              </Button>
                            ) : ('') }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Paginate pages={pages} page={page} keyword={keyword ? keyword: ''} />
                </Fragment>
              )}
            </Card.Body>
          </Fragment>
        </Card>
      )}
    </>
  );
};

export default StaffScreen;
