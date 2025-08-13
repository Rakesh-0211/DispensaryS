import React, { useState } from "react";
import "./forgotModal.css";
import { use } from "react";
export const ForgotModal = (props) => {
  const [step, setStep] = useState(1);
  const [buttonText, setButtonText] = useState("Send OTP.");
  return (
    <div className="forgot-password-modal">
      <div className="signup-page-card">
        <div className="card-header-form">Reset Password</div>
        <div className="form-input-fields">
          <input
            className="form-input"
            type="email"
            placeholder="Enter Email Id"
          />
          {(step === 2 || step === 3) && (
            <input className="form-input" type="text" placeholder="Enter OTP" />
          )}
          {step === 3 && (
            <input
              className="form-input"
              type="password"
              placeholder="New Password"
            />
          )}
        </div>
        <div className="form-btn forgot-password-btn"
        onClick={handleForgotBtn}>{buttonText}</div>
        <div
          className="form-btn forgot-password-btn"
          onClick={() => props.closeModal()}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};
