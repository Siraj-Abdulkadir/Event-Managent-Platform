export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: 'user' | 'organizer'
  joinedDate: string
  bio: string
  location: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  capacity: number
  registeredCount: number
  image: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  organizerId: string
  organizerName: string
  price: number
}

export interface RegisteredEvent extends Event {
  registrationDate: string
  ticketNumber: string
}
