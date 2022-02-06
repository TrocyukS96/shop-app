import React from 'react';
import './App.css';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Route} from "react-router-dom";
import {Menu} from "@material-ui/icons";

function App() {
  return (
    <div className="App">
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h6">
              News
            </Typography>

          </Toolbar>

        </AppBar>
        <Container fixed>
          <Route exact path={'/'} render={() => <div>123</div>}/>
          <Route exact path={'/'} render={() => <div>456</div>}/>
        </Container>
      </div>
    </div>
  )
}

export default App
