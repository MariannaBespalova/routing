import React from 'react';
import { useParams } from "react-router-dom";
import { Container, Header, Card, Grid } from 'semantic-ui-react';
import useData from "../hooks/useData";
import LoadingOverlay from '../LoadingOverlay';


export default function Todos() {
  const { userId } = useParams();
  const [user] = useData(`/users/${userId}`);
  const [todos, isLoading] = useData(`/users/${userId}/todos`);

  return (
    <Container>
      <LoadingOverlay active={isLoading} />
      {user &&
        <Header>{user.name}'s todos</Header>
      }
      <Grid columns="2">
        {todos &&
          todos.map(todo =>
            <Grid.Column key={todo.id}>
              <Card>
                <Card.Content>
                  <Card.Description>
                    {todo.title}
                  </Card.Description>
                  <Card.Meta>
                    <span className='date'>Task completed: {todo.completed? "yes" : "no"}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
          )}
      </Grid>
    </Container>
  )
}


