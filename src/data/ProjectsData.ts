
export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'in-review' | 'pending' | 'approved' | 'rejected';
  date: string;
  members: number;
  submissions: number;
}

// Developer-focused projects
export const developerProjects: Project[] = [
  {
    id: '1',
    title: 'Kuala Lumpur Tower Development',
    description: 'Mixed-use development with residential and commercial spaces in central KL.',
    status: 'in-review',
    date: 'Oct 12, 2023',
    members: 5,
    submissions: 3
  },
  {
    id: '2',
    title: 'Johor Bahru Waterfront Project',
    description: 'Coastal development with residential units and a marina in JB.',
    status: 'pending',
    date: 'Nov 3, 2023',
    members: 3,
    submissions: 1
  },
  {
    id: '3',
    title: 'Penang Heritage Renovation',
    description: 'Restoration of heritage buildings in Georgetown with modern amenities.',
    status: 'approved',
    date: 'Sep 17, 2023',
    members: 4,
    submissions: 2
  },
  {
    id: '4',
    title: 'Kota Kinabalu Resort Complex',
    description: 'Luxury resort development with villas and amenities in Sabah.',
    status: 'rejected',
    date: 'Dec 5, 2023',
    members: 6,
    submissions: 4
  }
];

// Authority-focused projects (pending review)
export const authorityProjects: Project[] = [
  {
    id: '1',
    title: 'Kuala Lumpur Tower Development',
    description: 'Mixed-use development with residential and commercial spaces in central KL.',
    status: 'in-review',
    date: 'Oct 12, 2023',
    members: 5,
    submissions: 3
  },
  {
    id: '2',
    title: 'Johor Bahru Waterfront Project',
    description: 'Coastal development with residential units and a marina in JB.',
    status: 'pending',
    date: 'Nov 3, 2023',
    members: 3,
    submissions: 1
  },
  {
    id: '5',
    title: 'Ipoh Office Park',
    description: 'Modern office complex with sustainable design features in Ipoh.',
    status: 'in-review',
    date: 'Oct 25, 2023',
    members: 4,
    submissions: 2
  },
  {
    id: '6',
    title: 'Malacca Heritage Hotel',
    description: 'Conversion of heritage buildings into a boutique hotel in Malacca.',
    status: 'in-review',
    date: 'Nov 15, 2023',
    members: 3,
    submissions: 2
  }
];
