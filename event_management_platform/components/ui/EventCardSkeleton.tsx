"use client";

import { Box, VStack, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function EventCardSkeleton() {
  return (
    <Box borderWidth="1px" borderRadius="2xl" overflow="hidden">

      {/* IMAGE */}
      <Skeleton height="200px" />

      {/* CONTENT */}
      <VStack align="start" p={5} gap={3}>
        <Skeleton height="20px" width="60%" />

        <SkeletonText noOfLines={2} gap="3" width="80%" />

        <HStack width="100%" justify="space-between">
          <Skeleton height="20px" width="30%" />
          <Skeleton height="30px" width="40%" borderRadius="md" />
        </HStack>
      </VStack>

    </Box>
  );
}