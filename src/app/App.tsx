import React, {useEffect, useState} from 'react';
import './App.css';
import {AppBar, CircularProgress, Grid, Link, Toolbar} from "@material-ui/core";
import {Redirect, Route, Switch} from "react-router-dom";
import {Logo} from "../components/logo/Logo";
import {Cart} from "../features/cart/Cart";
import {Cards} from "../features/cards/Cards";
import {useDispatch, useSelector} from "react-redux";
import {getCards} from "../features/cards/cards-reducer";
import {RootStateType} from "./store";
import {RequestStatusType} from "../features/application/application-reducer";
import {getPurchases} from "../features/cart/cartReducer";

function App() {
    const status = useSelector<RootStateType, RequestStatusType>(st => st.app.status)
    const cartItemsCount = useSelector<RootStateType, number>(state => state.cart.count)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCards())
        dispatch(getPurchases())
    }, [dispatch,cartItemsCount]);


    return (
        <div className="App">
            <div className="App">
                <AppBar position="static" style={{position: 'fixed'}}>
                    <Toolbar className='nav'>
                        <Logo/>
                        <div>
                            <Link color="inherit" href={'/cart'}>
                                <div className='svgBlock'>
                                    <svg width="40px" height="40px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1015.66 284a31.82 31.82 0 0 0-25.998-13.502H310.526l-51.408-177.28c-20.16-69.808-68.065-77.344-87.713-77.344H34.333c-17.569 0-31.777 14.224-31.777 31.776S16.78 79.425 34.332 79.425h137.056c4.336 0 17.568 0 26.593 31.184l176.848 649.936c3.84 13.712 16.336 23.183 30.591 23.183h431.968c13.409 0 25.376-8.4 29.905-21.024l152.256-449.68c3.504-9.744 2.048-20.592-3.888-29.024zM815.026 720.194H429.539L328.387 334.066h616.096zM752.003 848.13c-44.192 0-80 35.808-80 80s35.808 80 80 80 80-35.808 80-80-35.808-80-80-80zm-288 0c-44.192 0-80 35.808-80 80s35.808 80 80 80 80-35.808 80-80-35.808-80-80-80z"/></svg>
                               <span>{cartItemsCount>0 ? cartItemsCount : ''}</span>
                                </div>
                            </Link>
                        </div>
                    </Toolbar>

                </AppBar>

                <Grid container spacing={2} justifyContent="center" >
                    <Switch>
                        <Route exact path={'/products'}>
                            {
                                status === 'loading'
                                    ? <CircularProgress style={{width: '200px', height: '200px', marginTop:'20%'}}/>
                            : <Cards/>
                            }
                        </Route>
                        <Route path={'/cart'}>
                            <Cart/>
                        </Route>
                        <Redirect from='/' to='/products'/>
                    </Switch>


                </Grid>
            </div>
        </div>
    )
}

export default App
