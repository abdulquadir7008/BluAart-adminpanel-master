import React,{useState,useEffect} from 'react'
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useAddHomePageBannerMutation } from '../../../Store/Store';
import { toast,ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { cmsBannerSchema } from "../../Schema";


const AddHomePageBanner = () => {
    const [addHome,responseInfo]=useAddHomePageBannerMutation();
const initialValues = {
        banner_image: "",
        banner_title: "",
        banner_description: "",
        status:"",

};

const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
useFormik({
  initialValues,
  validationSchema: cmsBannerSchema,
  onSubmit: (values, action) => {
    console.log(
      values
    );
    addHome(values)
    action.resetForm();
  },
});
console.log(
errors
);

useEffect(() => {

if(responseInfo?.data?.status === true) {
    toast?.success(responseInfo?.data?.message)
    setTimeout(() => (window.location.href = "/homepage-list"), 2000);
} else {
    toast?.error(responseInfo?.data?.message)           
}

}, [responseInfo])
  return (
        <>
         <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Add Home Page Banner">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit} >
                        <div className="row g-4">
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="name"
                              name="banner_image"
                              placeholder="Banner Image"
                              value={values.banner_image}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.banner_image && errors.banner_image ? (
                              <p  className="form-error">{errors.banner_image}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="name"
                              name="banner_title"
                              placeholder="Banner Title"
                              value={values.banner_title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.banner_title && errors.banner_title ? (
                              <p  className="form-error">{errors.banner_title}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="name"
                              name="banner_description"
                              placeholder="Banner Description"
                              value={values.banner_description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.banner_description && errors.banner_description ? (
                              <p  className="form-error">{errors.banner_description}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <select className="filter-select bg-gray w-100" name="status" 
                            value={values.status} onChange={handleChange}
                            onBlur={handleBlur}
                             >
                              <option  >active</option>
                              <option  >inactive</option>

                            </select>
                            {touched.status && errors.status ? (
                              <p  className="form-error">{errors.status}</p>
                            ) : null}
                          </div>

                   
                          <div className="col-12">
                            <input
                              className="btn btn-primary w-100 rounded-pill"
                              type="submit"
                              value={"Save"}
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

export default AddHomePageBanner