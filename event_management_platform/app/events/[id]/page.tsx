import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Heading,
} from "@chakra-ui/react";

import { events } from "@/data/events";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetails({ params }: Props) {
  const { id } = await params; // ✅ unwrap Promise

  const event = events.find((e) => String(e.id) === String(id));

  if (!event) {
    return (
      <Box p={10}>
        <Text>Event not found 😢</Text>
      </Box>
    );
  }

  return (
    <Box maxW="1000px" mx="auto" py={10} px={6}>

      <Box borderRadius="2xl" overflow="hidden" mb={6}>
        <Image
          src={event.image}
          alt={event.title}
          width="100%"
          height="400px"
          objectFit="cover"
        />
      </Box>

      <VStack align="start" gap={5}>

        <Badge colorScheme="teal">{event.category}</Badge>

        <Heading size="xl">{event.title}</Heading>

        <Text color="gray.500">
          📍 {event.location} • 📅 {event.date}
        </Text>

        <Text fontSize="lg">{event.description}</Text>

        <HStack gap={4} pt={4} flexWrap="wrap">

          <Box p={4} borderWidth="1px" borderRadius="xl">
            <Text fontSize="sm" color="gray.500">Price</Text>
            <Text fontWeight="bold">{event.price}</Text>
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="xl">
            <Text fontSize="sm" color="gray.500">Location</Text>
            <Text fontWeight="bold">{event.location}</Text>
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="xl">
            <Text fontSize="sm" color="gray.500">Date</Text>
            <Text fontWeight="bold">{event.date}</Text>
          </Box>

        </HStack>

        <Button colorScheme="teal" size="lg" mt={6}>
          Register for Event
        </Button>

      </VStack>
    </Box>
  );
}