import React, { useEffect, useState } from "react";
import ProtectedPage from "../component/ProtectedPage.tsx";
import HostOnlyPage from "../component/HostOnlyPage.tsx";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IModifyRoomVariables,
  IUploadRoomVariables,
  getAmenities,
  getCategories,
  modifyRoom,
  uploadRoom,
} from "../api.ts";
import { IAmenity, ICategory, IRoomDetail } from "../../types.ts";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "./RoomDetail.tsx";

export default function ModifyRoomDetail() {
  const { register, watch, handleSubmit } = useForm<IRoomDetail>();

  const { roomPk } = useParams();

  const [room, setRoom] = useState<IRoomDetail>();

  const fetchRoom = async () => {
    const response = await fetch(`${baseURL}rooms/${roomPk}`);
    const json = await response.json();
    setRoom(json);
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IRoomDetail[]
  >(["amenities"], getAmenities);

  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    IRoomDetail[]
  >(["categories"], getCategories);

  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(modifyRoom, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        title: "해당 방을 수정하였습니다.",
        status: "success",
        duration: 2000,
      });
      navigate(`/rooms/${data.id}`);
    },
    onError: () => {
      toast({
        title: "방을 수정할 권한이 없습니다.",
        status: "error",
        position: "bottom-right",
      });
    },
  });

  const onSubmit = (data: IModifyRoomVariables) => {
    mutation.mutate(data);
  };

  return (
    <ProtectedPage>
      <Box
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container mb={16}>
          <Heading textAlign={"center"}>방 수정하기</Heading>

          <VStack
            spacing={10}
            mt={5}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>방 고유 번호</FormLabel>
              <Input
                color={"gray"}
                value={room?.id}
                {...register("id", { required: true })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>방 이름</FormLabel>
              <Input
                defaultValue={room?.name}
                {...register("name", { required: true })}
                required
                type="text"
              />
              <FormHelperText>방의 이름은 무엇인가요?</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>국가</FormLabel>
              <Input
                defaultValue={room?.country}
                {...register("country", { required: true })}
                required
                type="text"
              />
            </FormControl>

            <FormControl>
              <FormLabel>도시</FormLabel>
              <Input
                defaultValue={room?.city}
                {...register("city", { required: true })}
                required
                type="text"
              />
            </FormControl>

            <FormControl>
              <FormLabel>주소</FormLabel>
              <Input
                defaultValue={room?.address}
                {...register("address", { required: true })}
                required
                type="text"
              />
            </FormControl>

            <FormControl>
              <FormLabel>가격</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaDollarSign />} />
                <Input
                  defaultValue={room?.price}
                  {...register("price", { required: true })}
                  required
                  type="number"
                  min={1}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>방 개수</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  defaultValue={room?.rooms}
                  {...register("rooms", { required: true })}
                  required
                  type="number"
                  min={1}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>화장실 개수</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  defaultValue={room?.toilets}
                  {...register("toilets", { required: true })}
                  required
                  type="number"
                  min={1}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>설명</FormLabel>
              <Textarea
                defaultValue={room?.description}
                {...register("description", { required: true })}
              />
            </FormControl>

            <FormControl>
              <Checkbox
                defaultChecked={room?.pet_friendly}
                {...register("pet_friendly", { required: false })}
              >
                애완동물 여부
              </Checkbox>
            </FormControl>

            <FormControl>
              <FormLabel>방 종류</FormLabel>
              <Select
                defaultValue={room?.kind}
                {...register("kind", { required: true })}
                placeholder="방의 종류를 선택해주세요"
              >
                <option value="entire_place">Entire Place</option>
                <option value="private_room">Private Room</option>
                <option value="shared_room">Shared Room</option>
              </Select>
              <FormHelperText>방의 종류는 무엇인가요?</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>카테고리</FormLabel>
              <Select
                defaultValue={room?.category.pk}
                {...register("category", { required: true })}
                placeholder="방의 카테고리를 선택해주세요"
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>방의 카테고리는 무엇인가요?</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>편의시설</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk} defaultValue={amenity?.pk}>
                    <Checkbox
                      value={amenity.pk}
                      {...register("amenities", { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>

            {mutation.isError ? (
              <Text color="red.400">유효한 정보를 입력해주세요</Text>
            ) : null}

            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"red"}
              size="lg"
              w="100%"
            >
              수정하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
