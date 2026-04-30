'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Avatar,
  Badge,
  Card,
  Stack,
  HStack,
  VStack,
  SimpleGrid,
  IconButton,
  Button,
  Stat,
  Separator,
} from '@chakra-ui/react'
import { currentUser, registeredEvents } from '@/lib/mockData'
import Link from 'next/link'
import { useState } from 'react'

const statusColors: Record<string, string> = {
  upcoming: 'green',
  ongoing: 'blue',
  completed: 'gray',
  cancelled: 'red',
}

function PersonalInfoCard() {
  return (
    <Card.Root overflow="hidden">
      <Card.Header bg="blue.600" color="white">
        <Flex align="center" gap="4">
          <Avatar.Root size="xl">
            <Avatar.Image src={currentUser.avatar} />
            <Avatar.Fallback name={currentUser.name} />
          </Avatar.Root>
          <Box>
            <Heading size="lg">{currentUser.name}</Heading>
            <Text opacity={0.9}>Attendee Dashboard</Text>
          </Box>
        </Flex>
      </Card.Header>
      <Card.Body>
        <VStack gap="4" align="stretch">
          <HStack justify="space-between">
            <Text fontWeight="medium" color="gray.600">
              Email
            </Text>
            <Text>{currentUser.email}</Text>
          </HStack>
          <Separator />
          <HStack justify="space-between">
            <Text fontWeight="medium" color="gray.600">
              Phone
            </Text>
            <Text>{currentUser.phone}</Text>
          </HStack>
          <Separator />
          <HStack justify="space-between">
            <Text fontWeight="medium" color="gray.600">
              Location
            </Text>
            <Text>{currentUser.location}</Text>
          </HStack>
          <Separator />
          <HStack justify="space-between">
            <Text fontWeight="medium" color="gray.600">
              Member Since
            </Text>
            <Text>{new Date(currentUser.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</Text>
          </HStack>
          <Separator />
          <HStack justify="space-between">
            <Text fontWeight="medium" color="gray.600">
              Bio
            </Text>
            <Text textAlign="right" maxWidth="250px">
              {currentUser.bio}
            </Text>
          </HStack>
        </VStack>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" colorScheme="blue" width="full">
          Edit Profile
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

function StatsOverview() {
  const totalEvents = registeredEvents.length
  const upcomingEvents = registeredEvents.filter((e) => e.status === 'upcoming').length
  const completedEvents = registeredEvents.filter((e) => e.status === 'completed').length
  const totalSpent = registeredEvents.reduce((sum, e) => sum + e.price, 0)

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
      <Stat.Root>
        <Stat.Label>Total Events</Stat.Label>
        <Stat.ValueText>{totalEvents}</Stat.ValueText>
        <Stat.HelpText>Registered events</Stat.HelpText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Upcoming</Stat.Label>
        <Stat.ValueText color="green.500">{upcomingEvents}</Stat.ValueText>
        <Stat.HelpText>Events to attend</Stat.HelpText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Completed</Stat.Label>
        <Stat.ValueText color="gray.500">{completedEvents}</Stat.ValueText>
        <Stat.HelpText>Events attended</Stat.HelpText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Total Spent</Stat.Label>
        <Stat.ValueText color="blue.500">${totalSpent.toFixed(2)}</Stat.ValueText>
        <Stat.HelpText>On tickets</Stat.HelpText>
      </Stat.Root>
    </SimpleGrid>
  )
}

function EventCard({ event }: { event: (typeof registeredEvents)[0] }) {
  return (
    <Card.Root overflow="hidden" variant="elevated">
      <Box
        height="160px"
        backgroundImage={`url(${event.image})`}
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
      >
        <Badge
          position="absolute"
          top="3"
          right="3"
          colorScheme={statusColors[event.status]}
          size="lg"
        >
          {event.status}
        </Badge>
      </Box>
      <Card.Body>
        <Heading size="md" mb="2">
          {event.title}
        </Heading>
        <VStack gap="2" align="stretch">
          <HStack>
            <Text fontWeight="medium" color="gray.600" minW="100px">
              Date:
            </Text>
            <Text>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="medium" color="gray.600" minW="100px">
              Time:
            </Text>
            <Text>{event.time}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="medium" color="gray.600" minW="100px">
              Location:
            </Text>
            <Text>{event.location}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="medium" color="gray.600" minW="100px">
              Category:
            </Text>
            <Badge colorScheme="purple">{event.category}</Badge>
          </HStack>
          <HStack>
            <Text fontWeight="medium" color="gray.600" minW="100px">
              Ticket:
            </Text>
            <Text fontFamily="mono" fontSize="sm">
              {event.ticketNumber}
            </Text>
          </HStack>
          <HStack>
            <Text fontWeight="medium" color="gray.600" minW="100px">
              Registered:
            </Text>
            <Text>{new Date(event.registrationDate).toLocaleDateString()}</Text>
          </HStack>
        </VStack>
      </Card.Body>
      <Card.Footer>
        <HStack width="full" justify="space-between">
          <Text fontWeight="bold" fontSize="lg">
            {event.price === 0 ? 'Free' : `$${event.price.toFixed(2)}`}
          </Text>
          <HStack gap="2">
            <Button size="sm" variant="outline" colorScheme="blue">
              View Details
            </Button>
            {event.status === 'upcoming' && (
              <Button size="sm" colorScheme="red" variant="ghost">
                Cancel
              </Button>
            )}
          </HStack>
        </HStack>
      </Card.Footer>
    </Card.Root>
  )
}

export default function UserDashboard() {
  const [filter, setFilter] = useState<string>('all')

  const filteredEvents =
    filter === 'all'
      ? registeredEvents
      : registeredEvents.filter((e) => e.status === filter)

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="white" borderBottomWidth="1px" px="6" py="4">
        <Container maxW="7xl">
          <Flex justify="space-between" align="center">
            <Link href="/">
              <Heading size="lg" cursor="pointer">
                Event Platform
              </Heading>
            </Link>
            <HStack gap="4">
              <Text color="gray.600">Welcome, {currentUser.name}</Text>
              <Avatar.Root size="sm">
                <Avatar.Image src={currentUser.avatar} />
                <Avatar.Fallback name={currentUser.name} />
              </Avatar.Root>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="7xl" py="8">
        <Heading size="xl" mb="8">
          My Dashboard
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="8" mb="8">
          <Box gridColumn={{ md: 'span 1' }}>
            <PersonalInfoCard />
          </Box>
          <Box gridColumn={{ md: 'span 2' }}>
            <VStack gap="6" align="stretch">
              <StatsOverview />
            </VStack>
          </Box>
        </SimpleGrid>

        <Box mb="6">
          <Heading size="lg" mb="4">
            Registered Events
          </Heading>
          <HStack gap="2" mb="6" wrap="wrap">
            {['all', 'upcoming', 'completed', 'cancelled'].map((status) => (
              <Button
                key={status}
                size="sm"
                variant={filter === status ? 'solid' : 'outline'}
                colorScheme={filter === status ? 'blue' : 'gray'}
                onClick={() => setFilter(status)}
                textTransform="capitalize"
              >
                {status}
              </Button>
            ))}
          </HStack>
        </Box>

        {filteredEvents.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </SimpleGrid>
        ) : (
          <Card.Root>
            <Card.Body>
              <VStack gap="4">
                <Text fontSize="lg" color="gray.500">
                  No events found for this filter.
                </Text>
                <Button variant="outline" onClick={() => setFilter('all')}>
                  Show All Events
                </Button>
              </VStack>
            </Card.Body>
          </Card.Root>
        )}
      </Container>
    </Box>
  )
}
