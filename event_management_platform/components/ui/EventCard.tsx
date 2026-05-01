"use client";

import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
} from "@chakra-ui/react";

import Link from "next/link";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

type EventCardProps = {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
  price: string;
  category: string;
};

export default function EventCard({
  id,
  title,
  location,
  date,
  image,
  price,
  category,
}: EventCardProps) {
  return (
    <Link href={`/events/${id}`} style={{ width: "100%" }}>

      <MotionBox
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        bg="white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        boxShadow="sm"
      >

        {/* IMAGE */}
        <Box position="relative">
          <Image
            src={image}
            alt={title}
            width="100%"
            height="200px"
            objectFit="cover"
          />

          <Badge position="absolute" top="3" left="3" colorScheme="teal">
            {category}
          </Badge>

          <Badge position="absolute" top="3" right="3" colorScheme="purple">
            {price}
          </Badge>
        </Box>

        {/* CONTENT */}
        <VStack align="start" p={5} gap={3}>
        <Text
            fontWeight="bold"
            fontSize="lg"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            >
            {title}
        </Text>
          <Text fontSize="sm" color="gray.500">
            📍 {location}
          </Text>

          <Text fontSize="sm" color="gray.500">
            📅 {date}
          </Text>

          <Button size="sm" colorScheme="teal" width="100%">
            View Details
          </Button>
        </VStack>

      </MotionBox>
    </Link>
  );
}