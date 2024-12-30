import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProtectedPage from "../component/ProtectedPage.tsx";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import HostOnlyPage from "../component/HostOnlyPage.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IProfileVariables,
  changeProfile,
  createPhoto,
  getUploadURL,
  uploadImage,
} from "../api.ts";
import useUser from "../lib/useUser.ts";

export default function Profile() {
  const { userLoading, isLoggedIn, user } = useUser();

  const queryClient = useQueryClient();

  const { register, watch, handleSubmit, reset } = useForm<IProfileVariables>();

  const toast = useToast();

  const profileMutation = useMutation(changeProfile, {
    onSuccess: () => {
      queryClient.refetchQueries(["me"]);
      toast({
        status: "success",
        title: "프로필 변경에 성공하였습니다.",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "현재 비밀번호를 입력해주세요",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: any) => {
    profileMutation.mutate(data);
  };

  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>프로필 설정하기</Heading>
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={5}
            mt={16}
          >
            <FormControl>
              <HStack mb={10}>
                <FormLabel w="30%" fontSize="lg" fontWeight="bold">
                  이름
                </FormLabel>

                <Input
                  rounded="lg"
                  {...register("name")}
                  w="90%"
                  ml={30}
                  mb={5}
                  value={user.name}
                  disabled
                />
              </HStack>

              <HStack mb={10}>
                <FormLabel w="30%" fontSize="lg" fontWeight="bold">
                  이메일 주소
                </FormLabel>

                <Input
                  rounded="lg"
                  {...register("email")}
                  w="90%"
                  ml={30}
                  type="email"
                  value={user.email}
                  disabled
                />
              </HStack>

              <HStack mb={10}>
                <FormLabel w="30%" fontSize="lg" fontWeight="bold">
                  현재 비밀번호
                </FormLabel>

                <Input
                  rounded="lg"
                  {...register("oldPassword")}
                  w="90%"
                  ml={30}
                  type="password"
                />
              </HStack>

              <HStack mb={10}>
                <FormLabel w="30%" fontSize="lg" fontWeight="bold">
                  아바타 사진 URL
                </FormLabel>
                <Input
                  defaultValue={user.avatar}
                  rounded="lg"
                  {...register("avatar")}
                  w="90%"
                  ml={30}
                  type="url"
                />
              </HStack>

              <HStack mb={10}>
                <FormLabel w="30%" fontSize="lg" fontWeight="bold">
                  성별
                </FormLabel>
                <RadioGroup defaultValue={user.gender}>
                  <Radio
                    value="male"
                    ml={10}
                    fontSize="xl"
                    {...register("gender")}
                  >
                    남
                  </Radio>
                  <Radio value="female" ml={32} {...register("gender")}>
                    여
                  </Radio>
                </RadioGroup>
              </HStack>

              <HStack mb={10}>
                <FormLabel w="30%" fontSize="lg" fontWeight="bold">
                  언어
                </FormLabel>
                <Select
                  defaultValue={user.language}
                  {...register("language")}
                  placeholder="언어를 선택해주세요"
                >
                  <option value="kr">Korean</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="sp">Spanish</option>
                  <option value="ch">Chinese</option>
                  <option value="jp">Japanese</option>
                  <option value="ar">Arabic</option>
                </Select>
              </HStack>

              <HStack mb={10}>
                <FormLabel w="30%" fontSize="lg" fontWeight="bold">
                  통화
                </FormLabel>
                <Select
                  defaultValue={user.currency}
                  {...register("currency")}
                  placeholder="통화를 선택해주세요"
                >
                  <option value="won">WON</option>
                  <option value="usd">USD</option>
                  <option value="euro">EUR</option>
                  <option value="yuan">CNY</option>
                  <option value="yen">YEN</option>
                  <option value="dirh">AED</option>
                </Select>
              </HStack>
            </FormControl>

            <Button type="submit" w="100%" colorScheme={"red"}>
              설정하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
