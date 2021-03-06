import React from 'react';
import s from './CartForm.module.scss';
import {Button, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {sendOrder} from "../cartReducer";
import {RootStateType} from "../../../store";
//types
export type CartFormValuesType = {
    name: string
    surname: string
    address: string
    phone: string,

}
type CartFormType={
    setOpen:(value:boolean)=>void
    className:string
}
export const CartForm = React.memo((props:CartFormType) => {
    const isSendOrder = useSelector<RootStateType, boolean>(st => st.cart.isSendOrder)
    const dispatch =useDispatch()
    const formik = useFormik({
        validate: (values) => {
        },
        initialValues: {
            name: '',
            surname: '',
            address: '',
            phone: ''
        },
        onSubmit:  async(values: CartFormValuesType) => {
            formik.resetForm()
            dispatch(sendOrder(values))
            if(isSendOrder){
                setTimeout(()=>{
                    props.setOpen(true)
                })
            }
        },
    })
    // const finalClassName = props.className ? `${s.cartForm} ${props.className}` : `${s.cartForm}`
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
})


