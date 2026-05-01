"use client";

import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Link,
  Input,
  Button,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="gray.900" color="white" mt={20} px={8} py={14}>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>

        {/* BRAND */}
        <VStack align="start" gap={3}>
          <Text fontSize="2xl" fontWeight="bold" color="teal.300">
            Eventify
          </Text>

          <Text fontSize="sm" color="gray.400">
            Discover, create, and join amazing events happening around you.
          </Text>

          <Text fontSize="xs" color="gray.500">
            Making events simple and accessible.
          </Text>
        </VStack>

        {/* QUICK LINKS */}
        <VStack align="start" gap={2}>
          <Text fontWeight="bold">Quick Links</Text>

          <Link href="/" _hover={{ color: "teal.300" }}>
            Home
          </Link>
          <Link href="/events" _hover={{ color: "teal.300" }}>
            Events
          </Link>
          <Link href="/dashboard" _hover={{ color: "teal.300" }}>
            Dashboard
          </Link>
        </VStack>

        {/* NEWSLETTER */}
        <VStack align="start" gap={3}>
          <Text fontWeight="bold">Stay Updated</Text>

          <Text fontSize="sm" color="gray.400">
            Subscribe for latest events.
          </Text>

          <HStack width="100%">
            <Input
              placeholder="Enter email"
              bg="white"
              color="black"
              size="sm"
            />
            <Button size="sm" colorScheme="teal">
              Join
            </Button>
          </HStack>
        </VStack>

      </SimpleGrid>

      {/* DIVIDER */}
      <Box borderTop="1px solid" borderColor="gray.700" mt={10} pt={6}>

        <HStack justify="space-between" flexWrap="wrap">

          <Text fontSize="sm" color="gray.500">
            © {new Date().getFullYear()} Eventify. All rights reserved.
          </Text>

          <HStack gap={4}>
            <Link fontSize="sm" color="gray.400" href="#">
              Twitter
            </Link>
            <Link fontSize="sm" color="gray.400" href="#">
              LinkedIn
            </Link>
            <Link fontSize="sm" color="gray.400" href="#">
              GitHub
            </Link>
          </HStack>

        </HStack>

      </Box>

    </Box>
  );
}