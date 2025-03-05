
// Mock project data - in a real app, this would come from an API
export const projects = [
  {
    id: '1',
    title: 'Kuala Lumpur Tower Development',
    description: 'Mixed-use development with residential and commercial spaces in central KL.',
    detailedDescription: 'This ambitious project aims to create a landmark mixed-use development in the heart of Kuala Lumpur. The tower will feature premium residential units, Grade A office spaces, and a retail podium. The design incorporates sustainable features including rainwater harvesting, solar panels, and energy-efficient systems.',
    status: 'in-review',
    date: 'Oct 12, 2023',
    submissionDate: 'Oct 10, 2023',
    reviewDate: 'Oct 15, 2023',
    estimatedCompletionDate: 'Dec 30, 2023',
    members: 5,
    submissions: 3,
    location: 'Jalan Ampang, Kuala Lumpur',
    size: '120,000 sq ft',
    budget: 'RM 250 million',
    mainContractor: 'KL Construction Sdn Bhd',
    architect: 'Modern Designs Architecture',
    documents: [
      { name: 'BIM Model v3', type: 'model', date: 'Oct 10, 2023', status: 'approved' },
      { name: 'Structural Analysis', type: 'report', date: 'Oct 8, 2023', status: 'approved' },
      { name: 'Environmental Impact Assessment', type: 'report', date: 'Oct 5, 2023', status: 'pending' }
    ],
    timeline: [
      { event: 'Project Submission', date: 'Oct 5, 2023', status: 'completed' },
      { event: 'Initial Review', date: 'Oct 12, 2023', status: 'completed' },
      { event: 'Technical Compliance Check', date: 'Oct 18, 2023', status: 'in-progress' },
      { event: 'Final Approval', date: 'Oct 30, 2023', status: 'pending' }
    ]
  },
  {
    id: '2',
    title: 'Johor Bahru Waterfront Project',
    description: 'Coastal development with residential units and a marina in JB.',
    detailedDescription: 'The Johor Bahru Waterfront Project is a prestigious development along the coastline of JB. It includes luxury residential apartments, a yacht marina, retail spaces, and public recreation areas. The project emphasizes creating a seamless connection between urban living and coastal beauty.',
    status: 'pending',
    date: 'Nov 3, 2023',
    submissionDate: 'Nov 1, 2023',
    reviewDate: 'Not scheduled',
    estimatedCompletionDate: 'Mar 15, 2024',
    members: 3,
    submissions: 1,
    location: 'Danga Bay, Johor Bahru',
    size: '85,000 sq ft',
    budget: 'RM 180 million',
    mainContractor: 'Southern Construction Ltd',
    architect: 'Waterfront Architects Sdn Bhd',
    documents: [
      { name: 'Master Plan', type: 'plan', date: 'Nov 1, 2023', status: 'pending' },
      { name: 'BIM Model v1', type: 'model', date: 'Oct 30, 2023', status: 'pending' }
    ],
    timeline: [
      { event: 'Project Submission', date: 'Nov 1, 2023', status: 'completed' },
      { event: 'Initial Review', date: 'Nov 10, 2023', status: 'pending' },
      { event: 'Technical Compliance Check', date: 'Nov 20, 2023', status: 'pending' },
      { event: 'Final Approval', date: 'Dec 5, 2023', status: 'pending' }
    ]
  },
  {
    id: '3',
    title: 'Penang Heritage Renovation',
    description: 'Restoration of heritage buildings in Georgetown with modern amenities.',
    detailedDescription: 'This renovation project focuses on carefully restoring historical buildings in Georgetown, Penang while integrating modern amenities and safety features. The project balances preservation of cultural heritage with contemporary functionality and comfort.',
    status: 'approved',
    date: 'Sep 17, 2023',
    submissionDate: 'Sep 10, 2023',
    reviewDate: 'Sep 20, 2023',
    estimatedCompletionDate: 'Jan 15, 2024',
    members: 4,
    submissions: 2,
    location: 'Georgetown, Penang',
    size: '45,000 sq ft',
    budget: 'RM 120 million',
    mainContractor: 'Heritage Builders Inc',
    architect: 'Historical Preservation Architects',
    documents: [
      { name: 'Heritage Impact Assessment', type: 'report', date: 'Sep 8, 2023', status: 'approved' },
      { name: 'Restoration Plans', type: 'plan', date: 'Sep 10, 2023', status: 'approved' },
      { name: 'BIM Model v2', type: 'model', date: 'Sep 15, 2023', status: 'approved' }
    ],
    timeline: [
      { event: 'Project Submission', date: 'Sep 10, 2023', status: 'completed' },
      { event: 'Initial Review', date: 'Sep 17, 2023', status: 'completed' },
      { event: 'Technical Compliance Check', date: 'Sep 25, 2023', status: 'completed' },
      { event: 'Final Approval', date: 'Oct 2, 2023', status: 'completed' }
    ]
  },
  {
    id: '4',
    title: 'Kota Kinabalu Resort Complex',
    description: 'Luxury resort development with villas and amenities in Sabah.',
    detailedDescription: 'The Kota Kinabalu Resort Complex is a luxury development featuring private villas, a central hotel, spa facilities, and beachfront amenities. Located along the pristine shores of Sabah, the resort emphasizes eco-friendly design and integration with the natural environment.',
    status: 'rejected',
    date: 'Dec 5, 2023',
    submissionDate: 'Dec 1, 2023',
    reviewDate: 'Dec 7, 2023',
    estimatedCompletionDate: 'Not applicable',
    members: 6,
    submissions: 4,
    location: 'Kota Kinabalu, Sabah',
    size: '200,000 sq ft',
    budget: 'RM 320 million',
    mainContractor: 'East Malaysia Developments',
    architect: 'Tropical Resort Design Group',
    documents: [
      { name: 'Environmental Impact Assessment', type: 'report', date: 'Nov 28, 2023', status: 'rejected' },
      { name: 'BIM Model v1', type: 'model', date: 'Dec 1, 2023', status: 'rejected' },
      { name: 'Structural Analysis', type: 'report', date: 'Dec 1, 2023', status: 'rejected' }
    ],
    timeline: [
      { event: 'Project Submission', date: 'Dec 1, 2023', status: 'completed' },
      { event: 'Initial Review', date: 'Dec 5, 2023', status: 'completed' },
      { event: 'Technical Compliance Check', date: 'Dec 7, 2023', status: 'rejected' },
      { event: 'Resubmission', date: 'Jan 15, 2024', status: 'pending' }
    ]
  }
];
