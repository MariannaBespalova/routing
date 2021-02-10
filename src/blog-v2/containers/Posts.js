import React from 'react';
import { Link, useParams } from "react-router-dom";
import { Container, Feed, Header } from 'semantic-ui-react';
import useData from "../hooks/useData";
import LoadingOverlay from "../LoadingOverlay";



export default function Posts() {
  const { userId } = useParams();
  const postUrl = userId ? `/users/${userId}/posts` : '/posts'
  const [posts, isLoading] = useData(postUrl, []);
  const [user] = useData(`/users/${userId}`)

  return (
    <Container>
      <LoadingOverlay active={isLoading} />
      {user&&
        <Header>{user.name}'s posts</Header>
      } 
      {posts &&
        posts.map(post => (
          <Feed key={post.id}>
            <Feed.Event>
              <Feed.Label>
                <Link to={`/users/${post.userId}/posts`}>
                  <img src='https://semantic-ui.com/images/avatar2/large/kristy.png' alt=""/>
                </Link>
              </Feed.Label>
              <Feed.Content>
                <Feed.User>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </Feed.User>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        ))}

    </Container>
  )
}

