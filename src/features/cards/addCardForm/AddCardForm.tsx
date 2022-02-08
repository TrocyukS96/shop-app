import React, {ChangeEvent, useState} from 'react';
import s from './AddCardForm.module.scss';
import {Button, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {addCard} from "../../../bll/cards-reducer";

//types
type FormValuesType = {
    type: string
    name: string
    price: number
    freeShipping: boolean
}


export const AddCardForm = () => {
    //hooks
    const [file, setFile] = useState<any>();
    const [fileURL, setFileURL] = useState<any>();
    const [fileData, setFileData] = useState<any>();
    const [file64, setFile64] = useState<any>();
    const [base64, setBase64] = useState(true);
    const [code, setCode] = useState(true);
    const dispatch = useDispatch()

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const formData = new FormData(); // for send to back
        const newFile = e.target.files && e.target.files[0];  //достаем из таргета файлы, если файлы есть - прилетает массив, откуда достаем 0
        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));  //спецовая функция Window, так мы можем отобразить newFile в img, эта функция генерит спец ссылку, которая видна только внутри этого проекта
            formData.append('myFile', newFile, newFile.name);
            setFileData(formData);

            if (code) { // reader
                reader.onloadend = () => {
                    setFile64(reader.result);
                };

                if (base64) reader.readAsDataURL(newFile);
                else reader.readAsText(newFile);
            }
        }
    };
    const formik = useFormik({
        validate: (values) => {
        },
        initialValues: {
            type: '',
            name: '',
            price: 0,
            freeShipping: false
        },
        onSubmit: (values: FormValuesType) => {
            const formData =
                {
                    image: file64,
                    name: values.name,
                    type: values.type,
                    price:values.price,
                    freeShipping: values.freeShipping
                }
            dispatch(addCard(formData))

            formik.resetForm()
            setFile64('')
            setFile('')
        },
    })
    return (
        <form className={s.cardForm} onSubmit={formik.handleSubmit}>
            <TextField
                variant="outlined"
                margin='normal'
                type='file'
                onChange={upload}
            />
            <img className={s.cardImg} src={file64} alt="card-image"/>
            <span>{file && file.name}</span>
            <TextField
                label="type"
                variant="outlined"
                margin='normal'
                {...formik.getFieldProps("type")}
            />
            <TextField
                label="name"
                variant="outlined"
                margin='normal'
                {...formik.getFieldProps("name")}
            />
            <TextField
                label="price"
                variant="outlined"
                type='number'
                margin='normal'

                style={{borderBottom: 'none'}}
                {...formik.getFieldProps("price")}
            />
            <TextField
                label="freeShipping"
                type='checkbox'
                margin='normal'
                variant={'standard'}
                InputProps={{
                    disableUnderline: true, // <== added this
                }}
                className={s.checkbox}
                {...formik.getFieldProps("freeShipping")}
            />
            <Button className={s.cartBtn} variant='contained' color='primary' type='submit'>add new Card</Button>

        </form>
    )
}


