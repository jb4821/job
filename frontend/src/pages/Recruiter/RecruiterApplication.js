import React from "react";
import "./RecruiterApplication.css";
import Navbar from "../../components/Navbar";

const RecruiterApplication = () => {
  return (
    <>
      <Navbar />
      <div>
        <h4 className="bold-center">Job Applications</h4>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Mobile No.</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="img/user1.jpg"
                    className="circle-img circle-img--small mr-2"
                    alt="User Img"
                  />
                  <div className="user-info__basic">
                    <h5 className="mb-0">Kiran Acharya</h5>
                    {/* <p className="text-muted mb-0">@kiranacharyaa</p> */}
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-baseline">
                  <h4 className="mr-1">$1,253</h4>
                  <small className="text-success">
                    <i className="fa fa-arrow-up"></i>5%
                  </small>
                </div>
              </td>
              <td>kiran@kiranmail.com</td>
              <td>
                <button className="btn btn-success btn-sm mr-2">Download Resume</button>
              </td>
              <td>
                <button className="btn btn-success btn-sm mr-2">Accept</button>
                <button className="btn btn-success btn-sm">Reject</button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="img/user2.jpg"
                    className="circle-img circle-img--small mr-2"
                    alt="User Img"
                  />
                  <div className="user-info__basic">
                    <h5 className="mb-0">Sandeep Sandy</h5>
                    <p className="text-muted mb-0">@sandeep</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-baseline">
                  <h4 className="mr-1">$1,051</h4>
                  <small className="text-success">
                    <i className="fa fa-arrow-up"></i>5%
                  </small>
                </div>
              </td>
              <td>Bangalore</td>
              <td>sandeep@sandeepmail.com</td>
              <td>
                <button className="btn btn-success btn-sm">Congratulate</button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="img/user3.jpg"
                    className="circle-img circle-img--small mr-2"
                    alt="User Img"
                  />
                  <div className="user-info__basic">
                    <h5 className="mb-0">John Doe</h5>
                    <p className="text-muted mb-0">@johndoe</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-baseline">
                  <h4 className="mr-1">$1,012</h4>
                  <small className="text-success">
                    <i className="fa fa-arrow-up"></i>5%
                  </small>
                </div>
              </td>
              <td>Bangalore</td>
              <td>kiran@kiranmail.com</td>
              <td>
                <button className="btn btn-success btn-sm">Congratulate</button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="img/user4.jpg"
                    className="circle-img circle-img--small mr-2"
                    alt="User Img"
                  />
                  <div className="user-info__basic">
                    <h5 className="mb-0">John Noakes</h5>
                    <p className="text-muted mb-0">@johnnoakes</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-baseline">
                  <h4 className="mr-1">$986</h4>
                  <small className="text-success">
                    <i className="fa fa-arrow-up"></i>5%
                  </small>
                </div>
              </td>
              <td>Bangalore</td>
              <td>kiran@kiranmail.com</td>
              <td>
                <button className="btn btn-success btn-sm">Congratulate</button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="img/user5.jpg"
                    className="circle-img circle-img--small mr-2"
                    alt="User Img"
                  />
                  <div className="user-info__basic">
                    <h5 className="mb-0">Tom harry</h5>
                    <p className="text-muted mb-0">@tomharry</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-baseline">
                  <h4 className="mr-1">$951</h4>
                  <small className="text-success">
                    <i className="fa fa-arrow-up"></i>5%
                  </small>
                </div>
              </td>
              <td>Bangalore</td>
              <td>kiran@kiranmail.com</td>
              <td>
                <button className="btn btn-success btn-sm">Congratulate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecruiterApplication;
