"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  Button,
  IconButton,
  VStack,
} from "@chakra-ui/react";

import NextLink from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen((prev) => !prev);

  return (
    <Box
      bg="white"
      px={8}
      py={4}
      shadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex align="center" justify="space-between">

        {/* Logo */}
        <Text fontSize="lg" fontWeight="bold" color="teal.700">
          Eventify
        </Text>

        {/* Desktop Links */}
        <HStack gap={8} display={{ base: "none", md: "flex" }}>
          <NextLink href="/" passHref>
            <Text cursor="pointer" _hover={{ color: "teal.500" }}>
              Home
            </Text>
          </NextLink>

          <NextLink href="/events" passHref>
            <Text cursor="pointer" _hover={{ color: "teal.500" }}>
              Events
            </Text>
          </NextLink>

          <NextLink href="/dashboard" passHref>
            <Text cursor="pointer" _hover={{ color: "teal.500" }}>
              Dashboard
            </Text>
          </NextLink>
        </HStack>

        {/* Desktop Buttons */}
        <HStack gap={3} display={{ base: "none", md: "flex" }}>
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button colorScheme="teal" size="sm">
            Sign Up
          </Button>
        </HStack>

        {/* Mobile Menu Button (FIXED FOR CHAKRA v3) */}
        <IconButton
          aria-label="menu"
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </IconButton>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <VStack mt={4} gap={4} align="start" display={{ md: "none" }}>
          <NextLink href="/" passHref>
            <Text onClick={onToggle} cursor="pointer">
              Home
            </Text>
          </NextLink>

          <NextLink href="/events" passHref>
            <Text onClick={onToggle} cursor="pointer">
              Events
            </Text>
          </NextLink>

          <NextLink href="/dashboard" passHref>
            <Text onClick={onToggle} cursor="pointer">
              Dashboard
            </Text>
          </NextLink>

          <Button width="100%" variant="ghost">
            Login
          </Button>

          <Button width="100%" colorScheme="teal">
            Sign Up
          </Button>
        </VStack>
      )}
    </Box>
  );
}