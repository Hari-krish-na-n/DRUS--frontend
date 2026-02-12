// src/utils/constants.js
import {
  Code2,
  Terminal,
  Globe,
  Cpu,
  Cloud,
  BookOpen,
  Monitor,
  GraduationCap
} from "lucide-react";

export const CODING_PLATFORMS = [
  { 
    id: 'leetcode', 
    name: 'LeetCode', 
    icon: Code2, 
    color: '#FFA116', 
    category: 'Competitive',
    connectUrl: 'https://leetcode.com'
  },
  { 
    id: 'hackerrank', 
    name: 'HackerRank', 
    icon: Terminal, 
    color: '#00EA64', 
    category: 'Interview Prep',
    connectUrl: 'https://www.hackerrank.com'
  },
  { 
    id: 'codeforces', 
    name: 'Codeforces', 
    icon: Globe, 
    color: '#1F8ACB', 
    category: 'Competitive',
    connectUrl: 'https://codeforces.com'
  },
  { 
    id: 'geeksforgeeks', 
    name: 'GeeksforGeeks', 
    icon: Monitor, 
    color: '#2F8D46', 
    category: 'Interview Prep',
    connectUrl: 'https://www.geeksforgeeks.org'
  },
  { 
    id: 'codechef', 
    name: 'CodeChef', 
    icon: Cpu, 
    color: '#5B4638', 
    category: 'Competitive',
    connectUrl: 'https://www.codechef.com'
  },
  { 
    id: 'atcoder', 
    name: 'AtCoder', 
    icon: Cloud, 
    color: '#000000', 
    category: 'Competitive',
    connectUrl: 'https://atcoder.jp'
  },
  { 
    id: 'topcoder', 
    name: 'TopCoder', 
    icon: Code2, 
    color: '#29A8E0', 
    category: 'Competitive',
    connectUrl: 'https://www.topcoder.com'
  },
];

export const LEARNING_PLATFORMS = [
  { 
    id: 'coursera', 
    name: 'Coursera', 
    icon: GraduationCap, 
    color: '#0056D2', 
    category: 'Online Course',
    connectUrl: 'https://www.coursera.org'
  },
  { 
    id: 'udemy', 
    name: 'Udemy', 
    icon: BookOpen, 
    color: '#A435F0', 
    category: 'Online Course',
    connectUrl: 'https://www.udemy.com'
  },
  { 
    id: 'edx', 
    name: 'edX', 
    icon: GraduationCap, 
    color: '#02262B', 
    category: 'Online Course',
    connectUrl: 'https://www.edx.org'
  },
  { 
    id: 'khanacademy', 
    name: 'Khan Academy', 
    icon: BookOpen, 
    color: '#14BF96', 
    category: 'Interactive',
    connectUrl: 'https://www.khanacademy.org'
  },
  { 
    id: 'pluralsight', 
    name: 'Pluralsight', 
    icon: Monitor, 
    color: '#F15B2A', 
    category: 'Professional',
    connectUrl: 'https://www.pluralsight.com'
  },
  { 
    id: 'linkedin_learning', 
    name: 'LinkedIn Learning', 
    icon: Monitor, 
    color: '#0A66C2', 
    category: 'Professional',
    connectUrl: 'https://www.linkedin.com/learning'
  },
  { 
    id: 'freecodecamp', 
    name: 'freeCodeCamp', 
    icon: Terminal, 
    color: '#0A0A23', 
    category: 'Interactive',
    connectUrl: 'https://www.freecodecamp.org'
  },
];

export const PLATFORM_LABELS = {
  leetcode: "LeetCode",
  hackerrank: "HackerRank",
  codeforces: "Codeforces",
  geeksforgeeks: "GeeksforGeeks",
  codechef: "CodeChef",
  atcoder: "AtCoder",
  topcoder: "TopCoder",
  coursera: "Coursera",
  udemy: "Udemy",
  edx: "edX",
  khanacademy: "Khan Academy",
  pluralsight: "Pluralsight",
  linkedin_learning: "LinkedIn Learning",
  freecodecamp: "freeCodeCamp",
};
