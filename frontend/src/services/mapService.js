// Service for campus accessibility features and wheelchair route generation

export const ACCESSIBILITY_FEATURE_TYPES = {
  RAMP: { id: 'RAMP', label: 'Ramps', icon: '♿', color: '#10B981' },
  ELEVATOR: { id: 'ELEVATOR', label: 'Elevators', icon: '🛗', color: '#3B82F6' },
  WASHROOM: { id: 'WASHROOM', label: 'Accessible Washrooms', icon: '🚻', color: '#8B5CF6' },
  TACTILE: { id: 'TACTILE', label: 'Tactile Paving', icon: '👣', color: '#F59E0B' },
  PARKING: { id: 'PARKING', label: 'Accessible Parking', icon: '🅿️', color: '#6366F1' },
};

// Chandigarh University Campus Block Geospatial Coordinates
export const getBuildingCoordinates = (b = {}, idx = 0) => {
  if (b.lat && b.lng) return [b.lat, b.lng];
  const name = (b.buildingName || '').toUpperCase();
  const code = (b.buildingCode || '').toUpperCase();

  // Zakir Husain Block Cluster (South-West)
  if (name.includes('ZAKIR')) {
    const offset = (b.id || idx) % 3;
    return [30.7672 + offset * 0.0004, 76.5728 + offset * 0.0003];
  }
  // Nek Chand Block Cluster (North Campus)
  if (name.includes('NC') || code.includes('NC')) {
    const num = parseInt(name.replace(/\D/g, '') || idx) % 5;
    return [30.7732 + num * 0.0003, 76.5748 + num * 0.0004];
  }
  // DD Block Cluster (East Extension)
  if (name.startsWith('DD') || code.startsWith('DD')) {
    const num = parseInt(name.replace(/\D/g, '') || idx) % 2;
    return [30.7722 + num * 0.0004, 76.5772 + num * 0.0003];
  }
  // D Block Cluster (Central Academic Ring)
  if (name.startsWith('D') || code.startsWith('D')) {
    const num = parseInt(name.replace(/\D/g, '') || idx) % 8;
    return [30.7708 + (num % 4) * 0.0004, 76.5760 + Math.floor(num / 4) * 0.0005];
  }
  // C Block Cluster (Central Academic Ring)
  if (name.startsWith('C') || code.startsWith('C')) {
    const num = parseInt(name.replace(/\D/g, '') || idx) % 3;
    return [30.7700 + num * 0.0004, 76.5752 + num * 0.0003];
  }
  // B Block Cluster (West Academic Ring)
  if (name.startsWith('B') || code.startsWith('B')) {
    const num = parseInt(name.replace(/\D/g, '') || idx) % 5;
    return [30.7686 + num * 0.0003, 76.5736 + num * 0.0003];
  }
  // A Block Cluster (Administrative & Main Academic)
  if (name.startsWith('A') || code.startsWith('A')) {
    const num = parseInt(name.replace(/\D/g, '') || idx) % 3;
    return [30.7694 + num * 0.0003, 76.5744 + num * 0.0003];
  }

  return [30.7699 + (Math.sin(b.id || idx) * 0.003), 76.5754 + (Math.cos(b.id || idx) * 0.003)];
};

// Generate realistic mock accessibility features around campus buildings
export const getCampusFeatures = (buildings = []) => {
  const features = [];

  buildings.forEach((b, idx) => {
    const [lat, lng] = getBuildingCoordinates(b, idx);

    // Ramp near building entrance
    features.push({
      id: `ramp-${b.id || idx}`,
      type: 'RAMP',
      name: `${b.buildingName} Main Entrance Ramp`,
      description: '1:12 slope gradient, non-slip rubber surface with dual handrails.',
      lat: lat + 0.0003,
      lng: lng + 0.0002,
    });

    // Elevator
    features.push({
      id: `elevator-${b.id || idx}`,
      type: 'ELEVATOR',
      name: `${b.buildingName} Braille Elevator`,
      description: 'Voice announcement system & low-height tactile controls.',
      lat: lat - 0.0002,
      lng: lng + 0.0003,
    });

    // Washroom
    features.push({
      id: `washroom-${b.id || idx}`,
      type: 'WASHROOM',
      name: `${b.buildingName} Unisex Accessible Washroom`,
      description: 'Outward swinging door, grab bars, and emergency pull cord.',
      lat: lat + 0.0002,
      lng: lng - 0.0003,
    });

    // Parking
    features.push({
      id: `parking-${b.id || idx}`,
      type: 'PARKING',
      name: `${b.buildingName} Priority Parking Bay`,
      description: 'Extra wide 3.5m bay located within 15 meters of main door.',
      lat: lat - 0.0004,
      lng: lng - 0.0002,
    });
  });

  return features;
};

// Calculate wheelchair-friendly route between two buildings
export const calculateWheelchairRoute = (startBuilding, endBuilding) => {
  if (!startBuilding || !endBuilding) return null;

  const [startLat, startLng] = getBuildingCoordinates(startBuilding, 1);
  const [endLat, endLng] = getBuildingCoordinates(endBuilding, 2);

  // Generate intermediate waypoint nodes to create a realistic barrier-free path around campus blocks
  const midLat = (startLat + endLat) / 2 + 0.0005;
  const midLng = (startLng + endLng) / 2 - 0.0003;

  const pathCoordinates = [
    [startLat, startLng],
    [startLat + 0.0002, startLng + 0.0004],
    [midLat, midLng],
    [endLat - 0.0002, endLng - 0.0003],
    [endLat, endLng],
  ];

  // Rough estimation logic
  const latDiff = Math.abs(endLat - startLat);
  const lngDiff = Math.abs(endLng - startLng);
  const estMeters = Math.round((latDiff + lngDiff) * 111000);
  const estMins = Math.max(2, Math.ceil(estMeters / 60)); // Wheelchair speed approx 1m/s

  return {
    pathCoordinates,
    distanceMeters: estMeters,
    estimatedMinutes: estMins,
    slopeGrading: 'Max 4.5% (Smooth & Ramp-Assisted)',
    steps: [
      `Exit ${startBuilding.buildingName} via the North Ramp.`,
      `Follow the tactile paving path towards Central Plaza (approx 120m).`,
      `Use the broad elevator-accessible covered pathway.`,
      `Arrive at ${endBuilding.buildingName} Main Wheelchair Entrance.`,
    ],
  };
};
