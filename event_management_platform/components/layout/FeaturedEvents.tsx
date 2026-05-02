"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Input,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

import EventCard from "@/components/ui/EventCard";
import EventCardSkeleton from "@/components/ui/EventCardSkeleton";
import { events } from "@/data/events";

const MotionBox = motion(Box);

type Category = "All" | "Tech" | "Music" | "Business";

export default function FeaturedEvents() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");

  // 🧊 LOADING STATE (for now false)
  const isLoading = false;

  // ⭐ FEATURED EVENTS
  const featuredEvents = events
    .filter((event) => ["Tech", "Business"].includes(event.category))
    .slice(0, 2);

  // 🔥 FILTERED EVENTS
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box px={8} py={16}>

      {/* ⭐ FEATURED */}
      <MotionBox
        mb={14}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading mb={2}>⭐ Featured Events</Heading>
        <Text color="gray.500" mb={6}>
          Curated picks for you
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {isLoading
            ? Array.from({ length: 2 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))
            : featuredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  location={event.location}
                  date={event.date}
                  image={event.image}
                  price={event.price}
                  category={event.category}
                />
              ))}
        </SimpleGrid>
      </MotionBox>

      {/* 🔥 TRENDING */}
      <Heading mb={6}>🔥 Trending Events</Heading>

      <Input
        placeholder="Search events..."
        mb={6}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <HStack gap={3} mb={8} flexWrap="wrap">
        {["All", "Tech", "Music", "Business"].map((cat) => (
          <Button
            key={cat}
            size="sm"
            colorScheme={category === cat ? "teal" : "gray"}
            onClick={() => setCategory(cat as Category)}
          >
            {cat}
          </Button>
        ))}
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))
          : filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                location={event.location}
                date={event.date}
                image={event.image}
                price={event.price}
                category={event.category}
              />
            ))}
      </SimpleGrid>

      {/* EMPTY STATE */}
      {!isLoading && filteredEvents.length === 0 && (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.500">
            No events found 😢
          </Text>
        </Box>
      )}

    </Box>
  );
}