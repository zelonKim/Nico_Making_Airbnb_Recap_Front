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
  removeRoom,
  uploadRoom,
} from "../api.ts";
import { IAmenity, ICategory, IRoomDetail, IRoomList } from "../../types.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface IRemoveRoomVariables {
  name: string;
}

export default function RemoveRoom() {
  const { register, watch, handleSubmit } = useForm<IRemoveRoomVariables>();

  const { data, isLoading } = useQuery<IRoomList[]>(["rooms"], getRooms);

  const navigate = useNavigate();

  const onSubmit = ({ name }) => {
    navigate(`${name}`);
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
        <Container>
          <Heading textAlign={"center"}>방 삭제하기</Heading>

          <VStack
            spacing={10}
            mt={5}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl mt={10} mb={-5}>
              <Select
                {...register("name", { required: true })}
                placeholder="삭제할 방을 선택해주세요"
              >
                {data?.map((room) => (
                  <option key={room.pk} value={room.pk}>
                    {room.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>한번 삭제한 방은 다시 되돌릴 수 없습니다.</FormHelperText>
            </FormControl>

            <Button type="submit" colorScheme={"red"} size="lg" w="100%">
              삭제하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
