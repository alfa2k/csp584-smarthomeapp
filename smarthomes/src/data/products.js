export const products = {
  'smart-doorbells': [
    {
      id: 1,
      name: 'Ring Video Doorbell',
      price: 99.99,
      description: 'A smart doorbell with video capability.',
      accessories: [1, 2]
    },
    {
      id: 2,
      name: 'Nest Hello Doorbell',
      price: 179.99,
      description: 'A smart doorbell with HD video and two-way audio.',
      accessories: [2, 3]
    },
    {
      id: 3,
      name: 'Arlo Essential Video Doorbell',
      price: 129.99,
      description: 'A wire-free smart doorbell with motion detection.',
      accessories: [4]
    },
    {
      id: 4,
      name: 'Eufy Security Video Doorbell',
      price: 149.99,
      description: 'A video doorbell with local storage and motion detection.',
      accessories: [1, 4]
    },
    {
      id: 5,
      name: 'Remo+ RemoBell S',
      price: 99.99,
      description: 'A wired video doorbell with fast notifications.',
      accessories: [2, 3]
    }
  ],
  'smart-doorlocks': [
    {
      id: 6,
      name: 'August Smart Lock',
      price: 199.99,
      description: 'A secure smart lock with remote control.',
      accessories: [5]
    },
    {
      id: 7,
      name: 'Yale Assure Lock SL',
      price: 229.99,
      description: 'A touchscreen deadbolt that works with smart home systems.',
      accessories: [6]
    },
    {
      id: 8,
      name: 'Schlage Encode Smart Lock',
      price: 249.99,
      description: 'A smart lock with built-in Wi-Fi for remote access.',
      accessories: [7]
    },
    {
      id: 9,
      name: 'Kwikset Halo Wi-Fi Smart Lock',
      price: 199.99,
      description: 'A Wi-Fi smart lock with smart key security.',
      accessories: [5, 6]
    },
    {
      id: 10,
      name: 'Lockly Secure Pro',
      price: 279.99,
      description: 'A smart lock with 3D fingerprint recognition and touchscreen.',
      accessories: [6, 7]
    }
  ],
  'smart-speakers': [
    {
      id: 11,
      name: 'Google Nest Audio',
      price: 89.99,
      description: 'Smart speaker with Google Assistant.',
      accessories: [9, 10]
    },
    {
      id: 12,
      name: 'Amazon Echo (4th Gen)',
      price: 99.99,
      description: 'Smart speaker with premium sound and Alexa.',
      accessories: [8, 9]
    },
    {
      id: 13,
      name: 'Apple HomePod mini',
      price: 99.99,
      description: 'A compact smart speaker with Siri and amazing sound.',
      accessories: [11]
    },
    {
      id: 14,
      name: 'Sonos One (Gen 2)',
      price: 199.99,
      description: 'A smart speaker with voice control and high-quality sound.',
      accessories: []
    },
    {
      id: 15,
      name: 'Bose Home Speaker 500',
      price: 299.99,
      description: 'A smart speaker with superior sound and Alexa/Google Assistant support.',
      accessories: []
    }
  ],
  'smart-lightings': [
    {
      id: 16,
      name: 'Philips Hue White and Color Ambiance Starter Kit',
      price: 199.99,
      description: 'A smart lighting system with customizable colors and dimming.',
      accessories: [12, 13]
    },
    {
      id: 17,
      name: 'LIFX Color A19 LED Smart Bulb',
      price: 59.99,
      description: 'A smart bulb with millions of colors and brightness control.',
      accessories: [14]
    },
    {
      id: 18,
      name: 'Wyze Bulb Color',
      price: 29.99,
      description: 'A smart bulb with customizable colors and voice control.',
      accessories: [15]
    },
    {
      id: 19,
      name: 'Sengled Smart Wi-Fi LED Multicolor Bulb',
      price: 24.99,
      description: 'A smart bulb with easy setup and voice control.',
      accessories: []
    },
    {
      id: 20,
      name: 'Kasa Smart Light Bulb',
      price: 19.99,
      description: 'A smart light bulb with remote control and no hub required.',
      accessories: []
    }
  ],
  'smart-thermostats': [
    {
      id: 21,
      name: 'Ecobee Smart Thermostat',
      price: 249.99,
      description: 'A smart thermostat with voice control and room sensors.',
      accessories: [17, 18]
    },
    {
      id: 22,
      name: 'Google Nest Learning Thermostat',
      price: 249.99,
      description: 'A smart thermostat that learns your schedule to save energy.',
      accessories: [16]
    },
    {
      id: 23,
      name: 'Honeywell Home T9 Smart Thermostat',
      price: 199.99,
      description: 'A smart thermostat with multi-room focus and temperature control.',
      accessories: [19]
    },
    {
      id: 24,
      name: 'Emerson Sensi Touch Smart Thermostat',
      price: 169.99,
      description: 'A budget-friendly smart thermostat with touch screen.',
      accessories: []
    },
    {
      id: 25,
      name: 'LUX Kono Smart Thermostat',
      price: 149.99,
      description: 'A stylish smart thermostat with a customizable faceplate.',
      accessories: []
    }
  ]
};

export const accessories = {
  1: {
    id: 1,
    name: 'Extra Battery',
    price: 29.99,
    description: 'An extra battery for your smart doorbell.'
  },
  2: {
    id: 2,
    name: 'Mounting Kit',
    price: 19.99,
    description: 'A mounting kit for your smart doorbell.'
  },
  3: {
    id: 3,
    name: 'Chime Box',
    price: 49.99,
    description: 'A wireless chime for your smart doorbell.'
  },
  4: {
    id: 4,
    name: 'Solar Charger',
    price: 79.99,
    description: 'A solar charger for your wire-free doorbell.'
  },
  5: {
    id: 5,
    name: 'Smart Lock Keypad',
    price: 49.99,
    description: 'A keypad for easy access to your smart lock.'
  },
  6: {
    id: 6,
    name: 'Door Sensor',
    price: 19.99,
    description: 'A sensor to monitor the status of your door lock.'
  },
  7: {
    id: 7,
    name: 'Wi-Fi Adapter',
    price: 39.99,
    description: 'A Wi-Fi adapter for remote access to your smart lock.'
  },
  8: {
    id: 8,
    name: 'Echo Remote',
    price: 29.99,
    description: 'A remote control for your Amazon Echo.'
  },
  9: {
    id: 9,
    name: 'Smart Plug',
    price: 24.99,
    description: 'A smart plug to control non-smart devices with your smart speaker.'
  },
  10: {
    id: 10,
    name: 'Google Nest Stand',
    price: 39.99,
    description: 'A stand for your Google Nest Audio.'
  },
  11: {
    id: 11,
    name: 'Wall Mount',
    price: 19.99,
    description: 'A wall mount for your Apple HomePod mini.'
  },
  12: {
    id: 12,
    name: 'Philips Hue Bridge',
    price: 59.99,
    description: 'A hub to control your Philips Hue lights remotely.'
  },
  13: {
    id: 13,
    name: 'Philips Hue Dimmer Switch',
    price: 29.99,
    description: 'A dimmer switch for your Philips Hue lights.'
  },
  14: {
    id: 14,
    name: 'LIFX Remote',
    price: 19.99,
    description: 'A remote control for your LIFX smart bulb.'
  },
  15: {
    id: 15,
    name: 'Wyze Motion Sensor',
    price: 14.99,
    description: 'A motion sensor for Wyze smart lights.'
  },
  16: {
    id: 16,
    name: 'Google Nest Temperature Sensor',
    price: 39.99,
    description: 'A temperature sensor for your Nest thermostat.'
  },
  17: {
    id: 17,
    name: 'Ecobee Room Sensor',
    price: 79.99,
    description: 'A room sensor to control temperature in specific areas.'
  },
  18: {
    id: 18,
    name: 'Ecobee Smart Light Switch',
    price: 99.99,
    description: 'A light switch with built-in Alexa for controlling your Ecobee thermostat.'
  },
  19: {
    id: 19,
    name: 'Honeywell Smart Room Sensor',
    price: 39.99,
    description: 'A room sensor to extend the comfort of your Honeywell T9 thermostat.'
  }
};
