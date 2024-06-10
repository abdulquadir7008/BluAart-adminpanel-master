import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
    useEditUserAgreementMutation,
  useGetOneUserRoleInfoMutation
} from "../Store/Store";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Editor from '../components/CkEditor/CkEditor';
import Loader from '../components/loader/Loader';
import CryptoJS from 'crypto-js';

const EditUserRole = () => {
  const { id } = useParams();
  let navigate = useNavigate();

    //ck
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    useEffect(() => {
      setEditorLoaded(true);
    }, []);
    //ck

  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useGetOneUserRoleInfoMutation();
  const [editCategory, responseInfo] = useEditUserAgreementMutation();
  const [isLoading, setIsLoading] = useState(false);

  console.log("category data", responseInfo)

  const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

  const getOneData = async () => {
    setIsLoading(true)
    const updateUserDetails = await editdates({ "Id": decodeURIComponent(decryptedItem) }).then(res => {
      setShowCategory(res?.data?.info, "res")
      setIsLoading(false)
    })
    console.log(updateUserDetails, "details")
  }
  const newPost = {
        "Agreement": data,
        "Id": decodeURIComponent(decryptedItem) 
  }

  const handleSubmit = async (e) => {
    // debugger;
setIsLoading(true)
    e.preventDefault();
    console.log("edited post", newPost);
    await editCategory(newPost);

  }
  useEffect(()=>{
    getOneData();
  },[])

  useEffect(() => {
    if (responseInfo?.data?.status) {
      setIsLoading(false)
      toast?.success(responseInfo?.data?.info)
      setTimeout(() => navigate("/user-role"), 2000);
    } else {
      toast?.error(responseInfo?.data?.info)
    }
  }, [responseInfo])
  return (
    <>
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        {isLoading && <Loader />}
        <div className="container">
          <div className="row g-4 justify-content-center">
                    <div className='d-flex flex-wrap justify-content-end px-5'>
                        <div className=''>
                            <div className='btn-right'>
                                <Link className="btn btn-danger  btn-sm w-10" to="/user-role" >
                                <i class="bi bi-chevron-double-left"></i>Back
                                </Link>
                            </div>
                        </div>
                    </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Edit User Role">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit}>
                        <div className="row g-4">
                        <Editor value={showCategory.Agreement}
                            name="description"
                            onChange={(data) => {
                              setData(data);
                            }}
                            editorLoaded={editorLoaded}
                          />
                          
                         
                          <div className="col-12">
                            <input
                              className="btn btn-primary w-100 rounded-pill"
                              type="submit"
                              value={"Update"}
                            />
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUserRole