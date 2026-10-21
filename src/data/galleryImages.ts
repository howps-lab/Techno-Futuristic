export interface GalleryImage {
  id: string;
  title: string;
  location: string;
  category: 'LANDSCAPE' | 'URBAN' | 'ATMOSPHERE' | 'TERRESTRIAL' | 'ARCHITECTURE';
  image: string;
  date: string;
  coordinates: string;
  description: string;
  exif: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'mountain-dawn',
    title: 'Elysian Ridge',
    location: 'Alpine Pass, Sector 07',
    category: 'LANDSCAPE',
    image: '/images/mountain-dawn.jpg',
    date: '2026.04.14',
    coordinates: '46°30\'12" N 8°33\'49" E',
    description: 'First light cutting through freezing atmospheric inversions along the serrated crest of the eastern divide.',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 55mm f/2.5 V',
      focalLength: '55mm',
      aperture: 'f/4.0',
      shutter: '1/320s',
      iso: '64'
    }
  },
  {
    id: 'neon-metropolis',
    title: 'Chromatic Velocity',
    location: 'Neo-Kanto Vertical District',
    category: 'URBAN',
    image: '/images/neon-metropolis.jpg',
    date: '2026.03.22',
    coordinates: '35°41\'22" N 139°41\'30" E',
    description: 'Bioluminescent commercial towers rising into dense cloud cover over the rain-slicked arterial transit spans.',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'APO-Summicron-SL 35mm',
      focalLength: '35mm',
      aperture: 'f/2.0',
      shutter: '1/125s',
      iso: '800'
    }
  },
  {
    id: 'misty-forest',
    title: 'Silent Biosphere',
    location: 'Pacific Primeval Basin',
    category: 'ATMOSPHERE',
    image: '/images/misty-forest.jpg',
    date: '2026.02.08',
    coordinates: '41°12\'54" N 124°00\'18" W',
    description: 'Filtered crepuscular beams piercing through ancient coniferous canopies after a torrential dawn downpour.',
    exif: {
      camera: 'Sony Alpha 1',
      lens: 'FE 24-70mm f/2.8 GM II',
      focalLength: '48mm',
      aperture: 'f/5.6',
      shutter: '1/60s',
      iso: '200'
    }
  },
  {
    id: 'alien-dunes',
    title: 'Solar Drift',
    location: 'Namib Desolation Shelf',
    category: 'TERRESTRIAL',
    image: '/images/alien-dunes.jpg',
    date: '2026.01.19',
    coordinates: '24°44\'31" S 15°19\'25" E',
    description: 'Sculpted windward ridges cast in stark obsidian shadows beneath an unyielding thermodynamic sky.',
    exif: {
      camera: 'Fujifilm GFX 100 II',
      lens: 'GF 32-64mm f/4 R LM',
      focalLength: '32mm',
      aperture: 'f/8.0',
      shutter: '1/500s',
      iso: '100'
    }
  },
  {
    id: 'celestial-waterfall',
    title: 'Cascading Void',
    location: 'Skóga Abyss, Sub-Arctic',
    category: 'LANDSCAPE',
    image: '/images/celestial-waterfall.jpg',
    date: '2026.05.02',
    coordinates: '63°31\'54" N 19°30\'42" W',
    description: 'A monolithic plume of glacial melt plunging 60 meters into a basalt chasm suspended in permafrost mist.',
    exif: {
      camera: 'Canon EOS R5',
      lens: 'RF 15-35mm f/2.8 L IS',
      focalLength: '21mm',
      aperture: 'f/7.1',
      shutter: '1/250s',
      iso: '160'
    }
  },
  {
    id: 'cyber-alley',
    title: 'Sub-Surface Pulse',
    location: 'Kowloon Sub-Grid 04',
    category: 'URBAN',
    image: '/images/cyber-alley.jpg',
    date: '2026.06.11',
    coordinates: '22°19\'01" N 114°10\'08" E',
    description: 'High-density fiber optic conduits and halogen storefront glyphs shimmering across wet slate pavement.',
    exif: {
      camera: 'Leica Q3',
      lens: 'Summilux 28mm f/1.7',
      focalLength: '28mm',
      aperture: 'f/1.8',
      shutter: '1/80s',
      iso: '1250'
    }
  },
  {
    id: 'solitary-peak',
    title: 'Apex Monolith',
    location: 'Matterhorn Northern Rampart',
    category: 'LANDSCAPE',
    image: '/images/solitary-peak.jpg',
    date: '2026.07.03',
    coordinates: '45°58\'35" N 7°39\'30" E',
    description: 'The geometry of raw tectonic granite defying gravity against an infinite gradient of twilight blue.',
    exif: {
      camera: 'Hasselblad 907X 50C',
      lens: 'XCD 90mm f/2.5 V',
      focalLength: '90mm',
      aperture: 'f/5.6',
      shutter: '1/400s',
      iso: '100'
    }
  },
  {
    id: 'volcanic-crater',
    title: 'Magmatic Crust',
    location: 'Fagradalsfjall Rifts',
    category: 'TERRESTRIAL',
    image: '/images/volcanic-crater.jpg',
    date: '2026.08.15',
    coordinates: '63°53\'30" N 22°16\'04" W',
    description: 'Solidified black pahoehoe lava fields fractured by smoldering geothermal steam vents.',
    exif: {
      camera: 'Sony Alpha 7R V',
      lens: 'FE 16-35mm f/2.8 GM II',
      focalLength: '16mm',
      aperture: 'f/8.0',
      shutter: '1/200s',
      iso: '125'
    }
  },
  {
    id: 'quantum-architecture',
    title: 'Brutalist Monolith',
    location: 'Nordic Institute of Structural Form',
    category: 'ARCHITECTURE',
    image: '/images/quantum-architecture.jpg',
    date: '2026.09.01',
    coordinates: '59°20\'04" N 18°03\'58" E',
    description: 'Cast concrete cantilevers intersecting glass membranes under diffused arctic sky light.',
    exif: {
      camera: 'Fujifilm GFX 100S',
      lens: 'GF 23mm f/4 R LM WR',
      focalLength: '23mm',
      aperture: 'f/11.0',
      shutter: '1/160s',
      iso: '100'
    }
  },
  {
    id: 'arctic-aurora',
    title: 'Solar Ionosphere',
    location: 'Tromsø Outer Fjord',
    category: 'ATMOSPHERE',
    image: '/images/arctic-aurora.jpg',
    date: '2026.09.28',
    coordinates: '69°38\'56" N 18°57\'18" E',
    description: 'Magnetospheric coronal ejections igniting emerald electromagnetic curtains over freezing tidal waters.',
    exif: {
      camera: 'Sony Alpha 7S III',
      lens: 'FE 14mm f/1.8 GM',
      focalLength: '14mm',
      aperture: 'f/1.8',
      shutter: '2.5s',
      iso: '3200'
    }
  },
  {
    id: 'monsoon-passage',
    title: 'Verdant Torrents',
    location: 'Himalayan Gorge Basin',
    category: 'LANDSCAPE',
    image: '/images/monsoon-passage.jpg',
    date: '2026.10.04',
    coordinates: '27°59\'17" N 86°55\'31" E',
    description: 'Rushing turquoise glacial rapids carving crystalline canyons between sheer vertical moss walls.',
    exif: {
      camera: 'Nikon Z9',
      lens: 'NIKKOR Z 24-120mm f/4 S',
      focalLength: '45mm',
      aperture: 'f/6.3',
      shutter: '1/320s',
      iso: '200'
    }
  },
  {
    id: 'astral-observatory',
    title: 'Cosmic Nexus',
    location: 'Atacama Plateau Sanctuary',
    category: 'ATMOSPHERE',
    image: '/images/astral-observatory.jpg',
    date: '2026.10.18',
    coordinates: '23°01\'22" S 67°45\'17" W',
    description: 'Ancient monolithic sandstone arch framing the dense stellar core of the Sagittarius Arm.',
    exif: {
      camera: 'Canon EOS R5 C',
      lens: 'RF 28-70mm f/2 L USM',
      focalLength: '28mm',
      aperture: 'f/2.0',
      shutter: '15.0s',
      iso: '6400'
    }
  }
];
