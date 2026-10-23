export interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  branch: string;
  questionsSolved: number;
  streakDays: number;
  readinessScore: number;
  targetCompany: string;
  badge: "Diamond" | "Platinum" | "Gold" | "Silver";
}

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Arunachalam K.",
    college: "Anna University (CEG), Chennai",
    branch: "Computer Science",
    questionsSolved: 412,
    streakDays: 48,
    readinessScore: 98,
    targetCompany: "Google SDE",
    badge: "Diamond",
  },
  {
    rank: 2,
    name: "Pooja Sundaram",
    college: "VIT Vellore",
    branch: "Information Technology",
    questionsSolved: 388,
    streakDays: 42,
    readinessScore: 96,
    targetCompany: "Amazon SDE",
    badge: "Diamond",
  },
  {
    rank: 3,
    name: "Rohit Deshmukh",
    college: "RV College of Engineering, Bengaluru",
    branch: "Computer Science",
    questionsSolved: 356,
    streakDays: 37,
    readinessScore: 94,
    targetCompany: "Microsoft SDE",
    badge: "Platinum",
  },
  {
    rank: 4,
    name: "Sneha Ramakrishnan",
    college: "SRM Institute of Science & Tech, Kattankulathur",
    branch: "Electronics & Communication",
    questionsSolved: 334,
    streakDays: 31,
    readinessScore: 92,
    targetCompany: "Flipkart SDE",
    badge: "Platinum",
  },
  {
    rank: 5,
    name: "Vigneshwaran M.",
    college: "PSG College of Technology, Coimbatore",
    branch: "Computer Science",
    questionsSolved: 310,
    streakDays: 29,
    readinessScore: 91,
    targetCompany: "Zoho Corp",
    badge: "Platinum",
  },
  {
    rank: 6,
    name: "Kavya Menon",
    college: "BMS College of Engineering, Bengaluru",
    branch: "Information Science",
    questionsSolved: 285,
    streakDays: 24,
    readinessScore: 89,
    targetCompany: "TCS Digital / NQT",
    badge: "Gold",
  },
  {
    rank: 7,
    name: "Aditya Verma",
    college: "Thapar Institute of Engg, Patiala",
    branch: "Computer Science",
    questionsSolved: 260,
    streakDays: 21,
    readinessScore: 87,
    targetCompany: "Infosys DSE",
    badge: "Gold",
  },
  {
    rank: 8,
    name: "Divya Nambiar",
    college: "SSN College of Engineering, Chennai",
    branch: "Computer Science",
    questionsSolved: 242,
    streakDays: 18,
    readinessScore: 85,
    targetCompany: "Accenture ASE",
    badge: "Gold",
  },
];
