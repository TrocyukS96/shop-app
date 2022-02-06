import React from 'react';
import s from './CartForm.module.scss';
import {Button, TextField} from "@material-ui/core";
import {useFormik} from "formik";

//types
type FormValuesType = {
    name: string
    surname: string
    address: string
    phone: string
}


export const CartForm = () => {
    const formik = useFormik({
        validate: (values) => {
        },
        initialValues: {
            name: '',
            surname: '',
            address: '',
            phone: ''
        },
        onSubmit:  (values: FormValuesType) => {
            alert(JSON.stringify(values))
            formik.resetForm()
        },
    })
    return (
        <form className={s.cartForm} onSubmit={formik.handleSubmit}>
                <TextField
                    label="name"
                    variant="outlined"
                    margin='normal'
                    {...formik.getFieldProps("name")}
                />
                <TextField
                    label={"surname"}
                    variant="outlined"
                    margin='normal'
                    {...formik.getFieldProps("surname")}
                />
                <TextField
                    label={"address"}
                    variant="outlined"
                    margin='normal'
                    {...formik.getFieldProps("address")}
                    />
                <TextField
                    label={"phone"}
                    variant="outlined"
                    type='tel'
                    margin='normal'
                    {...formik.getFieldProps("phone")}
                />
            <Button className={s.cartBtn} variant='contained' color='primary' type='submit'>ORDER</Button>

        </form>
    )
}


