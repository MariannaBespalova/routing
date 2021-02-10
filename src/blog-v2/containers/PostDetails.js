import React from 'react';
import { Container, Feed, Comment } from 'semantic-ui-react';
import { useParams, Redirect, Link } from "react-router-dom";
import LoadingOverlay from "../LoadingOverlay";
import useData from "../hooks/useData";



export default function PostDetails() {
  const { postId } = useParams();
  const [post, isLoading, error] = useData(`/posts/${postId}`, null);
  const [comments, areCommentsLoading] = useData(`/posts/${postId}/comments`, null);

  if (error && error.status === 404) {
    console.log(error);
    return <Redirect to={"/posts"} />
  }

  return (
    <Container>
      <LoadingOverlay active={isLoading} />
      {post &&
        <Feed>
          <Feed.Event>
            <Feed.Label>
              <Link to={`/users/${post.userId}/posts`}>
                <img src='https://semantic-ui.com/images/avatar2/large/kristy.png' alt="" />
              </Link>
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary >
                <Feed.User>{post.title}</Feed.User>
              </Feed.Summary>
              <Feed.Extra text>
                {post.body}
              </Feed.Extra>
              <Feed.Extra text>
                <LoadingOverlay active={areCommentsLoading} />
                <Comment.Group threaded>
                  {comments &&
                    comments.map(comment => (
                      <Comment key={comment.id}>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <Comment.Content>
                          <Comment.Author>{comment.email}</Comment.Author>
                          <Comment.Text>{comment.body}</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    ))}
                </Comment.Group>
              </Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      }
    </Container>

  )
}

