import React from "react";
import "./blog-v2.css";
import { BrowserRouter, NavLink, Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Container, Header, Menu } from 'semantic-ui-react';
import Home from "./containers/Home";
import About from "./containers/About";
import Users from "./containers/Users";
import Posts from "./containers/Posts";
import UserDetails from "./containers/UserDetails";
import NotFound from "./containers/NotFound";
import PostDetails from "./containers/PostDetails";

export default function Blog() {
  return (
    <Container>
      <BrowserRouter>
        <Header>
          <NavLink to='/'>Blog V2</NavLink>
        </Header>
        <Menu>
          <NavLink to='/users' className="item">Users</NavLink>
          <NavLink to='/about' className="item">About</NavLink>
          <NavLink to='/posts' className="item">Posts</NavLink>
        </Menu>
        <AnimatedSwitch/>
      </BrowserRouter>
    </Container >
  )
}


function AnimatedSwitch() {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={1000}
        classNames="fade">
        <Switch location={location}>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/users/:userId">
            <UserDetails />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/posts" exact>
            <Posts />
          </Route>
          <Route path="/posts/:postId">
            <PostDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}
