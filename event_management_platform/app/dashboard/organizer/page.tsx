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
  HStack,
  VStack,
  SimpleGrid,
  Button,
  Stat,
  Input,
  Textarea,
  Select,
  Dialog,
  Field,
  Table,
  createListCollection,
} from '@chakra-ui/react'
import { currentOrganizer, organizationName, organizerEvents } from '@/lib/mockData'
import Link from 'next/link'
import { useState } from 'react'

const statusColors: Record<string, string> = {
  upcoming: 'green',
  ongoing: 'blue',
  completed: 'gray',
  cancelled: 'red',
}

interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  capacity: string
  price: string
  image: string
}

const initialFormData: EventFormData = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: '',
  capacity: '',
  price: '',
  image: '',
}

const categories = createListCollection({
  items: [
    { label: 'Technology', value: 'Technology' },
    { label: 'Music', value: 'Music' },
    { label: 'Business', value: 'Business' },
    { label: 'Art', value: 'Art' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Networking', value: 'Networking' },
    { label: 'Education', value: 'Education' },
    { label: 'Other', value: 'Other' },
  ],
})

function OrganizerHeader() {
  return (
    <Box bg="white" borderBottomWidth="1px" px="6" py="4">
      <Container maxW="7xl">
        <Flex justify="space-between" align="center">
          <Link href="/">
            <Heading size="lg" cursor="pointer">
              Event Platform
            </Heading>
          </Link>
          <HStack gap="4">
            <VStack gap="0" align="flex-end">
              <Text fontWeight="medium">{currentOrganizer.name}</Text>
              <Text fontSize="sm" color="gray.600">
                {organizationName}
              </Text>
            </VStack>
            <Avatar.Root size="md">
              <Avatar.Image src={currentOrganizer.avatar} />
              <Avatar.Fallback name={currentOrganizer.name} />
            </Avatar.Root>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

function StatsOverview({ events }: { events: typeof organizerEvents }) {
  const totalEvents = events.length
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').length
  const totalRegistrations = events.reduce((sum, e) => sum + e.registeredCount, 0)
  const totalRevenue = events.reduce((sum, e) => sum + e.price * e.registeredCount, 0)

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
      <Stat.Root>
        <Stat.Label>Total Events</Stat.Label>
        <Stat.ValueText>{totalEvents}</Stat.ValueText>
        <Stat.HelpText>All time</Stat.HelpText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Upcoming</Stat.Label>
        <Stat.ValueText color="green.500">{upcomingEvents}</Stat.ValueText>
        <Stat.HelpText>Events planned</Stat.HelpText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Total Registrations</Stat.Label>
        <Stat.ValueText color="blue.500">{totalRegistrations}</Stat.ValueText>
        <Stat.HelpText>Attendees</Stat.HelpText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Total Revenue</Stat.Label>
        <Stat.ValueText color="purple.500">${totalRevenue.toFixed(2)}</Stat.ValueText>
        <Stat.HelpText>From tickets</Stat.HelpText>
      </Stat.Root>
    </SimpleGrid>
  )
}

function CreateEventForm({
  onSubmit,
  onCancel,
  initialData,
  isEdit,
}: {
  onSubmit: (data: EventFormData) => void
  onCancel: () => void
  initialData?: EventFormData
  isEdit?: boolean
}) {
  const [formData, setFormData] = useState<EventFormData>(initialData || initialFormData)

  const handleChange = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack gap="4" align="stretch">
        <Field.Root>
          <Field.Label>Event Title</Field.Label>
          <Input
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter event title"
            required
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe your event"
            rows={4}
            required
          />
        </Field.Root>

        <SimpleGrid columns={2} gap="4">
          <Field.Root>
            <Field.Label>Date</Field.Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              required
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Time</Field.Label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              required
            />
          </Field.Root>
        </SimpleGrid>

        <Field.Root>
          <Field.Label>Location</Field.Label>
          <Input
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Event venue or online link"
            required
          />
        </Field.Root>

        <SimpleGrid columns={3} gap="4">
          <Field.Root>
            <Field.Label>Category</Field.Label>
            <Select.Root
              collection={categories}
              value={formData.category ? [formData.category] : []}
              onValueChange={(details) => handleChange('category', details.value[0] || '')}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select category" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {categories.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Capacity</Field.Label>
            <Input
              type="number"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
              placeholder="Max attendees"
              min="1"
              required
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Price ($)</Field.Label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="0 for free"
              min="0"
              step="0.01"
              required
            />
          </Field.Root>
        </SimpleGrid>

        <Field.Root>
          <Field.Label>Image URL (optional)</Field.Label>
          <Input
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </Field.Root>

        <HStack gap="3" justify="flex-end" mt="4">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit" colorScheme="blue">
            {isEdit ? 'Update Event' : 'Create Event'}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}

function EventManagementTable({
  events,
  onEdit,
  onDelete,
}: {
  events: typeof organizerEvents
  onEdit: (event: (typeof organizerEvents)[0]) => void
  onDelete: (eventId: string) => void
}) {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Event</Table.ColumnHeader>
          <Table.ColumnHeader>Date</Table.ColumnHeader>
          <Table.ColumnHeader>Location</Table.ColumnHeader>
          <Table.ColumnHeader>Capacity</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
          <Table.ColumnHeader>Revenue</Table.ColumnHeader>
          <Table.ColumnHeader>Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {events.map((event) => (
          <Table.Row key={event.id}>
            <Table.Cell>
              <VStack gap="0" align="flex-start">
                <Text fontWeight="medium">{event.title}</Text>
                <Text fontSize="xs" color="gray.500">
                  {event.category}
                </Text>
              </VStack>
            </Table.Cell>
            <Table.Cell>{new Date(event.date).toLocaleDateString()}</Table.Cell>
            <Table.Cell maxWidth="150px">
              <Text>{event.location}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>
                {event.registeredCount} / {event.capacity}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Badge colorScheme={statusColors[event.status]} textTransform="capitalize">
                {event.status}
              </Badge>
            </Table.Cell>
            <Table.Cell>${(event.price * event.registeredCount).toFixed(2)}</Table.Cell>
            <Table.Cell>
              <HStack gap="2">
                <Button size="xs" variant="outline" colorScheme="blue" onClick={() => onEdit(event)}>
                  Edit
                </Button>
                <Button size="xs" variant="outline" colorScheme="red" onClick={() => onDelete(event.id)}>
                  Delete
                </Button>
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default function OrganizerDashboard() {
  const [events, setEvents] = useState(organizerEvents)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<(typeof organizerEvents)[0] | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const handleCreate = (data: EventFormData) => {
    const newEvent = {
      id: `org-evt-${Date.now()}`,
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      location: data.location,
      category: data.category,
      capacity: parseInt(data.capacity),
      registeredCount: 0,
      image: data.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
      status: 'upcoming' as const,
      organizerId: currentOrganizer.id,
      organizerName: organizationName,
      price: parseFloat(data.price),
    }
    setEvents((prev) => [...prev, newEvent])
    setIsCreateOpen(false)
  }

  const handleUpdate = (data: EventFormData) => {
    if (!editingEvent) return
    setEvents((prev) =>
      prev.map((e) =>
        e.id === editingEvent.id
          ? {
              ...e,
              title: data.title,
              description: data.description,
              date: data.date,
              time: data.time,
              location: data.location,
              category: data.category,
              capacity: parseInt(data.capacity),
              price: parseFloat(data.price),
              image: data.image || e.image,
            }
          : e
      )
    )
    setEditingEvent(null)
  }

  const handleDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId))
    setDeleteConfirm(null)
  }

  const editingFormData: EventFormData | undefined = editingEvent
    ? {
        title: editingEvent.title,
        description: editingEvent.description,
        date: editingEvent.date,
        time: editingEvent.time,
        location: editingEvent.location,
        category: editingEvent.category,
        capacity: editingEvent.capacity.toString(),
        price: editingEvent.price.toString(),
        image: editingEvent.image,
      }
    : undefined

  return (
    <Box minH="100vh" bg="gray.50">
      <OrganizerHeader />

      <Container maxW="7xl" py="8">
        <Flex justify="space-between" align="center" mb="8">
          <VStack gap="1" align="flex-start">
            <Heading size="xl">Organizer Dashboard</Heading>
            <Text color="gray.600">{organizationName}</Text>
          </VStack>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => setIsCreateOpen(true)}
          >
            + Create Event
          </Button>
        </Flex>

        <Box mb="8">
          <StatsOverview events={events} />
        </Box>

        <Card.Root>
          <Card.Header>
            <Flex justify="space-between" align="center">
              <Heading size="md">Event Management</Heading>
              <Text color="gray.500">{events.length} events</Text>
            </Flex>
          </Card.Header>
          <Card.Body>
            <EventManagementTable
              events={events}
              onEdit={(event) => setEditingEvent(event)}
              onDelete={(eventId) => setDeleteConfirm(eventId)}
            />
          </Card.Body>
        </Card.Root>
      </Container>

      <Dialog.Root open={isCreateOpen} onOpenChange={(e) => !e.open && setIsCreateOpen(false)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create New Event</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <CreateEventForm
                onSubmit={handleCreate}
                onCancel={() => setIsCreateOpen(false)}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      <Dialog.Root open={!!editingEvent} onOpenChange={(e) => !e.open && setEditingEvent(null)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit Event</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {editingEvent && (
                <CreateEventForm
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingEvent(null)}
                  initialData={editingFormData}
                  isEdit
                />
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      <Dialog.Root open={!!deleteConfirm} onOpenChange={(e) => !e.open && setDeleteConfirm(null)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Confirm Deletion</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                Are you sure you want to delete this event? This action cannot be undone.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                colorScheme="red"
                onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              >
                Delete Event
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Box>
  )
}
