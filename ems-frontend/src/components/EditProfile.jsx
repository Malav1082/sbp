import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { putApi } from "../services/UserService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            setUser(user);
        }
    }, []);

    const handleUpdateProfile = async (values, { setSubmitting, setErrors }) => {
        const data = {
            userId: user.userId,
            name: values.name,
            mobileNumber: values.mobileNumber
        };
        try {
            await putApi(`/edit-profile/${user.userId}`, data, 'Profile updated successfully!', 'Error updating profile');
            const updatedUser = { ...user, name: values.name, mobileNumber: values.mobileNumber };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            // sessionStorage.setItem('token',JSON.stringify(token));
            setUpdateSuccess(true);
            setTimeout(() => {
                setUpdateSuccess(false);
                navigate(`/home/${user.userId}`);
            }, 2000);
        } catch (error) {
            console.error('Error updating profile:', error);
            setErrors({ general: 'Error updating profile' });
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Username is required'),
        mobileNumber: Yup.string()
            .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
            .required('Mobile Number is required')
    });

    return (
        <>
            <HeaderComponent />
            <Container style={{ width: '30%', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginTop: '12%' }}>
                <h2 style={{ color: "white", textAlign: "center" }}>Edit Profile</h2>
                {updateSuccess && (
                    <Alert color="success">
                        Profile updated successfully!
                    </Alert>
                )}
                {user && (
                    <Formik
                        initialValues={{ name: user.name, mobileNumber: user.mobileNumber }}
                        validationSchema={validationSchema}
                        onSubmit={handleUpdateProfile}
                    >
                        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name" style={{ color: "yellow" }}>Username:</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={handleChange}
                                        disabled
                                        value={values.name}
                                        invalid={errors.name && touched.name}
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="mobileNumber" style={{ color: "yellow" }}>Mobile Number:</Label>
                                    <Input
                                        type="text"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        onChange={handleChange}
                                        value={values.mobileNumber}
                                        invalid={errors.mobileNumber && touched.mobileNumber}
                                    />
                                    <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                                </FormGroup>
                                <Button type="submit" color="primary" disabled={isSubmitting}>Update</Button>
                                <Button type="button" color="secondary" onClick={() => navigate(-1)} style={{ marginLeft: '10px' }}>Back</Button>
                                {errors.general && (
                                    <div className="text-danger" style={{ marginTop: '0.25rem' }}>{errors.general}</div>
                                )}
                            </Form>
                        )}
                    </Formik>
                )}
            </Container>
            <FooterComponent />
        </>
    );
};

export default EditProfile;
