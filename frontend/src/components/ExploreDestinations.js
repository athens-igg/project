import { useState } from 'react'
import './ExploreDestinations.css'

export const destinations = [
  {
    id: 1,
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&q=80',
    description: 'Experience the perfect blend of beaches, culture, and vibrant nightlife in India\'s coastal paradise.',
    places: [
      {
        name: 'Calangute Beach',
        image: 'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&q=80',
        description: 'Known as the Queen of Beaches, Calangute offers golden sands, water sports, and vibrant beach shacks serving fresh seafood.'
      },
      {
        name: 'Basilica of Bom Jesus',
        image: 'https://images.unsplash.com/photo-1558432217-c1b1d1f15512?auto=format&fit=crop&q=80',
        description: 'A UNESCO World Heritage site, this 16th-century church houses the mortal remains of St. Francis Xavier and showcases stunning Portuguese architecture.'
      },
      {
        name: 'Fort Aguada',
        image: 'https://images.unsplash.com/photo-1623690547248-af1ad6dca9d4?auto=format&fit=crop&q=80',
        description: 'This 17th-century Portuguese fort offers panoramic views of the Arabian Sea and features a four-story lighthouse, the oldest of its kind in Asia.'
      },
      {
        name: 'Dudhsagar Falls',
        image: 'https://images.unsplash.com/photo-1580289543171-661f4d144091?auto=format&fit=crop&q=80',
        description: 'One of India\'s tallest waterfalls at 310m, located in the Bhagwan Mahavir Wildlife Sanctuary. The name means "Sea of Milk" due to its white water cascade.'
      },
      {
        name: 'Anjuna Flea Market',
        image: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80',
        description: 'A vibrant Wednesday market featuring handicrafts, clothes, jewelry, and spices. Experience Goa\'s hippie culture and bargain with local vendors.'
      }
    ]
  },
  {
    id: 2,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80',
    description: 'Discover paradise on Earth with pristine white beaches, crystal clear waters, and luxurious overwater villas.',
    places: [
      {
        name: 'Male City',
        image: 'https://images.unsplash.com/photo-1590080669222-7882fda3c595?auto=format&fit=crop&q=80',
        description: 'The bustling capital city features colorful buildings, traditional markets, and the historic Friday Mosque, built in 1658 from coral stone.'
      },
      {
        name: 'Maafushi Island',
        image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&q=80',
        description: 'A local island paradise offering affordable luxury, water sports, and authentic Maldivian experiences. Perfect for snorkeling and diving.'
      },
      {
        name: 'Vaadhoo Island',
        image: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&q=80',
        description: 'Famous for its "Sea of Stars" phenomenon, where bioluminescent phytoplankton create a magical nighttime display in the ocean.'
      },
      {
        name: 'Hulhumale Beach',
        image: 'https://images.unsplash.com/photo-1578922746633-0f448256ece1?auto=format&fit=crop&q=80',
        description: 'A pristine artificial beach with calm waters, perfect for swimming and water sports. Enjoy spectacular sunsets and beachside dining.'
      },
      {
        name: 'National Museum',
        image: 'https://images.unsplash.com/photo-1590080876477-fa40830fe6f9?auto=format&fit=crop&q=80',
        description: 'Housing royal artifacts, ancient weapons, and cultural treasures, the museum offers insights into Maldivian history and heritage.'
      }
    ]
  },
  {
    id: 3,
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80',
    description: 'The City of Light beckons with its iconic architecture, world-class art, and exquisite cuisine.',
    places: [
      {
        name: 'Eiffel Tower',
        image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80',
        description: 'The iconic 324m-tall wrought iron tower offers breathtaking views of Paris. Visit at night to see the spectacular light show.'
      },
      {
        name: 'Louvre Museum',
        image: 'https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?auto=format&fit=crop&q=80',
        description: 'Home to thousands of works of art including the Mona Lisa, this former royal palace is the world\'s largest art museum.'
      },
      {
        name: 'Notre-Dame Cathedral',
        image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?auto=format&fit=crop&q=80',
        description: 'This medieval Catholic cathedral is a masterpiece of French Gothic architecture, currently being restored after the 2019 fire.'
      },
      {
        name: 'Arc de Triomphe',
        image: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&q=80',
        description: 'Standing at the western end of the Champs-Élysées, this iconic arch honors those who fought for France in various wars.'
      },
      {
        name: 'Montmartre',
        image: 'https://images.unsplash.com/photo-1551887373-3c5bd224f6e2?auto=format&fit=crop&q=80',
        description: 'A charming hilltop neighborhood known for the white Sacré-Cœur basilica, artists\' square, and stunning city views.'
      }
    ]
  }
]

function ExploreDestinations() {
  const [selectedDestination, setSelectedDestination] = useState(null)

  const openModal = (destination) => {
    setSelectedDestination(destination)
  }

  const closeModal = () => {
    setSelectedDestination(null)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🌍 Explore Dream Destinations</h1>
        <p>Discover the world's most beautiful places</p>
      </header>

      <div className="destinations-grid">
        {destinations.map(destination => (
          <div
            key={destination.id}
            className="destination-card"
            onClick={() => openModal(destination)}
          >
            <img src={destination.image} alt={destination.name} />
            <div className="content">
              <h2>{destination.name}</h2>
              <p>{destination.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedDestination && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Top Places in {selectedDestination.name}</h2>
              <button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="places-grid">
              {selectedDestination.places.map((place, index) => (
                <div key={index} className="place-card">
                  <img src={place.image} alt={place.name} />
                  <div className="content">
                    <h3>{place.name}</h3>
                    <p>{place.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExploreDestinations;
