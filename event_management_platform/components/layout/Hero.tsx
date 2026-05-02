"use client";

import { Box, Heading, Text, VStack, Button, HStack } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box py={24} px={6} textAlign="center">
      
      <VStack gap={6} maxW="800px" mx="auto">

        {/* Headline */}
        <Heading size="2xl">
          Discover & Manage Events Easily
        </Heading>

        {/* Subtitle */}
        <Text fontSize="lg" color="gray.600">
          Join, create, and manage events in one simple platform. 
          Perfect for communities, clubs, and organizations.
        </Text>

        {/* Buttons */}
        <HStack gap={4}>
          <Button colorScheme="teal" size="lg">
            Browse Events
          </Button>
          <Button variant="outline" size="lg">
            Create Event
          </Button>
        </HStack>

      </VStack>

    </Box>
  );
}