// Daily Reflections - 52 Total
// Distribution: Personal Evolution (10), Leadership Blind Spots (10), Team Dynamics (8), Decisive Action (6), Vulnerability (6), Growth Edges (5), Purpose (4), Systems Thinking (3)

const REFLECTIONS = [
    // Personal Evolution / Identity (10)
    { id: 1, question: "What belief about myself am I outgrowing today?", theme: "Personal Evolution" },
    { id: 2, question: "What story am I telling myself about why this won't work?", theme: "Personal Evolution" },
    { id: 3, question: "What version of myself am I protecting by staying comfortable?", theme: "Personal Evolution" },
    { id: 4, question: "If I truly believed my worthiness isn't tied to my productivity, how would I show up today?", theme: "Personal Evolution" },
    { id: 5, question: "What part of my identity is holding me back from my next level of growth?", theme: "Personal Evolution" },
    { id: 6, question: "What would I attempt if I knew the outcome wouldn't define me?", theme: "Personal Evolution" },
    { id: 7, question: "Where am I performing a version of myself instead of being myself?", theme: "Personal Evolution" },
    { id: 8, question: "What old success pattern is now limiting my growth?", theme: "Personal Evolution" },
    { id: 9, question: "What would change if I stopped trying to prove myself?", theme: "Personal Evolution" },
    { id: 10, question: "What am I becoming that I once thought wasn't possible for me?", theme: "Personal Evolution" },

    // Leadership Blind Spots / Self-Awareness (10)
    { id: 11, question: "Where am I leading from fear instead of vision?", theme: "Leadership Blind Spots" },
    { id: 12, question: "How is my leadership creating the problems I'm complaining about?", theme: "Leadership Blind Spots" },
    { id: 13, question: "What feedback am I resisting that I probably need to hear?", theme: "Leadership Blind Spots" },
    { id: 14, question: "What am I avoiding because it would require me to change first?", theme: "Leadership Blind Spots" },
    { id: 15, question: "Where do I demand clarity from others that I haven't provided myself?", theme: "Leadership Blind Spots" },
    { id: 16, question: "What problem am I trying to solve with control that actually requires trust?", theme: "Leadership Blind Spots" },
    { id: 17, question: "What would my team say I care about based on my actions, not my words?", theme: "Leadership Blind Spots" },
    { id: 18, question: "Where am I micromanaging because I'm anxious, not because it's needed?", theme: "Leadership Blind Spots" },
    { id: 19, question: "What am I tolerating in myself that I wouldn't tolerate in others?", theme: "Leadership Blind Spots" },
    { id: 20, question: "How might my greatest strength be showing up as a liability?", theme: "Leadership Blind Spots" },

    // Team Dynamics / Relationships (8)
    { id: 21, question: "Who on my team needs to be seen, and how will I show up for them?", theme: "Team Dynamics" },
    { id: 22, question: "What relationship needs repair, and what's stopping me from initiating it?", theme: "Team Dynamics" },
    { id: 23, question: "Where am I confusing niceness with kindness?", theme: "Team Dynamics" },
    { id: 24, question: "What difficult conversation am I avoiding that my team deserves to have?", theme: "Team Dynamics" },
    { id: 25, question: "Who am I underestimating because of how they show up differently than I do?", theme: "Team Dynamics" },
    { id: 26, question: "What would trust look like in a relationship where it's currently missing?", theme: "Team Dynamics" },
    { id: 27, question: "Where am I asking for loyalty instead of earning respect?", theme: "Team Dynamics" },
    { id: 28, question: "What does the quietest person in my team know that I'm missing?", theme: "Team Dynamics" },

    // Decisive Action / Courage (6)
    { id: 29, question: "What decision am I avoiding—and what's the real cost of waiting?", theme: "Decisive Action" },
    { id: 30, question: "What truth am I afraid to speak, and to whom?", theme: "Decisive Action" },
    { id: 31, question: "Where am I seeking consensus when I really need courage?", theme: "Decisive Action" },
    { id: 32, question: "What would I do right now if I weren't afraid of being wrong?", theme: "Decisive Action" },
    { id: 33, question: "What am I waiting for permission to do that I could just do?", theme: "Decisive Action" },
    { id: 34, question: "What small act of courage today would make a big difference over time?", theme: "Decisive Action" },

    // Vulnerability / Authenticity (6)
    { id: 35, question: "What am I pretending not to know?", theme: "Vulnerability" },
    { id: 36, question: "What am I afraid people will discover about me if they really knew?", theme: "Vulnerability" },
    { id: 37, question: "How would today be different if I had zero fear of judgment?", theme: "Vulnerability" },
    { id: 38, question: "What weakness am I hiding that might actually connect me to others?", theme: "Vulnerability" },
    { id: 39, question: "Where am I performing confidence when I actually feel uncertain?", theme: "Vulnerability" },
    { id: 40, question: "What would happen if I admitted I don't have this figured out?", theme: "Vulnerability" },

    // Growth Edges / Development (5)
    { id: 41, question: "What skill am I avoiding developing because it feels uncomfortable?", theme: "Growth Edges" },
    { id: 42, question: "What feedback from five years ago would I now give myself credit for ignoring?", theme: "Growth Edges" },
    { id: 43, question: "Where am I coasting on past success instead of pushing into new territory?", theme: "Growth Edges" },
    { id: 44, question: "What's the gap between who I am and who I need to become for my next challenge?", theme: "Growth Edges" },
    { id: 45, question: "What would I learn if I assumed the failure was a teacher, not an enemy?", theme: "Growth Edges" },

    // Purpose / Meaning (4)
    { id: 46, question: "What would I do today if I knew it wouldn't matter to anyone but me?", theme: "Purpose" },
    { id: 47, question: "What matters most right now that I'm not giving my best attention?", theme: "Purpose" },
    { id: 48, question: "If I could only accomplish one thing this year, what would make everything else easier or unnecessary?", theme: "Purpose" },
    { id: 49, question: "What will I regret not starting today?", theme: "Purpose" },

    // Systems Thinking (3)
    { id: 50, question: "What pattern keeps repeating in my life that I haven't fully understood yet?", theme: "Systems Thinking" },
    { id: 51, question: "What am I optimizing for that might be making the whole system worse?", theme: "Systems Thinking" },
    { id: 52, question: "Where am I solving symptoms instead of causes?", theme: "Systems Thinking" }
];
