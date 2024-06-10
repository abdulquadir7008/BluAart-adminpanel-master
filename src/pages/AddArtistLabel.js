import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from 'react-toastify';
import {
  useAddArtistLabelMutation
} from "../Store/Store";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';

const AddArtistLabel = () => {
  let navigate = useNavigate()
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("Active");
  const [addMaterial, responseInfo] = useAddArtistLabelMutation();
  const [isLoading, setIsLoading] = useState(false);

  const newPost = {
    "Title": categoryTitle,
    "Status": categoryStatus,
  }

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    if (!categoryTitle) {
      setIsLoading(false)
      toast.error("Please enter a Artist Label");
      return;
    }
    addMaterial(newPost);
  }

  useEffect(() => {
    if (responseInfo?.data?.status) {
      setIsLoading(false)
      toast?.success(responseInfo?.data?.info)
      setTimeout(() => navigate("/artist-label"), 1000);
    } else if (responseInfo?.data?.info) {
      setIsLoading(false)
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
                  <Link className="btn btn-danger  btn-sm w-10" to="/artist-label" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <h3>Add Artist Label</h3>

              <div className="card">
                <div className="card-body p-4 p-sm-5">
                  <Form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-12">
                        <input
                          className="form-control card shadow"
                          type="text"
                          id="name"
                          name="title"
                          placeholder="Your Artist Label Name..."
                          onChange={e => setCategoryTitle(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <select className="filter-select bg-gray w-100" name="status"
                          onChange={e => setCategoryStatus(e.target.value)}
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <input
                          className="btn btn-primary w-100 rounded-pill"
                          type="submit"
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddArtistLabel;
