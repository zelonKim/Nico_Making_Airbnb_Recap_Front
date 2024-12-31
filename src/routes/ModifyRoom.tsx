import React from "react";
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
  IUploadRoomVariables,
  getAmenities,
  getCategories,
  getRooms,
  modifyRoom,
  uploadRoom,
} from "../api.ts";
import { IAmenity, ICategory, IRoomDetail, IRoomList } from "../../types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface IModifyRoom {
  roomPk: string;
}


export default function ModifyRoom() {
  const { register, watch, handleSubmit } = useForm();

  const { data, isLoading } = useQuery<IRoomList[]>(["rooms"], getRooms);

  const navigate = useNavigate();

  const onSubmit = ({ roomPk }: IModifyRoom) => {
    navigate(`${roomPk}`);
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
          <Heading textAlign={"center"}>방 선택하기</Heading>

          <VStack
            spacing={10}
            mt={5}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl mt={10} mb={-5}>
              <Select
                {...register("roomPk", { required: true })}
                placeholder="수정할 방을 선택해주세요"
              >
                {data?.map((room) => (
                  <option key={room.pk} value={room.pk}>
                    {room.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" colorScheme={"red"} size="lg" w="100%">
              선택하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
