import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProtectedPage from "../component/ProtectedPage.tsx";
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import HostOnlyPage from "../component/HostOnlyPage.tsx";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../api.ts";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { roomPk } = useParams();

  const { register, watch, handleSubmit, reset } = useForm<IForm>();

  const toast = useToast();

  const navigate = useNavigate();

  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "해당 사진을 추가하였습니다.",
        duration: 2000,
      });
      reset();
      navigate(`/rooms/${roomPk}`);
    },
    onError: () => {
      toast({
        status: "error",
        title: "사진을 추가할 권한이 없습니다.",
        duration: 2000,
        isClosable: true,
      });
      reset();
      navigate("/");
    },
  });

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "uploaded Image file",
          file: `https://imagedelivery.net/5fz2uymv7PzfIfz2Y7_xhA/${result.id}/public`,
          roomPk,
        });
      }
    },
  });

  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });

  const onSubmit = (data: any) => {
    uploadURLMutation.mutate();
  };

  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}> 방 사진 추가하기</Heading>
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={5}
            mt={10}
          >
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*" />
            </FormControl>
            <Button
              isLoading={
                createPhotoMutation.isLoading ||
                uploadImageMutation.isLoading ||
                uploadURLMutation.isLoading
              }
              type="submit"
              w="full"
              colorScheme={"red"}
            >
              추가하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
