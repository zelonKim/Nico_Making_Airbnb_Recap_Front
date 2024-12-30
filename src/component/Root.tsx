import {
  Box,
  Button,
  ChakraProvider,
  Divider,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import theme from "../theme.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Root() {
  return (
    <Box>
      <Header />
      <Outlet />
      <ReactQueryDevtools />
    </Box>
  );
}
