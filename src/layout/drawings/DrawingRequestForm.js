import React, { Component } from "react";
import { Field, reduxForm, SubmissionError, initialize } from "redux-form";
import { database } from "../../database/database";
import { renderInputField, renderTextAreaField,renderCheckField, RenderAlert } from '../component/formFields';
import { validate, warn } from '../../util/validate';
import { normalizePhone } from '../../util/normalizePhone';

const DrawingRequestTerms = () => (
  <div>
    <h1 className="blog-title text-center">Transmittal of PDF drawing files</h1>               
              <ul>
                <li>
                  DWG. DCI-100-A: Discipline Interface Chart during design basis memorandum (DBM) phase
                  {" "}
                </li>
                <li>
                  DWG. DCI-100-B: Discipline Interface Chart during EDS & Detailed engineering phase
                  {" "}
                </li>
              </ul>
              <div id="terms" className="card card-outline-danger">
              <div className="card-block">              
                <strong> " Copyright disclosure and agreement " </strong>
                <p>
                  By accepting the electronic files for these drawings, you have agreed that hte information contained here-in shall be for your own personal use and that they will not be altered or reproduced in any way, or distributed to others for any other purpose.
                </p>
              </div>
              </div>
  </div>
);

class DrawingRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agree: " ",
      firstname: " ", 
      lastname: "",
      email: " ",
      street: "",
      city: "",
      province: "",
      country: "",
      post: "",
      phone:"",
      message: " "
    };
  }
componentDidMount() {
  this.handleInitialize();
}

handleInitialize() {
  initialize(this.state);
}
  
  render() {
    const { handleSubmit, pristine, reset, submitting, submitSucceeded } = this.props;

    const submit = (values) => {
      const { reset } = this.props;
      let timeStamp = new Date();
     let transmittal = {
        lastname: values.lastname,
        firstname:values.firstname,
        email: values.email,
        street: values.street,
        city: values.city,
        province: values.province,
        country: values.country,
        post: values.post,
        phone: values.phone,        
        message: values.message,
        agree: values.agree,
        timeStamp: timeStamp.toString()
      };

      const ref = database.ref().child("transmittals/");
      ref.push(transmittal).catch(error => {
        console.log(error);
        throw new SubmissionError("Deliver failed!");
      }).then(() => {
          setTimeout(function() {
                reset()
              }, 1000);
      });
      database.ref().off();
    }

    return (
      <div className="container" id="transmittal">          
            <DrawingRequestTerms  />          
            <form onSubmit={handleSubmit(submit)}>
            <fieldset>            
                  <Field
            name="agree"
            type="checkbox"
            component={renderCheckField}
            label="Agree"
          />
          <div className="row">
          <div className="col col-md-6">          
           <Field
        name="lastname"
        type="text"
        component={renderInputField}
        label="Last Name"
      />      
      </div>
       <div className="col col-md-6">  
<Field    
        name="firstname"
        type="text"
        component={renderInputField}
        label="First Name"
      />
          </div>
            </div>
      <div className="row">
        <div className="col col-md-6">
        <Field
        name="email"
        type="email"
        component={renderInputField}
        label="Email"
      />
        </div>
            <div className="col col-md-6">
         <Field
        name="phone"
        type="text"
        component={renderInputField}
        label="Phone (Optional)"
        normalize={normalizePhone}
      />
        </div>
      </div>
      

      <div className="row">
      <div className="col col-md-6">
      <Field
        name="street"
        type="text"
        component={renderInputField}
        label="Street"
      />
      </div>
       <div className="col col-md-6">
      <Field
        name="city"
        type="text"
        component={renderInputField}
        label="City"
      />
      </div>
      </div>
       <div className="row">
      <div className="col col-md-4">
<Field
        name="province"
        type="text"
        component={renderInputField}
        label="Province"
      />
      </div>
       <div className="col col-md-4">
 <Field
        name="country"
        type="text"
        component={renderInputField}
        label="Country"
      />  
      </div>
      <div className="col col-md-4">
<Field
        name="post"
        type="text"
        component={renderInputField}
        label="Post Code"
      />
      </div>
      </div>       
      
     <Field
        name="message"
        type="textarea"
        component={renderTextAreaField}
        label="Message"
      />
      <div className="text-center">
        <button
          className="btn btn-lg btn-outline-primary"
          type="submit"
          disabled={submitting}
        >
          Submit
        </button>
        <button
          className="btn btn-lg btn-outline-primary"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </button>
      </div>
      {submitSucceeded ? <RenderAlert message="Transmittal submitted" /> : null }
      </fieldset>
    </form>
        </div>
    );
  }
}

export default reduxForm({
  form: "drawingrequest",
  validate,
  warn
})(DrawingRequestForm);
