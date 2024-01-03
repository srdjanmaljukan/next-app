import React from "react";

interface Props {
  params: { id: number, photoId: number };
}

const PhotosPageDetails = ({ params: { id, photoId } }: Props) => {
  return <div>PhotosPageDetails {photoId} for user {id}</div>;
};

export default PhotosPageDetails;
