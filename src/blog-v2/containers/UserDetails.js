import React from 'react';
import { useParams, Link, Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { Container, Grid, Card, Image, Icon, Header, List } from "semantic-ui-react";
import useData from "../hooks/useData";
import LoadingOverlay from "../LoadingOverlay";
import Album from "./Album";
import Posts from "./Posts";
import Todos from "./Todos";


export default function UserDetails() {
  const { userId } = useParams();
  const { path, url } = useRouteMatch()
  const [albums, , errorAlbums] = useData(`/users/${userId}/albums`, []);
  const [user, isLoading, error] = useData(`/users/${userId}`, null);

  if (error && error.status === 404) {
    console.log(error);
    return <Redirect to={`/users`} />
  } else if (errorAlbums && errorAlbums.status === 404){
    console.log(errorAlbums);
    return <Redirect to={`/users/${userId}`} />
  }


  return (
    <Container>
      <LoadingOverlay active={isLoading} />
      {user &&
        <Grid>
          <Grid.Column width={6}>
            <Card>
              <Image src='https://semantic-ui.com/images/avatar2/large/kristy.png' wrapped ui={false} />
              <Card.Content>
                <Card.Header>{user.name}</Card.Header>
                <Card.Meta>
                  <span className='date'>{user.email}</span>
                </Card.Meta>
                <Card.Description>
                  {user.address.city}, {user.address.street} {user.address.zipcode}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                Company name: {user.company.name}
              </Card.Content>
              <Card.Content extra>
                <Link to={`${url}/posts`}>{user.name} posts</Link>
              </Card.Content>
              <Card.Content extra>
                <Link to={`${url}/todos`}>{user.name} todos</Link>
              </Card.Content>
              <Card.Content extra>
                <Icon name='camera' />
                {albums.length} Albums
                <List>
                  {albums.map(album => <List.Item key={album.id}>
                    <Link to={`${url}/albums/${album.id}`}>{album.title}</Link>
                  </List.Item>)}
                </List>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={10}>
            <Switch>
              <Route exact path={path}>
                <Header as='h3'>Select an album, posts or tasks</Header>
              </Route>
              <Route path={`${path}/albums/:albumId`}>
                <Album />
              </Route>
              <Route path={`${path}/posts`}>
                <Posts />
              </Route>
              <Route path={`${path}/todos`}>
                <Todos />
              </Route>
              <Route path='*'>
                <Header as='h3'>Select an album, posts or tasks</Header>
              </Route>
            </Switch>
          </Grid.Column>
        </Grid>
      }
    </Container>
  );
}


