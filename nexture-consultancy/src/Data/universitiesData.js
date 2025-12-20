// Static university data for all countries
export const universitiesData = {
  "Australia": [
    {
      id: "aus-1",
      name: "University of Melbourne",
      city: "Melbourne",
      state: "Victoria",
      ranking: {
        world: 14,
        national: 1
      },
      establishedYear: 1853,
      type: "Public Research",
      description: "The University of Melbourne is a public research university located in Melbourne, Australia. Founded in 1853, it is Australia's second oldest university and the oldest in Victoria.",
      highlights: [
        "Australia's #1 ranked university",
        "Member of Group of Eight",
        "Over 50,000 students from 130+ countries",
        "Strong industry connections"
      ],
      tuitionFees: {
        undergraduate: "AUD 32,000 - 48,000",
        graduate: "AUD 35,000 - 52,000"
      },
      popularPrograms: [
        "Medicine",
        "Engineering",
        "Business",
        "Law",
        "Arts",
        "Science"
      ],
      admissionRequirements: {
        undergraduate: ["ATAR 80+", "IELTS 6.5", "Personal Statement"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "GRE/GMAT (some programs)"]
      },
      intakes: ["February", "July"],
      officialWebsite: "https://www.unimelb.edu.au",
      logo: "/melborn.svg",
      campusImages: ["/images/universities/unimelb-campus1.jpg", "/images/universities/unimelb-campus2.jpg"]
    },
    {
      id: "aus-2",
      name: "Australian National University",
      city: "Canberra",
      state: "ACT",
      ranking: {
        world: 30,
        national: 2
      },
      establishedYear: 1946,
      type: "Public Research",
      description: "The Australian National University (ANU) is a public research university located in Canberra, the capital of Australia. It was established by the Parliament of Australia in 1946.",
      highlights: [
        "Australia's national university",
        "Highest research intensity in Australia",
        "Located in the nation's capital",
        "Strong government and policy connections"
      ],
      tuitionFees: {
        undergraduate: "AUD 35,000 - 47,000",
        graduate: "AUD 37,000 - 50,000"
      },
      popularPrograms: [
        "International Relations",
        "Economics",
        "Computer Science",
        "Physics",
        "Philosophy",
        "Public Policy"
      ],
      admissionRequirements: {
        undergraduate: ["ATAR 85+", "IELTS 6.5", "Personal Statement"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "Research Proposal (PhD)"]
      },
      intakes: ["February", "July"],
      officialWebsite: "https://www.anu.edu.au",
      logo: "/Aus.jpeg",
      campusImages: ["/images/universities/anu-campus1.jpg", "/images/universities/anu-campus2.jpg"]
    },
    {
      id: "aus-3",
      name: "University of Sydney",
      city: "Sydney",
      state: "New South Wales",
      ranking: {
        world: 41,
        national: 3
      },
      establishedYear: 1850,
      type: "Public Research",
      description: "The University of Sydney is a public research university in Sydney, Australia. Founded in 1850, it was Australia's first university and is regarded as one of the world's leading universities.",
      highlights: [
        "Australia's first university",
        "Beautiful sandstone architecture",
        "Strong alumni network",
        "Located in vibrant Sydney"
      ],
      tuitionFees: {
        undergraduate: "AUD 33,000 - 49,000",
        graduate: "AUD 36,000 - 53,000"
      },
      popularPrograms: [
        "Medicine",
        "Business",
        "Engineering",
        "Architecture",
        "Veterinary Science",
        "Pharmacy"
      ],
      admissionRequirements: {
        undergraduate: ["ATAR 80+", "IELTS 6.5", "Portfolio (some programs)"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "Work Experience (MBA)"]
      },
      intakes: ["February", "July"],
      officialWebsite: "https://www.sydney.edu.au",
      logo: "/sydney.jpeg",
      campusImages: ["/images/universities/usyd-campus1.jpg", "/images/universities/usyd-campus2.jpg"]
    },
    {
      id: "aus-4",
      name: "University of New South Wales",
      city: "Sydney",
      state: "New South Wales",
      ranking: {
        world: 45,
        national: 4
      },
      establishedYear: 1949,
      type: "Public Research",
      description: "The University of New South Wales (UNSW) is a public research university based in Sydney, Australia. It is one of the founding members of Group of Eight.",
      highlights: [
        "Strong in engineering and technology",
        "High graduate employment rates",
        "Innovation and entrepreneurship focus",
        "Diverse international community"
      ],
      tuitionFees: {
        undergraduate: "AUD 34,000 - 48,000",
        graduate: "AUD 37,000 - 51,000"
      },
      popularPrograms: [
        "Engineering",
        "Computer Science",
        "Business",
        "Medicine",
        "Architecture",
        "Law"
      ],
      admissionRequirements: {
        undergraduate: ["ATAR 85+", "IELTS 6.5", "Mathematics (Engineering)"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "Professional Experience"]
      },
      intakes: ["February", "June", "September"],
      officialWebsite: "https://www.unsw.edu.au",
      logo: "/new south wales.png",
      campusImages: ["/images/universities/unsw-campus1.jpg", "/images/universities/unsw-campus2.jpg"]
    },
    {
      id: "aus-5",
      name: "Monash University",
      city: "Melbourne",
      state: "Victoria",
      ranking: {
        world: 57,
        national: 5
      },
      establishedYear: 1958,
      type: "Public Research",
      description: "Monash University is a public research university based in Melbourne, Australia. It is the second oldest university in Victoria and was named after prominent World War I general Sir John Monash.",
      highlights: [
        "Largest university in Australia",
        "Global presence with international campuses",
        "Strong research output",
        "Excellent student facilities"
      ],
      tuitionFees: {
        undergraduate: "AUD 31,000 - 45,000",
        graduate: "AUD 34,000 - 48,000"
      },
      popularPrograms: [
        "Medicine",
        "Pharmacy",
        "Engineering",
        "Business",
        "Education",
        "Information Technology"
      ],
      admissionRequirements: {
        undergraduate: ["ATAR 75+", "IELTS 6.5", "Prerequisites vary by program"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "Work Experience (some programs)"]
      },
      intakes: ["February", "July"],
      officialWebsite: "https://www.monash.edu",
      logo: "/monas.png",
      campusImages: ["/images/universities/monash-campus1.jpg", "/images/universities/monash-campus2.jpg"]
    }
  ],
  "Canada": [
    {
      id: "can-1",
      name: "University of Toronto",
      city: "Toronto",
      state: "Ontario",
      ranking: {
        world: 21,
        national: 1
      },
      establishedYear: 1827,
      type: "Public Research",
      description: "The University of Toronto is a public research university in Toronto, Ontario, Canada, located on the grounds that surround Queen's Park.",
      highlights: [
        "Canada's top-ranked university",
        "Three campuses in the GTA",
        "Strong research reputation",
        "Diverse academic programs"
      ],
      tuitionFees: {
        undergraduate: "CAD 58,000 - 65,000",
        graduate: "CAD 25,000 - 60,000"
      },
      popularPrograms: [
        "Medicine",
        "Engineering",
        "Business (Rotman)",
        "Computer Science",
        "Life Sciences",
        "Arts & Science"
      ],
      admissionRequirements: {
        undergraduate: ["High School Diploma", "IELTS 6.5", "Supplementary Application"],
        graduate: ["Bachelor's Degree", "IELTS 7.0", "GRE (some programs)"]
      },
      intakes: ["September", "January", "May"],
      officialWebsite: "https://www.utoronto.ca",
      logo: "/toronto.jpeg",
      campusImages: ["/images/universities/uoft-campus1.jpg", "/images/universities/uoft-campus2.jpg"]
    },
    {
      id: "can-2",
      name: "University of British Columbia",
      city: "Vancouver",
      state: "British Columbia",
      ranking: {
        world: 34,
        national: 2
      },
      establishedYear: 1908,
      type: "Public Research",
      description: "The University of British Columbia is a public research university with campuses in Vancouver and Kelowna, British Columbia, Canada.",
      highlights: [
        "Beautiful campus location",
        "Strong international reputation",
        "Excellent research facilities",
        "Diverse student body"
      ],
      tuitionFees: {
        undergraduate: "CAD 52,000 - 60,000",
        graduate: "CAD 20,000 - 45,000"
      },
      popularPrograms: [
        "Medicine",
        "Engineering",
        "Business (Sauder)",
        "Forestry",
        "Applied Science",
        "Arts"
      ],
      admissionRequirements: {
        undergraduate: ["High School Diploma", "IELTS 6.5", "Personal Profile"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "Research Statement"]
      },
      intakes: ["September", "January"],
      officialWebsite: "https://www.ubc.ca",
      logo: "/britist columbia.jpeg",
      campusImages: ["/images/universities/ubc-campus1.jpg", "/images/universities/ubc-campus2.jpg"]
    },
    {
      id: "can-3",
      name: "McGill University",
      city: "Montreal",
      state: "Quebec",
      ranking: {
        world: 31,
        national: 3
      },
      establishedYear: 1821,
      type: "Public Research",
      description: "McGill University is a public research university located in Montreal, Quebec, Canada. Founded in 1821, it is one of Canada's oldest universities.",
      highlights: [
        "Historic and prestigious institution",
        "Bilingual city environment",
        "Strong medical school",
        "International student body"
      ],
      tuitionFees: {
        undergraduate: "CAD 42,000 - 55,000",
        graduate: "CAD 18,000 - 35,000"
      },
      popularPrograms: [
        "Medicine",
        "Engineering",
        "Business (Desautels)",
        "Law",
        "Arts",
        "Science"
      ],
      admissionRequirements: {
        undergraduate: ["High School Diploma", "IELTS 6.5", "Prerequisite courses"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "GMAT/GRE (some programs)"]
      },
      intakes: ["September", "January"],
      officialWebsite: "https://www.mcgill.ca",
      logo: "/mcgill.png",
      campusImages: ["/images/universities/mcgill-campus1.jpg", "/images/universities/mcgill-campus2.jpg"]
    },
    {
      id: "can-4",
      name: "University of Waterloo",
      city: "Waterloo",
      state: "Ontario",
      ranking: {
        world: 154,
        national: 4
      },
      establishedYear: 1957,
      type: "Public Research",
      description: "The University of Waterloo is a public research university with a main campus in Waterloo, Ontario, Canada. It is known for its co-operative education programs.",
      highlights: [
        "Leading co-op programs",
        "Strong in technology and engineering",
        "Innovation and entrepreneurship hub",
        "High graduate employment rates"
      ],
      tuitionFees: {
        undergraduate: "CAD 55,000 - 70,000",
        graduate: "CAD 22,000 - 40,000"
      },
      popularPrograms: [
        "Computer Science",
        "Engineering",
        "Mathematics",
        "Business",
        "Architecture",
        "Applied Health Sciences"
      ],
      admissionRequirements: {
        undergraduate: ["High School Diploma", "IELTS 6.5", "Admission Information Form"],
        graduate: ["Bachelor's Degree", "IELTS 7.0", "Research Statement"]
      },
      intakes: ["September", "January", "May"],
      officialWebsite: "https://uwaterloo.ca",
      logo: "/waterlooo.png",
      campusImages: ["/images/universities/waterloo-campus1.jpg", "/images/universities/waterloo-campus2.jpg"]
    }
  ],
  "United States": [
    {
      id: "us-1",
      name: "Harvard University",
      city: "Cambridge",
      state: "Massachusetts",
      ranking: {
        world: 5,
        national: 1
      },
      establishedYear: 1636,
      type: "Private Research",
      description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636, it is the oldest institution of higher education in the United States.",
      highlights: [
        "Most prestigious university globally",
        "Largest academic library system",
        "Notable alumni including presidents",
        "Generous financial aid program"
      ],
      tuitionFees: {
        undergraduate: "USD 54,000 - 57,000",
        graduate: "USD 50,000 - 65,000"
      },
      popularPrograms: [
        "Medicine",
        "Law",
        "Business (HBS)",
        "Government",
        "Economics",
        "Computer Science"
      ],
      admissionRequirements: {
        undergraduate: ["SAT/ACT", "TOEFL/IELTS", "Essays", "Letters of Recommendation"],
        graduate: ["Bachelor's Degree", "GRE/GMAT", "TOEFL/IELTS", "Research Statement"]
      },
      intakes: ["Fall (September)"],
      officialWebsite: "https://www.harvard.edu",
      logo: "/harverd.png",
      campusImages: ["/images/universities/harvard-campus1.jpg", "/images/universities/harvard-campus2.jpg"]
    },
    {
      id: "us-2",
      name: "Massachusetts Institute of Technology",
      city: "Cambridge",
      state: "Massachusetts",
      ranking: {
        world: 1,
        national: 2
      },
      establishedYear: 1861,
      type: "Private Research",
      description: "The Massachusetts Institute of Technology (MIT) is a private land-grant research university in Cambridge, Massachusetts. It is known for its innovation in science and technology.",
      highlights: [
        "World's top technology university",
        "Leading research in AI and robotics",
        "Strong entrepreneurship culture",
        "Cutting-edge facilities"
      ],
      tuitionFees: {
        undergraduate: "USD 55,000 - 58,000",
        graduate: "USD 55,000 - 60,000"
      },
      popularPrograms: [
        "Engineering",
        "Computer Science",
        "Physics",
        "Mathematics",
        "Economics",
        "Management (Sloan)"
      ],
      admissionRequirements: {
        undergraduate: ["SAT/ACT", "SAT Subject Tests", "TOEFL/IELTS", "Essays"],
        graduate: ["Bachelor's Degree", "GRE", "TOEFL/IELTS", "Research Statement"]
      },
      intakes: ["Fall (September)"],
      officialWebsite: "https://www.mit.edu",
      logo: "/mit.jpeg",
      campusImages: ["/images/universities/mit-campus1.jpg", "/images/universities/mit-campus2.jpg"]
    },
    {
      id: "us-3",
      name: "Stanford University",
      city: "Stanford",
      state: "California",
      ranking: {
        world: 3,
        national: 3
      },
      establishedYear: 1885,
      type: "Private Research",
      description: "Stanford University is a private research university in Stanford, California. It is known for its academic strength, wealth, and proximity to Silicon Valley.",
      highlights: [
        "Heart of Silicon Valley",
        "Strong tech industry connections",
        "Beautiful campus",
        "Leading in innovation and entrepreneurship"
      ],
      tuitionFees: {
        undergraduate: "USD 56,000 - 59,000",
        graduate: "USD 54,000 - 62,000"
      },
      popularPrograms: [
        "Computer Science",
        "Engineering",
        "Business (GSB)",
        "Medicine",
        "Law",
        "Education"
      ],
      admissionRequirements: {
        undergraduate: ["SAT/ACT", "TOEFL/IELTS", "Essays", "Extracurricular Activities"],
        graduate: ["Bachelor's Degree", "GRE/GMAT", "TOEFL/IELTS", "Statement of Purpose"]
      },
      intakes: ["Fall (September)", "Spring (January)"],
      officialWebsite: "https://www.stanford.edu",
      logo: "/stand ford.png",
      campusImages: ["/images/universities/stanford-campus1.jpg", "/images/universities/stanford-campus2.jpg"]
    }
  ],
  "United Kingdom": [
    {
      id: "uk-1",
      name: "University of Oxford",
      city: "Oxford",
      state: "England",
      ranking: {
        world: 4,
        national: 1
      },
      establishedYear: 1096,
      type: "Public Research",
      description: "The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world.",
      highlights: [
        "Oldest English-speaking university",
        "Collegiate system",
        "Historic architecture",
        "Notable alumni including prime ministers"
      ],
      tuitionFees: {
        undergraduate: "£28,000 - £39,000",
        graduate: "£25,000 - £48,000"
      },
      popularPrograms: [
        "Philosophy, Politics & Economics",
        "Medicine",
        "Law",
        "English Literature",
        "History",
        "Mathematics"
      ],
      admissionRequirements: {
        undergraduate: ["A-levels", "IELTS 7.0", "Admissions Test", "Interview"],
        graduate: ["Bachelor's Degree", "IELTS 7.5", "Research Proposal", "References"]
      },
      intakes: ["October"],
      officialWebsite: "https://www.ox.ac.uk",
      logo: "/oxford.png",
      campusImages: ["/images/universities/oxford-campus1.jpg", "/images/universities/oxford-campus2.jpg"]
    },
    {
      id: "uk-2",
      name: "University of Cambridge",
      city: "Cambridge",
      state: "England",
      ranking: {
        world: 2,
        national: 2
      },
      establishedYear: 1209,
      type: "Public Research",
      description: "The University of Cambridge is a collegiate research university in Cambridge, United Kingdom. Founded in 1209, it is the second-oldest university in the English-speaking world.",
      highlights: [
        "Second oldest English university",
        "Strong in sciences and mathematics",
        "Beautiful historic colleges",
        "Excellent research reputation"
      ],
      tuitionFees: {
        undergraduate: "£24,000 - £58,000",
        graduate: "£23,000 - £59,000"
      },
      popularPrograms: [
        "Natural Sciences",
        "Mathematics",
        "Engineering",
        "Medicine",
        "Computer Science",
        "Economics"
      ],
      admissionRequirements: {
        undergraduate: ["A-levels", "IELTS 7.5", "Admissions Test", "Interview"],
        graduate: ["Bachelor's Degree", "IELTS 7.0", "Research Proposal", "References"]
      },
      intakes: ["October"],
      officialWebsite: "https://www.cam.ac.uk",
      logo: "/cambridge.png",
      campusImages: ["/images/universities/cambridge-campus1.jpg", "/images/universities/cambridge-campus2.jpg"]
    },
    {
      id: "uk-3",
      name: "Imperial College London",
      city: "London",
      state: "England",
      ranking: {
        world: 6,
        national: 3
      },
      establishedYear: 1907,
      type: "Public Research",
      description: "Imperial College London is a public research university in London. Imperial is organised into four faculties of science, engineering, medicine and business.",
      highlights: [
        "Leading STEM university",
        "Located in South Kensington",
        "Strong industry connections",
        "Excellent graduate employment"
      ],
      tuitionFees: {
        undergraduate: "£32,000 - £46,000",
        graduate: "£30,000 - £52,000"
      },
      popularPrograms: [
        "Engineering",
        "Medicine",
        "Computer Science",
        "Physics",
        "Chemistry",
        "Business"
      ],
      admissionRequirements: {
        undergraduate: ["A-levels", "IELTS 6.5", "Mathematics/Science subjects"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "Academic References"]
      },
      intakes: ["October"],
      officialWebsite: "https://www.imperial.ac.uk",
      logo: "/imperial.png",
      campusImages: ["/images/universities/imperial-campus1.jpg", "/images/universities/imperial-campus2.jpg"]
    }
  ],
  "Germany": [
    {
      id: "ger-1",
      name: "Technical University of Munich",
      city: "Munich",
      state: "Bavaria",
      ranking: {
        world: 50,
        national: 1
      },
      establishedYear: 1868,
      type: "Public Technical",
      description: "The Technical University of Munich is a public research university in Munich, with additional campuses in Garching and Freising-Weihenstephan.",
      highlights: [
        "Leading technical university in Germany",
        "Strong industry partnerships",
        "Excellent research facilities",
        "Low tuition fees"
      ],
      tuitionFees: {
        undergraduate: "€0 - €3,000",
        graduate: "€0 - €5,000"
      },
      popularPrograms: [
        "Engineering",
        "Computer Science",
        "Physics",
        "Mathematics",
        "Architecture",
        "Management"
      ],
      admissionRequirements: {
        undergraduate: ["Abitur/Equivalent", "German/English Proficiency", "Specific Prerequisites"],
        graduate: ["Bachelor's Degree", "German/English Proficiency", "Academic Transcripts"]
      },
      intakes: ["October", "April"],
      officialWebsite: "https://www.tum.de",
      logo: "/munich.png",
      campusImages: ["/images/universities/tum-campus1.jpg", "/images/universities/tum-campus2.jpg"]
    },
    {
      id: "ger-2",
      name: "Heidelberg University",
      city: "Heidelberg",
      state: "Baden-Württemberg",
      ranking: {
        world: 64,
        national: 2
      },
      establishedYear: 1386,
      type: "Public Research",
      description: "Heidelberg University, officially the Ruprecht Karl University of Heidelberg, is a public research university in Heidelberg, Baden-Württemberg, Germany.",
      highlights: [
        "Oldest university in Germany",
        "Strong in life sciences",
        "Historic city location",
        "International research collaborations"
      ],
      tuitionFees: {
        undergraduate: "€0 - €1,500",
        graduate: "€0 - €3,000"
      },
      popularPrograms: [
        "Medicine",
        "Life Sciences",
        "Physics",
        "Chemistry",
        "Law",
        "Philosophy"
      ],
      admissionRequirements: {
        undergraduate: ["Abitur/Equivalent", "German Proficiency", "Entrance Exam (some programs)"],
        graduate: ["Bachelor's Degree", "German/English Proficiency", "Research Proposal"]
      },
      intakes: ["October", "April"],
      officialWebsite: "https://www.uni-heidelberg.de",
      logo: "/heidelberg.jpeg",
      campusImages: ["/images/universities/heidelberg-campus1.jpg", "/images/universities/heidelberg-campus2.jpg"]
    }
  ],
  "New Zealand": [
    {
      id: "nz-1",
      name: "University of Auckland",
      city: "Auckland",
      state: "North Island",
      ranking: {
        world: 85,
        national: 1
      },
      establishedYear: 1883,
      type: "Public Research",
      description: "The University of Auckland is a public research university based in Auckland, New Zealand. It is the largest university in New Zealand by enrollment.",
      highlights: [
        "New Zealand's top university",
        "Located in vibrant Auckland",
        "Strong research output",
        "Diverse international community"
      ],
      tuitionFees: {
        undergraduate: "NZD 32,000 - 45,000",
        graduate: "NZD 35,000 - 48,000"
      },
      popularPrograms: [
        "Medicine",
        "Engineering",
        "Business",
        "Arts",
        "Science",
        "Law"
      ],
      admissionRequirements: {
        undergraduate: ["University Entrance", "IELTS 6.0", "Specific Prerequisites"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "Academic References"]
      },
      intakes: ["February", "July"],
      officialWebsite: "https://www.auckland.ac.nz",
      logo: "/suckland.png",
      campusImages: ["/images/universities/auckland-campus1.jpg", "/images/universities/auckland-campus2.jpg"]
    },
    {
      id: "nz-2",
      name: "University of Otago",
      city: "Dunedin",
      state: "South Island",
      ranking: {
        world: 217,
        national: 2
      },
      establishedYear: 1869,
      type: "Public Research",
      description: "The University of Otago is a collegiate university based in Dunedin, Otago, New Zealand. Founded in 1869, it is New Zealand's oldest university.",
      highlights: [
        "New Zealand's oldest university",
        "Strong medical school",
        "Beautiful campus setting",
        "Vibrant student life"
      ],
      tuitionFees: {
        undergraduate: "NZD 28,000 - 42,000",
        graduate: "NZD 30,000 - 45,000"
      },
      popularPrograms: [
        "Medicine",
        "Dentistry",
        "Health Sciences",
        "Business",
        "Arts",
        "Science"
      ],
      admissionRequirements: {
        undergraduate: ["University Entrance", "IELTS 6.0", "Health Sciences Admission Test"],
        graduate: ["Bachelor's Degree", "IELTS 6.5", "Professional Experience"]
      },
      intakes: ["February", "July"],
      officialWebsite: "https://www.otago.ac.nz",
      logo: "/otago.jpeg",
      campusImages: ["/images/universities/otago-campus1.jpg", "/images/universities/otago-campus2.jpg"]
    }
  ]
};

// Helper function to get universities by country
export const getUniversitiesByCountry = (country) => {
  return universitiesData[country] || [];
};

// Helper function to get all countries
export const getAllCountries = () => {
  return Object.keys(universitiesData);
};

// Helper function to get university by ID
export const getUniversityById = (id) => {
  for (const country in universitiesData) {
    const university = universitiesData[country].find(uni => uni.id === id);
    if (university) {
      return { ...university, country };
    }
  }
  return null;
};

// Helper function to search universities
export const searchUniversities = (query, country = null) => {
  const searchIn = country ? [country] : getAllCountries();
  const results = [];
  
  searchIn.forEach(countryName => {
    const universities = universitiesData[countryName] || [];
    const filtered = universities.filter(uni => 
      uni.name.toLowerCase().includes(query.toLowerCase()) ||
      uni.city.toLowerCase().includes(query.toLowerCase()) ||
      uni.popularPrograms.some(program => 
        program.toLowerCase().includes(query.toLowerCase())
      )
    );
    results.push(...filtered.map(uni => ({ ...uni, country: countryName })));
  });
  
  return results;
};
