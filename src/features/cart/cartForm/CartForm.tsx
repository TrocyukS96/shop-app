import React from 'react';
import s from './CartForm.module.scss';
import {Button, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {
    collection,
    addDoc

} from "firebase/firestore";
import {db} from "../../../firebase";
import skateImg3 from "../../../assets/images/skates/alphaCapricePlayer.jpg";
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
        onSubmit:  async(values: FormValuesType) => {
            const item = {
                task: 'Mara',
                done: false,
            };
            const usersCollectionRef = collection(db, "users");
             const skatesCollectionRef = collection(db, "skates");
           // await addDoc(usersCollectionRef, {name:'adaw', age:123})
            await addDoc(skatesCollectionRef,     {
                img:skateImg3,
                type:'ice skates',
                name:"alpha Caprice Frosty Silver",
                price:132,
                freeShipping:true
            },)
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


