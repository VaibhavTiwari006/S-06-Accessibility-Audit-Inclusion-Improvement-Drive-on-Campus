// Service for campus accessibility features and wheelchair route generation

export const ACCESSIBILITY_FEATURE_TYPES = {
  RAMP: { id: 'RAMP', label: 'Ramps', icon: '♿', color: '#10B981' },
  ELEVATOR: { id: 'ELEVATOR', label: 'Elevators', icon: '🛗', color: '#3B82F6' },
  WASHROOM: { id: 'WASHROOM', label: 'Accessible Washrooms', icon: '🚻', color: '#8B5CF6' },
  TACTILE: { id: 'TACTILE', label: 'Tactile Paving', icon: '👣', color: '#F59E0B' },
  PARKING: { id: 'PARKING', label: 'Accessible Parking', icon: '🅿️', color: '#6366F1' },
};

// Generate realistic mock accessibility features around campus buildings
export const getCampusFeatures = (buildings = []) => {
  const features = [];
  const defaultCenter = [30.7699, 76.5754];

  buildings.forEach((b, idx) => {
    const lat = b.lat || defaultCenter[0] + (Math.sin(b.id || idx) * 0.004);
    const lng = b.lng || defaultCenter[1] + (Math.cos(b.id || idx) * 0.004);

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

  const defaultCenter = [30.7699, 76.5754];

  const startLat = startBuilding.lat || defaultCenter[0] + (Math.sin(startBuilding.id || 1) * 0.004);
  const startLng = startBuilding.lng || defaultCenter[1] + (Math.cos(startBuilding.id || 1) * 0.004);

  const endLat = endBuilding.lat || defaultCenter[0] + (Math.sin(endBuilding.id || 2) * 0.004);
  const endLng = endBuilding.lng || defaultCenter[1] + (Math.cos(endBuilding.id || 2) * 0.004);

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
