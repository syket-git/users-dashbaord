"use client";

import { ColorModeButton } from "@/components/ui/color-mode";
import { User } from "@/interfaces/user";
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const UserDetailsPage = ({ data: user }: { data: User }) => {
  const router = useRouter();
  const handleBack = () => {
    router.push("/");
  };

  return (
    <Container p="5">
      <HStack justify="space-between" align="center" py="5">
        <IconButton size="sm" onClick={handleBack} aria-label="Search database">
          <FaArrowLeft />
        </IconButton>
        <ColorModeButton />
      </HStack>

      {user && (
        <Box
          p="5"
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          mt="5"
          bg="gray.50"
          _dark={{ bg: "gray.800" }}
        >
          <Heading size="lg" mb="4">
            {user.name}{" "}
            <Badge colorScheme={user.gender === "male" ? "blue" : "pink"}>
              {user.gender}
            </Badge>
          </Heading>
          <Text>
            <strong>Email:</strong> {user.email}
          </Text>
          <Text>
            <strong>Status:</strong>{" "}
            <Badge colorScheme={user.status === "active" ? "green" : "red"}>
              {user.status}
            </Badge>
          </Text>
          <Text mt="4">
            <strong>ID:</strong> {user.id}
          </Text>
        </Box>
      )}
    </Container>
  );
};
export default UserDetailsPage;
