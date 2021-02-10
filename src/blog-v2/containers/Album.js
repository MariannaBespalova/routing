import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Container, Header, Image } from "semantic-ui-react";
import GlideJS from '../GlideJS';
import LoadingOverlay from '../LoadingOverlay';
import useData from "../hooks/useData";



export default function Album() {
  const { userId, albumId } = useParams();
  const [album, , error] = useData(`/albums/${albumId}`, {});
  const [photos, isFetching] = useData(`/albums/${albumId}/photos`, []);

  if (error && error.status === 404) {
    console.log(error);
    return <Redirect to={`/users/${userId}`} />
  }

  return (
    <Container>
      <LoadingOverlay active={isFetching} />
      <Header>{album.title}</Header>
      {photos.length > 0 &&
        <GlideJS options={{ type: "carousel" }} >
          {photos.map(photo => <Image src={photo.url} key ={photo.id}></Image>)}
        </GlideJS>
      }
    </Container>
  )
}

