import React from 'react';
import './App.css';
import {AppBar, Grid, Toolbar} from "@material-ui/core";
import {Route} from "react-router-dom";
import {Logo} from "../components/logo/Logo";
import {Cart} from "../features/cart/Cart";
import {Cards} from "../features/cards/Cards";

function App() {
    return (
        <div className="App">
            <div className="App">
                <AppBar position="static">
                    <Toolbar className='nav'>
                        <Logo/>
                        <Cart/>
                    </Toolbar>

                </AppBar>
                <Grid container spacing={2} justifyContent="center">
                    <Route exact path={'/'} render={() => <Cards />}/>
                    <Route path={'/cart'} render={() => <Cart/>}/>
                </Grid>
            </div>
        </div>
    )
}

export default App
