// Service for handling evidence items, barrier annotations, and AI visual remediation concepts

export const getEvidenceDetails = (item) => {
  // Generate realistic before/after AI suggestions and annotated barrier pins
  return {
    ...item,
    beforePhotoUrl: item.photoUrl || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800', // AI Remediated concept illustration
    annotations: [
      { id: 1, x: 35, y: 45, label: 'Missing Ramp (Steep Stairs)', severity: 'HIGH' },
      { id: 2, x: 70, y: 30, label: 'No Dual Handrails', severity: 'MEDIUM font-bold' },
      { id: 3, x: 50, y: 80, label: 'Lack of Tactile Warning Indicators', severity: 'MEDIUM' },
    ],
    aiRemediationSpec: {
      proposedSolution: 'Install 1:12 Modular Steel Ramp with Tactile Ground Surface Indicators (TGSIs).',
      wcagStandard: 'RPWD Act 2016 Section 40 & WCAG 2.1 AA',
      estimatedCostRange: '₹35,000 - ₹50,000',
      estimatedTimeDays: '3 Days',
      expectedImpactScore: '+18% Accessibility Gain',
      architecturalNotes: 'Ensure ramp gradient does not exceed 1:12 slope ratio with minimum 1200mm clear width.',
    },
  };
};
