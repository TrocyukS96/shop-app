import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Grid, Link, Toolbar} from "@material-ui/core";
import {Redirect, Route, Switch} from "react-router-dom";
import {Logo} from "../components/logo/Logo";
import {Cart} from "../features/cart/Cart";
import {Cards} from "../features/cards/Cards";
import {collection,getDocs} from "firebase/firestore";
import {db} from "../firebase";

const skatesCollectionRef = collection(db, "skates");
function App() {
    useEffect(() => {
            getDocs(skatesCollectionRef)
                .then(res=>console.log(res.docs[1].data().img))

    }, []);


    return (
        <div className="App">
            <div className="App">
                <AppBar position="static" style={{position: 'fixed'}}>
                    <Toolbar className='nav'>
                        <Logo/>
                        <div>
                            <Link color="inherit" href={'/cart'}>CART</Link>
                        </div>
                    </Toolbar>

                </AppBar>

                <Grid container spacing={2} justifyContent="center" style={{overflow: 'auto'}}>
                    <Switch>
                        <Route exact path={'/products'}>
                            <Cards/>
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
